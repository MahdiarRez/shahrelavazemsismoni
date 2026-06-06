<script setup lang="js">
import { computed, watchEffect } from "vue";
import { convertMinPriceRangeToToman, toPersianDigits } from "~~/shared/helpers";

const props = defineProps({
  salePrice: { type: String },
  regularPrice: { type: String },
  variant: { type: String, default: "default" },
  quantity: { type: Number, default: 1 },
});

// تبدیل قیمت‌های تکی به تومان برای حالت‌های default و card
const cardSale = computed(() =>
  props.salePrice ? convertMinPriceRangeToToman(props.salePrice) : ""
);
const cardRegular = computed(() =>
  props.regularPrice ? convertMinPriceRangeToToman(props.regularPrice) : ""
);

// تابع استخراج عدد از رشته ریال ووکامرس
const parsePrice = (priceStr) => {
  if (!priceStr) return 0;
  const onlyDigits = priceStr.replace(/[^\d]/g, "");
  return Number(onlyDigits);
};

// بررسی وجود تخفیف
const isSale = computed(() => {
  const s = parsePrice(props.salePrice);
  const r = parsePrice(props.regularPrice);
  return s > 0 && r > 0 && s < r;
});

// محاسبه درصد تخفیف
const discountPercentage = computed(() => {
  if (!isSale.value) return 0;
  const s = convertMinPriceRangeToToman(props.salePrice, { persianDigits: false, withSeparator: false });
  const r = convertMinPriceRangeToToman(props.regularPrice, { persianDigits: false, withSeparator: false });
  return Math.round(((r - s) / r) * 100);
});

// محاسبه قیمت کل (تعداد × قیمت) و تبدیل مستقیم به تومان تمیز
const displayTotalSalePrice = computed(() => {
  const totalRial = parsePrice(props.salePrice) * props.quantity;
  return totalRial > 0 ? convertMinPriceRangeToToman(totalRial.toString()) : "۰";
});

const displayTotalRegularPrice = computed(() => {
  const totalRial = parsePrice(props.regularPrice) * props.quantity;
  return totalRial > 0 ? convertMinPriceRangeToToman(totalRial.toString()) : "۰";
});

watchEffect(() => {
  console.log("sale:", props.salePrice);
  console.log("regular:", props.regularPrice);
  console.log("qty:", props.quantity);
});
</script>

<template>
	<div>
		<div v-if="variant === 'default'">
			<div
				class="relative"
				v-if="isSale">
				<div
					class="flex flex-row-reverse items-center gap-1 text-[#5f5f5f] dark:text-[#a3a3a3] line-through opacity-60 text-xl font-bold justify-end">
					<span>{{ cardRegular }}</span>
					<span>تومان</span>
				</div>
				<div
					class="flex flex-row-reverse items-center gap-1 text-xl font-bold justify-end">
					<span>{{ cardSale }}</span>
					<span>تومان</span>
				</div>
				<span
					class="bg-secondary-600 px-5 py-1 text-white text-base font-normal rounded-full absolute top-1 right-0"
					v-if="discountPercentage">
					{{ toPersianDigits(`${discountPercentage}`) }}%
				</span>
			</div>
			<template v-else>
				<div class="flex items-baseline justify-between">
					<p class="text-xl font-bold flex items-center gap-1">
						<span>تومان</span>
						<span>{{
							convertMinPriceRangeToToman(regularPrice)
						}}</span>
					</p>
				</div>
			</template>
		</div>

		<div
			v-else-if="variant === 'card'"
			class="flex gap-1 justify-between flex-row items-center">
			<div
				class="flex flex-col"
				v-if="isSale">
				<div
					class="flex flex-row-reverse items-center gap-1 text-[#5f5f5f] dark:text-[#a3a3a3] line-through opacity-60">
					<span>{{ cardRegular }}</span>
					<span>تومان</span>
				</div>
				<div class="flex flex-row-reverse items-center gap-1">
					<span>{{ cardSale }}</span>
					<span>تومان</span>
				</div>
			</div>
			<div
				class="flex flex-row-reverse items-center gap-1"
				v-else>
				<span>{{ cardRegular }}</span>
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
				class="flex flex-col gap-0.5">
				<div class="font-bold flex items-center gap-1">
					<span>تومان</span>
					<span>{{ displayTotalSalePrice }}</span>
				</div>
				<div
					class="font-medium flex items-center gap-1 line-through opacity-50">
					<span>تومان</span>
					<span>{{ displayTotalRegularPrice }}</span>
				</div>
				<span
					class="bg-secondary-600/80 backdrop-blur-sm px-4 py-1.5 text-white text-base font-normal rounded-3xl absolute top-1 right-0"
					v-if="discountPercentage">
					{{ toPersianDigits(`${discountPercentage}`) }}%
				</span>
			</div>
			<div
				v-else
				class="font-bold flex items-center gap-1">
				<span>تومان</span>
				<span>{{ displayTotalRegularPrice }}</span>
			</div>
		</div>
	</div>
</template>
