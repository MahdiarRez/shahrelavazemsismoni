// server/api/cart/empty.post.ts
import { emptyCartMutation } from "~/gql/mutations/emptyCart";
import { requestMutation } from "~~/server/utils/wpgraphql";

export default defineEventHandler(async (event) => {
	return await requestMutation(event, emptyCartMutation, {
		input: { clearPersistentCart: true },
	});
});
