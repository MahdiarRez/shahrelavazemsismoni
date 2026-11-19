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

  try {
    const result = await $fetch<WPOrderResponse>(
      `${wpBase}/wp-json/headless-checkout/v1/order`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Checkout-Secret": secret,
        },
        body: {
          session_id: sessionId,
          billing: parsed.data,
        },
      },
    );

    return { paymentUrl: result.payment_url };
  } catch (err: any) {
    const status = err?.response?.status || err?.statusCode || 502;
    const data = err?.response?._data || err?.data;

    console.error("[place-order] WP error:", status, data);

    throw createError({
      statusCode: status >= 500 ? 502 : status,
      message: data?.message || "خطا در ثبت سفارش",
    });
  }
});
