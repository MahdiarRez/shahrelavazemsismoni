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

const updateItemQuantitiesMutation = gql`
  mutation updateItemQuantities($input: UpdateItemQuantitiesInput!) {
    updateItemQuantities(input: $input) {
      items {
        key
      }
    }
  }
`;

const update_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  return await requestMutation(event, updateItemQuantitiesMutation, { input: body });
});

export { update_post as default };
//# sourceMappingURL=update.post.mjs.map
