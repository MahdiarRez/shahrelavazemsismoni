import { c as defineEventHandler, e as requestMutation } from '../../../_/nitro.mjs';
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

const emptyCartMutation = gql`
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

const empty_post = defineEventHandler(async (event) => {
  return await requestMutation(event, emptyCartMutation, {
    input: { clearPersistentCart: true }
  });
});

export { empty_post as default };
//# sourceMappingURL=empty.post.mjs.map
