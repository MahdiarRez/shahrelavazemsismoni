<script setup>
import { computed, watch } from "vue";
import { IRAN_PROVINCES } from "~~/shared/data/iranLocations";
import {
	convertMinPriceRangeToToman,
	toPersianDigits,
} from "~~/shared/helpers";

const { checkoutStatus, handleCheckout, billing, fieldError } = useCheckout();
const { cart } = useCart();

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

const cartTotal = computed(() => {
	const totalRial = cart.value.reduce((accumulator, item) => {
		const node = item.variation?.node;
		if (!node) return accumulator;

		const regularPrice = parsePrice(node.regularPrice);
		const salePrice = parsePrice(node.salePrice);

		const priceToUse =
			salePrice > 0 && salePrice < regularPrice
				? salePrice
				: regularPrice;

		return accumulator + priceToUse * (item.quantity ?? 1);
	}, 0);

	return totalRial > 0
		? convertMinPriceRangeToToman(totalRial.toString())
		: "۰";
});
</script>

<template>
	<div
		class="w-full sm:w-[22rem] md:w-96 bg-black/5 dark:bg-white/10 m-2 sm:m-3 p-3.5 rounded-3xl flex flex-col max-h-[82dvh] overflow-y-auto">
		<div class="px-1 pt-1 text-right">
			<h5 class="text-xl font-bold">{{ $t("checkout.title") }}</h5>
			<h6 class="text-xs font-normal opacity-70 mt-1">
				{{ $t("checkout.pay.secure_note") }}
			</h6>
		</div>

		<!-- Form Fields -->
		<form
			class="flex flex-col gap-2.5 mt-4 text-right"
			dir="rtl"
			@submit.prevent="handleCheckout">
			<!-- Name Row -->
			<div class="grid grid-cols-2 gap-2">
				<div>
					<label class="block text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-1">
						{{ $t("checkout.form.first_name") }} *
					</label>
					<input
						v-model="billing.first_name"
						type="text"
						autocomplete="given-name"
						:disabled="checkoutStatus !== 'idle'"
						class="w-full bg-black/5 dark:bg-white/10 rounded-xl px-3 py-2 text-sm outline-none transition focus:ring-1.5 focus:ring-emerald-500 disabled:opacity-50" />
				</div>
				<div>
					<label class="block text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-1">
						{{ $t("checkout.form.last_name") }} *
					</label>
					<input
						v-model="billing.last_name"
						type="text"
						autocomplete="family-name"
						:disabled="checkoutStatus !== 'idle'"
						class="w-full bg-black/5 dark:bg-white/10 rounded-xl px-3 py-2 text-sm outline-none transition focus:ring-1.5 focus:ring-emerald-500 disabled:opacity-50" />
				</div>
			</div>

			<!-- Phone -->
			<div>
				<label class="block text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-1">
					{{ $t("checkout.form.phone") }} *
				</label>
				<input
					v-model="billing.phone"
					type="tel"
					inputmode="numeric"
					dir="ltr"
					autocomplete="tel"
					:placeholder="$t('checkout.form.phone_placeholder')"
					:disabled="checkoutStatus !== 'idle'"
					class="w-full bg-black/5 dark:bg-white/10 rounded-xl px-3 py-2 text-sm text-left outline-none transition focus:ring-1.5 focus:ring-emerald-500 disabled:opacity-50" />
			</div>

			<!-- Province & City Row -->
			<div class="grid grid-cols-2 gap-2">
				<div>
					<label class="block text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-1">
						{{ $t("checkout.form.state") }} *
					</label>
					<select
						v-model="billing.state"
						:disabled="checkoutStatus !== 'idle'"
						class="w-full bg-black/5 dark:bg-white/10 dark:text-white rounded-xl px-2.5 py-2 text-sm outline-none transition focus:ring-1.5 focus:ring-emerald-500 disabled:opacity-50">
						<option value="" disabled selected>
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
				</div>
				<div>
					<label class="block text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-1">
						{{ $t("checkout.form.city") }} *
					</label>
					<select
						v-model="billing.city"
						:disabled="checkoutStatus !== 'idle' || !billing.state"
						class="w-full bg-black/5 dark:bg-white/10 dark:text-white rounded-xl px-2.5 py-2 text-sm outline-none transition focus:ring-1.5 focus:ring-emerald-500 disabled:opacity-50">
						<option value="" disabled selected>
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
				</div>
			</div>

			<!-- Full Address -->
			<div>
				<label class="block text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-1">
					{{ $t("checkout.form.address") }} *
				</label>
				<textarea
					v-model="billing.address_1"
					rows="2"
					autocomplete="street-address"
					:placeholder="$t('checkout.form.address_placeholder')"
					:disabled="checkoutStatus !== 'idle'"
					class="w-full bg-black/5 dark:bg-white/10 rounded-xl px-3 py-2 text-sm outline-none transition focus:ring-1.5 focus:ring-emerald-500 disabled:opacity-50 resize-none"></textarea>
			</div>

			<!-- Postal Code -->
			<div>
				<label class="block text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-1">
					{{ $t("checkout.form.postcode") }}
				</label>
				<input
					v-model="billing.postcode"
					type="text"
					inputmode="numeric"
					dir="ltr"
					autocomplete="postal-code"
					placeholder="۱۰ رقم (اختیاری)"
					:disabled="checkoutStatus !== 'idle'"
					class="w-full bg-black/5 dark:bg-white/10 rounded-xl px-3 py-2 text-sm text-left outline-none transition focus:ring-1.5 focus:ring-emerald-500 disabled:opacity-50" />
			</div>

			<!-- Error Alert if any -->
			<div
				v-if="fieldError"
				class="text-xs text-red-600 dark:text-red-400 bg-red-500/10 rounded-xl p-2 font-medium">
				{{ fieldError.message }}
			</div>

			<!-- Order Summary -->
			<div
				class="bg-black/5 dark:bg-white/10 rounded-2xl p-4 gap-2 flex flex-col text-sm mt-1">
				<div class="flex justify-between items-center">
					<span class="dark:text-neutral-400 text-neutral-600">
						{{ $t("checkout.pay.total") }}:
					</span>
					<span class="font-bold text-lg text-emerald-600 dark:text-emerald-400">
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
					<span class="font-medium text-emerald-600 dark:text-emerald-400">
						{{ $t("checkout.free_shipping") }}
					</span>
				</div>
			</div>

			<!-- Submit Button -->
			<button
				type="submit"
				:disabled="checkoutStatus !== 'idle'"
				class="pay-button-bezel w-full h-14 mt-2 rounded-full relative font-semibold text-white dark:text-black text-lg flex justify-center items-center">
				<Transition name="slide-up">
					<div
						v-if="checkoutStatus === 'idle'"
						class="absolute">
						{{ $t("checkout.pay.proceed") }}
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
				class="text-[11px] font-medium p-2 flex flex-row-reverse gap-1.5 items-center justify-center text-neutral-400 dark:text-neutral-500">
				<span>{{ $t("checkout.pay.secure_note") }}</span>
				<UIcon
					name="i-iconamoon-lock-fill"
					size="16" />
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
