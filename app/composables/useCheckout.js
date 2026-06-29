import { push } from "notivue";

export const useCheckout = () => {
	const config = useRuntimeConfig();
	const { t } = useI18n();

	const order = useState("order", () => null);

	const userDetails = useState("userDetails", () => ({
		email: "",
		firstName: "",
		lastName: "",
		phone: "",
		city: "",
		postcode: "",
		address1: "",
	}));

	const checkoutStatus = ref("order");

	const handleCheckout = async () => {
		try {
			checkoutStatus.value = "processing";

			const wpBase = (config.public.wpBaseUrl || "").replace(/\/$/, "");
			if (!wpBase) {
				throw new Error("NUXT_PUBLIC_WP_BASE_URL is not configured");
			}

			const res = await $fetch("/api/checkout", {
				method: "POST",
				body: {
					billing: { ...userDetails.value, country: "IR" },
					paymentMethod: config.public.zarinpalPaymentMethod || "WC_ZPal",
				},
			});

			const createdOrder = res?.checkout?.order;

			if (!createdOrder?.databaseId || !createdOrder?.orderKey) {
				throw new Error("Order was created without a valid id or key");
			}

			order.value = createdOrder;

			const payUrl =
				`${wpBase}/checkout/order-pay/${createdOrder.databaseId}/` +
				`?pay_for_order=true&key=${createdOrder.orderKey}`;

			window.location.href = payUrl;
		} catch (err) {
			console.error("Checkout failed", err);
			checkoutStatus.value = "order";
			push.error(t("checkout.pay.error"));
		}
	};

	return { order, userDetails, checkoutStatus, handleCheckout };
};
