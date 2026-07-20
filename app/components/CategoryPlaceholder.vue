<script setup></script>

<template>
	<div
		aria-hidden="true"
		class="category-placeholder bg-gradient-to-br to-secondary-400 via-primary-400/80 from-secondary-500 w-full h-full absolute top-0 right-0 rounded-[32px] overflow-hidden">
		<span class="category-placeholder__sheen"></span>
	</div>
</template>

<style scoped>
.category-placeholder {
	background-size: 220% 220%;
	animation: category-gradient-drift 9s ease-in-out infinite;
	will-change: background-position;
}

.category-placeholder__sheen {
	position: absolute;
	inset: -60%;
	display: block;
	background: conic-gradient(
		from 0deg,
		transparent 0deg,
		rgba(255, 255, 255, 0.22) 50deg,
		transparent 130deg,
		transparent 360deg
	);
	mix-blend-mode: overlay;
	animation: category-sheen-spin 7s linear infinite;
	will-change: transform;
}

@keyframes category-gradient-drift {
	0%,
	100% {
		background-position: 0% 0%;
	}
	50% {
		background-position: 100% 100%;
	}
}

@keyframes category-sheen-spin {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
}

@media (prefers-reduced-motion: reduce) {
	.category-placeholder,
	.category-placeholder__sheen {
		animation: none;
	}
}
</style>
