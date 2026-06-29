<script setup>
import { computed, ref } from "vue";
import { z } from "zod";
import { convertMinPriceRangeToToman, toPersianDigits } from "~~/shared/helpers";

const { userDetails, checkoutStatus, handleCheckout } = useCheckout();
const { cart } = useCart();

// * اضافه شـد *: تعریف اسکیمای اعتبارسنجی فرم
const checkoutSchema = z.object({
	email: z.string().email("فرمت ایمیل نامعتبر است"),
	lastName: z.string().min(2, "حداقل ۲ کاراکتر الزامی است"),
	firstName: z.string().min(2, "حداقل ۲ کاراکتر الزامی است"),
	// بررسی شماره موبایل ایران (۱۱ رقم که با 09 شروع شود)
	phone: z
		.string()
		.regex(/^09\d{9}$/, "شماره موبایل نامعتبر است (مثال: 09123456789)"),
	city: z.string().min(2, "نام شهر را وارد کنید"),
	postcode: z
		.string()
		.regex(/^\d{10}$/, "کد پستی باید ۱۰ رقم باشد")
		.or(z.literal("")),
	address1: z.string().min(10, "آدرس باید حداقل ۱۰ کاراکتر باشد"),
});

// * اضافه شـد *: استیت برای نگهداری خطاهای فرم
const formErrors = ref({});

// * اضافه شـد *: تابع هندل کننده فرم قبل از ارسال به درگاه
const validateAndSubmit = async () => {
	// پاک کردن خطاهای قبلی
	formErrors.value = {};

	// بررسی مقادیر فرم با اسکیمای Zod
	const result = checkoutSchema.safeParse(userDetails.value);

	if (!result.success) {
		// تبدیل خطاهای Zod به یک آبجکت ساده برای نمایش در قالب
		result.error.issues.forEach((issue) => {
			formErrors.value[issue.path[0]] = issue.message;
		});
		return; // اگر خطایی بود، متوقف شو
	}

	// اگر فرم معتبر بود، تابع اصلی پرداخت را صدا بزن
	await handleCheckout();
};

const totalQuantity = computed(() =>
	toPersianDigits(
		`${cart.value.reduce((s, i) => s + (i.quantity || 0), 0)}`,
	),
);

