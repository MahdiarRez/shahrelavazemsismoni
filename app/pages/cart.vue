<!--app/pages/cart.vue-->
<script setup>
import { computed } from "vue";
import { toPersianDigits } from "~~/shared/helpers";

const { t } = useI18n();
const { cart, increment, decrement, isCartUpdating, updatingVariationId } =
	useCart();
const { order } = useCheckout();
const localePath = useLocalePath();
const router = useRouter();

useHead({
	title: () => `${t("cart.title") || "سبد خرید"}`,
});

const totalQuantity = computed(() =>
	cart.value.reduce((s, i) => s + (i.quantity || 0), 0),
);

const goBack = () => {
	if (typeof window !== "undefined" && window.history.length > 1) {
		router.back();
	} else {
		router.push(localePath("/shop"));
	}
};
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
			<div class="flex items-center justify-between mb-6 pb-4 border-b border-neutral-200/80 dark:border-neutral-800/80">
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
				<NuxtLink
					:to="localePath('/shop')"
					class="text-xs sm:text-sm font-medium text-secondary-600 hover:text-secondary-700 dark:text-secondary-400 flex items-center gap-1 active:scale-95 transition">
					<span>{{ $t("cart.continue_shopping") || "ادامه خرید" }}</span>
					<UIcon name="i-iconamoon-arrow-left-2" size="16" />
				</NuxtLink>
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
								<NuxtLink
									:to="
										localePath(
											`/product/${product.product?.node?.sku || product.product?.node?.slug}/${product.product?.node?.slug}`
										)
									"
									class="font-semibold text-sm sm:text-base text-neutral-900 dark:text-neutral-100 hover:text-secondary-600 dark:hover:text-secondary-400 transition line-clamp-2 mb-1.5 bidi-auto block">
									{{ product.product?.node?.name }}
								</NuxtLink>

								<!-- Variation Attributes (e.g. Size / Model) -->
								<div
									v-if="product.variation?.attributes?.length"
									class="inline-flex items-center gap-1.5 text-xs text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 rounded-lg mb-2">
									<span>{{ $t("product.size") }}:</span>
									<span class="font-bold text-neutral-800 dark:text-neutral-200">
										{{
											product.variation.attributes
												.map((attr) => attr.value.toUpperCase())
												.join(", ")
										}}
									</span>
								</div>
							</div>

							<!-- Price & Quantity Row -->
							<div class="flex flex-wrap items-end justify-between gap-3 mt-2 pt-2 border-t border-neutral-100 dark:border-neutral-800/60">
								<ProductPrice
									class="text-right"
									:sale-price="product.variation?.node?.salePrice"
									:regular-price="product.variation?.node?.regularPrice"
									:quantity="product.quantity"
									variant="cart" />

								<!-- Quantity Controls -->
								<div class="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-800/90 border border-neutral-200/80 dark:border-neutral-700/60 rounded-full p-1 shadow-inner">
									<button
										type="button"
										:disabled="isCartUpdating"
										@click="increment(product.variation?.node?.databaseId)"
										class="w-8 h-8 rounded-full bg-white dark:bg-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-600 flex items-center justify-center text-neutral-800 dark:text-white shadow-sm transition active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed"
										aria-label="افزایش تعداد">
										<UIcon name="i-iconamoon-sign-plus" size="16" />
									</button>
									<span class="text-sm font-bold min-w-[24px] text-center px-1 flex items-center justify-center">
										<UIcon
											v-if="isCartUpdating && updatingVariationId === product.variation?.node?.databaseId"
											name="i-svg-spinners-90-ring-with-bg"
											size="16"
											class="text-secondary-600 dark:text-secondary-400" />
										<span v-else>{{ toPersianDigits(product.quantity) }}</span>
									</span>
									<button
										type="button"
										:disabled="isCartUpdating"
										@click="decrement(product.variation?.node?.databaseId)"
										class="w-8 h-8 rounded-full bg-white dark:bg-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-600 flex items-center justify-center text-neutral-800 dark:text-white shadow-sm transition active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed"
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
				<div class="lg:col-span-5 xl:col-span-5 w-full flex flex-col items-center lg:items-stretch lg:sticky lg:top-24">
					<Checkout />
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
