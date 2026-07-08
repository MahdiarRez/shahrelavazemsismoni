import{g as e,c as r,j as o,e as t,h as a}from"../../_/nitro.mjs";import"node:buffer";import"node:timers";import"node:events";import"node:process";import"cloudflare:workers";import"node:async_hooks";const s=e`
	query getProducts(
		$after: String
		$first: Int = 21
		$search: String
		$category: String
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
				category: $category
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
`,n=r(async e=>{var r,n;const d=o(e),toBool=e=>"true"===e||"1"===e||null,l={after:d.after?String(d.after):null,first:d.first?Number(d.first):21,search:d.search?String(d.search):null,category:d.category?decodeURIComponent(String(d.category)):null,onSale:toBool(d.onSale),featured:toBool(d.featured),order:(null==(r=d.orderby)?void 0:r.toUpperCase())||"DESC",field:(null==(n=d.fieldby)?void 0:n.toUpperCase())||"DATE"};try{return await t(s,l)}catch(e){throw console.error("خطا در اجرای کوئری محصولات:",e),a({statusCode:500,message:"Server GraphQL Error"})}},{maxAge:60,swr:!0,getKey:e=>e.node.req.url||"products"});export{n as default};
//# sourceMappingURL=products.get.mjs.map