const parsePrice = (priceStr) => {
	if (!priceStr) return 0;
	const onlyDigits = priceStr.toString().replace(/[^\d]/g, "");
	return Number(onlyDigits);
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
		class="md:w-96 h-full bg-black/5 dark:bg-white/10 mb-3 mr-3 p-3 max-md:ml-3 rounded-3xl">
		<h5 class="text-xl font-medium px-2 pt-2 text-center">ثبت سفارش</h5>
		<h6 class="text-sm font-normal px-2 pt-2 mb-3 text-center opacity-60">
			آدرس و شماره تلفن همراه را با دقت وارد کنید
		</h6>

		<form
			@submit.prevent="validateAndSubmit"
			class="flex flex-col items-center justify-center"
			novalidate>
			<div class="grid grid-cols-2 gap-3 billing w-full">
				<div class="col-span-full">
					<input
						v-model="userDetails.email"
						:placeholder="$t('checkout.form.email')"
						name="email"
						type="email"
						:class="{ 'has-error': formErrors.email }"
						@input="formErrors.email = ''" />
					<span
						v-if="formErrors.email"
						class="error-msg"
						>{{ formErrors.email }}</span
					>
				</div>

				<div class="col-span-1">
					<input
						v-model="userDetails.lastName"
						:placeholder="$t('checkout.form.last_name')"
						name="last-name"
						type="text"
						:class="{ 'has-error': formErrors.lastName }"
						@input="formErrors.lastName = ''" />
					<span
						v-if="formErrors.lastName"
						class="error-msg"
						>{{ formErrors.lastName }}</span
					>
				</div>

				<div class="col-span-1">
					<input
						v-model="userDetails.firstName"
						:placeholder="$t('checkout.form.first_name')"
						name="first-name"
						type="text"
						:class="{ 'has-error': formErrors.firstName }"
						@input="formErrors.firstName = ''" />
					<span
						v-if="formErrors.firstName"
						class="error-msg"
						>{{ formErrors.firstName }}</span
					>
				</div>

				<div class="col-span-1">
					<input
						v-model="userDetails.phone"
						:placeholder="$t('checkout.form.phone')"
						name="phone"
						type="tel"
						dir="ltr"
						class="!text-left placeholder:text-right"
						:class="{ 'has-error': formErrors.phone }"
						@input="formErrors.phone = ''" />
					<span
						v-if="formErrors.phone"
						class="error-msg"
						>{{ formErrors.phone }}</span
					>
				</div>

				<div class="col-span-1">
					<input
						v-model="userDetails.city"
						:placeholder="$t('checkout.form.city')"
						name="city"
						type="text"
						:class="{ 'has-error': formErrors.city }"
						@input="formErrors.city = ''" />
					<span
						v-if="formErrors.city"
						class="error-msg"
						>{{ formErrors.city }}</span
					>
				</div>

				<div class="col-span-full">
					<input
						v-model="userDetails.postcode"
						:placeholder="$t('checkout.form.postcode')"
						name="postcode"
						type="text"
						inputmode="numeric"
						dir="ltr"
						class="!text-left placeholder:text-right"
						:class="{ 'has-error': formErrors.postcode }"
						@input="formErrors.postcode = ''" />
					<span
						v-if="formErrors.postcode"
						class="error-msg"
						>{{ formErrors.postcode }}</span
					>
				</div>

				<div class="col-span-full">
					<textarea
						v-model="userDetails.address1"
						:placeholder="$t('checkout.form.address')"
						name="address"
						rows="2"
						:class="{ 'has-error': formErrors.address1 }"
						@input="formErrors.address1 = ''"></textarea>
					<span
						v-if="formErrors.address1"
						class="error-msg"
						>{{ formErrors.address1 }}</span
					>
				</div>
			</div>

			<div
				class="text-sm font-semibold p-4 text-neutral-600 dark:text-neutral-400">
				{{
					$t("checkout.pay.description", {
						total: cartTotal + " تومان",
						items: totalQuantity,
					})
				}}
			</div>

			<button
				type="submit"
				:disabled="checkoutStatus !== 'order'"
				class="pay-button-bezel w-full h-14 rounded-full relative font-semibold text-white dark:text-black text-lg flex justify-center items-center">
				<Transition name="slide-up">
					<div
						v-if="checkoutStatus === 'order'"
						class="absolute">
						{{
							$t("checkout.pay.btn", {
								total: cartTotal + " تومان",
							})
						}}
					</div>
					<UIcon
						v-else-if="checkoutStatus === 'processing'"
						class="absolute"
						name="i-svg-spinners-90-ring-with-bg"
						size="22" />
				</Transition>
			</button>

			<div
				class="text-xs font-medium p-4 flex gap-1 items-end text-neutral-400 dark:text-neutral-600">
				<div>
					{{
						$t("checkout.pay.secure", {
							method: "زرین پی",
						})
					}}
				</div>
				<UIcon
					name="i-iconamoon-lock-fill"
					size="18" />
			</div>
		</form>
	</div>
</template>

<style lang="postcss">
:root {
	--background: #fff;
	--border: #ccc;
}

.dark {
	--background: #000;
	--border: #999;
}

input:-webkit-autofill,
textarea:-webkit-autofill,
select:-webkit-autofill {
	-webkit-box-shadow: 0 0 0px 1000px var(--background, #fff) inset !important;
	box-shadow: 0 0 0px 1000px var(--background, #fff) inset !important;
	border-color: var(--border) !important;
}

.billing input,
.billing textarea {
	@apply block bg-white/80 dark:bg-black/20 dark:border-white/20 w-full shadow font-semibold border-2 border-transparent transition hover:border-black/20 dark:hover:border-white rounded-2xl py-3 px-4 text-black dark:text-white placeholder:text-neutral-400 text-sm leading-6 focus-visible:outline-none focus-visible:border-black/40 focus-visible:dark:border-white text-right;
}

/* * اضافه شـد *: استایل‌های ارور */
.billing .has-error {
	@apply !border-red-500/80 dark:!border-red-500/80 focus-visible:!border-red-500;
}

.error-msg {
	@apply text-xs text-right text-red-500 font-normal mt-1 block px-2;
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 250ms;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}

textarea {
	resize: none;
}

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
}
</style>
