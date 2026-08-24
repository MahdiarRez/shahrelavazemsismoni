import { u as useRoute, a as useRequestURL, b as useAppConfig, c as useHead, d as useSeoMeta, e as useIntersectionObserver, f as useI18n, g as useRouter, o as onClickOutside, _ as __nuxt_component_7, h as categorySlugToLabel, i as __nuxt_component_3 } from './server.mjs';
import { computed, ref, watch, unref, reactive, mergeProps, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrRenderClass, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { _ as _sfc_main$5 } from './ProductCard-BzhMQ6nH.mjs';
import { _ as __nuxt_component_10 } from './ProductsSkeleton-Rmq6iRDq.mjs';
import '../_/nitro.mjs';
import 'graphql-request';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import '@intlify/utils';
import 'vue-router';
import 'node:fs';
import 'node:path';
import 'node:url';
import '@iconify/utils';
import 'node:crypto';
import 'consola';
import 'ipx';
import 'graphql';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

const _sfc_main$4 = {
  __name: "ButtonSortBy",
  __ssrInlineRender: true,
  setup(__props) {
    const { t: $t } = useI18n();
    useRouter();
    const route = useRoute();
    const selectedSort = ref(
      !route.query.orderby && !route.query.fieldby ? "Newest" : route.query.orderby === "DESC" && route.query.fieldby === "PRICE" ? "Price: High to Low" : "Price: Low to High"
    );
    const options = reactive([
      { value: "Newest", label: $t("filter.newest") },
      { value: "Price: High to Low", label: $t("filter.price_high_low") },
      { value: "Price: Low to High", label: $t("filter.price_low_high") }
    ]);
    const isDropdownVisible = ref(false);
    const dropdownRef = ref(null);
    onClickOutside(dropdownRef, (event) => isDropdownVisible.value = false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = __nuxt_component_7;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "relative cursor-pointer select-none items-center justify-center text-base font-semibold",
        ref_key: "dropdownRef",
        ref: dropdownRef
      }, _attrs))}><div class="${ssrRenderClass([{
        "bg-black text-white hover:bg-black dark:bg-white dark:text-black hover:dark:bg-white": unref(isDropdownVisible),
        "bg-[#efefef] hover:bg-[#e2e2e2] dark:bg-[#262626] hover:dark:bg-[#333]": !unref(isDropdownVisible)
      }, "box-border flex items-center rounded-full p-3.5 transition-all active:scale-95"])}">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-iconamoon-options-duotone",
        size: "22"
      }, null, _parent));
      _push(`</div>`);
      if (unref(isDropdownVisible)) {
        _push(`<div class="absolute top-full left-0 z-10 mt-3 lg:mt-[18px] rounded-2xl text-base font-semibold bg-white dark:bg-[#262626] border border-solid border-secondary dark:border-secondary-300 shadow-[0_0_8px_rgba(0,0,0,.3)]"><div class="m-2 w-48"><!--[-->`);
        ssrRenderList(unref(options), (option, i) => {
          _push(`<div class="rounded-[10px] px-3 py-2 transition-all duration-300 hover:bg-[#e9e9e9] hover:dark:bg-[#3c3c3c]"><div class="flex items-center justify-between flex-row-reverse"><div class="mr-1 w-full text-right">${ssrInterpolate(option.label)}</div>`);
          if (unref(selectedSort) === option.value) {
            _push(ssrRenderComponent(_component_UIcon, {
              name: "i-iconamoon-check-circle-1-fill",
              class: "bg-secondary-600 dark:bg-secondary-300",
              size: "24"
            }, null, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ButtonSortBy.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = {
  __name: "CarouselCategories",
  __ssrInlineRender: true,
  props: {
    categories: Array
  },
  setup(__props) {
    useRouter();
    const route = useRoute();
    ref(null);
    const showPrev = ref(false);
    ref(true);
    ref(false);
    const colors = [
      "bg-[#dad5ff]",
      "bg-[#ffe2eb]",
      "bg-[#ffe4c2]",
      "bg-[#fffd92]",
      "bg-[#cfffcb]",
      "bg-[#dbfff6]",
      "bg-[#d7edff]"
    ];
    const getCategoryClass = (index) => {
      return `${colors[index % colors.length]} hover:brightness-90`;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtImg = __nuxt_component_3;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "slider-container",
        dir: "ltr"
      }, _attrs))}>`);
      if (unref(showPrev)) {
        _push(`<div class="slider-btn prev-btn"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="slider-wrapper"><div class="cards-slider"><div class="${ssrRenderClass([
        "card ml-2 lg:ml-4 transition",
        !unref(route).query.category ? "selected" : "bg-[#efefef] hover:bg-[#e2e2e2] dark:bg-[#262626] hover:dark:bg-[#333] text-black dark:text-white"
      ])}"><div class="px-3.5" dir="rtl">${ssrInterpolate(_ctx.$t("filter.all_categories"))}</div></div><!--[-->`);
      ssrRenderList(__props.categories, (category, i) => {
        _push(`<div class="${ssrRenderClass([
          "card text-black transition cat-button-bezel",
          unref(route).query.category === category.slug ? "selected" : getCategoryClass(i)
        ])}">`);
        _push(ssrRenderComponent(_component_NuxtImg, {
          alt: category.name,
          loading: "lazy",
          src: category.image?.sourceUrl,
          class: "w-[38px] h-[38px] rounded-full object-cover border border-transparent dark:bg-black/15 bg-white/30"
        }, null, _parent));
        _push(`<div class="px-3.5" dir="rtl">${ssrInterpolate(category.name)}</div></div>`);
      });
      _push(`<!--]--></div></div></div>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CarouselCategories.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$3, { __name: "CarouselCategories" });
const _sfc_main$2 = {
  __name: "ButtonSelectCategory",
  __ssrInlineRender: true,
  setup(__props) {
    const categoriesData = ref([]);
    const categories = computed(() => categoriesData.value);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CarouselCategories = __nuxt_component_0;
      if (!unref(categories).length) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "slider-container ml-2 lg:ml-4 gap-2 lg:gap-4" }, _attrs))}><div class="h-[50px] min-w-36 bg-neutral-200 dark:bg-neutral-800 rounded-full skeleton"></div><div class="h-[50px] relative min-w-36 bg-neutral-200 dark:bg-neutral-800 rounded-full skeleton items-center flex"><div class="w-[38px] h-[38px] absolute rounded-full bg-neutral-300/50 dark:bg-neutral-900/40 left-2"></div></div><div class="h-[50px] relative min-w-32 bg-neutral-200 dark:bg-neutral-800 rounded-full skeleton items-center flex"><div class="w-[38px] h-[38px] absolute rounded-full bg-neutral-300/50 dark:bg-neutral-900/40 left-2"></div></div><div class="h-[50px] relative min-w-48 bg-neutral-200 dark:bg-neutral-800 rounded-full skeleton items-center flex"><div class="w-[38px] h-[38px] absolute rounded-full bg-neutral-300/50 dark:bg-neutral-900/40 left-2"></div></div><div class="h-[50px] relative min-w-32 bg-neutral-200 dark:bg-neutral-800 rounded-full skeleton items-center flex"><div class="w-[38px] h-[38px] absolute rounded-full bg-neutral-300/50 dark:bg-neutral-900/40 left-2"></div></div><div class="h-[50px] relative min-w-60 bg-neutral-200 dark:bg-neutral-800 rounded-full skeleton items-center flex"><div class="w-[38px] h-[38px] absolute rounded-full bg-neutral-300/50 dark:bg-neutral-900/40 left-2"></div></div><div class="h-[50px] relative min-w-32 bg-neutral-200 dark:bg-neutral-800 rounded-full skeleton items-center flex"><div class="w-[38px] h-[38px] absolute rounded-full bg-neutral-300/50 dark:bg-neutral-900/40 left-2"></div></div><div class="h-[50px] relative min-w-36 bg-neutral-200 dark:bg-neutral-800 rounded-full skeleton items-center flex"><div class="w-[38px] h-[38px] absolute rounded-full bg-neutral-300/50 dark:bg-neutral-900/40 left-2"></div></div><div class="h-[50px] relative min-w-32 bg-neutral-200 dark:bg-neutral-800 rounded-full skeleton items-center flex"><div class="w-[38px] h-[38px] absolute rounded-full bg-neutral-300/50 dark:bg-neutral-900/40 left-2"></div></div><div class="h-[50px] relative min-w-32 bg-neutral-200 dark:bg-neutral-800 rounded-full skeleton items-center flex"><div class="w-[38px] h-[38px] absolute rounded-full bg-neutral-300/50 dark:bg-neutral-900/40 left-2"></div></div><div class="h-[50px] relative min-w-28 bg-neutral-200 dark:bg-neutral-800 rounded-full skeleton items-center flex"><div class="w-[38px] h-[38px] absolute rounded-full bg-neutral-300/50 dark:bg-neutral-900/40 left-2"></div></div><div class="h-[50px] relative min-w-32 bg-neutral-200 dark:bg-neutral-800 rounded-full skeleton items-center flex"><div class="w-[38px] h-[38px] absolute rounded-full bg-neutral-300/50 dark:bg-neutral-900/40 left-2"></div></div><div class="h-[50px] relative min-w-40 bg-neutral-200 dark:bg-neutral-800 rounded-full skeleton items-center flex"><div class="w-[38px] h-[38px] absolute rounded-full bg-neutral-300/50 dark:bg-neutral-900/40 left-2"></div></div><div class="h-[50px] relative min-w-32 bg-neutral-200 dark:bg-neutral-800 rounded-full skeleton items-center flex"><div class="w-[38px] h-[38px] absolute rounded-full bg-neutral-300/50 dark:bg-neutral-900/40 left-2"></div></div><div class="h-[50px] relative min-w-44 bg-neutral-200 dark:bg-neutral-800 rounded-full skeleton items-center flex"><div class="w-[38px] h-[38px] absolute rounded-full bg-neutral-300/50 dark:bg-neutral-900/40 left-2"></div></div></div>`);
      } else {
        _push(ssrRenderComponent(_component_CarouselCategories, mergeProps({ categories: unref(categories) }, _attrs), null, _parent));
      }
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ButtonSelectCategory.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "ProductsEmpty",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    useRouter();
    const categoryLabel = computed(
      () => categorySlugToLabel((route.query.category || "").toString())
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = __nuxt_component_7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full p-5 text-center min-h-[calc(100vh-204px)] items-center flex flex-col justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-100 via-white to-white dark:from-neutral-900 dark:via-black dark:to-black rounded-xl" }, _attrs))}><div class="w-28 h-28 bg-neutral-950/70 rounded-full border-neutral-800 border items-center justify-center flex shadow-lg">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-iconamoon-search-bold",
        class: "w-16 h-16 text-white dark:text-primary-400"
      }, null, _parent));
      _push(`</div>`);
      if (unref(route).query.category && unref(route).query.q) {
        _push(`<div class="font-bold text-3xl my-6 text-center">${ssrInterpolate(_ctx.$t("search.no_products_matching"))} <strong class="text-alizarin-crimson-700">&quot;${ssrInterpolate(unref(route).query.q)}&quot;</strong> - <strong class="text-alizarin-crimson-700">${ssrInterpolate(unref(categoryLabel))}</strong></div>`);
      } else if (unref(route).query.q) {
        _push(`<div class="font-bold text-3xl my-6">${ssrInterpolate(_ctx.$t("search.no_products_found_matching"))} <strong class="text-alizarin-crimson-700">&quot;${ssrInterpolate(unref(route).query.q)}&quot;</strong></div>`);
      } else {
        _push(`<div class="font-bold text-3xl my-6">${ssrInterpolate(_ctx.$t("search.no_products_found"))}</div>`);
      }
      _push(`<div class="text-center text-sm mb-5 max-w-md">${ssrInterpolate(_ctx.$t("search.use_search_bar_above"))}</div><button class="px-4 py-2 bg-black/40 hover:bg-black/60 dark:bg-primary-500 hover:dark:bg-primary-700 text-white rounded-full active:scale-95 transition">${ssrInterpolate(_ctx.$t("search.reset_search"))}</button></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ProductsEmpty.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "shop",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const url = useRequestURL();
    const { name } = useAppConfig().site;
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
      link: [{ rel: "canonical", href: () => canonical.value }]
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
      robots: () => route.query.q ? "noindex, follow" : "index, follow"
    });
    const productsData = ref([]);
    const isLoading = ref(false);
    const hasFetched = ref(false);
    const tailEl = ref(null);
    const pageInfo = ref({ hasNextPage: true, endCursor: null });
    const fetchVariables = computed(() => ({
      search: route.query.q || void 0,
      orderby: route.query.orderby || "DESC",
      fieldby: route.query.fieldby || "DATE",
      category: route.query.category || void 0,
      after: pageInfo.value.endCursor
    }));
    async function fetchProducts() {
      if (isLoading.value || !pageInfo.value.hasNextPage) return;
      isLoading.value = true;
      try {
        const response = await $fetch("/api/products", {
          query: fetchVariables.value
        });
        if (response?.products) {
          productsData.value.push(...response.products.nodes || []);
          pageInfo.value = response.products.pageInfo;
        }
      } finally {
        isLoading.value = false;
        hasFetched.value = true;
      }
    }
    watch(
      () => [
        route.query.q,
        route.query.category,
        route.query.orderby,
        route.query.fieldby
      ],
      () => {
        productsData.value = [];
        pageInfo.value = { hasNextPage: true, endCursor: null };
        hasFetched.value = false;
        fetchProducts();
      }
    );
    useIntersectionObserver(
      tailEl,
      ([entry]) => {
        if (entry?.isIntersecting) fetchProducts();
      },
      { rootMargin: "400px" }
    );
    const products = computed(() => productsData.value);
    const productsEmpty = computed(
      () => hasFetched.value && !isLoading.value && products.value.length === 0
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ButtonSortBy = _sfc_main$4;
      const _component_ButtonSelectCategory = _sfc_main$2;
      const _component_ProductCard = _sfc_main$5;
      const _component_ProductsSkeleton = __nuxt_component_10;
      const _component_ProductsEmpty = _sfc_main$1;
      _push(`<!--[--><div class="flex flex-row-reverse items-center pl-3 lg:pl-5 gap-2">`);
      _push(ssrRenderComponent(_component_ButtonSortBy, null, null, _parent));
      _push(ssrRenderComponent(_component_ButtonSelectCategory, null, null, _parent));
      _push(`</div>`);
      if (!unref(productsEmpty)) {
        _push(`<div class="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 lg:gap-5 p-3 lg:p-5" dir="ltr">`);
        _push(ssrRenderComponent(_component_ProductCard, { products: unref(products) }, null, _parent));
        if (unref(isLoading)) {
          _push(ssrRenderComponent(_component_ProductsSkeleton, null, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<br></div>`);
      } else if (unref(hasFetched)) {
        _push(ssrRenderComponent(_component_ProductsEmpty, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/shop.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=shop-CCx5gVQu.mjs.map
