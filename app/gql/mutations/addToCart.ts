// app/gql/mutations/addToCart.ts
import { gql } from "nuxt-graphql-request/utils";

export const addToCartMutation = gql`
	mutation addToCart($input: AddToCartInput!) {
		addToCart(input: $input) {
			cartItem {
				key
				quantity
				total
				subtotal
				product {
					node {
						databaseId
						sku
						slug
						name
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
								sku
								slug
								name
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
	}
`;
