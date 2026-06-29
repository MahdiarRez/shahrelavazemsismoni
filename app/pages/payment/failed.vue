<script setup>
const route = useRoute();
const config = useRuntimeConfig();

const retryUrl = computed(() => {
	const orderId = route.query.order_id;
	const key = route.query.key;
	if (!orderId || !key) return null;
	const wpBase = (config.public.wpBaseUrl || "").replace(/\/$/, "");
	if (!wpBase) return null;
	return (
		`${wpBase}/checkout/order-pay/${orderId}/` +
		`?pay_for_order=true&key=${key}`
	);
});

useSeoMeta({ title: "پرداخت ناموفق" });
</script>

<template>
	<div class="flex items-center justify-center min-h-[60vh] px-4">
		<div class="text-center max-w-md space-y-4">
			<div
				class="bg-red-500/20 dark:bg-red-700/20 flex rounded-full p-3 mb-1 w-fit mx-auto"
			>
				<UIcon
					name="i-iconamoon-close-circle-1-fill"
					size="46"
					class="text-red-500 dark:text-red-400"
				/>
			</div>
			<h1 class="text-lg font-semibold">
				{{ $t("checkout.pay.failed_title") }}
			</h1>
			<p class="text-sm text-neutral-500 dark:text-neutral-300">
				{{ $t("checkout.pay.failed_description") }}
			</p>
			<div class="flex flex-col items-center gap-3 mt-4">
				<a
					v-if="retryUrl"
					:href="retryUrl"
					class="inline-block px-6 py-2.5 rounded-full bg-[#23a26d] dark:bg-[#40d195] text-white dark:text-black text-sm font-medium"
				>
					{{ $t("checkout.pay.retry") }}
				</a>
				<NuxtLink
					to="/"
					class="inline-block px-6 py-2.5 rounded-full bg-black dark:bg-white text-white dark:text-black text-sm font-medium"
				>
					{{ $t("checkout.pay.back_to_shop") }}
				</NuxtLink>
			</div>
		</div>
	</div>
</template>
