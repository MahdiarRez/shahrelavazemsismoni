import { c as defineEventHandler, r as readBody, e as requestMutation } from '../../../_/nitro.mjs';
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

const addToCartMutation = gql`
	mutation addToCart($input: AddToCartInput!) {
		addToCart(input: $input) {
			cartItem {
				key
				quantity
				product {
					node {
						sku
						slug
						name
					}
				}
				variation {
					node {
						name
						databaseId
						salePrice(format: RAW)
						regularPrice(format: RAW)
						stockQuantity
						stockStatus
						image {
							sourceUrl(size: WOOCOMMERCE_THUMBNAIL)
						}
					}
					attributes {
						value
					}
				}
			}
		}
	}
`;

const add_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  return await requestMutation(event, addToCartMutation, { input: body });
});

export { add_post as default };
//# sourceMappingURL=add.post.mjs.map
