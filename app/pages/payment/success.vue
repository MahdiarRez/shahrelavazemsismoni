<script setup>
const route = useRoute();
const { order } = useCheckout();

const { data, error } = await useFetch("/api/payment/verify", {
	query: {
		order_id: route.query.order_id,
		key: route.query.key,
	},
});

if (data.value) {
	order.value = data.value;
}

useSeoMeta({ title: "پرداخت موفق" });
</script>

<template>
	<div class="flex items-center justify-center min-h-[60vh] px-4">
		<div
			v-if="error"
			class="text-center max-w-md space-y-4"
		>
			<UIcon
				name="i-iconamoon-close-circle-1-fill"
				size="48"
				class="text-red-500 mx-auto"
			/>
			<p class="text-neutral-600 dark:text-neutral-300">
				{{ $t("checkout.pay.verify_failed") }}
			</p>
			<NuxtLink
				to="/"
				class="inline-block text-sm text-primary-500 hover:underline"
			>
				{{ $t("general.go_back") }}
			</NuxtLink>
		</div>
		<PaymentSuccessful v-else-if="order" />
	</div>
</template>
