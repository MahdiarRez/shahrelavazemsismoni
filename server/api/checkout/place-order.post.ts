// server/api/checkout/place-order.post.ts
import { createError, defineEventHandler, readBody } from "h3";
import { z } from "zod";
import { getWooSessionId } from "~~/server/utils/wcSession";
import { toEnglishDigits } from "~~/shared/helpers";

const billingSchema = z.object({
  first_name: z.string().trim().min(2, "نام باید حداقل ۲ حرف باشد"),
  last_name: z.string().trim().min(2, "نام خانوادگی باید حداقل ۲ حرف باشد"),
  phone: z
    .string()
    .transform((val) => toEnglishDigits(val).replace(/\D/g, ""))
    .pipe(z.string().regex(/^09\d{9}$/, "شماره همراه باید ۱۱ رقم و با ۰۹ شروع شود")),
  state: z.string().trim().min(1, "انتخاب استان الزامی است"),
  city: z.string().trim().min(1, "انتخاب شهر الزامی است"),
  address_1: z.string().trim().min(5, "آدرس کامل الزامی است (حداقل ۵ حرف)"),
  postcode: z
    .string()
    .transform((val) => toEnglishDigits(val).replace(/\D/g, ""))
    .pipe(z.string().regex(/^\d{10}$/, "کد پستی باید ۱۰ رقم باشد")),
});

interface WPOrderResponse {
  payment_url: string;
  order_id: number;
  order_key: string;
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const wpBase = (config.public.wpBaseUrl || "").replace(/\/$/, "");
  const secret = config.headlessCheckoutSecret;

  if (!wpBase || !secret) {
    throw createError({
      statusCode: 500,
      message: "تنظیمات تسویه حساب انجام نشده است",
    });
  }

  const sessionId = getWooSessionId(event);
  if (!sessionId) {
    throw createError({
      statusCode: 409,
      message: "سبد خرید فعالی یافت نشد",
    });
  }

  const body = await readBody(event);
  const parsed = billingSchema.safeParse(body?.billing);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    throw createError({
      statusCode: 400,
      message: firstIssue.message,
      data: { field: firstIssue.path.join(".") },
    });
  }

  const defaultStorefront = "https://shahrsismoony.ir";
  const reqUrl = getRequestURL(event);
  const requestOrigin = reqUrl.origin;
  const siteUrl = (config.public.siteUrl || "").replace(/\/$/, "");

  // BitPay strictly requires the callback URL domain to match the merchant registered domain (shahrsismoony.ir).
  // If request is from localhost or siteUrl is localhost/empty, use the registered storefront domain.
  const isLocal =
    !requestOrigin ||
    requestOrigin.includes("localhost") ||
    requestOrigin.includes("127.0.0.1") ||
    !requestOrigin.startsWith("http");

  let baseOrigin = requestOrigin;
  if (isLocal) {
    if (siteUrl && !siteUrl.includes("localhost") && !siteUrl.includes("127.0.0.1")) {
      baseOrigin = siteUrl;
    } else {
      baseOrigin = defaultStorefront;
    }
  }

  const callbackUrl = `${baseOrigin}/api/payment/callback`;
  const correlationId = `order_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

  try {
    const result = await $fetch<WPOrderResponse>(
      `${wpBase}/wp-json/headless-checkout/v1/order`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Checkout-Secret": secret,
          "X-Correlation-ID": correlationId,
        },
        body: {
          session_id: sessionId,
          billing: parsed.data,
          callback_url: callbackUrl,
        },
      },
    );

    return { paymentUrl: result.payment_url };
  } catch (err: any) {
    const status = err?.response?.status || err?.statusCode || 502;
    const rawData = err?.response?._data ?? err?.data;

    let data: any = rawData;
    if (typeof rawData === "string") {
      try {
        data = JSON.parse(rawData);
      } catch {
        data = { message: rawData };
      }
    }

    let errorMessage =
      data?.message ||
      (typeof data === "string" && !data.includes("<html") ? data : null) ||
      "خطا در ثبت سفارش و اتصال به درگاه پرداخت";

    const isAmountError =
      data?.bitpay_code === -2 ||
      data?.code === "amount_above_maximum" ||
      data?.code === "amount_below_minimum" ||
      /مبلغ ارسالی معتبر نیست/i.test(errorMessage);

    if (isAmountError) {
      const sentAmount = Number(data?.sent_amount || 0);
      if (sentAmount > 400000000 || data?.code === "amount_above_maximum") {
        errorMessage =
          "مبلغ سفارش بیش از سقف مجاز پرداخت درگاه اینترنتی بیت‌پی (۴۰ میلیون تومان / ۴۰۰ میلیون ریال) است. لطفاً تعداد اقلام یا مبلغ سبد خرید را کاهش دهید.";
      } else if ((sentAmount > 0 && sentAmount < 50000) || data?.code === "amount_below_minimum") {
        errorMessage =
          "مبلغ سفارش کمتر از حداقل مجاز درگاه اینترنتی بیت‌پی (۵,۰۰۰ تومان / ۵۰,۰۰۰ ریال) است.";
      } else {
        errorMessage =
          "مبلغ سفارش با محدودیت‌های درگاه پرداخت بیت‌پی همخوانی ندارد (حداقل ۵ هزار تومان و حداکثر ۴۰ میلیون تومان). لطفاً سبد خرید خود را بررسی کنید.";
      }
    }

    console.error(
      `[place-order][${correlationId}] WordPress order error:`,
      `Status: ${status}`,
      `Code: ${data?.code || "unknown"}`,
      `BitPay Code: ${data?.bitpay_code ?? "N/A"}`,
      `Message: ${errorMessage}`
    );

    throw createError({
      statusCode: isAmountError ? 400 : (status >= 400 && status < 500 ? status : 502),
      statusMessage: isAmountError ? "Bad Request" : "Payment Gateway Error",
      message: errorMessage,
      data: {
        code: data?.code || (isAmountError ? "amount_limit_exceeded" : "order_creation_failed"),
        correlationId,
      },
    });
  }
});
