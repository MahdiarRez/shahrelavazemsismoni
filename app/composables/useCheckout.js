import { push } from "notivue";

export const useCheckout = () => {
	const { t } = useI18n();

	// Populated on the /payment/success page once WooCommerce confirms payment.
	const order = useState("order", () => null);

	// "idle" -> ready to check out, "redirecting" -> handing off to WooCommerce.
	const checkoutStatus = ref("idle");

	// Sends the shopper to the native WooCommerce checkout page, which owns
	// billing, shipping and payment. The cart travels via the server-issued
	// authorizing URL so nothing sensitive is collected or stored in the SPA.
	const handleCheckout = async () => {
		try {
			checkoutStatus.value = "redirecting";

			const { checkoutUrl } = await $fetch("/api/checkout/session");
			if (!checkoutUrl) throw new Error("Missing checkout URL");

			window.location.href = checkoutUrl;
		} catch (err) {
			console.error("Checkout handoff failed", err);
			checkoutStatus.value = "idle";
			push.error(t("checkout.pay.error"));
		}
	};

	return { order, checkoutStatus, handleCheckout };
};
