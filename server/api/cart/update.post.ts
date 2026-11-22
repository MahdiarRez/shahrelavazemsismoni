// server/api/cart/update.post.ts
import { updateItemQuantitiesMutation } from '~/gql/mutations/updateItemQuantities';
import { requestMutation } from '~~/server/utils/wpgraphql';
import type { UpdateCartResponse } from '~~/shared/types';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const rawItems = body?.items;

  if (!Array.isArray(rawItems) || rawItems.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'اقلام ارسالی برای به‌روزرسانی نامعتبر است',
    });
  }

  const items = rawItems.map((item: any) => ({
    key: String(item.key),
    quantity: Math.max(0, Math.floor(Number(item.quantity) || 0)),
  }));

  return await requestMutation<UpdateCartResponse>(event, updateItemQuantitiesMutation, {
    input: { items },
  });
});
