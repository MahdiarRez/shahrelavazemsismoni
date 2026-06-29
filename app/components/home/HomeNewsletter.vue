<!--app/components/home/HomeNewsletter.vue-->
<script setup>
import { push } from "notivue";
import { z } from "zod";

const { t } = useI18n();

const email = ref("");
const status = ref("idle");
const errorMsg = ref("");

const emailSchema = z.string().email();

const submit = async () => {
	errorMsg.value = "";
	const result = emailSchema.safeParse(email.value);

	if (!result.success) {
		errorMsg.value = t("home.newsletter.invalid");
		return;
	}

	try {
		status.value = "loading";
		await $fetch("/api/newsletter", {
			method: "POST",
			body: { email: email.value },
		});
		status.value = "success";
		email.value = "";
		push.success(t("home.newsletter.success"));
	} catch {
		status.value = "idle";
		push.error(t("home.newsletter.error"));
	}
};
</script>

<template>
	<section class="px-3 lg:px-5 py-8 lg:py-12">
		<div
			class="overflow-hidden rounded-[32px] bg-black/5 px-6 py-12 text-center dark:bg-white/10 lg:py-16">
			<div
				class="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-primary-500/15 text-primary-600 dark:text-primary-300">
				<UIcon
					name="i-iconamoon-email"
					size="28" />
			</div>
			<h2 class="text-2xl font-bold lg:text-3xl">
				{{ $t("home.newsletter.title") }}
			</h2>
			<p
				class="mx-auto mt-2 max-w-md text-sm font-medium text-neutral-500 dark:text-neutral-400">
				{{ $t("home.newsletter.subtitle") }}
			</p>

			<form
				@submit.prevent="submit"
				novalidate
				class="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row-reverse">
				<input
					v-model="email"
					type="email"
					dir="ltr"
					:placeholder="$t('home.newsletter.placeholder')"
					class="h-14 w-full rounded-full border-2 border-transparent bg-white px-5 text-right font-medium text-black shadow transition placeholder:text-right placeholder:text-neutral-400 focus-visible:border-primary-400 focus-visible:outline-none dark:bg-black/30 dark:text-white"
					:class="{ '!border-red-500/80': errorMsg }"
					@input="errorMsg = ''" />
				<button
					type="submit"
					:disabled="status === 'loading'"
					class="flex h-14 flex-none items-center justify-center rounded-full bg-primary-500 px-8 text-lg font-semibold text-white shadow-lg transition hover:brightness-110 active:scale-95 disabled:opacity-70">
					<UIcon
						v-if="status === 'loading'"
						name="i-svg-spinners-90-ring-with-bg"
						size="22" />
					<span v-else>{{ $t("home.newsletter.cta") }}</span>
				</button>
			</form>
			<p
				v-if="errorMsg"
				class="mt-2 text-sm font-medium text-red-500">
				{{ errorMsg }}
			</p>
		</div>
	</section>
</template>
