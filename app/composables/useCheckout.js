export const useCheckout = () => {
	const { cart } = useCart();

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

			const checkoutData = {
				billing: { ...userDetails.value },
				paymentMethod: "cod",
			};

			const res = await $fetch("/api/checkout", {
				method: "POST",
				body: checkoutData,
			});

			const createdOrder = res.checkout.order;
			order.value = createdOrder;

			// پاک کردن cart
			cart.value = [];
			localStorage.setItem("cart", JSON.stringify(cart.value));

			// ساخت لینک پرداخت ووکامرس
			const wpBaseUrl = "https://YOUR-WP-DOMAIN.com";

			const payUrl =
				`${wpBaseUrl}/checkout/order-pay/${createdOrder.databaseId}/` +
				`?pay_for_order=true&key=${createdOrder.orderKey}`;

			// redirect به صفحه پرداخت
			window.location.href = payUrl;
		} catch (err) {
			console.error("Checkout failed", err);
			checkoutStatus.value = "error";
		}
	};

	return { order, userDetails, checkoutStatus, handleCheckout };
};
