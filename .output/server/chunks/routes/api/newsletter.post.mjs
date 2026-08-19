import { c as defineEventHandler, r as readBody, h as createError } from '../../_/nitro.mjs';
import { z } from 'zod';
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

const bodySchema = z.object({
  email: z.string().email()
});
const newsletter_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const result = bodySchema.safeParse(body);
  if (!result.success) {
    throw createError({
      statusCode: 400,
      message: "Invalid email address"
    });
  }
  return { ok: true };
});

export { newsletter_post as default };
//# sourceMappingURL=newsletter.post.mjs.map
