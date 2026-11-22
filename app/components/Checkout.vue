<script setup>
import { computed, watch } from "vue";
import { IRAN_PROVINCES } from "~~/shared/data/iranLocations";
import {
	convertMinPriceRangeToToman,
	toPersianDigits,
} from "~~/shared/helpers";

const { checkoutStatus, handleCheckout, billing, fieldError } = useCheckout();
const { cart, isCartUpdating } = useCart();

const selectedProvince = computed(() =>
	IRAN_PROVINCES.find((p) => p.name === billing.state),
);

const availableCities = computed(() => selectedProvince.value?.cities || []);

watch(
	() => billing.state,
	(newState, oldState) => {
		if (oldState !== undefined && newState !== oldState) {
			billing.city = "";
		}
	},
);

const totalQuantity = computed(() =>
	toPersianDigits(`${cart.value.reduce((s, i) => s + (i.quantity || 0), 0)}`),
);

const parsePrice = (priceStr) => {
	if (!priceStr) return 0;
	return Number(priceStr.toString().replace(/[^\d]/g, ""));
};

const totalRials = computed(() => {
	return cart.value.reduce((accumulator, item) => {
		const node = item.variation?.node || item.product?.node;
		if (!node) return accumulator;

		const regularPrice = parsePrice(node.regularPrice ?? node.price);
		const salePrice = parsePrice(node.salePrice);

		const priceToUse =
			salePrice > 0 && salePrice < regularPrice
				? salePrice
				: regularPrice;

		return accumulator + priceToUse * (item.quantity ?? 1);
	}, 0);
});

const isOverBankLimit = computed(() => totalRials.value > 400000000);

const cartTotal = computed(() => {
	return totalRials.value > 0
		? convertMinPriceRangeToToman(totalRials.value.toString())
		: "۰";
});

const toEnglishDigits = (value) =>
	String(value ?? "").replace(/[۰-۹٠-٩]/g, (digit) => {
		const code = digit.charCodeAt(0);

		return String.fromCharCode(
			code >= 0x06f0 ? code - 0x06f0 + 48 : code - 0x0660 + 48,
		);
	});

const phoneInput = computed({
	get: () => billing.phone,
	set: (value) => {
		billing.phone = toEnglishDigits(value);
	},
});

const postcodeInput = computed({
	get: () => billing.postcode,
	set: (value) => {
		billing.postcode = toEnglishDigits(value);
	},
});
</script>

