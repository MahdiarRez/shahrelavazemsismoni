import { f as cachedEventHandler, j as getQuery, g as requestQuery } from '../../_/nitro.mjs';
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

const getSearchProductsQuery = gql`
  query getSearchProducts($search: String) {
    products(first: 6, where: { stockStatus: IN_STOCK, search: $search }) {
      nodes {
        ... on VariableProduct {
          sku
          slug
          name
          regularPrice
          salePrice
          image {
            sourceUrl(size: WOOCOMMERCE_THUMBNAIL)
          }
          galleryImages {
            nodes {
              sourceUrl(size: WOOCOMMERCE_THUMBNAIL)
            }
          }
        }
      }
    }
  }
`;

const search_get = cachedEventHandler(
  async (event) => {
    const { search = "" } = getQuery(event);
    return await requestQuery(getSearchProductsQuery, { search });
  },
  {
    maxAge: 60,
    swr: true,
    getKey: (event) => event.req.url
  }
);

export { search_get as default };
//# sourceMappingURL=search.get.mjs.map
