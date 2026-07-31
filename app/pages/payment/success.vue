<script setup lang="ts">
interface VerifyResponse {
	orderNumber: string;
	total: string;
	status: string;
	paymentMethodTitle: string;
	date: string;
}

const route = useRoute();
const { order } = useCheckout();
const { cart } = useCart();
const { t } = useI18n();

const orderIdRaw = route.query.order_id;
const keyRaw = route.query.key;

const isValidOrderId = (v: unknown): v is string =>
	typeof v === "string" && /^\d+$/.test(v);

const hasValidParams = computed(
	() =>
		isValidOrderId(orderIdRaw) &&
		typeof keyRaw === "string" &&
		keyRaw.length > 0,
);

const { data, error, status } = await useFetch<VerifyResponse>(
	"/api/payment/verify",
	{
		query: { order_id: orderIdRaw, key: keyRaw },
		immediate: hasValidParams.value,
		key: `payment-verify-${orderIdRaw}-${keyRaw}`,
	},
);

// Empty the *server-side* WooCommerce cart (not just local UI state). Runs
// once, client-side only, and must never block the confirmation screen even
// if it fails - the shopper has already paid, this is just housekeeping.
let cartCleared = false;
async function clearServerCart() {
	if (cartCleared || !process.client) return;
	cartCleared = true;
	try {
		await $fetch("/api/cart/empty", { method: "POST" });
	} catch (err) {
		console.error("[payment/success] failed to empty server cart:", err);
	}
	cart.value = [];
	localStorage.setItem("cart", JSON.stringify(cart.value));
}

watch(
	data,
	(value) => {
		if (!value) return;
		order.value = value;
		clearServerCart();
	},
	{ immediate: true },
);

type PageState = "loading" | "missing-params" | "error" | "success";

const pageState = computed<PageState>(() => {
	if (!hasValidParams.value) return "missing-params";
	if (status.value === "pending" || status.value === "idle") return "loading";
	if (error.value || !data.value) return "error";
	return "success";
});

// Give a more specific reason where we can, without leaking internals.
const errorDescriptionKey = computed(() => {
	const code = error.value?.statusCode;
	if (code === 403 || code === 404) return "checkout.pay.error_invalid_link";
	if (code === 402) return "checkout.pay.verify_failed_description";
	return "checkout.pay.error_server";
});

const headingRef = ref<HTMLHeadingElement | null>(null);
onMounted(() => {
	headingRef.value?.focus();
});

useSeoMeta({
	title: () => t("checkout.pay.success_title"),
	robots: "noindex, nofollow",
});
</script>

<template>
	<div class="flex items-center justify-center min-h-[60vh] px-4">
		<!-- Verifying payment -->
		<div
			v-if="pageState === 'loading'"
			class="text-center space-y-4"
			role="status"
			aria-live="polite">
			<div
				class="loading-spinner h-10 w-10 rounded-full border-2 border-neutral-200 border-t-[#23a26d] dark:border-neutral-700 dark:border-t-[#40d195] mx-auto" />
			<p class="text-sm text-neutral-500 dark:text-neutral-300">
				{{ $t("checkout.pay.verifying") }}
			</p>
		</div>

		<!-- Missing/invalid link (no order_id or key at all) -->
		<div
			v-else-if="pageState === 'missing-params'"
			class="text-center max-w-md space-y-4"
			role="alert">
			<div
				class="bg-amber-500/20 dark:bg-amber-700/20 flex rounded-full p-3 mb-1 w-fit mx-auto">
				<UIcon
					name="i-iconamoon-question-mark-circle-fill"
					size="46"
					class="text-amber-500 dark:text-amber-400" />
			</div>
			<h1
				ref="headingRef"
				tabindex="-1"
				class="text-lg font-semibold focus:outline-none">
				{{ $t("checkout.pay.missing_info_title") }}
			</h1>
			<p class="text-sm text-neutral-500 dark:text-neutral-300">
				{{ $t("checkout.pay.missing_info_description") }}
			</p>
			<NuxtLink
				to="/"
				class="inline-block px-6 py-2.5 rounded-full bg-black dark:bg-white text-white dark:text-black text-sm font-medium">
				{{ $t("checkout.pay.back_to_shop") }}
			</NuxtLink>
		</div>

		<!-- Verification failed -->
		<div
			v-else-if="pageState === 'error'"
			class="text-center max-w-md space-y-4"
			role="alert">
			<div
				class="bg-red-500/20 dark:bg-red-700/20 flex rounded-full p-3 mb-1 w-fit mx-auto">
				<UIcon
					name="i-iconamoon-close-circle-1-fill"
					size="46"
					class="text-red-500 dark:text-red-400" />
			</div>
			<h1
				ref="headingRef"
				tabindex="-1"
				class="text-lg font-semibold focus:outline-none">
				{{ $t("checkout.pay.verify_failed_title") }}
			</h1>
			<p class="text-sm text-neutral-500 dark:text-neutral-300">
				{{ $t(errorDescriptionKey) }}
			</p>
			<p
				v-if="isValidOrderId(orderIdRaw)"
				class="text-xs text-neutral-400 dark:text-neutral-500">
				{{ $t("checkout.pay.order_reference", { id: orderIdRaw }) }}
			</p>
			<NuxtLink
				to="/"
				class="inline-block px-6 py-2.5 rounded-full bg-black dark:bg-white text-white dark:text-black text-sm font-medium">
				{{ $t("general.go_back") }}
			</NuxtLink>
		</div>

		<!-- Success -->
		<PaymentSuccessful v-else-if="pageState === 'success'" />
	</div>
</template>

<style scoped>
.loading-spinner {
	animation: spin 0.8s linear infinite;
}

/* GPU-only property (transform), matches project convention */
@keyframes spin {
	to {
		transform: rotate(360deg);
	}
}

@media (prefers-reduced-motion: reduce) {
	.loading-spinner {
		animation: none;
		border-top-color: currentColor;
	}
}
</style>
