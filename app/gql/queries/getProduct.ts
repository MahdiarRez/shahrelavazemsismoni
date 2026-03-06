// app/gql/queries/getProduct.ts
import { gql } from "nuxt-graphql-request/utils";

export const getProductQuery = gql`
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
`;
