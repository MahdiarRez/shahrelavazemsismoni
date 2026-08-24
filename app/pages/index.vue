<script setup>
    const { name, description } = useAppConfig().site;
    const url = useRequestURL();
    const { t } = useI18n();

    const canonical = url.origin + url.pathname;

    useHead({
        title: () => t("home.seo.title", { name }),
        titleTemplate: null,
        link: [{ rel: "canonical", href: canonical }],
    });

    useSeoMeta({
        description: () => t("home.seo.description") || description,
        ogTitle: () => t("home.seo.title", { name }),
        ogDescription: () => t("home.seo.description") || description,
        ogUrl: canonical,
        ogType: "website",
        ogImage: "/people.png",
        twitterCard: "summary_large_image",
        twitterTitle: () => t("home.seo.title", { name }),
        twitterDescription: () => t("home.seo.description") || description,
        twitterImage: "/people.png",
    });
</script>

<template>
    <div class="mx-auto max-w-screen-2xl pb-4 px-0 sm:px-3">
        <HomeHero />
        <HomeBenefits />
        <HomeCategoryShowcase />
        <HomeProductRow
            title-key="home.sections.featured"
            fetch-key="home-featured"
            :params="{ featured: 'true' }"
            :view-all-query="{}"
        />
        <HomeProductRow
            title-key="home.sections.new_arrivals"
            fetch-key="home-new"
            :params="{ fieldby: 'DATE', orderby: 'DESC' }"
            :view-all-query="{}"
        />
        <HomeProductRow
            title-key="home.sections.on_sale"
            fetch-key="home-onsale"
            :params="{ onSale: 'true' }"
            :view-all-query="{ onSale: 'true' }"
        />
        <HomePromoBanner />
        <HomeLocationShop />
    </div>
</template>
