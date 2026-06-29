<!--app/components/home/HomeHero.vue-->
<script setup>
const localePath = useLocalePath();

const stats = [
	{ key: "customers", icon: "i-iconamoon-shopping-bag-fill" },
	{ key: "authentic", icon: "i-iconamoon-shield-yes" },
	{ key: "delivery", icon: "i-iconamoon-delivery-fast" },
];

// decorative floating bubbles with deterministic positions/sizes
const bubbles = [
	{ top: "12%", left: "8%", size: 70, delay: "0s", dur: "7s" },
	{ top: "62%", left: "14%", size: 46, delay: "1.4s", dur: "9s" },
	{ top: "22%", left: "82%", size: 90, delay: "0.6s", dur: "8s" },
	{ top: "70%", left: "76%", size: 56, delay: "2.1s", dur: "10s" },
	{ top: "40%", left: "46%", size: 38, delay: "1s", dur: "6.5s" },
];
</script>

<template>
	<section class="px-3 lg:px-5 pt-3 lg:pt-5">
		<div
			class="hero-card relative overflow-hidden rounded-[36px] bg-primary-600 text-white shadow-[0_20px_60px_-20px_rgba(0,159,214,0.6)]">
			<!-- layered gradient mesh -->
			<div class="hero-mesh pointer-events-none absolute inset-0"></div>

			<!-- floating decorative bubbles -->
			<div class="pointer-events-none absolute inset-0 overflow-hidden">
				<span
					v-for="(b, i) in bubbles"
					:key="i"
					class="hero-bubble absolute rounded-full"
					:style="{
						top: b.top,
						left: b.left,
						width: `${b.size}px`,
						height: `${b.size}px`,
						animationDelay: b.delay,
						animationDuration: b.dur,
					}"></span>
			</div>

			<!-- sparkles -->
			<UIcon
				name="i-iconamoon-star-fill"
				class="hero-twinkle absolute left-[18%] top-[24%] text-white/70"
				size="20" />
			<UIcon
				name="i-iconamoon-star-fill"
				class="hero-twinkle absolute right-[22%] top-[64%] text-secondary-200"
				size="26"
				style="animation-delay: 1.2s" />
			<UIcon
				name="i-iconamoon-star-fill"
				class="hero-twinkle absolute right-[40%] top-[16%] text-white/60"
				size="14"
				style="animation-delay: 0.7s" />

			<div
				class="relative flex flex-col items-center gap-6 px-6 py-16 text-center sm:py-20 lg:py-28">
				<span
					class="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur-md ring-1 ring-inset ring-white/30">
					<span class="relative flex h-2 w-2">
						<span
							class="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary-200 opacity-75"></span>
						<span
							class="relative inline-flex h-2 w-2 rounded-full bg-secondary-300"></span>
					</span>
					{{ $t("home.hero.badge") }}
				</span>

				<h1
					class="max-w-3xl text-3xl font-bold leading-tight drop-shadow-sm sm:text-4xl lg:text-5xl">
					{{ $t("home.hero.title") }}
				</h1>
				<p
					class="max-w-xl text-base font-medium text-white/90 sm:text-lg">
					{{ $t("home.hero.subtitle") }}
				</p>

				<div
					class="mt-2 flex flex-col items-center gap-3 sm:flex-row-reverse">
					<NuxtLink
						:to="localePath('/shop')"
						class="group flex h-14 items-center justify-center gap-2 rounded-full bg-white px-8 text-lg font-bold text-primary-600 shadow-lg transition hover:brightness-95 active:scale-95">
						{{ $t("home.hero.cta_primary") }}
						<UIcon
							name="i-iconamoon-arrow-left-2-bold"
							class="transition-transform group-hover:-translate-x-1"
							size="22" />
					</NuxtLink>
					<NuxtLink
						:to="localePath('/categories')"
						class="flex h-14 items-center justify-center rounded-full bg-white/15 px-8 text-lg font-semibold text-white ring-1 ring-inset ring-white/50 backdrop-blur-md transition hover:bg-white/25 active:scale-95">
						{{ $t("home.hero.cta_secondary") }}
					</NuxtLink>
				</div>

				<!-- trust stats -->
				<div
					class="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
					<div
						v-for="stat in stats"
						:key="stat.key"
						class="flex flex-row-reverse items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-md ring-1 ring-inset ring-white/20">
						<UIcon
							:name="stat.icon"
							size="18"
							class="text-secondary-200" />
						<span>{{ $t(`home.hero.stats.${stat.key}`) }}</span>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<style scoped>
.hero-mesh {
	background:
		radial-gradient(
			40% 55% at 82% 18%,
			rgba(255, 197, 218, 0.55) 0%,
			rgba(255, 197, 218, 0) 60%
		),
		radial-gradient(
			45% 60% at 12% 85%,
			rgba(117, 223, 255, 0.5) 0%,
			rgba(117, 223, 255, 0) 60%
		),
		radial-gradient(
			55% 70% at 50% 0%,
			rgba(255, 255, 255, 0.25) 0%,
			rgba(255, 255, 255, 0) 55%
		);
}

.hero-bubble {
	background: radial-gradient(
		circle at 30% 30%,
		rgba(255, 255, 255, 0.45),
		rgba(255, 255, 255, 0.08)
	);
	animation-name: hero-float;
	animation-timing-function: ease-in-out;
	animation-iteration-count: infinite;
}

@keyframes hero-float {
	0%,
	100% {
		transform: translateY(0) translateX(0);
		opacity: 0.7;
	}
	50% {
		transform: translateY(-22px) translateX(8px);
		opacity: 1;
	}
}

.hero-twinkle {
	animation: hero-twinkle 2.6s ease-in-out infinite;
}

@keyframes hero-twinkle {
	0%,
	100% {
		transform: scale(0.8);
		opacity: 0.4;
	}
	50% {
		transform: scale(1.15);
		opacity: 1;
	}
}

@media (prefers-reduced-motion: reduce) {
	.hero-bubble,
	.hero-twinkle {
		animation: none;
	}
}
</style>
