// server/utils/wcSession.ts
import { getCookie, type H3Event } from "h3";

/**
 * WooGraphQL keeps the shopper's cart in a WooCommerce session that is
 * identified by the `data.customer_id` claim of the JWT it returns via the
 * (http-only) `woocommerce-session` cookie. To hand that same cart to the
 * native WordPress checkout page we only need to READ that claim.
 *
 * The token is intentionally decoded without signature verification: the value
 * is opaque, never leaves the server unverified, and the session id it yields
 * grants access to nothing beyond the shopper's own cart on the checkout page.
 */
export function getWooSessionId(event: H3Event): string | null {
	const cookie = getCookie(event, "woocommerce-session");
	if (!cookie) return null;

	const token = cookie.replace(/^Session\s+/i, "").trim();
	const payload = token.split(".")[1];
	if (!payload) return null;

	try {
		const json = Buffer.from(payload, "base64url").toString("utf8");
		const claims = JSON.parse(json) as {
			data?: { customer_id?: string };
		};
		return claims.data?.customer_id ?? null;
	} catch {
		return null;
	}
}
