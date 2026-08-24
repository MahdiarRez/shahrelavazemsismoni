import { b as useAppConfig, a as useRequestURL, k as useLocalePath, c as useHead, d as useSeoMeta, i as __nuxt_component_3, m as __nuxt_component_0$4, _ as __nuxt_component_7 } from './server.mjs';
import { mergeProps, unref, withCtx, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { u as useWishlist } from './useWishlist-CpisbRQk.mjs';
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

const pageTitle = "لیست علاقه‌مندی‌ها";
const _sfc_main = {
  __name: "favorites",
  __ssrInlineRender: true,
  setup(__props) {
    const { wishlist } = useWishlist();
    const { name } = useAppConfig().site;
    const url = useRequestURL();
    const localePath = useLocalePath();
    const canonical = url.origin + url.pathname;
    const pageDescription = `لیست محصولات ذخیره‌شده و مورد علاقه شما در ${name}.`;
    useHead({
      link: [{ rel: "canonical", href: canonical }]
    });
    useSeoMeta({
      title: pageTitle,
      ogTitle: pageTitle,
      description: pageDescription,
      ogDescription: pageDescription,
      ogUrl: canonical,
      keywords: `علاقه‌مندی‌ها , لیست پسندیده‌ها , خرید سیسمونی , ${name}`,
      twitterTitle: pageTitle,
      twitterDescription: pageDescription,
      ogImage: "/favicon.ico",
      robots: "noindex, nofollow"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtImg = __nuxt_component_3;
      const _component_NuxtLink = __nuxt_component_0$4;
      const _component_UIcon = __nuxt_component_7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-2 justify-center max-w-screen-2xl sm:flex sm:justify-start m-auto" }, _attrs))}>`);
      if (unref(wishlist).length) {
        _push(`<!--[-->`);
        ssrRenderList(unref(wishlist), (product) => {
          _push(`<div${ssrRenderAttrs({
            name: "shrink",
            mode: "in-out",
            key: product.databaseId,
            class: "w-full sm:max-w-[300px] p-3 lg:p-2 relative select-none"
          })}><div class="relative overflow-hidden pb-[125%] rounded-[32px]">`);
          _push(ssrRenderComponent(_component_NuxtImg, {
            alt: product.name,
            class: "absolute w-full h-full object-cover bg-neutral-200 dark:bg-neutral-800",
            src: product.image.sourceUrl,
            loading: "lazy"
          }, null, _parent));
          _push(ssrRenderComponent(_component_NuxtLink, {
            class: "absolute inset-0 bg-gradient-to-t from-black/50 hover:from-black/60 flex items-end justify-start p-5",
            to: unref(localePath)(`/product/${product.sku}/${product.slug}`)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="grid gap-0.5 text-white text-right"${_scopeId}><div class="font-bold bidi-auto"${_scopeId}>${ssrInterpolate(product.name)}</div><div class="text-sm font-normal opacity-80 bidi-auto"${_scopeId}>${ssrInterpolate(product.productCategories?.nodes[0]?.name)}</div></div>`);
              } else {
                return [
                  createVNode("div", { class: "grid gap-0.5 text-white text-right" }, [
                    createVNode("div", { class: "font-bold bidi-auto" }, toDisplayString(product.name), 1),
                    createVNode("div", { class: "text-sm font-normal opacity-80 bidi-auto" }, toDisplayString(product.productCategories?.nodes[0]?.name), 1)
                  ])
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div><button class="absolute top-6 right-6 group" title="Remove Product"><div class="w-12 h-12 rounded-full flex justify-center items-center bg-secondary-800/70 shadow-md">`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: "i-iconamoon-heart-fill",
            size: "26",
            class: "text-secondary-600 group-hover:text-white transition pulse-heart"
          }, null, _parent));
          _push(`</div></button></div>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<div class="w-full col-span-2 flex flex-col items-center px-5 min-h-[calc(100vh-152px)] justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-100 via-white to-white dark:from-neutral-900 dark:via-black dark:to-black rounded-xl"><div class="bg-alizarin-crimson-100 dark:bg-alizarin-crimson-950 rounded-full p-6 flex items-center shadow-2xl shadow-alizarin-crimson-300 dark:shadow-alizarin-crimson-950 justify-center">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-iconamoon-heart-fill",
          class: "w-20 h-20 text-alizarin-crimson-400 dark:text-alizarin-crimson-700 pulse-heart"
        }, null, _parent));
        _push(`</div><div class="font-bold text-xl md:text-3xl my-6 text-center">${ssrInterpolate(_ctx.$t("favorites.nothing_to_show_yet"))}</div><div class="text-sm text-center mb-5 max-w-md">${ssrInterpolate(_ctx.$t("favorites.wishlist_lives_here"))}</div></div>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/favorites.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=favorites-B5pmGGz6.mjs.map
