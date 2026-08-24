<script setup>
    const route = useRoute();
    const url = useRequestURL();
    const name = "شهر لوازم سیسمونی";
    const canonical = computed(() => {
        const base = `${url.origin}${url.pathname}`;
        const params = new URLSearchParams();
        if (route.query.q) params.set("q", route.query.q.toString());
        if (route.query.category)
            params.set("category", route.query.category.toString());
        const query = params.toString();
        return query ? `${base}?${query}` : base;
    });

    const pageTitle = computed(() => {
        if (route.query.q) return `نتایج جستجو برای "${route.query.q}"`;
        if (route.query.category)
            return `خرید محصولات دسته‌بندی ${route.query.category}`;
        return `فروشگاه و لیست محصولات سیسمونی`;
    });

    const pageDescription = computed(() => {
        if (route.query.q)
            return `مشاهده و خرید آنلاین نتایج جستجوی مربوط به ${route.query.q} در ${name}.`;
        return `لیست جدیدترین محصولات و لوازم سیسمونی نوزاد، کالسکه، پوشاک و اسباب‌بازی با بهترین قیمت در ${name}.`;
    });

    useHead({
        title: () => pageTitle.value,
        link: [{ rel: "canonical", href: () => canonical.value }],
    });

    useSeoMeta({
        title: () => pageTitle.value,
        ogTitle: () => pageTitle.value,
        description: () => pageDescription.value,
        ogDescription: () => pageDescription.value,
        ogUrl: () => canonical.value,
        ogImage: "/logo.png",
        twitterCard: "summary_large_image",
        twitterTitle: () => pageTitle.value,
        twitterDescription: () => pageDescription.value,
        twitterImage: "/logo.png",

        robots: () => (route.query.q ? "noindex, follow" : "index, follow"),
    });

    const productsData = ref([]);
    const isLoading = ref(false);
    const hasFetched = ref(false);
    const tailEl = ref(null);
    const pageInfo = ref({ hasNextPage: true, endCursor: null });

    const fetchVariables = computed(() => ({
        search: route.query.q || undefined,
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

    useIntersectionObserver(
        tailEl,
        ([entry]) => {
            if (entry?.isIntersecting) fetchProducts();
        },
        { rootMargin: "400px" },
    );

    const products = computed(() => productsData.value);

    const productsEmpty = computed(
        () =>
            hasFetched.value && !isLoading.value && products.value.length === 0,
    );
</script>

<template>
    <div class="flex flex-row-reverse items-center pl-3 lg:pl-5 gap-2">
        <ButtonSortBy />
        <ButtonSelectCategory />
    </div>

    <div
        v-if="!productsEmpty"
        class="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 lg:gap-5 p-3 lg:p-5"
        dir="ltr"
    >
        <ProductCard :products="products" />

        <ProductsSkeleton v-if="isLoading" />

        <br ref="tailEl" />
    </div>

    <ProductsEmpty v-else-if="hasFetched" />
</template>
