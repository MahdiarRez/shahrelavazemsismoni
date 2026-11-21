import { push } from "notivue";
import { toEnglishDigits } from "~~/shared/helpers";

export const useCheckout = () => {
	const { t } = useI18n();
	const { cart, isCartUpdating } = useCart();

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

		if (isCartUpdating.value) {
			push.warning(
				t("cart.please_wait_updating") ||
					"در حال به‌روزرسانی سبد خرید، لطفاً صبر کنید...",
			);
			return;
		}

		if (!cart.value || !cart.value.length) {
			push.error(t("cart.empty") || "سبد خرید شما خالی است.");
			return;
		}

		// Check 400 Million Tomans bank ceiling (4 Billion Rials)
		const totalRials = cart.value.reduce((acc, item) => {
			const node = item.variation?.node;
			if (!node) return acc;
			const p = Number(
				String(node.salePrice || node.regularPrice || "0").replace(/\D/g, ""),
			);
			return acc + p * (item.quantity ?? 1);
		}, 0);
		if (totalRials > 4000000000) {
			push.error(
				"مبلغ سفارش بیش از سقف مجاز پرداخت شبکه بانکی (۴۰۰ میلیون تومان) است.",
			);
			return;
		}

		fieldError.value = null;

		const cleanFirstName = (billing.first_name || "").trim();
		const cleanLastName = (billing.last_name || "").trim();
		const cleanPhone = toEnglishDigits(billing.phone || "").replace(/\D/g, "");
		const cleanPostcode = toEnglishDigits(billing.postcode || "").replace(/\D/g, "");
		const cleanAddress = (billing.address_1 || "").trim();

		// Client-side quick checks
		if (!cleanFirstName || cleanFirstName.length < 2) {
			fieldError.value = {
				field: "first_name",
				message: t("checkout.form.first_name_error"),
			};
			return push.error(fieldError.value.message);
		}
		if (!cleanLastName || cleanLastName.length < 2) {
			fieldError.value = {
				field: "last_name",
				message: t("checkout.form.last_name_error"),
			};
			return push.error(fieldError.value.message);
		}
		if (!/^09\d{9}$/.test(cleanPhone)) {
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
		if (!cleanAddress || cleanAddress.length < 5) {
			fieldError.value = {
				field: "address_1",
				message: t("checkout.form.address_error"),
			};
			return push.error(fieldError.value.message);
		}
		if (!cleanPostcode || !/^\d{10}$/.test(cleanPostcode)) {
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
				body: {
					billing: {
						first_name: cleanFirstName,
						last_name: cleanLastName,
						phone: cleanPhone,
						state: billing.state,
						city: billing.city,
						address_1: cleanAddress,
						postcode: cleanPostcode,
					},
				},
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
