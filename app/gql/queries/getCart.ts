// app/gql/queries/getCart.ts
import { gql } from "nuxt-graphql-request/utils";

export const getCartQuery = gql`
	query getCart {
		cart {
			total
			subtotal
			isEmpty
			contents {
				itemCount
				productCount
				nodes {
					key
					quantity
					total
					subtotal
					product {
						node {
							databaseId
							name
							slug
							sku
							... on SimpleProduct {
								salePrice(format: RAW)
								regularPrice(format: RAW)
								price(format: RAW)
								stockQuantity
								stockStatus
								image {
									sourceUrl(size: WOOCOMMERCE_THUMBNAIL)
									altText
								}
							}
							... on VariableProduct {
								price(format: RAW)
							}
						}
					}
					variation {
						node {
							databaseId
							name
							salePrice(format: RAW)
							regularPrice(format: RAW)
							price(format: RAW)
							stockQuantity
							stockStatus
							image {
								sourceUrl(size: WOOCOMMERCE_THUMBNAIL)
								altText
							}
						}
						attributes {
							name
							value
						}
					}
				}
			}
		}
	}
`;
