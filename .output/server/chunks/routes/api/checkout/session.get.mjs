import { c as defineEventHandler, u as useRuntimeConfig, h as createError, i as getWooSessionId } from '../../../_/nitro.mjs';
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

const session_get = defineEventHandler((event) => {
  const config = useRuntimeConfig();
  const wpBase = (config.public.wpBaseUrl || "").replace(/\/$/, "");
  if (!wpBase) {
    throw createError({
      statusCode: 500,
      message: "NUXT_PUBLIC_WP_BASE_URL is not configured"
    });
  }
  const sessionId = getWooSessionId(event);
  if (!sessionId) {
    throw createError({
      statusCode: 409,
      message: "No active cart session to check out"
    });
  }
  const checkoutUrl = `${wpBase}/checkout/?session_id=${encodeURIComponent(sessionId)}`;
  return { checkoutUrl };
});

export { session_get as default };
//# sourceMappingURL=session.get.mjs.map
