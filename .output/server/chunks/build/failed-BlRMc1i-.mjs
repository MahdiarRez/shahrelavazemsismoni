import { u as useRoute, q as useCart, f as useI18n, d as useSeoMeta, _ as __nuxt_component_7, m as __nuxt_component_0$4, r as useRuntimeConfig } from './server.mjs';
import { defineComponent, computed, ref, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "failed",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const config = useRuntimeConfig();
    useCart();
    const { t } = useI18n();
    const orderIdRaw = route.query.order_id;
    const keyRaw = route.query.key;
    const isValidOrderId = (v) => typeof v === "string" && /^\d+$/.test(v);
    const hasRetryInfo = computed(
      () => isValidOrderId(orderIdRaw) && typeof keyRaw === "string" && keyRaw.length > 0
    );
    const retryUrl = computed(() => {
      if (!hasRetryInfo.value) return null;
      const wpBase = (config.public.wpBaseUrl || "").replace(/\/$/, "");
      if (!wpBase) {
        console.error("[payment/failed] NUXT_PUBLIC_WP_BASE_URL is not set");
        return null;
      }
      return `${wpBase}/checkout/order-pay/${orderIdRaw}/?pay_for_order=true&key=${encodeURIComponent(keyRaw)}`;
    });
    ref(null);
    useSeoMeta({
      title: () => t("checkout.pay.failed_title"),
      robots: "noindex, nofollow"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = __nuxt_component_7;
      const _component_NuxtLink = __nuxt_component_0$4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center justify-center min-h-[60vh] px-4" }, _attrs))}><div class="text-center max-w-md space-y-4" role="alert"><div class="bg-red-500/20 dark:bg-red-700/20 flex rounded-full p-3 mb-1 w-fit mx-auto">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-iconamoon-close-circle-1-fill",
        size: "46",
        class: "text-red-500 dark:text-red-400"
      }, null, _parent));
      _push(`</div><h1 tabindex="-1" class="text-lg font-semibold focus:outline-none">${ssrInterpolate(_ctx.$t("checkout.pay.failed_title"))}</h1><p class="text-sm text-neutral-500 dark:text-neutral-300">${ssrInterpolate(_ctx.$t("checkout.pay.failed_description"))}</p>`);
      if (isValidOrderId(unref(orderIdRaw))) {
        _push(`<p class="text-xs text-neutral-400 dark:text-neutral-500">${ssrInterpolate(_ctx.$t("checkout.pay.order_reference", { id: unref(orderIdRaw) }))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex flex-col items-center gap-3 mt-4">`);
      if (unref(retryUrl)) {
        _push(`<a${ssrRenderAttr("href", unref(retryUrl))} class="inline-block px-6 py-2.5 rounded-full bg-[#23a26d] dark:bg-[#40d195] text-white dark:text-black text-sm font-medium">${ssrInterpolate(_ctx.$t("checkout.pay.retry"))}</a>`);
      } else {
        _push(`<p class="text-xs text-neutral-400 dark:text-neutral-500">${ssrInterpolate(_ctx.$t("checkout.pay.retry_unavailable"))}</p>`);
      }
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "inline-block px-6 py-2.5 rounded-full bg-black dark:bg-white text-white dark:text-black text-sm font-medium"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("checkout.pay.back_to_shop"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("checkout.pay.back_to_shop")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/payment/failed.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=failed-BlRMc1i-.mjs.map
