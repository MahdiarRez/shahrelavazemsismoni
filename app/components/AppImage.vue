<!--app/components/AppImage.vue-->
<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";

interface Props {
	src?: string | null;
	alt?: string;
	loading?: "lazy" | "eager";
	priority?: boolean;
	fit?: "cover" | "contain";
	aspectRatio?: string;
	width?: number | string;
	height?: number | string;
	class?: any;
	imgClass?: any;
	fallbackIcon?: string;
	fallbackText?: string;
	draggable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	src: "",
	alt: "",
	loading: "lazy",
	priority: false,
	fit: "cover",
	fallbackIcon: "i-iconamoon-image-duotone",
	draggable: false,
});

type ImageStatus = "loading" | "loaded" | "error";

const status = ref<ImageStatus>(props.src ? "loading" : "error");
const imgRef = ref<any>(null);

function onLoad() {
	status.value = "loaded";
}

function onError() {
	status.value = "error";
}

watch(
	() => props.src,
	(newSrc) => {
		if (!newSrc) {
			status.value = "error";
		} else {
			status.value = "loading";
		}
	},
);

onMounted(() => {
	// If image is already cached in browser memory, mark as loaded immediately
	const el: any = imgRef.value?.$el || imgRef.value;
	if (el && typeof el === "object" && "complete" in el && el.complete) {
		if (el.naturalWidth > 0) {
			status.value = "loaded";
		} else if (props.src) {
			status.value = "error";
		}
	}
});

const containerStyle = computed(() => {
	if (props.aspectRatio) {
		return { aspectRatio: props.aspectRatio };
	}
	return undefined;
});
</script>

<template>
	<div
		:class="[
			'relative overflow-hidden bg-neutral-100 dark:bg-neutral-800/80',
			$props.class,
		]"
		:style="containerStyle">
		<!-- Loading Skeleton -->
		<div
			v-if="status === 'loading'"
			class="absolute inset-0 z-10 flex items-center justify-center bg-neutral-200/80 dark:bg-neutral-800 animate-pulse pointer-events-none">
			<UIcon
				:name="fallbackIcon"
				class="text-neutral-300 dark:text-neutral-700 opacity-60"
				size="26" />
		</div>

		<!-- Error Fallback -->
		<div
			v-else-if="status === 'error'"
			class="absolute inset-0 z-10 flex flex-col items-center justify-center p-2 text-center text-neutral-400 dark:text-neutral-500 bg-neutral-100 dark:bg-neutral-850 select-none">
			<UIcon
				:name="fallbackIcon"
				size="30"
				class="opacity-50 mb-1" />
			<span
				v-if="fallbackText"
				class="text-[10px] sm:text-xs font-medium opacity-70 line-clamp-1">
				{{ fallbackText }}
			</span>
		</div>

		<!-- Main Image via NuxtImg -->
		<NuxtImg
			v-if="src && status !== 'error'"
			ref="imgRef"
			:src="src"
			:alt="alt"
			:width="width"
			:height="height"
			:loading="priority ? 'eager' : loading"
			:preload="priority"
			:fetchpriority="priority ? 'high' : 'auto'"
			:draggable="draggable"
			@load="onLoad"
			@error="onError"
			:class="[
				'w-full h-full select-none',
				fit === 'contain' ? 'object-contain' : 'object-cover',
				imgClass,
				status === 'loaded'
					? 'opacity-100 transition-opacity duration-300'
					: 'opacity-0',
			]" />
	</div>
</template>
