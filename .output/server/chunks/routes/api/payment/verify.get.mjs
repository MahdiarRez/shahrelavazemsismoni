import { c as defineEventHandler, j as getQuery, h as createError, u as useRuntimeConfig } from '../../../_/nitro.mjs';
import 'graphql-request';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import '@intlify/utils';
import 'vue-router';
import 'node:fs';
import 'node:path';
import 'node:url';
import '@iconify/utils';
import 'node:crypto';
import 'consola';
import 'ipx';

const verify_get = defineEventHandler(async (event) => {
  const { order_id, key } = getQuery(event);
  if (!order_id || !key) {
    throw createError({
      statusCode: 400,
      message: "Missing order_id or key"
    });
  }
  const orderId = Number(order_id);
  if (!Number.isInteger(orderId) || orderId <= 0) {
    throw createError({
      statusCode: 400,
      message: "Invalid order_id"
    });
  }
  const config = useRuntimeConfig();
  const wpBase = config.public.wpBaseUrl.replace(/\/$/, "");
  if (!wpBase || !config.wcConsumerKey || !config.wcConsumerSecret) {
    throw createError({
      statusCode: 500,
      message: "Payment verification is not configured"
    });
  }
  const auth = Buffer.from(
    `${config.wcConsumerKey}:${config.wcConsumerSecret}`
  ).toString("base64");
  let order;
  try {
    order = await $fetch(
      `${wpBase}/wp-json/wc/v3/orders/${orderId}`,
      {
        headers: { Authorization: `Basic ${auth}` }
      }
    );
  } catch {
    throw createError({
      statusCode: 404,
      message: "Order not found"
    });
  }
  if (order.order_key !== key) {
    throw createError({ statusCode: 403, message: "Invalid order key" });
  }
  const paidStatuses = ["processing", "completed"];
  if (!paidStatuses.includes(order.status)) {
    throw createError({
      statusCode: 402,
      message: "Payment not completed"
    });
  }
  return {
    orderNumber: order.number,
    total: order.total,
    status: order.status,
    paymentMethodTitle: order.payment_method_title,
    date: order.date_created
  };
});

export { verify_get as default };
//# sourceMappingURL=verify.get.mjs.map
