import{g as e,c as r,e as s,b as a}from"../../nitro/nitro.mjs";import"node:buffer";import"node:process";import"node:timers";import"node:events";import"cloudflare:workers";import"node:async_hooks";const o=e`
	query getProduct($sku: ID!) {
		product(id: $sku, idType: SKU) {
			... on VariableProduct {
				databaseId
				sku
				slug
				name
				regularPrice
				salePrice
				description

				image {
					sourceUrl(size: LARGE)
				}

				galleryImages {
					nodes {
						sourceUrl(size: LARGE)
					}
				}

				allPaColor {
					nodes {
						name
					}
				}

				allPaStyle {
					nodes {
						name
					}
				}

				variations(where: { orderby: { field: NAME, order: DESC } }) {
					nodes {
						databaseId
						stockStatus
						stockQuantity
						attributes {
							nodes {
								name
								value
							}
						}
					}
				}

				related(first: 50) {
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
							allPaStyle {
								nodes {
									name
								}
							}
						}
					}
				}
			}
		}
	}
`,t=r(async e=>{const{slug:r,sku:t}=s(e);return await a(o,{slug:r,sku:t})},{maxAge:300,swr:!0,getKey:e=>e.req.url});export{t as default};
//# sourceMappingURL=product.get.mjs.map
