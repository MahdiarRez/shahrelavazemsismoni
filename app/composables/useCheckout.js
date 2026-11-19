import { push } from "notivue";

export const useCheckout = () => {
	const { t } = useI18n();

	// Populated on the /payment/success page once WooCommerce confirms payment.
	const order = useState("order", () => null);

	// "idle" -> "submitting" -> "redirecting"
	const checkoutStatus = ref("idle");

	const billing = reactive({
		first_name: "",
		last_name: "",
		phone: "",
		state: "",
		city: "",
		address_1: "",
		postcode: "",
	});

	const fieldError = ref(null);

	const handleCheckout = async () => {
		if (checkoutStatus.value !== "idle") return;
		fieldError.value = null;

		// Client-side quick checks
		if (!billing.first_name || billing.first_name.trim().length < 2) {
			fieldError.value = {
				field: "first_name",
				message: t("checkout.form.first_name_error"),
			};
			return push.error(fieldError.value.message);
		}
		if (!billing.last_name || billing.last_name.trim().length < 2) {
			fieldError.value = {
				field: "last_name",
				message: t("checkout.form.last_name_error"),
			};
			return push.error(fieldError.value.message);
		}
		if (!/^09\d{9}$/.test(billing.phone)) {
			fieldError.value = {
				field: "phone",
				message: t("checkout.form.phone_error"),
			};
			return push.error(fieldError.value.message);
		}
		if (!billing.state) {
			fieldError.value = {
				field: "state",
				message: t("checkout.form.state_error"),
			};
			return push.error(fieldError.value.message);
		}
		if (!billing.city) {
			fieldError.value = {
				field: "city",
				message: t("checkout.form.city_error"),
			};
			return push.error(fieldError.value.message);
		}
		if (!billing.address_1 || billing.address_1.trim().length < 5) {
			fieldError.value = {
				field: "address_1",
				message: t("checkout.form.address_error"),
			};
			return push.error(fieldError.value.message);
		}
		if (billing.postcode && !/^\d{10}$/.test(billing.postcode)) {
			fieldError.value = {
				field: "postcode",
				message: t("checkout.form.postcode_error"),
			};
			return push.error(fieldError.value.message);
		}

		try {
			checkoutStatus.value = "submitting";

			const { paymentUrl } = await $fetch("/api/checkout/place-order", {
				method: "POST",
				body: { billing },
			});

			if (!paymentUrl) throw new Error("Missing payment URL");

			checkoutStatus.value = "redirecting";
			window.location.href = paymentUrl;
		} catch (err) {
			console.error("Checkout failed", err);
			checkoutStatus.value = "idle";

			if (err?.data?.data?.field) {
				fieldError.value = {
					field: err.data.data.field,
					message: err.data?.message || t("checkout.pay.error"),
				};
			}

			push.error(err?.data?.message || t("checkout.pay.error"));
		}
	};

	return {
		order,
		checkoutStatus,
		billing,
		fieldError,
		handleCheckout,
	};
};
