// server/api/cart/add.post.ts
import { addToCartMutation } from '~/gql/mutations/addToCart';
import { requestMutation } from '~~/server/utils/wpgraphql';
import type { AddToCartResponse } from '~~/shared/types';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const productId = Number(body?.productId);
  const variationId = body?.variationId ? Number(body.variationId) : undefined;

  if (!productId || isNaN(productId)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'شناسه محصول نامعتبر است',
    });
  }

  const quantity = Math.max(1, Number(body?.quantity) || 1);

  const input: { productId: number; quantity: number; variationId?: number } = {
    productId,
    quantity,
  };

  if (variationId && !isNaN(variationId)) {
    input.variationId = variationId;
  }

  return await requestMutation<AddToCartResponse>(event, addToCartMutation, {
    input,
  });
});
