<!--app/components/AppFooter.vue-->
<script setup>
const colorMode = useColorMode();
const { locale, locales, setLocale } = useI18n();
const localePath = useLocalePath();
const { name, description, phone, email, socials } = useAppConfig().site;

const isOpen = ref(false);
const dropdownRef = ref();

const year = new Date().getFullYear();

const toggleDark = () => {
	colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
};

const colorModeIcon = computed(() =>
	colorMode.preference === "dark"
		? "i-iconamoon-mode-dark-fill"
		: "i-iconamoon-mode-light-fill",
);

onClickOutside(dropdownRef, () => (isOpen.value = false));

const currentLocale = computed(() =>
	locales.value.find((l) => l.code === locale.value),
);

const chooseLocale = (code) => {
	setLocale(code);
	isOpen.value = false;
};

const quickLinks = [
	{ labelKey: "nav.shop", to: localePath("/shop") },
	{ labelKey: "nav.categories", to: localePath("/categories") },
	{ labelKey: "nav.favorites", to: localePath("/favorites") },
];
</script>

<template>
	<footer
		class="mt-12 border-t border-black/10 bg-black/[0.03] dark:border-white/10 dark:bg-white/[0.03]">
		<div
			class="mx-auto grid max-w-screen-2xl grid-cols-2 gap-8 px-5 py-12 text-right md:grid-cols-4 lg:px-8">
			<!-- Brand -->
			<div class="col-span-2 md:col-span-1">
				<div class="mb-3 flex flex-row-reverse items-center gap-2">
					<img
						class="h-9 w-9 rounded-full bg-secondary-600"
						src="/logo.jpeg"
						alt="Logo"
						loading="lazy" />
					<span class="text-base font-bold">{{ name }}</span>
				</div>
				<p
					class="text-sm leading-6 text-secondary-text dark:text-secondary-text-d">
					{{ $t("footer.about") }}
				</p>
				<div
					v-if="socials?.length"
					class="mt-4 flex flex-row-reverse gap-2">
					<a
						v-for="social in socials"
						:key="social.label"
						:href="social.url"
						:aria-label="social.label"
						target="_blank"
						rel="noopener noreferrer"
						class="flex h-10 w-10 items-center justify-center rounded-full bg-black/5 text-neutral-600 transition hover:bg-primary-500 hover:text-white active:scale-95 dark:bg-white/10 dark:text-neutral-300">
						<UIcon
							:name="social.icon"
							size="20" />
					</a>
				</div>
			</div>

			<!-- Quick links -->
			<div>
				<h3 class="mb-4 text-sm font-bold">
					{{ $t("footer.quick_links") }}
				</h3>
				<ul class="space-y-2.5">
					<li
						v-for="link in quickLinks"
						:key="link.to">
						<NuxtLink
							:to="link.to"
							class="text-sm font-medium text-secondary-text transition hover:text-primary-600 dark:text-secondary-text-d dark:hover:text-primary-300">
							{{ $t(link.labelKey) }}
						</NuxtLink>
					</li>
				</ul>
			</div>

			<!-- Customer service -->
			<div>
				<h3 class="mb-4 text-sm font-bold">
					{{ $t("footer.customer_service") }}
				</h3>
				<ul class="space-y-2.5">
					<li v-if="phone">
						<a
							:href="`tel:${phone}`"
							dir="ltr"
							class="flex flex-row-reverse items-center gap-2 text-sm font-medium text-secondary-text transition hover:text-primary-600 dark:text-secondary-text-d dark:hover:text-primary-300">
							<UIcon
								name="i-iconamoon-phone"
								size="18" />
							<span>{{ phone }}</span>
						</a>
					</li>
					<li v-if="email">
						<a
							:href="`mailto:${email}`"
							dir="ltr"
							class="flex flex-row-reverse items-center gap-2 text-sm font-medium text-secondary-text transition hover:text-primary-600 dark:text-secondary-text-d dark:hover:text-primary-300">
							<UIcon
								name="i-iconamoon-email"
								size="18" />
							<span>{{ email }}</span>
						</a>
					</li>
				</ul>
			</div>

			<!-- Trust -->
			<div>
				<h3 class="mb-4 text-sm font-bold">
					{{ $t("footer.trust_title") }}
				</h3>
				<div
					class="flex flex-row-reverse items-center gap-2 rounded-2xl bg-black/5 p-3 dark:bg-white/10">
					<UIcon
						name="i-iconamoon-shield-yes"
						size="22"
						class="text-primary-600 dark:text-primary-300" />
					<span class="text-xs font-medium leading-5">
						{{ $t("footer.trust_text") }}
					</span>
				</div>
			</div>
		</div>

		<!-- Bottom bar -->
		<div
			class="border-t border-black/10 dark:border-white/10">
			<div
				class="mx-auto flex max-w-screen-2xl flex-col-reverse items-center justify-between gap-3 px-5 py-5 sm:flex-row lg:px-8">
				<p
					class="text-[13px] font-semibold text-secondary-text dark:text-secondary-text-d">
					{{ $t("footer.copyright", { year, name }) }}
				</p>

				<div class="flex items-center gap-3">
					<!-- Language -->
					<div
						v-if="locales?.length > 1"
						class="relative"
						ref="dropdownRef">
						<UTooltip
							:text="$t('footer.change_language')"
							:open-delay="800">
							<button
								type="button"
								@click="isOpen = !isOpen"
								:aria-expanded="isOpen"
								aria-haspopup="listbox"
								class="flex h-8 items-center gap-1.5 rounded-lg bg-neutral-800/5 p-2 text-[13px] font-semibold text-secondary-text transition-all hover:bg-neutral-800/10 hover:text-black active:scale-95 dark:bg-white/10 dark:text-secondary-text-d hover:dark:bg-white/20 hover:dark:text-neutral-100">
								{{ currentLocale.name }}
							</button>
						</UTooltip>

						<Transition name="dropdown">
							<div
								v-if="isOpen"
								class="absolute bottom-full left-0 z-10 mb-3 rounded-2xl bg-white text-base font-semibold shadow-[0_0_8px_rgba(0,0,0,.1)] dark:bg-[#262626]"
								role="listbox">
								<ul class="m-2 w-44 text-sm">
									<li
										v-for="item in locales"
										:key="item.code || item.name"
										@click="chooseLocale(item.code)"
										class="cursor-pointer rounded-[10px] px-3 py-2 text-black transition-all duration-300 hover:bg-[#e9e9e9] dark:text-white hover:dark:bg-[#3c3c3c]"
										role="option"
										:aria-selected="locale === item.code"
										tabindex="0"
										@keydown.enter.prevent="
											chooseLocale(item.code)
										">
										<div
											class="flex flex-row-reverse items-center justify-between">
											<span class="mr-1 truncate">{{
												item.name
											}}</span>
											<UIcon
												v-if="locale === item.code"
												name="i-iconamoon-check-circle-1-fill"
												size="20" />
										</div>
									</li>
								</ul>
							</div>
						</Transition>
					</div>

					<!-- Theme -->
					<UTooltip
						:text="$t('theme.toggle')"
						:open-delay="800">
						<button
							type="button"
							@click="toggleDark"
							class="flex h-8 items-center gap-1.5 rounded-lg bg-neutral-800/5 p-2 text-[13px] font-semibold text-secondary-text transition-all hover:bg-neutral-800/10 hover:text-black active:scale-95 dark:bg-white/10 dark:text-secondary-text-d hover:dark:bg-white/20 hover:dark:text-neutral-100">
							<UIcon
								:name="colorModeIcon"
								size="16" />
							<span class="capitalize leading-3">
								{{ $t("theme." + colorMode.preference) }}
							</span>
						</button>
					</UTooltip>
				</div>
			</div>
		</div>
	</footer>
</template>
