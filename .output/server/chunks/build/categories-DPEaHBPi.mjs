import { b as useAppConfig, a as useRequestURL, k as useLocalePath, c as useHead, d as useSeoMeta, l as useAsyncData, m as __nuxt_component_0$4, i as __nuxt_component_3 } from './server.mjs';
import { withAsyncContext, computed, mergeProps, unref, withCtx, createVNode, openBlock, createBlock, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { C as CategoryPlaceholder } from './CategoryPlaceholder-CjJj2T-O.mjs';
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

const pageTitle = "دسته‌بندی محصولات";
const _sfc_main = {
  __name: "categories",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { name } = useAppConfig().site;
    const url = useRequestURL();
    const localePath = useLocalePath();
    const canonical = url.origin + url.pathname;
    const pageDescription = `لیست کامل دسته‌بندی‌های محصولات در ${name}. بررسی و خرید انواع لوازم سیسمونی، کالسکه، پوشاک کودک و اسباب‌بازی.`;
    useHead({
      link: [{ rel: "canonical", href: canonical }]
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
      ogImage: "/favicon.icon"
    });
    const { data } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      "categories-page",
      () => $fetch("/api/categories")
    )), __temp = await __temp, __restore(), __temp);
    const categories = computed(
      () => (data.value?.productCategories?.nodes || []).filter(
        (category) => category.products?.nodes.length
      )
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$4;
      const _component_NuxtImg = __nuxt_component_3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-wrap justify-center max-w-screen-2xl m-auto" }, _attrs))}>`);
      if (!unref(categories).length) {
        _push(`<!--[-->`);
        ssrRenderList(13, (i) => {
          _push(`<div class="w-full max-w-[444px] p-3 lg:p-2"><div class="pb-[75%] relative overflow-hidden bg-neutral-200 dark:bg-neutral-800 skeleton rounded-[32px]"></div></div>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(unref(categories), (category) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: category.id,
          to: unref(localePath)(
            `/shop?category=${encodeURIComponent(category.slug)}`
          ),
          class: "group w-full max-w-[444px] p-2 lg:p-2 h-auto"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="pb-[75%] relative overflow-hidden h-full"${_scopeId}>`);
              if (category.image) {
                _push2(ssrRenderComponent(_component_NuxtImg, {
                  alt: category.name,
                  class: "object-cover absolute top-0 left-0 w-full h-full bg-neutral-200 dark:bg-neutral-800 rounded-[32px]",
                  src: category.image.sourceUrl,
                  loading: "lazy",
                  title: category.name
                }, null, _parent2, _scopeId));
              } else {
                _push2(ssrRenderComponent(CategoryPlaceholder, { class: "transition-transform duration-700 ease-out" }, null, _parent2, _scopeId));
              }
              _push2(`<div class="absolute left-0 right-0 top-0 bottom-0 bg-gradient-to-t hover:from-black/40 rounded-[32px] overflow-hidden"${_scopeId}><div class="w-full h-full bg-gradient-to-t from-black/40 py-6 px-5 flex items-end"${_scopeId}><div class="w-full text-center font-semibold text-2xl text-white"${_scopeId}>${ssrInterpolate(category.name)}</div></div></div></div>`);
            } else {
              return [
                createVNode("div", { class: "pb-[75%] relative overflow-hidden h-full" }, [
                  category.image ? (openBlock(), createBlock(_component_NuxtImg, {
                    key: 0,
                    alt: category.name,
                    class: "object-cover absolute top-0 left-0 w-full h-full bg-neutral-200 dark:bg-neutral-800 rounded-[32px]",
                    src: category.image.sourceUrl,
                    loading: "lazy",
                    title: category.name
                  }, null, 8, ["alt", "src", "title"])) : (openBlock(), createBlock(CategoryPlaceholder, {
                    key: 1,
                    class: "transition-transform duration-700 ease-out"
                  })),
                  createVNode("div", { class: "absolute left-0 right-0 top-0 bottom-0 bg-gradient-to-t hover:from-black/40 rounded-[32px] overflow-hidden" }, [
                    createVNode("div", { class: "w-full h-full bg-gradient-to-t from-black/40 py-6 px-5 flex items-end" }, [
                      createVNode("div", { class: "w-full text-center font-semibold text-2xl text-white" }, toDisplayString(category.name), 1)
                    ])
                  ])
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/categories.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=categories-DPEaHBPi.mjs.map
