// server/api/cart/index.get.ts
import { getCartQuery } from '~/gql/queries/getCart';
import { requestCartQuery } from '~~/server/utils/wpgraphql';
import type { GetCartResponse } from '~~/shared/types';

export default defineEventHandler(async (event) => {
  const result = await requestCartQuery<GetCartResponse>(event, getCartQuery);

  if (!result || !result.cart) {
    return {
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
    };
  }

  return { cart: result.cart };
});
