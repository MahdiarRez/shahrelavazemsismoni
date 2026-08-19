import { j as _export_sfc, u as useRoute, s as useCheckout, q as useCart, c as useI18n, i as useSeoMeta, _ as __nuxt_component_7, m as __nuxt_component_0$4, t as _sfc_main$a } from './server.mjs';
import { defineComponent, computed, withAsyncContext, watch, ref, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { u as useFetch } from './fetch-DXmd3ocz.mjs';
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
  __name: "success",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const { order } = useCheckout();
    useCart();
    const { t } = useI18n();
    const orderIdRaw = route.query.order_id;
    const keyRaw = route.query.key;
    const isValidOrderId = (v) => typeof v === "string" && /^\d+$/.test(v);
    const hasValidParams = computed(
      () => isValidOrderId(orderIdRaw) && typeof keyRaw === "string" && keyRaw.length > 0
    );
    const { data, error, status } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/payment/verify",
      {
        query: { order_id: orderIdRaw, key: keyRaw },
        immediate: hasValidParams.value,
        key: `payment-verify-${orderIdRaw}-${keyRaw}`
      },
      "$qtM7ykPWQG"
    )), __temp = await __temp, __restore(), __temp);
    async function clearServerCart() {
      return;
    }
    watch(
      data,
      (value) => {
        if (!value) return;
        order.value = value;
        clearServerCart();
      },
      { immediate: true }
    );
    const pageState = computed(() => {
      if (!hasValidParams.value) return "missing-params";
      if (status.value === "pending" || status.value === "idle") return "loading";
      if (error.value || !data.value) return "error";
      return "success";
    });
    const errorDescriptionKey = computed(() => {
      const code = error.value?.statusCode;
      if (code === 403 || code === 404) return "checkout.pay.error_invalid_link";
      if (code === 402) return "checkout.pay.verify_failed_description";
      return "checkout.pay.error_server";
    });
    ref(null);
    useSeoMeta({
      title: () => t("checkout.pay.success_title"),
      robots: "noindex, nofollow"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = __nuxt_component_7;
      const _component_NuxtLink = __nuxt_component_0$4;
      const _component_PaymentSuccessful = _sfc_main$a;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center justify-center min-h-[60vh] px-4" }, _attrs))} data-v-2e6f7b03>`);
      if (unref(pageState) === "loading") {
        _push(`<div class="text-center space-y-4" role="status" aria-live="polite" data-v-2e6f7b03><div class="loading-spinner h-10 w-10 rounded-full border-2 border-neutral-200 border-t-[#23a26d] dark:border-neutral-700 dark:border-t-[#40d195] mx-auto" data-v-2e6f7b03></div><p class="text-sm text-neutral-500 dark:text-neutral-300" data-v-2e6f7b03>${ssrInterpolate(_ctx.$t("checkout.pay.verifying"))}</p></div>`);
      } else if (unref(pageState) === "missing-params") {
        _push(`<div class="text-center max-w-md space-y-4" role="alert" data-v-2e6f7b03><div class="bg-amber-500/20 dark:bg-amber-700/20 flex rounded-full p-3 mb-1 w-fit mx-auto" data-v-2e6f7b03>`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-iconamoon-question-mark-circle-fill",
          size: "46",
          class: "text-amber-500 dark:text-amber-400"
        }, null, _parent));
        _push(`</div><h1 tabindex="-1" class="text-lg font-semibold focus:outline-none" data-v-2e6f7b03>${ssrInterpolate(_ctx.$t("checkout.pay.missing_info_title"))}</h1><p class="text-sm text-neutral-500 dark:text-neutral-300" data-v-2e6f7b03>${ssrInterpolate(_ctx.$t("checkout.pay.missing_info_description"))}</p>`);
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
        _push(`</div>`);
      } else if (unref(pageState) === "error") {
        _push(`<div class="text-center max-w-md space-y-4" role="alert" data-v-2e6f7b03><div class="bg-red-500/20 dark:bg-red-700/20 flex rounded-full p-3 mb-1 w-fit mx-auto" data-v-2e6f7b03>`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-iconamoon-close-circle-1-fill",
          size: "46",
          class: "text-red-500 dark:text-red-400"
        }, null, _parent));
        _push(`</div><h1 tabindex="-1" class="text-lg font-semibold focus:outline-none" data-v-2e6f7b03>${ssrInterpolate(_ctx.$t("checkout.pay.verify_failed_title"))}</h1><p class="text-sm text-neutral-500 dark:text-neutral-300" data-v-2e6f7b03>${ssrInterpolate(_ctx.$t(unref(errorDescriptionKey)))}</p>`);
        if (isValidOrderId(unref(orderIdRaw))) {
          _push(`<p class="text-xs text-neutral-400 dark:text-neutral-500" data-v-2e6f7b03>${ssrInterpolate(_ctx.$t("checkout.pay.order_reference", { id: unref(orderIdRaw) }))}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/",
          class: "inline-block px-6 py-2.5 rounded-full bg-black dark:bg-white text-white dark:text-black text-sm font-medium"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.$t("general.go_back"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(_ctx.$t("general.go_back")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else if (unref(pageState) === "success") {
        _push(ssrRenderComponent(_component_PaymentSuccessful, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/payment/success.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const success = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2e6f7b03"]]);

export { success as default };
//# sourceMappingURL=success-BUOw8Wjd.mjs.map
