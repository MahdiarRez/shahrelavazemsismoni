import { createError } from "h3";

interface WooCommerceOrder {
	order_key: string;
	number: string;
	total: string;
	status: string;
	payment_method_title: string;
	date_created: string;
}

export default defineEventHandler(async (event) => {
	const { order_id, key } = getQuery(event);

	if (!order_id || !key) {
		throw createError({
			statusCode: 400,
			message: "Missing order_id or key",
		});
	}

	const orderId = Number(order_id);
	if (!Number.isInteger(orderId) || orderId <= 0) {
		throw createError({
			statusCode: 400,
			message: "Invalid order_id",
		});
	}

	const config = useRuntimeConfig();
	const wpBase = config.public.wpBaseUrl.replace(/\/$/, "");

	if (!wpBase || !config.wcConsumerKey || !config.wcConsumerSecret) {
		throw createError({
			statusCode: 500,
			message: "Payment verification is not configured",
		});
	}

	const auth = Buffer.from(
		`${config.wcConsumerKey}:${config.wcConsumerSecret}`,
	).toString("base64");

	let order: WooCommerceOrder;
	try {
		order = await $fetch<WooCommerceOrder>(
			`${wpBase}/wp-json/wc/v3/orders/${orderId}`,
			{
				headers: { Authorization: `Basic ${auth}` },
			},
		);
	} catch {
		throw createError({
			statusCode: 404,
			message: "Order not found",
		});
	}

	if (order.order_key !== key) {
		throw createError({ statusCode: 403, message: "Invalid order key" });
	}

	const paidStatuses = ["processing", "completed"];
	if (!paidStatuses.includes(order.status)) {
		throw createError({
			statusCode: 402,
			message: "Payment not completed",
		});
	}

	return {
		orderNumber: order.number,
		total: order.total,
		status: order.status,
		paymentMethodTitle: order.payment_method_title,
		date: order.date_created,
	};
});
