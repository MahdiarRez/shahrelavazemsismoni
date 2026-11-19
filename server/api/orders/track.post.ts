// server/api/orders/track.post.ts
import { createError, defineEventHandler, readBody } from "h3";
import { z } from "zod";
import { toEnglishDigits } from "~~/shared/helpers";

const trackSchema = z.object({
	orderId: z.union([z.string(), z.number()]).transform((val) => {
		const clean = toEnglishDigits(val).replace(/\D/g, "");
		const num = Number(clean);
		if (!Number.isInteger(num) || num <= 0) {
			throw new Error("شماره سفارش نامعتبر است");
		}
		return num;
	}),
	phone: z
		.union([z.string(), z.number()])
		.transform((val) => toEnglishDigits(val).trim())
		.pipe(
			z
				.string()
				.regex(
					/^(\+?98|0)?9\d{9}$/,
					"شماره همراه باید ۱۱ رقم باشد (مثال: ۰۹۱۲۳۴۵۶۷۸۹)",
				),
		),
});

function normalizeIranianPhone(raw: string): string {
	const digits = toEnglishDigits(raw || "").replace(/\D/g, "");
	if (digits.startsWith("0098")) return digits.slice(4);
	if (digits.startsWith("98")) return digits.slice(2);
	if (digits.startsWith("0")) return digits.slice(1);
	return digits;
}

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const parsed = trackSchema.safeParse(body);

	if (!parsed.success) {
		throw createError({
			statusCode: 400,
			message: parsed.error.issues[0]?.message || "اطلاعات ورودی نامعتبر است",
		});
	}

	const { orderId, phone } = parsed.data;

	const config = useRuntimeConfig();
	const wpBase = (config.public.wpBaseUrl || "").replace(/\/$/, "");

	if (!wpBase || !config.wcConsumerKey || !config.wcConsumerSecret) {
		throw createError({
			statusCode: 500,
			message: "سامانه پیگیری سفارش در حال حاضر در دسترس نیست",
		});
	}

	const auth = Buffer.from(
		`${config.wcConsumerKey}:${config.wcConsumerSecret}`,
	).toString("base64");

	let order: any;
	try {
		order = await $fetch<any>(`${wpBase}/wp-json/wc/v3/orders/${orderId}`, {
			headers: { Authorization: `Basic ${auth}` },
		});
	} catch (err: any) {
		const status = err?.response?.status || err?.statusCode || 404;
		if (status === 404) {
			throw createError({
				statusCode: 404,
				message: "سفارشی با این شماره یافت نشد",
			});
		}
		throw createError({
			statusCode: 502,
			message: "خطا در ارتباط با سرور پیگیری سفارش",
		});
	}

	// Security Check: Match phone number
	const orderPhone = order?.billing?.phone || order?.shipping?.phone || "";
	if (
		normalizeIranianPhone(phone) !== normalizeIranianPhone(orderPhone)
	) {
		throw createError({
			statusCode: 404,
			message: "سفارشی با این شماره سفارش و شماره همراه یافت نشد",
		});
	}

	// Extract Postal Tracking Number from meta_data if present
	const metaList: Array<{ key: string; value: any }> = order.meta_data || [];
	let postTrackingNumber: string | null = null;
	const trackingKeys = [
		"_post_tracking_code",
		"_tracking_number",
		"tracking_number",
		"tracking_code",
		"post_code",
		"post_tracking",
		"_barcode",
		"barcode",
		"tipax_code",
	];

	for (const meta of metaList) {
		if (meta && trackingKeys.includes(meta.key) && meta.value) {
			const val = String(meta.value).trim();
			if (val.length > 0) {
				postTrackingNumber = val;
				break;
			}
		}
	}

	// Determine Step in Progression
	// Step 1: Paid / Registered
	// Step 2: Preparing in warehouse
	// Step 3: Shipped / In transit
	// Step 4: Delivered / Completed
	let currentStep = 1;
	let statusText = "در حال پردازش";
	const rawStatus = order.status || "pending";

	if (rawStatus === "completed") {
		currentStep = 4;
		statusText = "تحویل داده شده";
	} else if (postTrackingNumber || rawStatus === "shipped") {
		currentStep = 3;
		statusText = "تحویل به پست / در حال ارسال";
	} else if (rawStatus === "processing") {
		currentStep = 2;
		statusText = "در حال آماده‌سازی در انبار";
	} else if (rawStatus === "on-hold" || rawStatus === "pending") {
		currentStep = 1;
		statusText = "ثبت سفارش";
	} else if (rawStatus === "cancelled") {
		currentStep = 0;
		statusText = "لغو شده";
	} else if (rawStatus === "failed") {
		currentStep = 0;
		statusText = "ناموفق";
	} else if (rawStatus === "refunded") {
		currentStep = 0;
		statusText = "مرجوع شده";
	}

	// Format line items
	const items = (order.line_items || []).map((item: any) => ({
		id: item.id,
		name: item.name,
		quantity: item.quantity,
		price: item.price,
		total: item.total,
		sku: item.sku || null,
		image: item.image?.src || null,
	}));

	return {
		orderId: order.id,
		orderNumber: order.number || String(order.id),
		status: rawStatus,
		statusText,
		currentStep,
		dateCreated: order.date_created,
		dateModified: order.date_modified,
		total: order.total,
		paymentMethodTitle: order.payment_method_title,
		transactionId: order.transaction_id || null,
		postTrackingNumber,
		customer: {
			name: `${order.billing?.first_name || ""} ${order.billing?.last_name || ""}`.trim(),
			phone: order.billing?.phone || "",
			city: order.billing?.city || "",
			state: order.billing?.state || "",
			address: order.billing?.address_1 || "",
			postcode: order.billing?.postcode || "",
		},
		items,
	};
});
