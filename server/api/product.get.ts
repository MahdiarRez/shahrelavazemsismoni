// server/api/product.get.ts
import { getProductQuery } from '~/gql/queries/getProduct';
import { requestQuery } from '~~/server/utils/wpgraphql';

export default cachedEventHandler(
  async event => {
    const { slug, sku } = getQuery(event) as { slug?: string; sku?: string };
    const cleanSku = sku && sku !== 'null' && sku !== 'undefined' ? sku : undefined;

    if (!cleanSku) {
      return { product: null };
    }

    return await requestQuery(getProductQuery, { slug, sku: cleanSku });
  },
  {
    maxAge: 60 * 5,
    swr: true,
    getKey: event => event.req.url!,
  }
);