<template>
	<div
		class="w-full max-w-full bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border border-neutral-200/80 dark:border-neutral-800 p-4 sm:p-5 rounded-2xl sm:rounded-3xl flex flex-col shadow-sm">
		<!-- Header -->
		<div class="px-1 text-right mb-1">
			<div class="flex items-center gap-2 mb-0.5">
				<UIcon
					name="i-iconamoon-check-circle-1-duotone"
					class="text-[#23a26d] dark:text-[#40d195]"
					size="22" />
				<h5 class="text-lg sm:text-xl font-bold">
					{{ $t("checkout.title") }}
				</h5>
			</div>
			<p class="text-xs text-neutral-500 dark:text-neutral-400">
				{{ $t("checkout.pay.secure_note") }}
			</p>
		</div>

		<!-- Form Fields -->
		<form
			class="flex flex-col gap-3 mt-3 text-right"
			dir="rtl"
			@submit.prevent="handleCheckout">
			<!-- Section 1: مشخصات گیرنده -->
			<div class="space-y-3.5">
				<div
					class="flex items-center gap-1.5 text-xs font-bold text-neutral-800 dark:text-neutral-200">
					<UIcon
						name="i-iconamoon-profile-circle-duotone"
						size="18"
						class="text-[#23a26d] dark:text-[#40d195]" />
					<span>{{ $t("checkout.form.recipient_section") }}</span>
				</div>

				<!-- First & Last Name Grid -->
				<div class="grid grid-cols-2 gap-2">
					<div>
						<label
							class="block text-xs font-medium text-neutral-600 dark:text-neutral-300 mb-1">
							{{ $t("checkout.form.first_name") }}
							<span class="text-red-500">*</span>
						</label>
						<input
							v-model="billing.first_name"
							type="text"
							autocomplete="given-name"
							:disabled="checkoutStatus !== 'idle'"
							:class="[
								'w-full h-11 sm:h-10 px-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/70 border text-base sm:text-sm outline-none transition',
								fieldError?.field === 'first_name'
									? 'border-red-500 ring-2 ring-red-500/20'
									: 'border-neutral-300/80 dark:border-neutral-700/80 focus:border-[#23a26d] dark:focus:border-[#40d195] focus:ring-2 focus:ring-emerald-500/15',
							]" />
					</div>
					<div>
						<label
							class="block text-xs font-medium text-neutral-600 dark:text-neutral-300 mb-1">
							{{ $t("checkout.form.last_name") }}
							<span class="text-red-500">*</span>
						</label>
						<input
							v-model="billing.last_name"
							type="text"
							autocomplete="family-name"
							:disabled="checkoutStatus !== 'idle'"
							:class="[
								'w-full h-11 sm:h-10 px-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/70 border text-base sm:text-sm outline-none transition',
								fieldError?.field === 'last_name'
									? 'border-red-500 ring-2 ring-red-500/20'
									: 'border-neutral-300/80 dark:border-neutral-700/80 focus:border-[#23a26d] dark:focus:border-[#40d195] focus:ring-2 focus:ring-emerald-500/15',
							]" />
					</div>
				</div>

				<!-- Phone -->
				<div>
					<label
						class="block text-xs font-medium text-neutral-600 dark:text-neutral-300 mb-1">
						{{ $t("checkout.form.phone") }}
						<span class="text-red-500">*</span>
					</label>
					<div class="relative">
						<input
							v-model="phoneInput"
							type="tel"
							inputmode="tel"
							dir="ltr"
							autocomplete="tel"
							:placeholder="$t('checkout.form.phone_placeholder')"
							:disabled="checkoutStatus !== 'idle'"
							:class="[
								'w-full h-11 sm:h-10 px-3 pl-10 rounded-xl bg-neutral-50 dark:bg-neutral-800/70 border text-base sm:text-sm text-left outline-none transition font-mono',
								fieldError?.field === 'phone'
									? 'border-red-500 ring-2 ring-red-500/20'
									: 'border-neutral-300/80 dark:border-neutral-700/80 focus:border-[#23a26d] dark:focus:border-[#40d195] focus:ring-2 focus:ring-emerald-500/15',
							]" />
						<UIcon
							name="i-iconamoon-phone-duotone"
							class="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
							size="18" />
					</div>
				</div>
			</div>

			<!-- Section 2: نشانی و مشخصات تحویل -->
			<div
				class="space-y-4 pt-4 border-t border-neutral-200/70 dark:border-neutral-800">
				<div
					class="flex items-center gap-1.5 text-xs font-bold text-neutral-800 dark:text-neutral-200">
					<UIcon
						name="i-iconamoon-location-pin-duotone"
						size="18"
						class="text-[#23a26d] dark:text-[#40d195]" />
					<span>{{ $t("checkout.form.delivery_section") }}</span>
				</div>

				<!-- Province & City Grid -->
				<div class="grid grid-cols-2 gap-2">
					<div>
						<label
							class="block text-xs font-medium text-neutral-600 dark:text-neutral-300 mb-1">
							{{ $t("checkout.form.state") }}
							<span class="text-red-500">*</span>
						</label>
						<div class="relative">
							<select
								v-model="billing.state"
								:disabled="checkoutStatus !== 'idle'"
								:class="[
									'w-full h-11 sm:h-10 pr-3 pl-7 rounded-xl bg-neutral-50 dark:bg-neutral-800/70 border text-base sm:text-sm outline-none transition appearance-none cursor-pointer',
									fieldError?.field === 'state'
										? 'border-red-500 ring-2 ring-red-500/20'
										: 'border-neutral-300/80 dark:border-neutral-700/80 focus:border-[#23a26d] dark:focus:border-[#40d195] focus:ring-2 focus:ring-emerald-500/15',
								]">
								<option
									value=""
									disabled
									selected>
									{{ $t("checkout.form.select_province") }}
								</option>
								<option
									v-for="prov in IRAN_PROVINCES"
									:key="prov.name"
									:value="prov.name"
									class="dark:bg-neutral-900 text-black dark:text-white">
									{{ prov.name }}
								</option>
							</select>
							<UIcon
								name="i-iconamoon-arrow-down-2-duotone"
								class="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
								size="16" />
						</div>
					</div>
					<div>
						<label
							class="block text-xs font-medium text-neutral-600 dark:text-neutral-300 mb-1">
							{{ $t("checkout.form.city") }}
							<span class="text-red-500">*</span>
						</label>
						<div class="relative">
							<select
								v-model="billing.city"
								:disabled="
									checkoutStatus !== 'idle' || !billing.state
								"
								:class="[
									'w-full h-11 sm:h-10 pr-3 pl-7 rounded-xl bg-neutral-50 dark:bg-neutral-800/70 border text-base sm:text-sm outline-none transition appearance-none cursor-pointer disabled:opacity-50',
									fieldError?.field === 'city'
										? 'border-red-500 ring-2 ring-red-500/20'
										: 'border-neutral-300/80 dark:border-neutral-700/80 focus:border-[#23a26d] dark:focus:border-[#40d195] focus:ring-2 focus:ring-emerald-500/15',
								]">
								<option
									value=""
									disabled
									selected>
									{{ $t("checkout.form.select_city") }}
								</option>
								<option
									v-for="city in availableCities"
									:key="city"
									:value="city"
									class="dark:bg-neutral-900 text-black dark:text-white">
									{{ city }}
								</option>
							</select>
							<UIcon
								name="i-iconamoon-arrow-down-2-duotone"
								class="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
								size="16" />
						</div>
					</div>
				</div>

				<!-- Postal Code (Mandatory) -->
				<div>
					<div class="flex items-center justify-between mb-1">
						<label
							class="block text-xs font-medium text-neutral-600 dark:text-neutral-300">
							{{ $t("checkout.form.postcode") }}
							<span class="text-red-500">*</span>
						</label>
						<span
							class="text-[10px] text-neutral-400 dark:text-neutral-500">
							۱۰ رقم بدون خط تیره
						</span>
					</div>
					<div class="relative">
						<input
							v-model="postcodeInput"
							type="text"
							inputmode="numeric"
							maxlength="10"
							dir="ltr"
							autocomplete="postal-code"
							:placeholder="
								$t('checkout.form.postcode_placeholder')
							"
							:disabled="checkoutStatus !== 'idle'"
							:class="[
								'w-full h-11 sm:h-10 px-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/70 border text-base sm:text-sm text-left outline-none transition font-mono tracking-wider',
								fieldError?.field === 'postcode'
									? 'border-red-500 ring-2 ring-red-500/20'
									: 'border-neutral-300/80 dark:border-neutral-700/80 focus:border-[#23a26d] dark:focus:border-[#40d195] focus:ring-2 focus:ring-emerald-500/15',
							]" />
					</div>
				</div>

				<!-- Full Address -->
				<div>
					<label
						class="block text-xs font-medium text-neutral-600 dark:text-neutral-300 mb-1">
						{{ $t("checkout.form.address") }}
						<span class="text-red-500">*</span>
					</label>
					<textarea
						v-model="billing.address_1"
						rows="2"
						autocomplete="street-address"
						:placeholder="$t('checkout.form.address_placeholder')"
						:disabled="checkoutStatus !== 'idle'"
						:class="[
							'w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800/70 border text-base sm:text-sm outline-none transition resize-none',
							fieldError?.field === 'address_1'
								? 'border-red-500 ring-2 ring-red-500/20'
								: 'border-neutral-300/80 dark:border-neutral-700/80 focus:border-[#23a26d] dark:focus:border-[#40d195] focus:ring-2 focus:ring-emerald-500/15',
						]"></textarea>
				</div>
			</div>

			<!-- Error Alert if any -->
			<div
				v-if="fieldError"
				class="text-xs text-red-600 dark:text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl p-2.5 font-medium flex items-center gap-2">
				<UIcon
					name="i-iconamoon-close-circle-1-duotone"
					size="18"
					class="text-red-500 flex-shrink-0" />
				<span>{{ fieldError.message }}</span>
			</div>

			<!-- Order Summary -->
			<div
				class="bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-3 sm:p-4 space-y-2 text-sm mt-0.5">
				<div class="flex justify-between items-center">
					<span
						class="dark:text-neutral-400 text-neutral-600 text-xs sm:text-sm">
						{{ $t("checkout.pay.total") }}:
					</span>
					<span
						class="font-bold text-base sm:text-lg text-emerald-600 dark:text-emerald-400">
						{{ cartTotal }} تومان
					</span>
				</div>
				<div class="flex justify-between items-center text-xs">
					<span class="dark:text-neutral-400 text-neutral-600">
						{{ $t("product.quantity") }}:
					</span>
					<span class="font-medium">{{ totalQuantity }} عدد</span>
				</div>
				<div class="flex justify-between items-center text-xs">
					<span class="dark:text-neutral-400 text-neutral-600">
						{{ $t("checkout.shipping_cost") }}:
					</span>
					<span
						class="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
						<UIcon
							name="i-iconamoon-check-bold"
							size="14" />
						{{ $t("checkout.free_shipping") }}
					</span>
				</div>
			</div>

			<!-- Bank Ceiling Alert -->
			<div
				v-if="isOverBankLimit"
				class="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 rounded-2xl text-xs text-red-700 dark:text-red-300 flex items-start gap-2">
				<UIcon
					name="i-iconamoon-alert-circle-duotone"
					size="18"
					class="flex-shrink-0 mt-0.5 text-red-500" />
				<span class="leading-5">
					مبلغ سفارش بیش از سقف مجاز پرداخت اینترنتی درگاه بیت‌پی (۴۰ میلیون تومان) است. لطفاً تعداد اقلام یا مبلغ سبد خرید را کاهش دهید.
				</span>
			</div>

			<!-- Submit Button -->
			<button
				type="submit"
				:disabled="
					checkoutStatus !== 'idle' ||
					isCartUpdating ||
					!cart.length ||
					isOverBankLimit
				"
				class="pay-button-bezel w-full h-12 sm:h-13 mt-1 rounded-2xl relative font-semibold text-white dark:text-black text-sm sm:text-base flex justify-center items-center cursor-pointer disabled:cursor-not-allowed disabled:opacity-60">
				<Transition name="slide-up">
					<div
						v-if="isCartUpdating"
						class="flex items-center gap-2 text-sm font-medium">
						<UIcon
							name="i-svg-spinners-90-ring-with-bg"
							size="20" />
						<span>{{
							$t("cart.updating") ||
							"در حال به‌روزرسانی سبد خرید..."
						}}</span>
					</div>
					<div
						v-else-if="checkoutStatus === 'idle'"
						class="flex items-center gap-2">
						<UIcon
							name="i-iconamoon-shield-check-duotone"
							size="20" />
						<span>{{ $t("checkout.pay.proceed") }}</span>
					</div>
					<div
						v-else-if="checkoutStatus === 'submitting'"
						class="flex items-center gap-2 text-sm font-medium">
						<UIcon
							name="i-svg-spinners-90-ring-with-bg"
							size="20" />
						<span>{{ $t("checkout.pay.submitting") }}</span>
					</div>
					<UIcon
						v-else
						class="absolute"
						name="i-svg-spinners-90-ring-with-bg"
						size="22" />
				</Transition>
			</button>

			<div
				class="text-[11px] font-medium py-1 flex flex-row-reverse gap-1.5 items-center justify-center text-neutral-400 dark:text-neutral-500">
				<span>{{ $t("checkout.pay.secure_note") }}</span>
				<UIcon
					name="i-iconamoon-lock-fill"
					size="15" />
			</div>
		</form>
	</div>
</template>

<style lang="postcss">
.pay-button-bezel {
	box-shadow: 0 0 0 var(--button-outline, 0px) rgba(92, 222, 131, 0.3),
		inset 0 -1px 1px 0 rgba(0, 0, 0, 0.25),
		inset 0 1px 0 0 rgba(255, 255, 255, 0.3), 0 1px 1px 0 rgba(0, 0, 0, 0.3);
	@apply bg-[#23a26d] dark:bg-[#40d195] outline-none tracking-[-0.125px] transition scale-[var(--button-scale,1)] duration-200;

	&:hover {
		@apply brightness-110;
	}

	&:active {
		--button-outline: 4px;
		--button-scale: 0.975;
	}

	&:disabled {
		@apply cursor-not-allowed opacity-80;
	}
}
</style>
