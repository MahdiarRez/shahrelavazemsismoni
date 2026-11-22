// server/api/cart/empty.post.ts
import { emptyCartMutation } from '~/gql/mutations/emptyCart';
import { requestMutation } from '~~/server/utils/wpgraphql';
import type { EmptyCartResponse } from '~~/shared/types';

export default defineEventHandler(async (event) => {
  try {
    return await requestMutation<EmptyCartResponse>(event, emptyCartMutation, {
      input: { clearPersistentCart: true },
    });
  } catch (err: any) {
    if (/cart is empty/i.test(err?.message || '')) {
      return {
        emptyCart: {
          cart: {
            total: null,
            subtotal: null,
            isEmpty: true,
            contents: {
              itemCount: 0,
              productCount: 0,
              nodes: [],
            },
          },
        },
      };
    }
    throw err;
  }
});
