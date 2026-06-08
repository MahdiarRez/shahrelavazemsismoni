export const useCheckout = () => {
	const { cart } = useCart();
	const config = useRuntimeConfig();

	const order = useState("order", () => null);

	const userDetails = useState("userDetails", () => ({
		email: "",
		firstName: "",
		lastName: "",
		phone: "",
		city: "",
		address1: "",
	}));

	const checkoutStatus = ref("order");

	const handleCheckout = async () => {
		try {
			checkoutStatus.value = "processing";

			const res = await $fetch("/api/checkout", {
				method: "POST",
				body: {
					billing: { ...userDetails.value },
					paymentMethod: config.public.zarinpalPaymentMethod || "WC_ZPal",
				},
			});

			const createdOrder = res.checkout.order;
			order.value = createdOrder;

			cart.value = [];
			localStorage.setItem("cart", JSON.stringify(cart.value));

			const wpBase = (config.public.wpBaseUrl || "").replace(/\/$/, "");
			if (!wpBase) {
				throw new Error("NUXT_PUBLIC_WP_BASE_URL is not configured");
			}

			const payUrl =
				`${wpBase}/checkout/order-pay/${createdOrder.databaseId}/` +
				`?pay_for_order=true&key=${createdOrder.orderKey}`;

			window.location.href = payUrl;
		} catch (err) {
			console.error("Checkout failed", err);
			checkoutStatus.value = "error";
		}
	};

	return { order, userDetails, checkoutStatus, handleCheckout };
};
