<script setup>
    const { site } = useAppConfig();
    const { name, description } = site;
    const { locale, locales } = useI18n();

    const currentLocale = computed(() =>
        locales.value.find((l) => l.code === locale.value),
    );

    const htmlLang = computed(() => currentLocale.value?.iso || locale.value);
    const htmlDir = computed(() => currentLocale.value?.dir || "ltr");

    useHead({
        htmlAttrs: { lang: htmlLang, dir: htmlDir },
        titleTemplate: (chunk) => (chunk ? `${chunk} - ${name}` : name),
        meta: [{ name: "enamad", content: "۹۹۳۲۷۷۵" }],
    });

    useSeoMeta({
        description,
        ogType: "website",
        ogSiteName: name,
        ogLocale: () => currentLocale.value?.iso?.replace("-", "_") || "fa_IR",
        ogImage: "/favicon.ico",
        twitterCard: "summary_large_image",
        keywords: `${name}, سیسمونی , لوازم نوزاد , خرید سیسمونی , کالسکه , اسباب بازی کودک , لباس نوزاد , فروشگاه لوازم کودک`,
        viewport:
            "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, viewport-fit=cover",
    });
</script>

<template>
    <NuxtLoadingIndicator color="#3b82f6" />
    <AppHeader />
    <main class="pt-[72px] lg:pt-20 min-h-[calc(100vh-72px)]">
        <NuxtPage />
    </main>
    <AppFooter />
    <Notivue v-slot="item">
        <Notification :item="item" :theme="materialTheme" />
    </Notivue>
</template>

<style lang="postcss">
    .dark {
        @apply bg-black text-neutral-100;
        color-scheme: dark;
    }
    .dropdown-enter-active {
        @apply transition duration-200 ease-out;
    }
    .dropdown-enter-from,
    .dropdown-leave-to {
        @apply translate-y-5 opacity-0;
    }
    .dropdown-enter-to,
    .dropdown-leave-from {
        @apply transform opacity-100;
    }
    .dropdown-leave-active {
        @apply transition duration-150 ease-in;
    }
</style>
