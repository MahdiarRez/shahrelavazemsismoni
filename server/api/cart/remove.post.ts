// server/api/cart/remove.post.ts
import { removeItemsFromCartMutation } from '~/gql/mutations/removeItemsFromCart';
import { getCartQuery } from '~/gql/queries/getCart';
import { requestMutation, requestCartQuery } from '~~/server/utils/wpgraphql';
import type { RemoveCartResponse, GetCartResponse } from '~~/shared/types';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const keys = Array.isArray(body?.keys) ? body.keys.map(String) : [];

  if (keys.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'شناسه کالای ارسالی برای حذف نامعتبر است',
    });
  }

  try {
    return await requestMutation<RemoveCartResponse>(event, removeItemsFromCartMutation, {
      input: { keys },
    });
  } catch (err: any) {
    // If the item is already not in the cart, treat as successful removal and return current cart
    if (/no items in cart to remove/i.test(err?.message || '')) {
      const current = await requestCartQuery<GetCartResponse>(event, getCartQuery);
      return {
        removeItemsFromCart: {
          cart: current?.cart || {
            total: null,
            subtotal: null,
            isEmpty: true,
            contents: { itemCount: 0, productCount: 0, nodes: [] },
          },
        },
      };
    }
    throw err;
  }
});
