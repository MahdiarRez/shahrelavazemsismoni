<!--app/components/PaymentSuccessful.vue-->
<script setup>
import {
	toPersianDigits,
	formatJalaliDate,
	convertMinPriceRangeToToman,
} from "~~/shared/helpers";

const { order } = useCheckout();
const localePath = useLocalePath();

const trackingUrl = computed(() => {
	if (!order.value?.orderNumber) return localePath("/tracking");
	const params = new URLSearchParams();
	params.set("order_id", order.value.orderNumber);
	if (order.value.phone) {
		params.set("phone", order.value.phone);
	}
	return `${localePath("/tracking")}?${params.toString()}`;
});
</script>

<template>
	<div class="w-[calc(100vw-24px)] sm:w-96 h-full rounded-3xl pb-6">
		<div class="flex flex-col items-center justify-center mb-6 mt-8 gap-1">
			<div
				class="bg-green-500/20 dark:bg-green-700/20 flex rounded-full p-3 mb-1">
				<UIcon
					name="i-iconamoon-check-circle-1-fill"
					size="46"
					class="text-[#23a26d] dark:text-[#40d195] shadow-md" />
			</div>
			<div class="text-lg font-semibold">
				{{ $t("checkout.pay.success") }}
			</div>
			<div
				class="text-sm text-neutral-500 dark:text-neutral-300 text-center px-4">
				{{ $t("checkout.pay.processed") }}
			</div>
		</div>

		<div
			class="bg-black/5 dark:bg-white/10 rounded-2xl p-5 m-5 gap-3 flex flex-col font-light text-sm capitalize">
			<div class="flex justify-between items-center">
				<span class="dark:text-neutral-400 text-neutral-600"
					>{{ $t("checkout.pay.total") }}:</span
				>
				<span class="font-semibold text-lg">{{
					convertMinPriceRangeToToman(order.total)
				}}</span>
			</div>
			<div class="flex justify-between items-center">
				<span class="dark:text-neutral-400 text-neutral-600"
					>{{ $t("checkout.pay.order_number") }}:</span
				>
				<span class="font-semibold"
					>#{{ toPersianDigits(`${order.orderNumber}`) }}</span
				>
			</div>
			<div
				v-if="order.transactionId"
				class="flex justify-between items-center pt-2 border-t border-black/5 dark:border-white/10">
				<span class="dark:text-neutral-400 text-neutral-600"
					>{{ $t("checkout.pay.transaction_id") }}:</span
				>
				<span
					class="font-mono font-semibold text-emerald-600 dark:text-emerald-400 select-all"
					>{{ order.transactionId }}</span
				>
			</div>
			<div class="flex justify-between items-center">
				<span class="dark:text-neutral-400 text-neutral-600"
					>{{ $t("checkout.pay.date") }}:</span
				>
				<span class="font-semibold">{{
					formatJalaliDate(order.date)
				}}</span>
			</div>
			<div class="flex justify-between items-center">
				<span class="dark:text-neutral-400 text-neutral-600"
					>{{ $t("checkout.pay.payment_method") }}:</span
				>
				<span class="font-semibold">{{
					order.paymentMethodTitle
				}}</span>
			</div>
		</div>

		<!-- Action Buttons -->
		<div class="flex flex-col gap-2.5 px-5">
			<NuxtLink
				:to="trackingUrl"
				class="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-full bg-[#23a26d] hover:bg-[#1f9161] dark:bg-[#40d195] dark:hover:bg-[#36be85] text-white dark:text-black font-medium text-sm transition shadow-sm active:scale-[0.98]">
				<UIcon name="i-iconamoon-delivery-fast-duotone" size="20" />
				<span>{{ $t("checkout.pay.track_order") }}</span>
			</NuxtLink>
			<NuxtLink
				:to="localePath('/')"
				class="flex items-center justify-center w-full py-3 px-4 rounded-full bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/15 text-neutral-800 dark:text-neutral-200 font-medium text-sm transition active:scale-[0.98]">
				<span>{{ $t("checkout.pay.back_to_shop") }}</span>
			</NuxtLink>
		</div>
	</div>
</template>
