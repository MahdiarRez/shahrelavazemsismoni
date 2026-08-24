import { k as useLocalePath, m as __nuxt_component_0$4, i as __nuxt_component_3, v as _sfc_main$b } from './server.mjs';
import { unref, withCtx, createVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderList, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';

const _sfc_main = {
  __name: "ProductCard",
  __ssrInlineRender: true,
  props: {
    products: Object
  },
  setup(__props) {
    const localePath = useLocalePath();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$4;
      const _component_NuxtImg = __nuxt_component_3;
      const _component_ProductPrice = _sfc_main$b;
      _push(`<!--[-->`);
      ssrRenderList(__props.products, (product) => {
        _push(`<article>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: unref(localePath)(`/product/${product.sku}/${product.slug}`),
          class: "group select-none h-full"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="cursor-pointer transition ease-[ease] duration-300 md:hover:bg-[#efefef36] dark:md:hover:bg-[#141313] rounded-[32px]"${_scopeId}><div class="relative pb-[133%] dark:shadow-[0_8px_24px_rgba(0,0,0,.5)] rounded-[32px] overflow-hidden"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_NuxtImg, {
                alt: product.name,
                loading: "lazy",
                title: product.name,
                src: product.galleryImages.nodes[0]?.sourceUrl,
                class: "absolute h-full w-full dark:bg-neutral-800 bg-neutral-200 object-cover rounded-[24px]"
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_NuxtImg, {
                alt: product.name,
                loading: "lazy",
                title: product.name,
                src: product.image.sourceUrl,
                class: "absolute h-full w-full dark:bg-neutral-800 bg-neutral-200 object-cover transition-opacity duration-300 group-hover:opacity-0"
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="grid gap-0.5 pt-3 pb-4 px-1.5 md:px-3 text-sm font-medium text-right"${_scopeId}><div class="bidi-auto"${_scopeId}>${ssrInterpolate(product.name)}</div><div class="flex flex-row justify-end gap-3 items-center"${_scopeId}><!--[-->`);
              ssrRenderList(product.productCategories?.nodes, (value) => {
                _push2(`<div class="font-normal text-xs opacity-80 text-[#5f5f5f] dark:text-[#a3a3a3] text-right ml-auto bidi-auto"${_scopeId}>${ssrInterpolate(value.name)}</div>`);
              });
              _push2(`<!--]--></div>`);
              _push2(ssrRenderComponent(_component_ProductPrice, {
                "sale-price": product.salePrice,
                "regular-price": product.regularPrice,
                variant: "card"
              }, null, _parent2, _scopeId));
              _push2(`</div></div>`);
            } else {
              return [
                createVNode("div", { class: "cursor-pointer transition ease-[ease] duration-300 md:hover:bg-[#efefef36] dark:md:hover:bg-[#141313] rounded-[32px]" }, [
                  createVNode("div", { class: "relative pb-[133%] dark:shadow-[0_8px_24px_rgba(0,0,0,.5)] rounded-[32px] overflow-hidden" }, [
                    createVNode(_component_NuxtImg, {
                      alt: product.name,
                      loading: "lazy",
                      title: product.name,
                      src: product.galleryImages.nodes[0]?.sourceUrl,
                      class: "absolute h-full w-full dark:bg-neutral-800 bg-neutral-200 object-cover rounded-[24px]"
                    }, null, 8, ["alt", "title", "src"]),
                    createVNode(_component_NuxtImg, {
                      alt: product.name,
                      loading: "lazy",
                      title: product.name,
                      src: product.image.sourceUrl,
                      class: "absolute h-full w-full dark:bg-neutral-800 bg-neutral-200 object-cover transition-opacity duration-300 group-hover:opacity-0"
                    }, null, 8, ["alt", "title", "src"])
                  ]),
                  createVNode("div", { class: "grid gap-0.5 pt-3 pb-4 px-1.5 md:px-3 text-sm font-medium text-right" }, [
                    createVNode("div", { class: "bidi-auto" }, toDisplayString(product.name), 1),
                    createVNode("div", { class: "flex flex-row justify-end gap-3 items-center" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(product.productCategories?.nodes, (value) => {
                        return openBlock(), createBlock("div", { class: "font-normal text-xs opacity-80 text-[#5f5f5f] dark:text-[#a3a3a3] text-right ml-auto bidi-auto" }, toDisplayString(value.name), 1);
                      }), 256))
                    ]),
                    createVNode(_component_ProductPrice, {
                      "sale-price": product.salePrice,
                      "regular-price": product.regularPrice,
                      variant: "card"
                    }, null, 8, ["sale-price", "regular-price"])
                  ])
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</article>`);
      });
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ProductCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=ProductCard-BzhMQ6nH.mjs.map
