import { c as defineEventHandler, k as setHeader, l as getRequestURL } from '../_/nitro.mjs';
import 'graphql-request';
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

const robots_txt = defineEventHandler((event) => {
  setHeader(event, "Content-Type", "text/plain; charset=utf-8");
  const { origin } = getRequestURL(event);
  return `User-agent: *
Allow: /
Sitemap: ${origin}/sitemap.xml
`;
});

export { robots_txt as default };
//# sourceMappingURL=robots.txt.mjs.map
