import { z } from "zod";
import { createError, readBody } from "h3";

const bodySchema = z.object({
	email: z.string().email(),
});

export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const result = bodySchema.safeParse(body);

	if (!result.success) {
		throw createError({
			statusCode: 400,
			message: "Invalid email address",
		});
	}

	// Integration point: forward result.data.email to a newsletter provider
	// (Mailchimp, a WordPress endpoint, etc.). Intentionally a no-op for now.
	return { ok: true };
});
