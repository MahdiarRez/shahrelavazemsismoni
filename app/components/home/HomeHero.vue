<!--app/components/home/HomeHero.vue-->
<script setup>
const localePath = useLocalePath();

const stats = [
	{ key: "customers", icon: "i-iconamoon-shopping-bag-fill" },
	{ key: "authentic", icon: "i-iconamoon-shield-yes" },
	{ key: "delivery", icon: "i-iconamoon-delivery-fast" },
];

// decorative floating bubbles with deterministic positions/sizes
// `hideOnMobile` trims visual noise on small screens without extra JS logic
const bubbles = [
	{
		top: "12%",
		left: "8%",
		size: 70,
		delay: "0s",
		dur: "7s",
		hideOnMobile: true,
	},
	{
		top: "62%",
		left: "14%",
		size: 46,
		delay: "1.4s",
		dur: "9s",
		hideOnMobile: false,
	},
	{
		top: "22%",
		left: "82%",
		size: 90,
		delay: "0.6s",
		dur: "8s",
		hideOnMobile: true,
	},
	{
		top: "70%",
		left: "76%",
		size: 56,
		delay: "2.1s",
		dur: "10s",
		hideOnMobile: true,
	},
	{
		top: "40%",
		left: "46%",
		size: 38,
		delay: "1s",
		dur: "6.5s",
		hideOnMobile: false,
	},
];
</script>

<template>
	<section class="px-3 lg:px-5 pt-3 lg:pt-5 mb-5 relative">
		<div
			class="hero-card relative overflow-hidden rounded-[36px] bg-secondary-500 text-white shadow-[0_20px_60px_-20px_rgba(0,159,214,0.6)]">
			<!-- happy-color crossfade background (opacity-only, GPU composited) -->
			<div
				class="pointer-events-none absolute inset-0"
				aria-hidden="true">
				<span class="hero-color-layer hero-color-layer--1"></span>
				<span class="hero-color-layer hero-color-layer--2"></span>
				<span class="hero-color-layer hero-color-layer--3"></span>
				<span class="hero-color-layer hero-color-layer--4"></span>
			</div>

			<!-- layered gradient mesh (texture on top of the color cycle) -->
			<div class="hero-mesh pointer-events-none absolute inset-0"></div>

			<!-- floating decorative bubbles -->
			<div class="pointer-events-none absolute inset-0 overflow-hidden">
				<span
					v-for="(b, i) in bubbles"
					:key="i"
					class="hero-bubble absolute rounded-full"
					:class="b.hideOnMobile ? 'hidden sm:block' : ''"
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
				class="hero-twinkle hidden sm:block absolute left-[18%] top-[24%] text-white/70"
				size="20" />
			<UIcon
				name="i-iconamoon-star-fill"
				class="hero-twinkle absolute right-[22%] top-[64%] text-secondary-200"
				size="22"
				style="animation-delay: 1.2s" />
			<UIcon
				name="i-iconamoon-star-fill"
				class="hero-twinkle hidden sm:block absolute right-[40%] top-[16%] text-white/60"
				size="14"
				style="animation-delay: 0.7s" />

			<div
				class="relative flex flex-col items-center gap-5 sm:gap-6 px-4 sm:px-6 py-12 text-center sm:py-20 lg:py-28 overflow-hidden">
				<h1
					class="max-w-xs leading-[1.4] font-bold drop-shadow-sm text-3xl sm:text-5xl sm:max-w-[640px] sm:leading-[1.5] lg:text-6xl lg:leading-[1.5] lg:max-w-[860px]">
					{{ $t("home.hero.title") }}
				</h1>
				<p
					class="max-w-[18rem] text-sm font-medium text-white/90 sm:max-w-none sm:text-lg text-center lg:text-xl">
					{{ $t("home.hero.subtitle") }}
				</p>

				<div
					class="mt-2 flex w-full max-w-[22rem] flex-row gap-3 sm:w-auto sm:max-w-none sm:flex-row-reverse sm:items-center">
					<NuxtLink
						:to="localePath('/shop')"
						class="group flex h-11 sm:h-14 w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-primary-400 px-4 sm:px-8 text-xs text-nowrap sm:text-lg font-bold text-white shadow-lg transition hover:brightness-95 active:scale-95">
						{{ $t("home.hero.cta_primary") }}
						<UIcon
							name="i-iconamoon-arrow-left-2-bold"
							class="transition-transform group-hover:-translate-x-1"
							size="22" />
					</NuxtLink>
					<NuxtLink
						:to="localePath('/categories')"
						class="flex h-11 sm:h-14 w-full sm:w-auto items-center justify-center rounded-full bg-white/25 px-4 sm:px-8 text-xs text-nowrap sm:text-lg font-semibold text-white ring-1 ring-inset ring-white/50 backdrop-blur-md transition hover:bg-white/35 active:scale-95">
						{{ $t("home.hero.cta_secondary") }}
					</NuxtLink>
				</div>

				<!-- trust stats -->
				<div
					class="mt-4 sm:mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
					<div
						v-for="stat in stats"
						:key="stat.key"
						class="flex flex-row items-center gap-2 rounded-full bg-white/10 px-3.5 py-2 text-xs sm:text-sm font-semibold backdrop-blur-md ring-1 ring-inset ring-white/20">
						<UIcon
							:name="stat.icon"
							size="16"
							class="text-secondary-200" />
						<span>{{ $t(`home.hero.stats.${stat.key}`) }}</span>
					</div>
				</div>
			</div>
		</div>

		<UIcon
			name="i-iconamoon-arrow-down-1"
			size="50px"
			class="scroll-hint absolute -bottom-5 left-0 rounded-full text-gray-500/70 hidden sm:block" />
	</section>
