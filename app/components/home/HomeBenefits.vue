<!--app/components/home/HomeBenefits.vue-->
<script setup>
const benefits = [
	{ icon: "i-iconamoon-delivery-fast", key: "shipping" },
	{ icon: "i-iconamoon-shield-yes", key: "secure" },
	{ icon: "i-iconamoon-restart", key: "returns" },
	{ icon: "i-iconamoon-comment-dots", key: "support" },
];
</script>

<template>
	<section class="px-3 lg:px-5 pt-3 lg:pt-5">
		<div
			class="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
			<div
				v-for="benefit in benefits"
				:key="benefit.key"
				class="flex flex-row-reverse items-center gap-3 rounded-[24px] bg-black/5 p-4 dark:bg-white/10">
				<div
					class="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-primary-500/15 text-primary-600 dark:text-primary-300">
					<UIcon
						:name="benefit.icon"
						size="26" />
				</div>
				<div class="text-right">
					<div class="text-sm font-semibold">
						{{ $t(`home.benefits.${benefit.key}.title`) }}
					</div>
					<div
						class="text-xs font-medium text-neutral-500 dark:text-neutral-400">
						{{ $t(`home.benefits.${benefit.key}.description`) }}
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
