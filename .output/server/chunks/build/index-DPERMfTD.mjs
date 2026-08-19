import { g as useAppConfig, a as useRequestURL, c as useI18n, h as useHead, i as useSeoMeta, j as _export_sfc, _ as __nuxt_component_7, k as useLocalePath, l as useAsyncData, m as __nuxt_component_0$4, f as __nuxt_component_3, n as useClipboard, p as push$1 } from './server.mjs';
import { mergeProps, withAsyncContext, computed, unref, withCtx, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, ref, resolveComponent, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderStyle, ssrRenderAttr } from 'vue/server-renderer';
import { C as CategoryPlaceholder } from './CategoryPlaceholder-CjJj2T-O.mjs';
import { _ as _sfc_main$7 } from './ProductCard-C7DnQOfU.mjs';
import { _ as __nuxt_component_0$1 } from './Button-DCiEbQsO.mjs';
import { z as publicAssetsURL } from '../_/nitro.mjs';
import 'graphql';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
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

const _sfc_main$6 = {
  __name: "HomeHero",
  __ssrInlineRender: true,
  setup(__props) {
    const localePath = useLocalePath();
    const stats = [
      { key: "customers", icon: "i-iconamoon-shopping-bag-fill" },
      { key: "authentic", icon: "i-iconamoon-shield-yes" },
      { key: "delivery", icon: "i-iconamoon-delivery-fast" }
    ];
    const bubbles = [
      {
        top: "12%",
        left: "8%",
        size: 70,
        delay: "0s",
        dur: "7s",
        hideOnMobile: true
      },
      {
        top: "62%",
        left: "14%",
        size: 46,
        delay: "1.4s",
        dur: "9s",
        hideOnMobile: false
      },
      {
        top: "22%",
        left: "82%",
        size: 90,
        delay: "0.6s",
        dur: "8s",
        hideOnMobile: true
      },
      {
        top: "70%",
        left: "76%",
        size: 56,
        delay: "2.1s",
        dur: "10s",
        hideOnMobile: true
      },
      {
        top: "40%",
        left: "46%",
        size: 38,
        delay: "1s",
        dur: "6.5s",
        hideOnMobile: false
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = __nuxt_component_7;
      const _component_NuxtLink = __nuxt_component_0$4;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "px-3 lg:px-5 pt-3 lg:pt-5 mb-5 relative" }, _attrs))} data-v-e024603f><div class="hero-card relative overflow-hidden rounded-[36px] bg-secondary-500 text-white shadow-[0_20px_60px_-20px_rgba(0,159,214,0.6)]" data-v-e024603f><div class="pointer-events-none absolute inset-0" aria-hidden="true" data-v-e024603f><span class="hero-color-layer hero-color-layer--1" data-v-e024603f></span><span class="hero-color-layer hero-color-layer--2" data-v-e024603f></span><span class="hero-color-layer hero-color-layer--3" data-v-e024603f></span><span class="hero-color-layer hero-color-layer--4" data-v-e024603f></span></div><div class="hero-mesh pointer-events-none absolute inset-0" data-v-e024603f></div><div class="pointer-events-none absolute inset-0 overflow-hidden" data-v-e024603f><!--[-->`);
      ssrRenderList(bubbles, (b, i) => {
        _push(`<span class="${ssrRenderClass([b.hideOnMobile ? "hidden sm:block" : "", "hero-bubble absolute rounded-full"])}" style="${ssrRenderStyle({
          top: b.top,
          left: b.left,
          width: `${b.size}px`,
          height: `${b.size}px`,
          animationDelay: b.delay,
          animationDuration: b.dur
        })}" data-v-e024603f></span>`);
      });
      _push(`<!--]--></div>`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-iconamoon-star-fill",
        class: "hero-twinkle hidden sm:block absolute left-[18%] top-[24%] text-white/70",
        size: "20"
      }, null, _parent));
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-iconamoon-star-fill",
        class: "hero-twinkle absolute right-[22%] top-[64%] text-secondary-200",
        size: "22",
        style: { "animation-delay": "1.2s" }
      }, null, _parent));
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-iconamoon-star-fill",
        class: "hero-twinkle hidden sm:block absolute right-[40%] top-[16%] text-white/60",
        size: "14",
        style: { "animation-delay": "0.7s" }
      }, null, _parent));
      _push(`<div class="relative flex flex-col items-center gap-5 sm:gap-6 px-4 sm:px-6 py-12 text-center sm:py-20 lg:py-28 overflow-hidden" data-v-e024603f><h1 class="max-w-xs leading-[1.4] font-bold drop-shadow-sm text-3xl sm:text-5xl sm:max-w-[640px] sm:leading-[1.5] lg:text-6xl lg:leading-[1.5] lg:max-w-[860px]" data-v-e024603f>${ssrInterpolate(_ctx.$t("home.hero.title"))}</h1><p class="max-w-[18rem] text-sm font-medium text-white/90 sm:max-w-none sm:text-lg text-center lg:text-xl" data-v-e024603f>${ssrInterpolate(_ctx.$t("home.hero.subtitle"))}</p><div class="mt-2 flex w-full max-w-[22rem] flex-row gap-3 sm:w-auto sm:max-w-none sm:flex-row-reverse sm:items-center" data-v-e024603f>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: unref(localePath)("/shop"),
        class: "group flex h-11 sm:h-14 w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-primary-400 px-4 sm:px-8 text-xs text-nowrap sm:text-lg font-bold text-white shadow-lg transition hover:brightness-95 active:scale-95"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("home.hero.cta_primary"))} `);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-iconamoon-arrow-left-2-bold",
              class: "transition-transform group-hover:-translate-x-1",
              size: "22"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("home.hero.cta_primary")) + " ", 1),
              createVNode(_component_UIcon, {
                name: "i-iconamoon-arrow-left-2-bold",
                class: "transition-transform group-hover:-translate-x-1",
                size: "22"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: unref(localePath)("/categories"),
        class: "flex h-11 sm:h-14 w-full sm:w-auto items-center justify-center rounded-full bg-white/25 px-4 sm:px-8 text-xs text-nowrap sm:text-lg font-semibold text-white ring-1 ring-inset ring-white/50 backdrop-blur-md transition hover:bg-white/35 active:scale-95"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("home.hero.cta_secondary"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("home.hero.cta_secondary")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="mt-4 sm:mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3" data-v-e024603f><!--[-->`);
      ssrRenderList(stats, (stat) => {
        _push(`<div class="flex flex-row items-center gap-2 rounded-full bg-white/10 px-3.5 py-2 text-xs sm:text-sm font-semibold backdrop-blur-md ring-1 ring-inset ring-white/20" data-v-e024603f>`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: stat.icon,
          size: "16",
          class: "text-secondary-200"
        }, null, _parent));
        _push(`<span data-v-e024603f>${ssrInterpolate(_ctx.$t(`home.hero.stats.${stat.key}`))}</span></div>`);
      });
      _push(`<!--]--></div></div></div>`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-iconamoon-arrow-down-1",
        size: "50px",
        class: "scroll-hint absolute -bottom-5 left-0 rounded-full text-gray-500/70 hidden sm:block"
      }, null, _parent));
      _push(`</section>`);
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/HomeHero.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-e024603f"]]);
const _sfc_main$5 = {
  __name: "HomeBenefits",
  __ssrInlineRender: true,
  setup(__props) {
    const benefits = [
      { icon: "i-iconamoon-delivery-fast", key: "shipping" },
      { icon: "i-iconamoon-shield-yes", key: "secure" },
      { icon: "i-iconamoon-restart", key: "returns" },
      { icon: "i-iconamoon-comment-dots", key: "support" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = __nuxt_component_7;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "px-3 lg:px-5 pt-3 lg:pt-5 my-10" }, _attrs))}><div class="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5"><!--[-->`);
      ssrRenderList(benefits, (benefit) => {
        _push(`<div class="flex flex-row items-center gap-3 rounded-[24px] bg-black/5 p-4 dark:bg-white/10"><div class="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-primary-400/15 text-primary dark:text-primary-300">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: benefit.icon,
          size: "26"
        }, null, _parent));
        _push(`</div><div class="text-right space-y-1"><div class="text-sm font-semibold">${ssrInterpolate(_ctx.$t(`home.benefits.${benefit.key}.title`))}</div><div class="text-xs font-medium text-neutral-500 dark:text-neutral-400">${ssrInterpolate(_ctx.$t(`home.benefits.${benefit.key}.description`))}</div></div></div>`);
      });
      _push(`<!--]--></div></section>`);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/HomeBenefits.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = {
  __name: "HomeCategoryShowcase",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const localePath = useLocalePath();
    const { data } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      "home-categories",
      () => $fetch("/api/categories")
    )), __temp = await __temp, __restore(), __temp);
    const categories = computed(
      () => (data.value?.productCategories?.nodes || []).filter((category) => category.products?.nodes.length).slice(0, 8)
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$4;
      const _component_NuxtImg = __nuxt_component_3;
      if (unref(categories).length) {
        _push(`<section${ssrRenderAttrs(mergeProps({ class: "px-3 lg:px-5 pt-8 lg:pt-12" }, _attrs))}><div class="mb-4 flex flex-row-reverse items-center justify-between gap-3 lg:mb-5">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: unref(localePath)("/categories"),
          class: "text-sm font-semibold text-primary-600 transition hover:opacity-80 dark:text-primary-300"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.$t("home.view_all"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(_ctx.$t("home.view_all")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<h2 class="text-xl font-bold lg:text-2xl">${ssrInterpolate(_ctx.$t("home.sections.categories"))}</h2></div><div class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5"><!--[-->`);
        ssrRenderList(unref(categories).slice(0, 4), (category) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: category.id,
            to: unref(localePath)(
              `/shop?category=${encodeURIComponent(category.slug)}`
            ),
            class: "group relative block overflow-hidden rounded-[28px]"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="relative pb-[80%]"${_scopeId}>`);
                if (category.image) {
                  _push2(ssrRenderComponent(_component_NuxtImg, {
                    alt: category.name,
                    src: category.image.sourceUrl,
                    loading: "lazy",
                    title: category.name,
                    class: "absolute inset-0 h-full w-full bg-neutral-200 object-cover transition-transform duration-500 group-hover:scale-105 dark:bg-neutral-800"
                  }, null, _parent2, _scopeId));
                } else {
                  _push2(ssrRenderComponent(CategoryPlaceholder, null, null, _parent2, _scopeId));
                }
                _push2(`<div class="absolute inset-0 flex items-end bg-gradient-to-t from-black/55 to-transparent p-4"${_scopeId}><span class="w-full text-center text-base font-semibold text-white"${_scopeId}>${ssrInterpolate(category.name)}</span></div></div>`);
              } else {
                return [
                  createVNode("div", { class: "relative pb-[80%]" }, [
                    category.image ? (openBlock(), createBlock(_component_NuxtImg, {
                      key: 0,
                      alt: category.name,
                      src: category.image.sourceUrl,
                      loading: "lazy",
                      title: category.name,
                      class: "absolute inset-0 h-full w-full bg-neutral-200 object-cover transition-transform duration-500 group-hover:scale-105 dark:bg-neutral-800"
                    }, null, 8, ["alt", "src", "title"])) : (openBlock(), createBlock(CategoryPlaceholder, { key: 1 })),
                    createVNode("div", { class: "absolute inset-0 flex items-end bg-gradient-to-t from-black/55 to-transparent p-4" }, [
                      createVNode("span", { class: "w-full text-center text-base font-semibold text-white" }, toDisplayString(category.name), 1)
                    ])
                  ])
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div></section>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/HomeCategoryShowcase.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = {
  __name: "HomeProductRow",
  __ssrInlineRender: true,
  props: {
    titleKey: { type: String, required: true },
    fetchKey: { type: String, required: true },
    params: { type: Object, default: () => ({}) },
    viewAllQuery: { type: Object, default: () => ({}) }
  },
  async setup(__props) {
    let __temp, __restore;
    const props = __props;
    const localePath = useLocalePath();
    const { data, pending } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      props.fetchKey,
      () => $fetch("/api/products", {
        query: { first: 6, ...props.params }
      }),
      "$Jkx2WvMNgf"
    )), __temp = await __temp, __restore(), __temp);
    const products = computed(() => data.value?.products?.nodes || []);
    const viewAllPath = computed(() => {
      const search = new URLSearchParams(props.viewAllQuery).toString();
      return localePath(`/shop${search ? `?${search}` : ""}`);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$4;
      const _component_ProductCard = _sfc_main$7;
      if (unref(pending) || unref(products).length) {
        _push(`<section${ssrRenderAttrs(mergeProps({
          dir: "rtl",
          class: "px-3 lg:px-5 pt-8 lg:pt-12"
        }, _attrs))}><div class="mb-4 flex flex-row-reverse items-center justify-between gap-3 lg:mb-5">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: unref(viewAllPath),
          class: "text-sm font-semibold text-primary-600 transition hover:opacity-80 dark:text-primary-300"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.$t("home.view_all"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(_ctx.$t("home.view_all")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<h2 class="text-xl font-bold lg:text-2xl">${ssrInterpolate(_ctx.$t(__props.titleKey))}</h2></div><div class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 lg:gap-5">`);
        if (unref(pending) && !unref(products).length) {
          _push(`<!--[-->`);
          ssrRenderList(6, (i) => {
            _push(`<div><div class="skeleton w-full overflow-hidden rounded-[24px] bg-neutral-200 pb-[133%] dark:bg-neutral-800"></div><div class="grid gap-1.5 px-1.5 pb-4 pt-3"><div class="skeleton h-4 w-20 rounded bg-neutral-200/80 dark:bg-neutral-800/80"></div><div class="skeleton h-4 w-28 rounded bg-neutral-200/50 dark:bg-neutral-800/50"></div></div></div>`);
          });
          _push(`<!--]-->`);
        } else {
          _push(ssrRenderComponent(_component_ProductCard, { products: unref(products) }, null, _parent));
        }
        _push(`</div></section>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/HomeProductRow.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {
  __name: "HomePromoBanner",
  __ssrInlineRender: true,
  setup(__props) {
    const localePath = useLocalePath();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$4;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "px-3 lg:px-5 pt-8 lg:pt-12" }, _attrs))}><div class="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-secondary-500 via-secondary-400 to-secondary-200 dark:from-secondary-700 dark:via-secondary-600 dark:to-secondary-500"><div class="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/25 blur-3xl"></div><div class="relative flex flex-col items-center gap-5 px-6 py-12 text-center sm:flex-row-reverse sm:justify-between sm:text-right lg:px-12 lg:py-14"><div class="space-y-2"><h2 class="text-2xl font-bold text-white lg:text-3xl">${ssrInterpolate(_ctx.$t("home.promo.title"))}</h2><p class="max-w-xl text-sm font-medium text-white/90 lg:text-base">${ssrInterpolate(_ctx.$t("home.promo.subtitle"))}</p></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: unref(localePath)("/shop?onSale=true"),
        class: "flex h-14 flex-none items-center justify-center rounded-full bg-white px-8 text-lg font-semibold text-secondary-600 shadow-lg transition hover:brightness-95 active:scale-95"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("home.promo.cta"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("home.promo.cta")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></section>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/HomePromoBanner.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _imports_0 = publicAssetsURL("/people.png");
const STORE_ADDRESS = "خراسان رضوی، مشهد، انتهای طبرسی شمالی، میدان پنجتن سمت چپ، جنب تالار یکتا، شهر لوازم سیسمونی";
const MAP_EMBED_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1607.1494992434482!2d59.70138385699898!3d36.32930268304915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f6c9a4d35f5c5e9%3A0xacab83c9f806b632!2z2LTZh9ixINmE2YjYp9iy2YUg2LPbjNiz2YXZiNmG24w!5e0!3m2!1sen!2s!4v1784005210855!5m2!1sen!2s";
const _sfc_main$1 = {
  __name: "HomeLocationShop",
  __ssrInlineRender: true,
  setup(__props) {
    const STORE_LOCATION = {
      lat: 36.32865439665321,
      lng: 59.70242764221999
    };
    const NESHAN_ROUTE_URL = `https://neshan.org/maps/routing/car/destination/${STORE_LOCATION.lat},${STORE_LOCATION.lng}#c35.538-58.993-9z-0p`;
    const WORKING_HOURS = [
      {
        days: "شنبه تا پنجشنبه",
        hours: "۹:۰۰ - ۲۰:۰۰",
        colorClass: "text-pink-600"
      },
      { days: "جمعه", hours: "تعطیل", colorClass: "text-green-600" }
    ];
    const TRANSPORT_OPTIONS = [
      {
        icon: "i-iconamoon-number-1-circle",
        label: "خودرو شخصی - پارکینگ رایگان",
        bgClass: "bg-primary-50",
        colorClass: "text-primary"
      },
      {
        icon: "i-iconamoon-number-2-circle",
        label: "اتوبوس - خط ۸۰۰ و ...",
        bgClass: "bg-green-50",
        colorClass: "text-green-600"
      },
      {
        icon: "i-iconamoon-number-3-circle",
        label: "مترو - ایستگاه طبرسی",
        bgClass: "bg-purple-50",
        colorClass: "text-purple-600"
      },
      {
        icon: "i-iconamoon-number-4-circle",
        label: "تاکسی آنلاین - اسنپ و تپ‌سی",
        bgClass: "bg-orange-50",
        colorClass: "text-orange-600"
      }
    ];
    const TABS = [
      { id: "map", label: "نقشه", icon: "i-iconamoon-location-pin" },
      { id: "street", label: "نمای خیابان", icon: "i-iconamoon-eye" }
    ];
    const activeTab = ref("map");
    const { copy, copied, isSupported } = useClipboard({
      source: STORE_ADDRESS,
      copiedDuring: 1500
    });
    async function copyAddress() {
      if (!isSupported.value) {
        push$1.error("مرورگر شما از کپی خودکار پشتیبانی نمی‌کند");
        return;
      }
      await copy();
      push$1.success("آدرس فروشگاه کپی شد");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = __nuxt_component_7;
      const _component_UButton = __nuxt_component_0$1;
      const _component_AppIcon = resolveComponent("AppIcon");
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "shop",
        class: "relative py-32 mt-14 bg-white text-dark px-6 rounded-[28px] overflow-hidden"
      }, _attrs))}><img${ssrRenderAttr("src", _imports_0)} alt="people" class="absolute inset-0 h-full w-full object-cover opacity-40 blur-[1px]" loading="lazy"><div class="max-w-6xl mx-auto relative"><div class="text-center space-y-4 mb-16"><h2 class="font-lalezar text-4xl font-bold"> منتظر حضور گرمتون در شهر لوازم سیسمونی هستیم </h2><p class="text-dark/80 max-w-2xl mx-auto font-normal"> فروشگاه ما در مشهد مقدس، آماده ارائه بهترین خدمات به شما و فرشته کوچکتان است. </p></div><div class="grid lg:grid-cols-2 gap-12"><div class="flex flex-col items-stretch justify-between gap-y-4"><div class="p-6 bg-white rounded-2xl"><div class="flex items-start gap-4 flex-col sm:flex-row"><div class="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center text-white">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-iconamoon-location-pin",
        class: "text-xl"
      }, null, _parent));
      _push(`</div><div class="flex-1"><h3 class="font-bold mb-2 text-dark/80"> آدرس فروشگاه </h3><p class="text-dark/80 mb-4">${ssrInterpolate(STORE_ADDRESS)}</p><div class="flex gap-2">`);
      _push(ssrRenderComponent(_component_UButton, {
        class: "text-xs sm:text-sm py-2 text-nowrap rounded-lg",
        onClick: copyAddress
      }, {
        leading: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              class: "text-base",
              name: unref(copied) ? "i-iconamoon-check" : "i-iconamoon-copy"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UIcon, {
                class: "text-base",
                name: unref(copied) ? "i-iconamoon-check" : "i-iconamoon-copy"
              }, null, 8, ["name"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` ${ssrInterpolate(unref(copied) ? "کپی شد" : "کپی")}`);
          } else {
            return [
              createTextVNode(" " + toDisplayString(unref(copied) ? "کپی شد" : "کپی"), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<a${ssrRenderAttr("href", NESHAN_ROUTE_URL)} target="_blank" rel="noopener noreferrer">`);
      _push(ssrRenderComponent(_component_UButton, {
        size: "sm",
        color: "white",
        variant: "solid",
        class: "text-xs sm:text-sm py-2 text-nowrap rounded-lg"
      }, {
        leading: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-iconamoon-arrow-top-right-1",
              class: "text-base"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-iconamoon-arrow-top-right-1",
                class: "text-base"
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` مسیریابی در نشان `);
          } else {
            return [
              createTextVNode(" مسیریابی در نشان ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</a></div></div></div></div><div class="px-6 py-3 bg-white rounded-2xl flex items-center justify-between gap-4"><div class="flex flex-col sm:flex-row sm:items-center gap-4 text-sm sm:text-base"><div class="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center text-white">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-iconamoon-phone",
        class: "text-xl"
      }, null, _parent));
      _push(`</div><h4 class="font-semibold">تلفن تماس</h4></div><div class="flex flex-row-reverse gap-2.5 items-center self-end sm:self-auto"><a href="tel:09395542666" class="font-poppins font-medium tracking-wide text-base sm:text-lg hover:text-blue-500 hover:underline"> 09395542666 </a></div></div><div class="p-6 bg-white rounded-2xl flex flex-col sm:flex-row items-start gap-4"><div class="w-10 h-10 bg-orange-400 rounded-lg flex items-center justify-center text-white">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-iconamoon-clock",
        class: "text-xl"
      }, null, _parent));
      _push(`</div><div class="flex-1 w-full"><h4 class="font-semibold mb-4">ساعات کاری</h4><div class="space-y-2 w-full text-sm sm:text-base"><!--[-->`);
      ssrRenderList(WORKING_HOURS, (schedule) => {
        _push(`<div class="flex justify-between"><span>${ssrInterpolate(schedule.days)}</span><span class="${ssrRenderClass([schedule.colorClass, "font-medium"])}">${ssrInterpolate(schedule.hours)}</span></div>`);
      });
      _push(`<!--]--></div></div></div><div class="p-6 bg-white rounded-2xl"><div class="flex flex-row items-center gap-4 mb-4"><div class="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center text-white">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-iconamoon-store",
        class: "text-xl"
      }, null, _parent));
      _push(`</div><h4 class="font-semibold flex items-center gap-2"> راه‌های دسترسی </h4></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm"><!--[-->`);
      ssrRenderList(TRANSPORT_OPTIONS, (option) => {
        _push(`<div class="${ssrRenderClass([option.bgClass, "flex items-center gap-3 p-3 rounded-lg"])}">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: option.icon,
          class: [option.colorClass, "text-xl"]
        }, null, _parent));
        _push(`<span>${ssrInterpolate(option.label)}</span></div>`);
      });
      _push(`<!--]--></div></div></div><div class="flex flex-col items-stretch justify-between gap-y-4 w-full"><div class="flex gap-2 bg-white rounded-xl p-1.5"><!--[-->`);
      ssrRenderList(TABS, (tab) => {
        _push(`<button type="button" class="${ssrRenderClass([
          unref(activeTab) === tab.id ? "bg-primary-400 text-white" : "bg-transparent hover:bg-primary-400/30 transition-colors duration-300 ease-in-out text-dark/80",
          "flex-1 rounded-lg py-3 cursor-pointer flex items-center justify-center flex-row"
        ])}">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: tab.icon,
          class: "ml-1.5 text-lg"
        }, null, _parent));
        _push(` ${ssrInterpolate(tab.label)}</button>`);
      });
      _push(`<!--]--></div><div class="relative h-full bg-gradient-to-br from-pink-50 to-blue-50 rounded-2xl overflow-hidden">`);
      if (unref(activeTab) === "map") {
        _push(`<iframe${ssrRenderAttr("src", MAP_EMBED_URL)} width="100%" height="100%" style="${ssrRenderStyle({ "border": "0" })}" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`);
      } else {
        _push(`<div class="flex items-center justify-center h-full"><div class="text-center space-y-2">`);
        _push(ssrRenderComponent(_component_AppIcon, {
          name: "compass",
          class: "mx-auto text-blue-500 text-4xl"
        }, null, _parent));
        _push(`<p class="text-dark/80"> نمای خیابان - به زودی </p></div></div>`);
      }
      _push(`</div></div></div></div></section>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/HomeLocationShop.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_5 = Object.assign(_sfc_main$1, { __name: "HomeLocationShop" });
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { name, description } = useAppConfig().site;
    const url = useRequestURL();
    const { t } = useI18n();
    const canonical = url.origin + url.pathname;
    useHead({
      title: () => t("home.seo.title", { name }),
      titleTemplate: null
    });
    useSeoMeta({
      description: () => t("home.seo.description") || description,
      ogTitle: () => t("home.seo.title", { name }),
      ogDescription: () => t("home.seo.description") || description,
      ogUrl: canonical,
      ogType: "website",
      canonical,
      ogImage: "https://commerce.nuxt.dev/social-card.jpg",
      twitterImage: "https://commerce.nuxt.dev/social-card.jpg"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_HomeHero = __nuxt_component_0;
      const _component_HomeBenefits = _sfc_main$5;
      const _component_HomeCategoryShowcase = _sfc_main$4;
      const _component_HomeProductRow = _sfc_main$3;
      const _component_HomePromoBanner = _sfc_main$2;
      const _component_HomeLocationShop = __nuxt_component_5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mx-auto max-w-screen-2xl pb-4 px-0 sm:px-3" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_HomeHero, null, null, _parent));
      _push(ssrRenderComponent(_component_HomeBenefits, null, null, _parent));
      _push(ssrRenderComponent(_component_HomeCategoryShowcase, null, null, _parent));
      _push(ssrRenderComponent(_component_HomeProductRow, {
        "title-key": "home.sections.featured",
        "fetch-key": "home-featured",
        params: { featured: "true" },
        "view-all-query": {}
      }, null, _parent));
      _push(ssrRenderComponent(_component_HomeProductRow, {
        "title-key": "home.sections.new_arrivals",
        "fetch-key": "home-new",
        params: { fieldby: "DATE", orderby: "DESC" },
        "view-all-query": {}
      }, null, _parent));
      _push(ssrRenderComponent(_component_HomeProductRow, {
        "title-key": "home.sections.on_sale",
        "fetch-key": "home-onsale",
        params: { onSale: "true" },
        "view-all-query": { onSale: "true" }
      }, null, _parent));
      _push(ssrRenderComponent(_component_HomePromoBanner, null, null, _parent));
      _push(ssrRenderComponent(_component_HomeLocationShop, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DPERMfTD.mjs.map
