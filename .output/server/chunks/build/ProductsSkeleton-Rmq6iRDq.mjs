import { ssrRenderList } from 'vue/server-renderer';
import { useSSRContext } from 'vue';
import { j as _export_sfc } from './server.mjs';

const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<!--[-->`);
  ssrRenderList(21, (i) => {
    _push(`<div><div class="rounded-2xl overflow-hidden w-full pb-[133%] bg-neutral-200 dark:bg-neutral-800 skeleton"></div><div class="grid gap-1.5 pt-3 pb-4 px-1.5"><div class="h-4 w-20 rounded bg-neutral-200/80 dark:bg-neutral-800/80 skeleton"></div><div class="h-4 w-44 rounded bg-neutral-200/60 dark:bg-neutral-800/60 skeleton"></div><div class="h-4 w-28 rounded bg-neutral-200/40 dark:bg-neutral-800/40 skeleton"></div></div></div>`);
  });
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ProductsSkeleton.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_10 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]), { __name: "ProductsSkeleton" });

export { __nuxt_component_10 as _ };
//# sourceMappingURL=ProductsSkeleton-Rmq6iRDq.mjs.map
