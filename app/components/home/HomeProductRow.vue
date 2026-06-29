<!--app/components/home/HomeProductRow.vue-->
<script setup>
const props = defineProps({
	titleKey: { type: String, required: true },
	fetchKey: { type: String, required: true },
	params: { type: Object, default: () => ({}) },
	viewAllQuery: { type: Object, default: () => ({}) },
});

const localePath = useLocalePath();

const { data, pending } = await useAsyncData(props.fetchKey, () =>
	$fetch("/api/products", {
		query: { first: 6, ...props.params },
	}),
);

const products = computed(() => data.value?.products?.nodes || []);

const viewAllPath = computed(() => {
	const search = new URLSearchParams(props.viewAllQuery).toString();
	return localePath(`/shop${search ? `?${search}` : ""}`);
});
</script>

<template>
	<section
		v-if="pending || products.length"
		class="px-3 lg:px-5 pt-8 lg:pt-12">
		<div class="mb-4 flex items-center justify-between gap-3 lg:mb-5">
			<NuxtLink
				:to="viewAllPath"
				class="text-sm font-semibold text-primary-600 transition hover:opacity-80 dark:text-primary-300">
				{{ $t("home.view_all") }}
			</NuxtLink>
			<h2 class="text-xl font-bold lg:text-2xl">
				{{ $t(titleKey) }}
			</h2>
		</div>

		<div
			class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 lg:gap-5">
			<template v-if="pending && !products.length">
				<div
					v-for="i in 6"
					:key="i">
					<div
						class="skeleton w-full overflow-hidden rounded-[24px] bg-neutral-200 pb-[133%] dark:bg-neutral-800"></div>
					<div class="grid gap-1.5 px-1.5 pb-4 pt-3">
						<div
							class="skeleton h-4 w-20 rounded bg-neutral-200/80 dark:bg-neutral-800/80"></div>
						<div
							class="skeleton h-4 w-28 rounded bg-neutral-200/50 dark:bg-neutral-800/50"></div>
					</div>
				</div>
			</template>
			<ProductCard
				v-else
				:products="products" />
		</div>
	</section>
</template>
