<!--app/components/home/HomePromoBanner.vue-->
<script setup>
const localePath = useLocalePath();
</script>

<template>
	<section class="px-3 lg:px-5 pt-8 lg:pt-12">
		<div
			class="relative overflow-hidden rounded-[32px] bg-gradient-to-l from-secondary-400 via-secondary-300 to-secondary-200 dark:from-secondary-700 dark:via-secondary-600 dark:to-secondary-500">
			<div
				class="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/25 blur-3xl"></div>
			<div
				class="relative flex flex-col items-center gap-5 px-6 py-12 text-center sm:flex-row-reverse sm:justify-between sm:text-right lg:px-12 lg:py-14">
				<div class="space-y-2">
					<h2
						class="text-2xl font-bold text-white lg:text-3xl">
						{{ $t("home.promo.title") }}
					</h2>
					<p class="max-w-xl text-sm font-medium text-white/90 lg:text-base">
						{{ $t("home.promo.subtitle") }}
					</p>
				</div>
				<NuxtLink
					:to="localePath('/shop?onSale=true')"
					class="flex h-14 flex-none items-center justify-center rounded-full bg-white px-8 text-lg font-semibold text-secondary-600 shadow-lg transition hover:brightness-95 active:scale-95">
					{{ $t("home.promo.cta") }}
				</NuxtLink>
			</div>
		</div>
	</section>
</template>
