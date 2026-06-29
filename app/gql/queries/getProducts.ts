import { gql } from "nuxt-graphql-request/utils";

export const getProductsQuery = gql`
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
`;
