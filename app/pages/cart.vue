<!--app/pages/cart.vue-->
<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from "vue";
import {
	convertMinPriceRangeToToman,
	toPersianDigits,
	toEnglishDigits,
} from "~~/shared/helpers";

const { t } = useI18n();
const {
	cart,
	increment,
	decrement,
	setQuantity,
	removeItem,
	clearCart,
	isCartUpdating,
	updatingItemKeys,
	syncCart,
} = useCart();
const { order } = useCheckout();
const localePath = useLocalePath();
const router = useRouter();

useHead({
	title: () => `${t("cart.title") || "سبد خرید"}`,
});

const totalQuantity = computed(() =>
	cart.value.reduce((s, i) => s + (i.quantity || 0), 0),
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

const cartTotalToman = computed(() => {
	return totalRials.value > 0
		? convertMinPriceRangeToToman(totalRials.value.toString())
		: "۰";
});

const isItemUpdating = (key) => updatingItemKeys.value.includes(key);

// Manual quantity editing state
const editingKey = ref(null);
const editingQty = ref("");

const startEditing = (key, currentQty) => {
	editingKey.value = key;
	editingQty.value = String(currentQty);
};

const onInputQuantity = (event) => {
	const val = toEnglishDigits(event.target.value).replace(/\D/g, "");
	editingQty.value = val;
};

const applyQuantity = async (key) => {
	if (editingKey.value !== key) return;
	const entered = Number(editingQty.value);
	editingKey.value = null;

	const item = cart.value.find((i) => i.key === key);
	if (!item) return;

	if (!entered || isNaN(entered) || entered <= 0) {
		// If 0 or empty, remove item
		await removeItem(key);
	} else if (entered !== item.quantity) {
		await setQuantity(key, entered);
	}
};

// Clear cart confirmation
const showClearConfirm = ref(false);
const handleConfirmClear = async () => {
	showClearConfirm.value = false;
	await clearCart();
};

// Mobile sticky bar: scroll to checkout & hide when checkout is in view
const isCheckoutInView = ref(false);
let checkoutObserver = null;

const scrollToCheckout = () => {
	const el = document.getElementById("checkout-section");
	if (el) {
		el.scrollIntoView({ behavior: "smooth", block: "start" });
	}
};

const goBack = () => {
	if (typeof window !== "undefined" && window.history.length > 1) {
		router.back();
	} else {
		router.push(localePath("/shop"));
	}
};

onMounted(() => {
	if (!process.client) return;

	const el = document.getElementById("checkout-section");
	if (el && "IntersectionObserver" in window) {
		checkoutObserver = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];
				isCheckoutInView.value = entry?.isIntersecting || false;
			},
			{ threshold: 0.1 },
		);
		checkoutObserver.observe(el);
	}
});

onBeforeUnmount(() => {
	if (checkoutObserver) {
		checkoutObserver.disconnect();
		checkoutObserver = null;
	}
});
</script>

