// server/api/checkout/session.get.ts
import { createError } from "h3";
import { getWooSessionId } from "~~/server/utils/wcSession";

/**
 * Builds the authorizing URL that hands the shopper's headless cart off to the
 * native WooCommerce checkout page. WooCommerce (via the companion mu-plugin,
 * see wordpress/nuxt-payment-redirect.php) reads the `session_id` query param
 * and restores the matching cart, then owns billing, shipping and payment.
 */
export default defineEventHandler((event) => {
	const config = useRuntimeConfig();
	const wpBase = (config.public.wpBaseUrl || "").replace(/\/$/, "");

	if (!wpBase) {
		throw createError({
			statusCode: 500,
			message: "NUXT_PUBLIC_WP_BASE_URL is not configured",
		});
	}

	const sessionId = getWooSessionId(event);
	if (!sessionId) {
		throw createError({
			statusCode: 409,
			message: "No active cart session to check out",
		});
	}

	const checkoutUrl =
		`${wpBase}/checkout/?session_id=${encodeURIComponent(sessionId)}`;

	return { checkoutUrl };
});
