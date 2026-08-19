import { f as cachedEventHandler, j as getQuery, g as requestQuery, h as createError } from '../../_/nitro.mjs';
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

const getProductsQuery = gql`
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
`;

const products_get = cachedEventHandler(
  async (event) => {
    var _a, _b;
    const query = getQuery(event);
    const toBool = (value) => value === "true" || value === "1" ? true : null;
    const variables = {
      after: query.after ? String(query.after) : null,
      first: query.first ? Number(query.first) : 21,
      search: query.search ? String(query.search) : null,
      // The `category` query param carries the category *slug* (the stable
      // canonical key). WooGraphQL's `categoryIn` filters by slug, which —
      // unlike the `category`/name filter — is immune to display-name edits.
      categorySlugs: query.category ? [decodeURIComponent(String(query.category))] : null,
      onSale: toBool(query.onSale),
      featured: toBool(query.featured),
      order: ((_a = query.orderby) == null ? void 0 : _a.toUpperCase()) || "DESC",
      field: ((_b = query.fieldby) == null ? void 0 : _b.toUpperCase()) || "DATE"
    };
    try {
      return await requestQuery(getProductsQuery, variables);
    } catch (error) {
      console.error("\u062E\u0637\u0627 \u062F\u0631 \u0627\u062C\u0631\u0627\u06CC \u06A9\u0648\u0626\u0631\u06CC \u0645\u062D\u0635\u0648\u0644\u0627\u062A:", error);
      throw createError({
        statusCode: 500,
        message: "Server GraphQL Error"
      });
    }
  },
  {
    maxAge: 60,
    swr: true,
    getKey: (event) => event.node.req.url || "products"
  }
);

export { products_get as default };
//# sourceMappingURL=products.get.mjs.map
