// app/gql/mutations/emptyCart.ts
import { gql } from "nuxt-graphql-request/utils";

export const emptyCartMutation = gql`
	mutation emptyCart($input: EmptyCartInput!) {
		emptyCart(input: $input) {
			cart {
				contents {
					nodes {
						key
					}
				}
			}
		}
	}
`;
