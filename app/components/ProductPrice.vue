<script setup lang="js">
import { computed, watchEffect } from "vue";
import { convertMinPriceRangeToToman } from "~~/shared/helpers";
import { toPersianDigits } from "~~/shared/helpers";

const formatPrice = (price) => {
  if (price === 0) return "۰ تومان";
  return price.toLocaleString("fa-IR", { maximumFractionDigits: 0 }) + " تومان";
};

const props = defineProps({
  salePrice: { type: String },
  regularPrice: { type: String },
  variant: { type: String, default: "default" },
  quantity: { type: Number, default: 1 },
});

const cardSale = computed(() =>
  props.salePrice ? convertMinPriceRangeToToman(props.salePrice) : ""
);
const cardRegular = computed(() =>
  props.regularPrice ? convertMinPriceRangeToToman(props.regularPrice) : ""
);

const parsePrice = (priceStr) => {
  if (!priceStr) return 0;
  const onlyDigits = priceStr.replace(/[^\d]/g, "");
  return Number(onlyDigits);
};

const totalSalePriceNumeric = computed(
  () => parsePrice(props.salePrice) * props.quantity
);
const totalRegularPriceNumeric = computed(
  () => parsePrice(props.regularPrice) * props.quantity
);

const isSale = computed(() => {
  const s = parsePrice(props.salePrice);
  const r = parsePrice(props.regularPrice);
  return s > 0 && r > 0 && s < r;
});

const discountPercentage = computed(() => {
  if (!isSale.value) return 0;
  const s = convertMinPriceRangeToToman(props.salePrice, {persianDigits: false, withSeparator:false})
  const r = convertMinPriceRangeToToman(props.regularPrice, {persianDigits: false, withSeparator:false})

  return Math.round(((r - s) / r) * 100);
});

const displayTotalSalePrice = computed(() =>
  formatPrice(totalSalePriceNumeric.value)
);
const displayTotalRegularPrice = computed(() =>
  formatPrice(totalRegularPriceNumeric.value)
);

watchEffect(() => {
  console.log("sale:", props.salePrice);
  console.log("regular:", props.regularPrice);
  console.log("qty:", props.quantity);
});
</script>

<template>
	<div>
		<div v-if="variant === 'default'">
			<div v-if="isSale">
				<div class="flex items-baseline justify-end">
					<p
						class="text-xl font-bold text-alizarin-crimson-700"
						v-html="salePrice"></p>
					<p class="text-sm ml-2">{{ $t("product.vat_included") }}</p>
				</div>
				<div class="flex items-baseline justify-end">
					<p class="text-sm">{{ $t("product.originally") }}:</p>
					<p
						class="text-sm ml-1 line-through"
						v-html="regularPrice"></p>
					<p class="text-sm ml-1 text-alizarin-crimson-700">
						-{{ discountPercentage }}%
					</p>
				</div>
			</div>
			<div v-else>
				<div class="flex items-baseline justify-between">
					<p class="text-xl font-bold flex items-center gap-1">
						<span>تومان</span>
						<span>
							{{ convertMinPriceRangeToToman(regularPrice) }}
						</span>
					</p>
				</div>
			</div>
		</div>

		<div
			v-else-if="variant === 'card'"
			class="flex gap-1 justify-between flex-row items-center">
			<div
				class="flex flex-col"
				v-if="isSale">
				<div
					class="flex flex-row-reverse items-center gap-1 text-[#5f5f5f] dark:text-[#a3a3a3] line-through opacity-60">
					<span>
						{{ cardRegular }}
					</span>
					<span>تومان</span>
				</div>
				<div class="flex flex-row-reverse items-center gap-1">
					<span> {{ cardSale }} </span>
					<span>تومان</span>
				</div>
			</div>
			<div
				class="flex flex-row-reverse items-center gap-1"
				v-else>
				<span> {{ cardRegular }} </span>
				<span>تومان</span>
			</div>
			<span
				class="bg-secondary-600 px-3 text-white text-sm font-normal rounded-full"
				v-if="discountPercentage">
				{{ toPersianDigits(`${discountPercentage}`) }}%
			</span>
		</div>

		<div v-else-if="variant === 'cart'">
			<div
				v-if="isSale"
				class="flex flex-col gap-1">
				<div class="font-bold">{{ displayTotalSalePrice }}</div>
				<div
					class="flex flex-row flex-wrap items-baseline text-xs gap-1 text-neutral-600 dark:text-neutral-300">
					<p>{{ $t("product.originally") }}:</p>
					<p class="line-through">{{ displayTotalRegularPrice }}</p>
					<p class="text-alizarin-crimson-700">
						-{{ discountPercentage }}%
					</p>
				</div>
			</div>
			<div
				v-else
				class="font-bold">
				{{ displayTotalRegularPrice }}
			</div>
		</div>
	</div>
</template>
