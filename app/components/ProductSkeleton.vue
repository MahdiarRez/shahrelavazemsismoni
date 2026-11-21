<!--app/components/ProductSkeleton.vue-->
<template>
	<div class="justify-center flex flex-col lg:flex-row-reverse lg:mx-5">
		<ButtonBack />
		<div class="mr-6 mt-5 pt-2.5 gap-3 flex flex-col max-xl:hidden">
			<div
				class="h-20 w-14 p-1 relative"
				v-for="i in 6"
				:key="i">
				<div
					class="skeleton bg-neutral-200/70 dark:bg-neutral-800/80 w-full h-full rounded-lg"></div>
			</div>
		</div>
		<div
			class="flex lg:p-5 lg:gap-5 flex-col w-full lg:w-[1110px] lg:flex-row-reverse lg:border lg:border-transparent lg:dark:border-[#262626] lg:rounded-[32px] lg:shadow-[0_1px_20px_rgba(0,0,0,.15)] lg:mt-2.5">
			<!-- Image skeleton -->
			<div
				class="w-full aspect-square sm:aspect-[4/3] lg:aspect-auto lg:w-[530px] lg:h-[530px] xl:w-[600px] xl:h-[600px] lg:rounded-2xl overflow-hidden skeleton bg-neutral-200/70 dark:bg-neutral-800/80"></div>

			<!-- Info skeleton -->
			<div class="w-full lg:max-w-[28rem] p-4 lg:p-0 flex flex-col gap-4">
				<div
					class="h-8 w-3/4 skeleton bg-neutral-200/70 dark:bg-neutral-800/80 rounded-xl"></div>
				<div
					class="h-4 w-1/3 skeleton bg-neutral-200/70 dark:bg-neutral-800/80 rounded-lg"></div>
				<div
					class="h-6 w-1/2 skeleton bg-neutral-200/70 dark:bg-neutral-800/80 rounded-lg"></div>
				<div
					class="h-12 w-full skeleton bg-neutral-200/70 dark:bg-neutral-800/80 rounded-full mt-4"></div>
			</div>
		</div>
	</div>
</template>
