import { getProductsQuery } from "~/gql/queries/getProducts";
import { requestQuery } from "~~/server/utils/wpgraphql";

export default cachedEventHandler(
	async (event) => {
		const query = getQuery(event);

		const toBool = (value: unknown) =>
			value === "true" || value === "1" ? true : null;

		const variables = {
			after: query.after ? String(query.after) : null,
			first: query.first ? Number(query.first) : 21,
			search: query.search ? String(query.search) : null,

			category: query.category
				? decodeURIComponent(String(query.category))
				: null,
			onSale: toBool(query.onSale),
			featured: toBool(query.featured),
			order: (query.orderby as string)?.toUpperCase() || "DESC",
			field: (query.fieldby as string)?.toUpperCase() || "DATE",
		};

		try {
			return await requestQuery(getProductsQuery, variables);
		} catch (error) {
			console.error("خطا در اجرای کوئری محصولات:", error);
			throw createError({
				statusCode: 500,
				message: "Server GraphQL Error",
			});
		}
	},
	{
		maxAge: 60,
		swr: true,
		getKey: (event) => event.node.req.url || "products",
	},
);
