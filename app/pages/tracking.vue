<script setup lang="ts">
import { push } from "notivue";
import {
	toPersianDigits,
	toEnglishDigits,
	formatJalaliDate,
	convertMinPriceRangeToToman,
} from "~~/shared/helpers";

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const localePath = useLocalePath();

const orderId = ref((route.query.order_id || "").toString());
const phone = ref((route.query.phone || "").toString());
const isLoading = ref(false);
const orderData = ref<any>(null);
const copiedCode = ref(false);

const cleanOrderId = computed(() =>
	toEnglishDigits(orderId.value).replace(/\D/g, ""),
);
const cleanPhone = computed(() =>
	toEnglishDigits(phone.value).replace(/\s+/g, ""),
);

const isFormValid = computed(() => {
	return (
		cleanOrderId.value.length > 0 &&
		/^(\+?98|0)?9\d{9}$/.test(cleanPhone.value)
	);
});

async function handleTrack() {
	if (!isFormValid.value || isLoading.value) return;

	isLoading.value = true;
	orderData.value = null;

	const idToSend = cleanOrderId.value;
	const phoneToSend = cleanPhone.value;

	try {
		const res = await $fetch<any>("/api/orders/track", {
			method: "POST",
			body: {
				orderId: idToSend,
				phone: phoneToSend,
			},
		});

		orderData.value = res;

		// Sync query parameters without reload
		router.replace({
			query: {
				...route.query,
				order_id: idToSend,
				phone: phoneToSend,
			},
		});

		// Smooth scroll down to result card
		await nextTick();
		const resultEl = document.getElementById("tracking-result");
		if (resultEl) {
			resultEl.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	} catch (err: any) {
		const msg =
			err?.data?.message ||
			err?.message ||
			t("tracking.error_not_found");
		push.error(msg);
	} finally {
		isLoading.value = false;
	}
}

// Copy postal tracking code
async function copyTrackingCode(code: string) {
	try {
		await navigator.clipboard.writeText(code);
		copiedCode.value = true;
		push.success(t("tracking.copied_success"));
		setTimeout(() => {
			copiedCode.value = false;
		}, 2500);
	} catch {
		push.error(t("tracking.copy_failed"));
	}
}

// Steps definition
const steps = [
	{
		step: 1,
		title: "ثبت و پرداخت",
		desc: "سفارش با موفقیت ثبت شد",
		icon: "i-iconamoon-check-circle-1-fill",
	},
	{
		step: 2,
		title: "آماده‌سازی",
		desc: "بسته‌بندی در انبار",
		icon: "i-iconamoon-box-fill",
	},
	{
		step: 3,
		title: "ارسال مرسوله",
		desc: "تحویل به شرکت پست",
		icon: "i-iconamoon-delivery-fast-fill",
	},
	{
		step: 4,
		title: "تحویل مرسوله",
		desc: "تحویل به خریدار",
		icon: "i-iconamoon-check-circle-1-fill",
	},
];

// Auto-track on mount if query params exist
onMounted(() => {
	if (orderId.value && phone.value && isFormValid.value) {
		handleTrack();
	}
});

useSeoMeta({
	title: () => t("tracking.page_title"),
	description: () => t("tracking.page_desc"),
});
</script>

<template>
	<div class="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
		<div class="max-w-3xl mx-auto">
			<!-- Header -->
			<div class="text-center mb-8">
				<div
					class="inline-flex items-center justify-center p-3 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/20 text-[#23a26d] dark:text-[#40d195] mb-3">
					<UIcon name="i-iconamoon-delivery-fast-duotone" size="36" />
				</div>
				<h1 class="text-2xl sm:text-3xl font-bold tracking-tight">
					{{ $t("tracking.title") }}
				</h1>
				<p class="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
					{{ $t("tracking.subtitle") }}
				</p>
			</div>

			<!-- Search Form Card -->
			<div
				class="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-neutral-200/80 dark:border-neutral-800 shadow-sm mb-8">
				<form @submit.prevent="handleTrack" class="space-y-4">
					<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<!-- Order ID -->
						<div>
							<label
								for="order-id"
								class="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
								{{ $t("tracking.order_number_label") }}
								<span class="text-red-500">*</span>
							</label>
							<div class="relative">
								<input
									id="order-id"
									v-model="orderId"
									type="text"
									inputmode="numeric"
									required
									placeholder="مثال: ۵۳۶"
									dir="ltr"
									class="w-full h-11 px-3.5 pl-10 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-300/80 dark:border-neutral-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#23a26d] dark:focus:ring-[#40d195] transition" />
								<span
									class="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 font-mono text-sm">
									#
								</span>
							</div>
						</div>

						<!-- Phone Number -->
						<div>
							<label
								for="phone"
								class="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
								{{ $t("tracking.phone_label") }}
								<span class="text-red-500">*</span>
							</label>
							<div class="relative">
								<input
									id="phone"
									v-model="phone"
									type="tel"
									inputmode="tel"
									required
									placeholder="۰۹۱۲۳۴۵۶۷۸۹"
									dir="ltr"
									class="w-full h-11 px-3.5 pl-10 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-300/80 dark:border-neutral-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#23a26d] dark:focus:ring-[#40d195] transition" />
								<UIcon
									name="i-iconamoon-phone-duotone"
									class="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
									size="20" />
							</div>
						</div>
					</div>

					<button
						type="submit"
						:disabled="!isFormValid || isLoading"
						class="w-full h-12 rounded-xl bg-[#23a26d] hover:bg-[#1f9161] dark:bg-[#40d195] dark:hover:bg-[#36be85] text-white dark:text-black font-semibold text-sm transition shadow-sm flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
						<UIcon
							v-if="isLoading"
							name="i-svg-spinners-90-ring-with-bg"
							size="20" />
						<UIcon
							v-else
							name="i-iconamoon-search-duotone"
							size="20" />
						<span>{{
							isLoading
								? $t("tracking.loading")
								: $t("tracking.submit_btn")
						}}</span>
					</button>
				</form>
			</div>

			<!-- Tracking Result -->
			<div
				v-if="orderData"
				id="tracking-result"
				class="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-neutral-200/80 dark:border-neutral-800 shadow-sm space-y-6 animate-fade-in">
				<!-- Order Header & Status Badge -->
				<div
					class="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-neutral-200/80 dark:border-neutral-800">
					<div>
						<div class="flex items-center gap-2">
							<h2 class="text-lg font-bold">
								{{
									$t("tracking.order_title", {
										number: toPersianDigits(
											orderData.orderNumber,
										),
									})
								}}
							</h2>
							<span
								:class="[
									'text-xs font-semibold px-2.5 py-1 rounded-full',
									orderData.status === 'completed'
										? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
										: orderData.status === 'cancelled' ||
											  orderData.status === 'failed'
											? 'bg-red-500/15 text-red-600 dark:text-red-400'
											: 'bg-blue-500/15 text-blue-600 dark:text-blue-400',
								]">
								{{ orderData.statusText }}
							</span>
						</div>
						<p
							class="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
							{{ $t("tracking.registered_at") }}:
							{{ formatJalaliDate(orderData.dateCreated) }}
						</p>
					</div>

					<!-- Total Price -->
					<div class="text-left">
						<span
							class="block text-xs text-neutral-500 dark:text-neutral-400">
							{{ $t("tracking.total_amount") }}
						</span>
						<span
							class="text-lg font-bold text-neutral-900 dark:text-white">
							{{ convertMinPriceRangeToToman(orderData.total) }}
						</span>
					</div>
				</div>

				<!-- Cancelled or Failed Alert -->
				<div
					v-if="
						orderData.status === 'cancelled' ||
						orderData.status === 'failed'
					"
					class="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-300 text-sm flex items-center gap-3">
					<UIcon
						name="i-iconamoon-close-circle-1-fill"
						size="24"
						class="text-red-500 flex-shrink-0" />
					<p>
						{{
							orderData.status === "cancelled"
								? $t("tracking.cancelled_note")
								: $t("tracking.failed_note")
						}}
					</p>
				</div>

				<!-- Visual Progress Stepper (Only for active / valid orders) -->
				<div
					v-if="orderData.currentStep > 0"
					class="py-4">
					<div class="relative">
						<!-- Stepper track line -->
						<div
							class="absolute top-5 right-6 left-6 h-0.5 bg-neutral-200 dark:bg-neutral-800 -z-0">
							<div
								class="h-full bg-[#23a26d] dark:bg-[#40d195] transition-all duration-500"
								:style="{
									width: `${((orderData.currentStep - 1) / (steps.length - 1)) * 100}%`,
								}" />
						</div>

						<!-- Step items -->
						<div
							class="grid grid-cols-4 gap-2 relative z-10 text-center">
							<div
								v-for="s in steps"
								:key="s.step"
								class="flex flex-col items-center">
								<div
									:class="[
										'w-10 h-10 rounded-full flex items-center justify-center transition shadow-sm',
										s.step <= orderData.currentStep
											? 'bg-[#23a26d] text-white dark:bg-[#40d195] dark:text-black font-bold'
											: 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400 border border-neutral-300/60 dark:border-neutral-700',
									]">
									<UIcon :name="s.icon" size="20" />
								</div>
								<span
									:class="[
										'text-xs font-semibold mt-2.5 block',
										s.step <= orderData.currentStep
											? 'text-neutral-900 dark:text-white'
											: 'text-neutral-400 dark:text-neutral-500',
									]">
									{{ s.title }}
								</span>
								<span
									class="text-[10px] text-neutral-400 dark:text-neutral-500 mt-0.5 hidden sm:block">
									{{ s.desc }}
								</span>
							</div>
						</div>
					</div>
				</div>

				<!-- Postal Tracking Number Card (if available) -->
				<div
					v-if="orderData.postTrackingNumber"
					class="p-4 sm:p-5 rounded-2xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 space-y-3">
					<div class="flex items-center justify-between flex-wrap gap-2">
						<div class="flex items-center gap-2">
							<UIcon
								name="i-iconamoon-delivery-fill"
								class="text-[#23a26d] dark:text-[#40d195]"
								size="22" />
							<span class="text-sm font-semibold">
								{{ $t("tracking.post_code_title") }}
							</span>
						</div>
						<span
							class="text-xs text-neutral-500 dark:text-neutral-400">
							{{ $t("tracking.national_post") }}
						</span>
					</div>

					<div
						class="flex items-center justify-between bg-white dark:bg-neutral-850 p-3 rounded-xl border border-neutral-200/80 dark:border-neutral-700 gap-3">
						<span
							class="font-mono text-base sm:text-lg font-bold tracking-wider select-all text-neutral-900 dark:text-white"
							dir="ltr">
							{{ orderData.postTrackingNumber }}
						</span>
						<button
							type="button"
							@click="
								copyTrackingCode(orderData.postTrackingNumber)
							"
							class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-xs font-medium transition cursor-pointer">
							<UIcon
								:name="
									copiedCode
										? 'i-iconamoon-check-bold'
										: 'i-iconamoon-copy-duotone'
								"
								size="16" />
							<span>{{
								copiedCode
									? $t("tracking.copied")
									: $t("tracking.copy")
							}}</span>
						</button>
					</div>

					<!-- Direct link to post tracking site -->
					<div class="text-left">
						<a
							:href="`https://tracking.post.ir/?id=${orderData.postTrackingNumber}`"
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex items-center gap-1.5 text-xs text-[#23a26d] dark:text-[#40d195] hover:underline font-medium">
							<span>{{ $t("tracking.open_in_post_portal") }}</span>
							<UIcon
								name="i-iconamoon-link-external-duotone"
								size="16" />
						</a>
					</div>
				</div>

				<!-- Recipient & Delivery Details -->
				<div
					class="p-4 sm:p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200/80 dark:border-neutral-800 space-y-2.5 text-xs sm:text-sm">
					<h3 class="font-semibold text-neutral-900 dark:text-white">
						{{ $t("tracking.recipient_info") }}
					</h3>
					<div
						class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-neutral-600 dark:text-neutral-300">
						<div>
							<span class="text-neutral-400"
								>{{ $t("tracking.recipient_name") }}:
							</span>
							<span class="font-medium">{{
								orderData.customer.name || "-"
							}}</span>
						</div>
						<div>
							<span class="text-neutral-400"
								>{{ $t("tracking.phone_label") }}:
							</span>
							<span class="font-medium" dir="ltr">{{
								orderData.customer.phone
							}}</span>
						</div>
						<div class="sm:col-span-2">
							<span class="text-neutral-400"
								>{{ $t("tracking.address_label") }}:
							</span>
							<span class="font-medium">
								{{ orderData.customer.state }}،
								{{ orderData.customer.city }}،
								{{ orderData.customer.address }}
								<span
									v-if="orderData.customer.postcode"
									class="text-neutral-400 font-mono text-xs">
									(کد پستی:
									{{
										toPersianDigits(
											orderData.customer.postcode,
										)
									}})
								</span>
							</span>
						</div>
					</div>
				</div>

				<!-- Ordered Products List -->
				<div class="space-y-3">
					<h3
						class="font-semibold text-sm text-neutral-900 dark:text-white">
						{{ $t("tracking.items_title") }}
						<span class="text-xs text-neutral-400 font-normal">
							({{
								$t("tracking.items_count", {
									count: toPersianDigits(
										orderData.items.length,
									),
								})
							}})
						</span>
					</h3>

					<div class="divide-y divide-neutral-200/80 dark:divide-neutral-800">
						<div
							v-for="item in orderData.items"
							:key="item.id"
							class="py-3 flex items-center justify-between gap-3">
							<div class="flex items-center gap-3">
								<img
									v-if="item.image"
									:src="item.image"
									:alt="item.name"
									class="w-12 h-12 rounded-xl object-cover bg-neutral-100 dark:bg-neutral-800 border border-neutral-200/60 dark:border-neutral-700" />
								<div
									v-else
									class="w-12 h-12 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-400">
									<UIcon
										name="i-iconamoon-box-duotone"
										size="24" />
								</div>
								<div>
									<h4
										class="text-xs sm:text-sm font-medium line-clamp-1">
										{{ item.name }}
									</h4>
									<span
										class="text-[11px] text-neutral-400 dark:text-neutral-500">
										{{
											$t("tracking.item_quantity", {
												qty: toPersianDigits(
													item.quantity,
												),
											})
										}}
									</span>
								</div>
							</div>

							<div class="text-left font-semibold text-xs sm:text-sm">
								{{ convertMinPriceRangeToToman(item.total) }}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
@keyframes fadeIn {
	from {
		opacity: 0;
		transform: translateY(8px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

.animate-fade-in {
	animation: fadeIn 0.3s ease-out forwards;
}
</style>
