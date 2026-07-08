// server/api/categories.get.ts
import { getCategoriesQuery } from "~/gql/queries/getCategories";
import { requestQuery } from "~~/server/utils/wpgraphql";

// The category tree is an expensive, deeply-nested query (three levels of
// children, each up to 100 nodes with images) that changes rarely, so cache it
// aggressively with stale-while-revalidate to keep WordPress load low.
export default cachedEventHandler(
	async () => {
		return await requestQuery(getCategoriesQuery);
	},
	{
		maxAge: 60 * 10,
		swr: true,
		getKey: () => "categories",
	},
);
