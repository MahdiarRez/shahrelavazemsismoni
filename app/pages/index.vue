<script setup>
const route = useRoute();
const url = useRequestURL();

// منطق SEO و آدرس Canonical
const canonical = computed(() => {
	const base = `${url.origin}${url.pathname}`;
	const params = new URLSearchParams();
	if (route.query.q) params.set("q", route.query.q.toString());
	if (route.query.category)
		params.set("category", route.query.category.toString());
	const query = params.toString();
	return query ? `${base}?${query}` : base;
});

const productsData = ref([]);
const isLoading = ref(false);
const hasFetched = ref(false);
const tailEl = ref(null);
const pageInfo = ref({ hasNextPage: true, endCursor: null });

// آماده‌سازی پارامترها برای API داخلی Nuxt
const fetchVariables = computed(() => ({
	q: route.query.q || undefined,
	orderby: route.query.orderby || "DESC",
	fieldby: route.query.fieldby || "DATE",
	category: route.query.category || undefined,
	after: pageInfo.value.endCursor,
}));

async function fetchProducts() {
	if (isLoading.value || !pageInfo.value.hasNextPage) return;
	isLoading.value = true;

	try {
		const response = await $fetch("/api/products", {
			query: fetchVariables.value,
		});
		console.log(response);

		if (response?.products) {
			productsData.value.push(...(response.products.nodes || []));
			pageInfo.value = response.products.pageInfo;
		}
	} finally {
		isLoading.value = false;
		hasFetched.value = true;
	}
}

onMounted(fetchProducts);

// واچر هوشمند: فقط با تغییر فیلترهای اصلی دیتای فعلی پاک و دیتای جدید لود می‌شود
watch(
	() => [
		route.query.q,
		route.query.category,
		route.query.orderby,
		route.query.fieldby,
	],
	() => {
		productsData.value = [];
		pageInfo.value = { hasNextPage: true, endCursor: null };
		hasFetched.value = false;
		fetchProducts();
	},
);

// اسکرول نامحدود
useIntervalFn(() => {
	if (!tailEl.value || isLoading.value || !pageInfo.value.hasNextPage) return;
	const { top } = tailEl.value.getBoundingClientRect();
	if (top - window.innerHeight < 400) {
		fetchProducts();
	}
}, 500);

const products = computed(() => productsData.value);

const productsEmpty = computed(
	() => hasFetched.value && !isLoading.value && products.value.length === 0,
);
</script>

<template>
	<div class="flex items-center pl-3 lg:pl-5 gap-2">
		<ButtonSortBy />
		<ButtonSelectCategory />
	</div>

	<div
		v-if="!productsEmpty"
		class="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 lg:gap-5 p-3 lg:p-5">
		<ProductCard :products="products" />

		<ProductsSkeleton v-if="isLoading" />

		<br ref="tailEl" />
	</div>

	<ProductsEmpty v-else-if="hasFetched" />
</template>
