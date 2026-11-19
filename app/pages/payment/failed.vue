<script setup lang="ts">
const route = useRoute();
const { t } = useI18n();

const orderIdRaw = route.query.order_id;
const keyRaw = route.query.key;

const isValidOrderId = (v: unknown): v is string =>
	typeof v === "string" && /^\d+$/.test(v);

const hasRetryInfo = computed(
	() =>
		isValidOrderId(orderIdRaw) &&
		typeof keyRaw === "string" &&
		keyRaw.length > 0,
);

const retryUrl = computed(() => (hasRetryInfo.value ? "/" : null));

const headingRef = ref<HTMLHeadingElement | null>(null);
onMounted(() => {
	headingRef.value?.focus();
});

useSeoMeta({
	title: () => t("checkout.pay.failed_title"),
	robots: "noindex, nofollow",
});
</script>

<template>
	<div class="flex items-center justify-center min-h-[60vh] px-4">
		<div
			class="text-center max-w-md space-y-4"
			role="alert">
			<div
				class="bg-red-500/20 dark:bg-red-700/20 flex rounded-full p-3 mb-1 w-fit mx-auto">
				<UIcon
					name="i-iconamoon-close-circle-1-fill"
					size="46"
					class="text-red-500 dark:text-red-400" />
			</div>
			<h1
				ref="headingRef"
				tabindex="-1"
				class="text-lg font-semibold focus:outline-none">
				{{ $t("checkout.pay.failed_title") }}
			</h1>
			<p class="text-sm text-neutral-500 dark:text-neutral-300">
				{{ $t("checkout.pay.failed_description") }}
			</p>
			<p
				v-if="isValidOrderId(orderIdRaw)"
				class="text-xs text-neutral-400 dark:text-neutral-500">
				{{ $t("checkout.pay.order_reference", { id: orderIdRaw }) }}
			</p>

			<div class="flex flex-col items-center gap-3 mt-4">
				<NuxtLink
					v-if="retryUrl"
					:to="retryUrl"
					class="inline-block px-6 py-2.5 rounded-full bg-[#23a26d] dark:bg-[#40d195] text-white dark:text-black text-sm font-medium">
					{{ $t("checkout.pay.retry") }}
				</NuxtLink>
				<p
					v-else
					class="text-xs text-neutral-400 dark:text-neutral-500">
					{{ $t("checkout.pay.retry_unavailable") }}
				</p>
				<NuxtLink
					to="/"
					class="inline-block px-6 py-2.5 rounded-full bg-black dark:bg-white text-white dark:text-black text-sm font-medium">
					{{ $t("checkout.pay.back_to_shop") }}
				</NuxtLink>
			</div>
		</div>
	</div>
</template>
