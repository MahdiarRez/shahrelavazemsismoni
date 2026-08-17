import{g as t,d as a,r as o,a as r}from"../../../nitro/nitro.mjs";import"node:buffer";import"node:process";import"node:timers";import"node:events";import"cloudflare:workers";import"node:async_hooks";const e=t`
	mutation addToCart($input: AddToCartInput!) {
		addToCart(input: $input) {
			cartItem {
				key
				quantity
				product {
					node {
						sku
						slug
						name
					}
				}
				variation {
					node {
						name
						databaseId
						salePrice(format: RAW)
						regularPrice(format: RAW)
						stockQuantity
						stockStatus
						image {
							sourceUrl(size: WOOCOMMERCE_THUMBNAIL)
						}
					}
					attributes {
						value
					}
				}
			}
		}
	}
`,i=a(async t=>{const a=await o(t);return await r(t,e,{input:a})});export{i as default};
//# sourceMappingURL=add.post.mjs.map
