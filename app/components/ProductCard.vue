<!--app/components/ProductCard.vue-->
<script setup>
import { convertMinPriceRangeToToman } from "~~/shared/helpers";

const localePath = useLocalePath();

defineProps({
	products: Object,
});
</script>

<template>
	<article v-for="product in products">
		<NuxtLink
			:to="localePath(`/product/${product.sku}/${product.slug}`)"
			class="group select-none h-full">
			<div
				class="cursor-pointer transition ease-[ease] duration-300 md:hover:bg-[#efefef36] dark:md:hover:bg-[#141313] rounded-[32px]">
				<div
					class="relative pb-[133%] dark:shadow-[0_8px_24px_rgba(0,0,0,.5)] rounded-[32px] overflow-hidden">
					<NuxtImg
						:alt="product.name"
						loading="lazy"
						:title="product.name"
						:src="product.galleryImages.nodes[0]?.sourceUrl"
						class="absolute h-full w-full dark:bg-neutral-800 bg-neutral-200 object-cover group-hover:scale-90 transition-transform duration-300 md:group-hover:rounded-b-[12px] rounded-[24px]" />
					<NuxtImg
						:alt="product.name"
						loading="lazy"
						:title="product.name"
						:src="product.image.sourceUrl"
						class="absolute h-full w-full dark:bg-neutral-800 bg-neutral-200 object-cover transition-opacity duration-300 group-hover:opacity-0" />
				</div>
				<div
					class="grid gap-0.5 pt-3 pb-4 px-1.5 md:px-3 text-sm font-medium text-right">
					<div>{{ product.name }}</div>
					<div class="flex flex-row justify-end gap-3 items-center">
						<div
							class="font-normal text-xs opacity-80 text-[#5f5f5f] dark:text-[#a3a3a3]"
							v-for="value in product.productCategories?.nodes">
							{{ value.name }}
						</div>
					</div>
					<ProductPrice
						:sale-price="product.salePrice"
						:regular-price="product.regularPrice"
						variant="card" />
				</div>
			</div>
		</NuxtLink>
	</article>
</template>
