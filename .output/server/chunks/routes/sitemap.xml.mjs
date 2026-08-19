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

const sitemap_xml = defineEventHandler((event) => {
  setHeader(event, "Content-Type", "application/xml; charset=utf-8");
  const { origin } = getRequestURL(event);
  const routes = ["/", "/categories", "/favorites"];
  const body = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'];
  for (const r of routes) body.push(`  <url><loc>${origin}${r}</loc></url>`);
  body.push("</urlset>");
  return body.join("\n");
});

export { sitemap_xml as default };
//# sourceMappingURL=sitemap.xml.mjs.map
