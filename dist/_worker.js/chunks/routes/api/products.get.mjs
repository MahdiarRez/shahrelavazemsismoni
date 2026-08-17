import{g as e,c as r,h as o,b as t,e as a}from"../../nitro/nitro.mjs";import"node:buffer";import"node:process";import"node:timers";import"node:events";import"cloudflare:workers";import"node:async_hooks";const s=e`
	query getProducts(
		$after: String
		$first: Int = 21
		$search: String
		$categorySlugs: [String]
		$onSale: Boolean
		$featured: Boolean
		$order: OrderEnum = DESC
		$field: ProductsOrderByEnum = DATE
	) {
		products(
			first: $first
			after: $after
			where: {
				stockStatus: IN_STOCK
				search: $search
				categoryIn: $categorySlugs
				onSale: $onSale
				featured: $featured
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
`,n=r(async e=>{var r,n;const l=o(e),toBool=e=>"true"===e||"1"===e||null,d={after:l.after?String(l.after):null,first:l.first?Number(l.first):21,search:l.search?String(l.search):null,categorySlugs:l.category?[decodeURIComponent(String(l.category))]:null,onSale:toBool(l.onSale),featured:toBool(l.featured),order:(null==(r=l.orderby)?void 0:r.toUpperCase())||"DESC",field:(null==(n=l.fieldby)?void 0:n.toUpperCase())||"DATE"};try{return await t(s,d)}catch(e){throw console.error("خطا در اجرای کوئری محصولات:",e),a({statusCode:500,message:"Server GraphQL Error"})}},{maxAge:60,swr:!0,getKey:e=>e.node.req.url||"products"});export{n as default};
//# sourceMappingURL=products.get.mjs.map