<template>
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 select-none" dir="rtl">
		<!-- Payment Succeeded State -->
		<div v-if="order?.orderNumber && !cart.length" class="flex justify-center items-center py-10">
			<PaymentSuccessful />
		</div>

		<!-- Cart With Items -->
		<div v-else-if="cart.length">
			<!-- Page Header -->
			<div class="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-neutral-200/80 dark:border-neutral-800/80">
				<div class="flex items-center gap-3">
					<button
						type="button"
						@click="goBack"
						class="w-10 h-10 rounded-full flex items-center justify-center bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/15 transition active:scale-95"
						aria-label="بازگشت">
						<UIcon name="i-iconamoon-arrow-right-2-bold" size="20" class="text-neutral-700 dark:text-neutral-200" />
					</button>
					<div>
						<h1 class="text-xl sm:text-2xl font-bold flex items-center gap-2">
							<span>{{ $t("cart.title") || "سبد خرید" }}</span>
							<span class="text-xs sm:text-sm font-normal px-2.5 py-0.5 rounded-full bg-secondary-100 text-secondary-800 dark:bg-secondary-900/40 dark:text-secondary-300">
								{{ toPersianDigits(totalQuantity) }} {{ $t("cart.item_count") || "کالا" }}
							</span>
						</h1>
					</div>
				</div>

				<!-- Actions: Clear Cart & Continue Shopping -->
				<div class="flex items-center gap-2 sm:gap-4">
					<!-- Clear Cart Confirmation / Trigger -->
					<div v-if="!showClearConfirm">
						<button
							type="button"
							@click="showClearConfirm = true"
							:disabled="isCartUpdating"
							class="text-xs font-medium text-neutral-500 hover:text-red-600 dark:text-neutral-400 dark:hover:text-red-400 flex items-center gap-1 px-2.5 py-1.5 rounded-xl hover:bg-red-50/50 dark:hover:bg-red-950/20 transition active:scale-95 disabled:opacity-40"
							title="خالی کردن تمام سبد خرید">
							<UIcon name="i-iconamoon-trash-light" size="16" />
							<span>خالی کردن سبد</span>
						</button>
					</div>
					<div v-else class="flex items-center gap-1.5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 px-2 py-1 rounded-xl text-xs">
						<span class="text-red-700 dark:text-red-300 font-medium">همه پاک شود؟</span>
						<button
							type="button"
							@click="handleConfirmClear"
							class="px-2 py-0.5 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition active:scale-95">
							بله
						</button>
						<button
							type="button"
							@click="showClearConfirm = false"
							class="px-2 py-0.5 bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 rounded-lg hover:bg-neutral-300 transition active:scale-95">
							انصراف
						</button>
					</div>

					<NuxtLink
						:to="localePath('/shop')"
						class="text-xs sm:text-sm font-medium text-secondary-600 hover:text-secondary-700 dark:text-secondary-400 flex items-center gap-1 active:scale-95 transition">
						<span>{{ $t("cart.continue_shopping") || "ادامه خرید" }}</span>
						<UIcon name="i-iconamoon-arrow-left-2" size="16" />
					</NuxtLink>
				</div>
			</div>

			<!-- Responsive 2-Column Grid -->
			<div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
				<!-- Items List Section -->
				<div class="lg:col-span-7 xl:col-span-7 space-y-4">
					<div
						v-for="product in cart.slice().reverse()"
						:key="product.key"
						class="bg-white dark:bg-neutral-900/90 border border-neutral-200/80 dark:border-neutral-800/80 rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-sm transition hover:shadow-md flex gap-4 items-center relative">
						<!-- Product Image -->
						<NuxtLink
							:to="
								localePath(
									`/product/${product.product?.node?.sku || product.product?.node?.slug}/${product.product?.node?.slug}`
								)
							"
							class="flex-shrink-0 cursor-pointer">
							<AppImage
								:src="
									product.variation?.node?.image?.sourceUrl ||
									product.product?.node?.image?.sourceUrl
								"
								:alt="product.product?.node?.name || ''"
								aspect-ratio="4/5"
								class="w-20 h-24 sm:w-24 sm:h-28 rounded-xl sm:rounded-2xl shadow-sm"
								img-class="rounded-xl sm:rounded-2xl object-cover" />
						</NuxtLink>

						<!-- Product Details -->
						<div class="flex-1 min-w-0 flex flex-col justify-between self-stretch py-0.5">
							<div>
								<div class="flex items-start justify-between gap-2 mb-1.5">
									<NuxtLink
										:to="
											localePath(
												`/product/${product.product?.node?.sku || product.product?.node?.slug}/${product.product?.node?.slug}`
											)
										"
										class="font-semibold text-sm sm:text-base text-neutral-900 dark:text-neutral-100 hover:text-secondary-600 dark:hover:text-secondary-400 transition line-clamp-2 bidi-auto">
										{{ product.product?.node?.name }}
									</NuxtLink>

									<!-- Quick Direct Remove Button on Top Right/Left -->
									<button
										type="button"
										:disabled="isItemUpdating(product.key)"
										@click="removeItem(product.key)"
										class="p-1.5 text-neutral-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition active:scale-90 flex-shrink-0 disabled:opacity-40"
										aria-label="حذف محصول از سبد خرید"
										title="حذف از سبد خرید">
										<UIcon name="i-iconamoon-trash-light" size="18" />
									</button>
								</div>

								<!-- Variation Attributes (e.g. Size / Model / Color) -->
								<div
									v-if="product.variation?.attributes?.length"
									class="inline-flex items-center gap-1.5 text-xs text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 rounded-lg mb-2">
									<span>{{ $t("product.size") }}:</span>
									<span class="font-bold text-neutral-800 dark:text-neutral-200">
										{{
											product.variation.attributes
												.map((attr) => (attr.value || "").toUpperCase())
												.join(", ")
										}}
									</span>
								</div>
							</div>

							<!-- Price & Quantity Row -->
							<div class="flex flex-wrap items-end justify-between gap-3 mt-2 pt-2 border-t border-neutral-100 dark:border-neutral-800/60">
								<ProductPrice
									class="text-right"
									:sale-price="
										product.variation?.node?.salePrice ||
										product.product?.node?.salePrice
									"
									:regular-price="
										product.variation?.node?.regularPrice ||
										product.product?.node?.regularPrice
									"
									:quantity="product.quantity"
									variant="cart" />

								<!-- Quantity Stepper & Manual Input -->
								<div class="flex items-center gap-1.5 bg-neutral-100 dark:bg-neutral-800/90 border border-neutral-200/80 dark:border-neutral-700/60 rounded-full p-1 shadow-inner">
									<!-- Increment (+) Button -->
									<button
										type="button"
										@click="increment(product.key)"
										class="w-8 h-8 rounded-full bg-white dark:bg-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-600 flex items-center justify-center text-neutral-800 dark:text-white shadow-sm transition active:scale-90"
										aria-label="افزایش تعداد">
										<UIcon name="i-iconamoon-sign-plus" size="16" />
									</button>

									<!-- Quantity Display / Editable Input -->
									<div class="min-w-[32px] text-center px-1 flex items-center justify-center relative">
										<input
											type="text"
											inputmode="numeric"
											:value="
												editingKey === product.key
													? editingQty
													: toPersianDigits(product.quantity)
											"
											@focus="startEditing(product.key, product.quantity)"
											@input="onInputQuantity($event)"
											@blur="applyQuantity(product.key)"
											@keydown.enter.prevent="$event.target.blur()"
											class="w-8 text-center text-sm font-bold bg-transparent outline-none cursor-text select-text"
											aria-label="تعداد کالا" />
										<UIcon
											v-if="isItemUpdating(product.key)"
											name="i-svg-spinners-90-ring-with-bg"
											size="12"
											class="text-secondary-600 dark:text-secondary-400 absolute -top-1 -right-0.5" />
									</div>

									<!-- Decrement (-) Button -->
									<button
										type="button"
										@click="decrement(product.key)"
										class="w-8 h-8 rounded-full bg-white dark:bg-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-600 flex items-center justify-center text-neutral-800 dark:text-white shadow-sm transition active:scale-90"
										:aria-label="product.quantity > 1 ? 'کاهش تعداد' : 'حذف محصول'">
										<UIcon
											size="16"
											:name="
												product.quantity > 1
													? 'i-iconamoon-sign-minus'
													: 'i-iconamoon-trash-light'
											"
											:class="product.quantity === 1 ? 'text-red-500' : ''" />
									</button>
								</div>
							</div>
						</div>
					</div>

					<!-- Service Badges -->
					<div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
						<div class="flex items-center gap-2.5 p-3.5 bg-secondary-50/70 dark:bg-secondary-950/30 border border-secondary-200/50 dark:border-secondary-900/50 rounded-2xl text-xs text-secondary-800 dark:text-secondary-300">
							<UIcon name="i-iconamoon-certificate-badge-duotone" size="20" class="flex-shrink-0 text-secondary-600 dark:text-secondary-400" />
							<span>{{ $t("cart.free_shipping_notice") || "ارسال سریع به سراسر کشور | تضمین اصالت و سلامت فیزیکی کالا" }}</span>
						</div>
						<div class="flex items-center gap-2.5 p-3.5 bg-neutral-100/70 dark:bg-neutral-850/70 border border-neutral-200/60 dark:border-neutral-800/60 rounded-2xl text-xs text-neutral-700 dark:text-neutral-300">
							<UIcon name="i-iconamoon-shield-check-duotone" size="20" class="flex-shrink-0 text-[#23a26d] dark:text-[#40d195]" />
							<span>{{ $t("cart.secure_payment") || "پرداخت مستقیم و امن از طریق کلیه کارت‌های عضو شتاب" }}</span>
						</div>
					</div>
				</div>

				<!-- Checkout Section -->
				<div
					id="checkout-section"
					class="lg:col-span-5 xl:col-span-5 w-full flex flex-col items-center lg:items-stretch lg:sticky lg:top-24">
					<Checkout />
				</div>
			</div>

			<!-- Mobile Sticky Action Bar (visible when scrolling through items on mobile) -->
			<div
				class="fixed bottom-0 left-0 right-0 z-40 lg:hidden p-3 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-t border-neutral-200/80 dark:border-neutral-800/80 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] transition-transform duration-300"
				:class="{ 'translate-y-full': isCheckoutInView }">
				<div class="max-w-md mx-auto flex items-center justify-between gap-3">
					<div>
						<div class="text-[11px] text-neutral-500 dark:text-neutral-400">مجموع سفارش:</div>
						<div class="text-base font-bold text-emerald-600 dark:text-emerald-400">
							{{ cartTotalToman }} تومان
						</div>
					</div>
					<button
						type="button"
						@click="scrollToCheckout"
						class="px-5 py-2.5 rounded-xl bg-secondary-600 hover:bg-secondary-500 text-white font-semibold text-sm flex items-center gap-1.5 shadow-md active:scale-95 transition">
						<span>ثبت و تکمیل خرید</span>
						<UIcon name="i-iconamoon-arrow-down-2-bold" size="16" />
					</button>
				</div>
			</div>
		</div>

		<!-- Empty Cart State -->
		<div
			v-else
			class="min-h-[55vh] flex flex-col items-center justify-center text-center p-6 sm:p-12">
			<div class="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-alizarin-crimson-500/10 dark:bg-alizarin-crimson-500/20 flex items-center justify-center mb-5 shadow-inner">
				<UIcon
					name="i-iconamoon-shopping-bag-fill"
					size="48"
					class="text-alizarin-crimson-600 dark:text-alizarin-crimson-500" />
			</div>
			<h2 class="text-xl sm:text-2xl font-bold mb-2">
				{{ $t("cart.empty") }}
			</h2>
			<p class="text-sm text-neutral-500 dark:text-neutral-400 max-w-sm mb-6 leading-6">
				{{ $t("cart.notting_added") }}
			</p>
			<NuxtLink
				:to="localePath('/shop')"
				class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-secondary-600 hover:bg-secondary-500 text-white font-semibold text-sm shadow-md transition active:scale-95">
				<span>{{ $t("cart.continue_shopping") || "مشاهده فروشگاه" }}</span>
				<UIcon name="i-iconamoon-arrow-left-2" size="18" />
			</NuxtLink>
		</div>
	</div>
</template>
