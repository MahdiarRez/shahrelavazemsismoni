import{g as e,c as r,e as o,b as t,f as a}from"../../nitro/nitro.mjs";import"node:buffer";import"node:process";import"node:timers";import"node:events";import"cloudflare:workers";import"node:async_hooks";const s=e`
	query getProducts(
		$after: String
		$search: String
		$category: String
		$order: OrderEnum = DESC
		$field: ProductsOrderByEnum = DATE
	) {
		products(
			first: 21
			after: $after
			where: {
				stockStatus: IN_STOCK
				search: $search
				category: $category
				orderby: { field: $field, order: $order }
			}
		) {
			nodes {
				id
				__typename
				sku
				slug
				name

				# بخش اصلاح شده که در تست جواب داد
				... on Product {
					productCategories {
						nodes {
							name
							slug
						}
					}
				}

				image {
					sourceUrl(size: WOOCOMMERCE_THUMBNAIL)
				}

				... on VariableProduct {
					regularPrice
					salePrice
					allPaStyle {
						nodes {
							name
						}
					}
					galleryImages {
						nodes {
							sourceUrl(size: WOOCOMMERCE_THUMBNAIL)
						}
					}
				}

				... on SimpleProduct {
					regularPrice
					salePrice
					galleryImages {
						nodes {
							sourceUrl(size: WOOCOMMERCE_THUMBNAIL)
						}
					}
				}
			}
			pageInfo {
				hasNextPage
				endCursor
			}
		}
	}
`,n=r(async e=>{var r,n;const d=o(e),c={after:d.after?String(d.after):null,search:d.search?String(d.search):null,category:d.category?decodeURIComponent(String(d.category)):null,order:(null==(r=d.orderby)?void 0:r.toUpperCase())||"DESC",field:(null==(n=d.fieldby)?void 0:n.toUpperCase())||"DATE"};try{return await t(s,c)}catch(e){throw console.error("خطا در اجرای کوئری محصولات:",e),a({statusCode:500,message:"Server GraphQL Error"})}},{maxAge:60,swr:!0,getKey:e=>e.node.req.url||"products"});export{n as default};
//# sourceMappingURL=products.get.mjs.map
