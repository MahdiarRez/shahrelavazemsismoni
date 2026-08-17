import{g as r,c as e,h as s,b as o}from"../../nitro/nitro.mjs";import"node:buffer";import"node:process";import"node:timers";import"node:events";import"cloudflare:workers";import"node:async_hooks";const a=r`
  query getSearchProducts($search: String) {
    products(first: 6, where: { stockStatus: IN_STOCK, search: $search }) {
      nodes {
        ... on VariableProduct {
          sku
          slug
          name
          regularPrice
          salePrice
          image {
            sourceUrl(size: WOOCOMMERCE_THUMBNAIL)
          }
          galleryImages {
            nodes {
              sourceUrl(size: WOOCOMMERCE_THUMBNAIL)
            }
          }
        }
      }
    }
  }
`,t=e(async r=>{const{search:e=""}=s(r);return await o(a,{search:e})},{maxAge:60,swr:!0,getKey:r=>r.req.url});export{t as default};
//# sourceMappingURL=search.get.mjs.map
