<script setup>
useSeoMeta({ title: "پرداخت ناموفق" });
</script>

<template>
	<div class="flex items-center justify-center min-h-[60vh] px-4">
		<div class="text-center max-w-md space-y-4">
			<div
				class="bg-red-500/20 dark:bg-red-700/20 flex rounded-full p-3 mb-1 w-fit mx-auto"
			>
				<UIcon
					name="i-iconamoon-close-circle-1-fill"
					size="46"
					class="text-red-500 dark:text-red-400"
				/>
			</div>
			<h1 class="text-lg font-semibold">
				{{ $t("checkout.pay.failed_title") }}
			</h1>
			<p class="text-sm text-neutral-500 dark:text-neutral-300">
				{{ $t("checkout.pay.failed_description") }}
			</p>
			<NuxtLink
				to="/"
				class="inline-block mt-4 px-6 py-2.5 rounded-full bg-black dark:bg-white text-white dark:text-black text-sm font-medium"
			>
				{{ $t("checkout.pay.back_to_shop") }}
			</NuxtLink>
		</div>
	</div>
</template>
