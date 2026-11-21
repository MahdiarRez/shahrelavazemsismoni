// server/api/payment/callback.ts
import { defineEventHandler, getQuery, readBody, sendRedirect } from "h3";

export default defineEventHandler(async (event) => {
  const query = (getQuery(event) || {}) as Record<string, any>;
  let body: Record<string, any> = {};

  try {
    body = (await readBody(event)) || {};
  } catch {
    body = {};
  }

  // Combine parameters from both body and query string
  const merged: Record<string, any> = { ...body, ...query };

  const config = useRuntimeConfig();
  const wpBase = (config.public.wpBaseUrl || "").replace(/\/$/, "");

  // Build target WooCommerce BitPay API callback URL
  const target = new URL(`${wpBase}/`);
  target.searchParams.set("wc-api", "WC_bitpayir2");

  for (const [key, val] of Object.entries(merged)) {
    if (val !== undefined && val !== null && val !== "" && key !== "wc-api") {
      target.searchParams.set(key, String(val));
    }
  }

  // 302 Redirect the customer's browser to WordPress to verify payment & finalize order
  return sendRedirect(event, target.toString(), 302);
});
