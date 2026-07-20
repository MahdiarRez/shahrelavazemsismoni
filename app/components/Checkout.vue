<script setup>
import { computed } from "vue";
import {
	convertMinPriceRangeToToman,
	toPersianDigits,
} from "~~/shared/helpers";

const { checkoutStatus, handleCheckout } = useCheckout();
const { cart } = useCart();

const totalQuantity = computed(() =>
	toPersianDigits(`${cart.value.reduce((s, i) => s + (i.quantity || 0), 0)}`),
);

const parsePrice = (priceStr) => {
	if (!priceStr) return 0;
	return Number(priceStr.toString().replace(/[^\d]/g, ""));
};

const cartTotal = computed(() => {
	const totalRial = cart.value.reduce((accumulator, item) => {
		const node = item.variation?.node;
		if (!node) return accumulator;

		const regularPrice = parsePrice(node.regularPrice);
		const salePrice = parsePrice(node.salePrice);

		const priceToUse =
			salePrice > 0 && salePrice < regularPrice
				? salePrice
				: regularPrice;

		return accumulator + priceToUse * (item.quantity ?? 1);
	}, 0);

	return totalRial > 0
		? convertMinPriceRangeToToman(totalRial.toString())
		: "۰";
});
</script>

<template>
	<div
		class="md:w-96 h-full bg-black/5 dark:bg-white/10 mb-3 mx-3 mt-3 p-3 rounded-3xl flex flex-col lg:max-h-80">
		<h5 class="text-xl font-medium px-2 pt-2 text-right">ثبت سفارش</h5>
		<h6 class="text-xs font-normal px-2 pt-2 text-right opacity-60 mb-4">
			پرداخت و ثبت آدرس در صفحه امن فروشگاه انجام می‌شود
		</h6>

		<div class="flex-1 flex flex-col justify-end text-nowrap">
			<div
				class="bg-black/5 dark:bg-white/10 rounded-2xl p-5 gap-2 flex flex-col text-sm">
				<div class="flex justify-between items-center">
					<span class="dark:text-neutral-400 text-neutral-600">
						{{ $t("checkout.pay.total") }}:
					</span>
					<span class="font-medium text-lg">
						{{ cartTotal }} تومان
					</span>
				</div>
				<div class="flex justify-between items-center">
					<span class="dark:text-neutral-400 text-neutral-600">
						{{ $t("product.quantity") }}:
					</span>
					<span class="font-medium">{{ totalQuantity }} عدد</span>
				</div>
			</div>

			<button
				type="button"
				:disabled="checkoutStatus !== 'idle'"
				class="pay-button-bezel w-full h-14 mt-4 rounded-full relative font-semibold text-white dark:text-black text-lg flex justify-center items-center"
				@click="handleCheckout">
				<Transition name="slide-up">
					<div
						v-if="checkoutStatus === 'idle'"
						class="absolute">
						{{ $t("checkout.pay.proceed") }}
					</div>
					<UIcon
						v-else
						class="absolute"
						name="i-svg-spinners-90-ring-with-bg"
						size="22" />
				</Transition>
			</button>

			<div
				class="text-xs font-medium p-4 flex flex-row-reverse gap-1 items-end justify-center text-neutral-400 dark:text-neutral-600">
				<div>
					{{ $t("checkout.pay.secure_note") }}
				</div>
				<UIcon
					name="i-iconamoon-lock-fill"
					size="18" />
			</div>
		</div>
	</div>
</template>

<style lang="postcss">
.pay-button-bezel {
	box-shadow: 0 0 0 var(--button-outline, 0px) rgba(92, 222, 131, 0.3),
		inset 0 -1px 1px 0 rgba(0, 0, 0, 0.25),
		inset 0 1px 0 0 rgba(255, 255, 255, 0.3), 0 1px 1px 0 rgba(0, 0, 0, 0.3);
	@apply bg-[#23a26d] dark:bg-[#40d195] outline-none tracking-[-0.125px] transition scale-[var(--button-scale,1)] duration-200;

	&:hover {
		@apply brightness-110;
	}

	&:active {
		--button-outline: 4px;
		--button-scale: 0.975;
	}

	&:disabled {
		@apply cursor-not-allowed;
	}
}
</style>
