import { f as cachedEventHandler, j as getQuery, g as requestQuery } from '../../_/nitro.mjs';
import { gql } from 'graphql-request';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import '@intlify/utils';
import 'vue-router';
import 'node:fs';
import 'node:path';
import 'node:url';
import '@iconify/utils';
import 'node:crypto';
import 'consola';
import 'ipx';

const getProductQuery = gql`
	query getProduct($sku: ID!) {
		product(id: $sku, idType: SKU) {
			... on VariableProduct {
				databaseId
				sku
				slug
				name
				regularPrice
				productCategories {
					nodes {
						name
						slug
					}
				}
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
						}
					}
				}
			}
		}
	}
`;

const product_get = cachedEventHandler(
  async (event) => {
    const { slug, sku } = getQuery(event);
    return await requestQuery(getProductQuery, { slug, sku });
  },
  {
    maxAge: 60 * 5,
    swr: true,
    getKey: (event) => event.req.url
  }
);

export { product_get as default };
//# sourceMappingURL=product.get.mjs.map
