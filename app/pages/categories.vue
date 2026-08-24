<script setup>
    import CategoryPlaceholder from "~/components/CategoryPlaceholder.vue";

    const { name } = useAppConfig().site;
    const url = useRequestURL();
    const localePath = useLocalePath();

    const canonical = url.origin + url.pathname;

    const pageTitle = "دسته‌بندی محصولات";
    const pageDescription = `لیست کامل دسته‌بندی‌های محصولات در ${name}. بررسی و خرید انواع لوازم سیسمونی، کالسکه، پوشاک کودک و اسباب‌بازی.`;

    useHead({
        link: [{ rel: "canonical", href: canonical }],
    });

    useSeoMeta({
        title: pageTitle,
        ogTitle: pageTitle,
        description: pageDescription,
        ogDescription: pageDescription,
        ogUrl: canonical,
        keywords: `دسته‌بندی محصولات , دسته‌بندی سیسمونی , خرید لوازم نوزاد , کالسکه , اسباب بازی کودک, ${name}`,
        twitterTitle: pageTitle,
        twitterDescription: pageDescription,
        ogImage: "/favicon.icon",
    });

    const { data } = await useAsyncData("categories-page", () =>
        $fetch("/api/categories"),
    );

    const categories = computed(() =>
        (data.value?.productCategories?.nodes || []).filter(
            (category) => category.products?.nodes.length,
        ),
    );
</script>

<template>
    <div class="flex flex-wrap justify-center max-w-screen-2xl m-auto">
        <div
            v-if="!categories.length"
            v-for="i in 13"
            :key="i"
            class="w-full max-w-[444px] p-3 lg:p-2"
        >
            <div
                class="pb-[75%] relative overflow-hidden bg-neutral-200 dark:bg-neutral-800 skeleton rounded-[32px]"
            ></div>
        </div>
        <NuxtLink
            v-for="category in categories"
            :key="category.id"
            :to="
                localePath(
                    `/shop?category=${encodeURIComponent(category.slug)}`,
                )
            "
            class="group w-full max-w-[444px] p-2 lg:p-2 h-auto"
        >
            <div class="pb-[75%] relative overflow-hidden h-full">
                <NuxtImg
                    :alt="category.name"
                    v-if="category.image"
                    class="object-cover absolute top-0 left-0 w-full h-full bg-neutral-200 dark:bg-neutral-800 rounded-[32px]"
                    :src="category.image.sourceUrl"
                    loading="lazy"
                    :title="category.name"
                />
                <CategoryPlaceholder
                    v-else
                    class="transition-transform duration-700 ease-out"
                />
                <div
                    class="absolute left-0 right-0 top-0 bottom-0 bg-gradient-to-t hover:from-black/40 rounded-[32px] overflow-hidden"
                >
                    <div
                        class="w-full h-full bg-gradient-to-t from-black/40 py-6 px-5 flex items-end"
                    >
                        <div
                            class="w-full text-center font-semibold text-2xl text-white"
                        >
                            {{ category.name }}
                        </div>
                    </div>
                </div>
            </div>
        </NuxtLink>
    </div>
</template>
