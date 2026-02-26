import{g as e,c as r,e as s,b as o}from"../../nitro/nitro.mjs";import"node:buffer";import"node:process";import"node:timers";import"node:events";import"cloudflare:workers";import"node:async_hooks";const a=e`
  query getSearchProducts($search: String) {
    products(first: 6, where: { stockStatus: IN_STOCK, search: $search }) {
      nodes {
        ... on VariableProduct {
          sku
          slug
          name
          regularPrice
          salePrice
          allPaStyle {
            nodes {
              name
            }
          }
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
`,t=r(async e=>{const{search:r=""}=s(e);return await o(a,{search:r})},{maxAge:60,swr:!0,getKey:e=>e.req.url});export{t as default};
//# sourceMappingURL=search.get.mjs.map
