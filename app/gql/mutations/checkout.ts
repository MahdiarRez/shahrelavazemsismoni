// app/gql/mutations/checkout.ts
import { gql } from "nuxt-graphql-request/utils";

export const checkoutMutation = gql`
	mutation Checkout($input: CheckoutInput!) {
		checkout(input: $input) {
			order {
				databaseId
				orderKey
				orderNumber
				total
				status
			}
		}
	}
`;
