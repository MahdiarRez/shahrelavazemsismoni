<!--app/components/home/HomeCategoryShowcase.vue-->
<script setup>
const localePath = useLocalePath();

const { data } = await useAsyncData("home-categories", () =>
	$fetch("/api/categories"),
);

const categories = computed(() =>
	(data.value?.productCategories?.nodes || [])
		.filter((category) => category.products?.nodes.length)
		.slice(0, 8),
);
</script>

<template>
	<section
		v-if="categories.length"
		class="px-3 lg:px-5 pt-8 lg:pt-12">
		<div class="mb-4 flex items-center justify-between gap-3 lg:mb-5">
			<NuxtLink
				:to="localePath('/categories')"
				class="text-sm font-semibold text-primary-600 transition hover:opacity-80 dark:text-primary-300">
				{{ $t("home.view_all") }}
			</NuxtLink>
			<h2 class="text-xl font-bold lg:text-2xl">
				{{ $t("home.sections.categories") }}
			</h2>
		</div>

		<div
			class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5">
			<NuxtLink
				v-for="category in categories"
				:key="category.id"
				:to="
					localePath(`/shop?category=${encodeURIComponent(category.name)}`)
				"
				class="group relative block overflow-hidden rounded-[28px]">
				<div class="relative pb-[80%]">
					<NuxtImg
						v-if="category.image"
						:alt="category.name"
						:src="category.image.sourceUrl"
						loading="lazy"
						:title="category.name"
						class="absolute inset-0 h-full w-full bg-neutral-200 object-cover transition-transform duration-500 group-hover:scale-105 dark:bg-neutral-800" />
					<div
						v-else
						class="absolute inset-0 bg-gradient-to-br from-primary-400 to-secondary-300"></div>
					<div
						class="absolute inset-0 flex items-end bg-gradient-to-t from-black/55 to-transparent p-4">
						<span
							class="w-full text-center text-base font-semibold text-white">
							{{ category.name }}
						</span>
					</div>
				</div>
			</NuxtLink>
		</div>
	</section>
</template>