</template>

<style scoped>
/*
 * Happy-color background cycle.
 * 4 pre-painted gradient layers stacked absolutely, each fading in/out
 * via `opacity` only — opacity is a compositor property, so the browser
 * never repaints or reflows the layout during the transition, it just
 * blends cached GPU textures. Delays are staggered by 1/4 of the total
 * duration so each fade-in overlaps the previous fade-out, producing a
 * smooth crossfade rather than a hard cut.
 */
.hero-color-layer {
	position: absolute;
	inset: 0;
	opacity: 0;
	animation: hero-color-fade 24s ease-in-out infinite;
	will-change: opacity;
}

.hero-color-layer--1 {
	background: linear-gradient(135deg, #22c7ff 0%, #0091d5 100%);
	animation-delay: 0s;
}
.hero-color-layer--2 {
	background: linear-gradient(135deg, #ff8fa3 0%, #ff5d8f 100%);
	animation-delay: 6s;
}
.hero-color-layer--3 {
	background: linear-gradient(135deg, #ffd166 0%, #ff9f1c 100%);
	animation-delay: 12s;
}
.hero-color-layer--4 {
	background: linear-gradient(135deg, #6ee7b7 0%, #14b8a6 100%);
	animation-delay: 18s;
}

@keyframes hero-color-fade {
	0%,
	100% {
		opacity: 0;
	}
	10% {
		opacity: 1;
	}
	20% {
		opacity: 1;
	}
	35% {
		opacity: 0;
	}
}

.hero-mesh {
	background: radial-gradient(
			40% 55% at 82% 18%,
			rgba(255, 197, 218, 0.55) 0%,
			rgba(255, 197, 218, 0) 60%
		),
		radial-gradient(
			45% 60% at 12% 85%,
			rgba(245, 255, 99, 0.323) 0%,
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
	will-change: transform;
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
	will-change: transform, opacity;
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
	.hero-twinkle,
	.hero-color-layer {
		animation: none;
	}
	.hero-color-layer {
		opacity: 0;
	}
	.hero-color-layer--1 {
		opacity: 1;
	}
}

.scroll-hint {
	animation: scroll-hint-bob 2.4s ease-in-out infinite;
	will-change: transform;
}

@keyframes scroll-hint-bob {
	0%,
	100% {
		transform: translateX(50%) translateY(0);
		opacity: 0.3;
	}
	50% {
		transform: translateX(50%) translateY(20px);
		opacity: 100;
	}
}

@media (prefers-reduced-motion: reduce) {
	.scroll-hint {
		animation: none;
		transform: translateX(50%);
	}
}
</style>
