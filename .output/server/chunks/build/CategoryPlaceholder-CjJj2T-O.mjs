import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs } from 'vue/server-renderer';
import { j as _export_sfc } from './server.mjs';

const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    "aria-hidden": "true",
    class: "category-placeholder bg-gradient-to-br to-secondary-400 via-primary-400/80 from-secondary-500 w-full h-full absolute top-0 right-0 rounded-[32px] overflow-hidden"
  }, _attrs))} data-v-e53299b2><span class="category-placeholder__sheen" data-v-e53299b2></span></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CategoryPlaceholder.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const CategoryPlaceholder = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-e53299b2"]]), { __name: "CategoryPlaceholder" });

export { CategoryPlaceholder as C };
//# sourceMappingURL=CategoryPlaceholder-CjJj2T-O.mjs.map
