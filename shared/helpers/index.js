// ---------- تبدیل ارقام ----------
const EN_TO_FA = new Map([
	["0", "۰"],
	["1", "۱"],
	["2", "۲"],
	["3", "۳"],
	["4", "۴"],
	["5", "۵"],
	["6", "۶"],
	["7", "۷"],
	["8", "۸"],
	["9", "۹"],
]);

function toEnglishDigits(persian) {
	return persian.replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 1776));
}

export function toPersianDigits(english) {
	return english.replace(/\d/g, (d) => EN_TO_FA.get(d) ?? d);
}

/**
 * Formats a date string into the Persian (Jalali) calendar with Persian digits.
 *
 * @param {string | number | Date} input
 * @returns {string}
 */
export function formatJalaliDate(input) {
	if (!input) return "";
	const date = input instanceof Date ? input : new Date(input);
	if (Number.isNaN(date.getTime())) return "";

	return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
		year: "numeric",
		month: "long",
		day: "numeric",
	}).format(date);
}

function isNonEmptyString(value) {
	return typeof value === "string" && value.trim().length > 0;
}

function extractFirstNumber(text) {
	const regex = /([\d۰۱۲۳۴۵۶۷۸۹]+(?:[.,]\d+)*)/;
	const match = text.match(regex);
	return match?.[1] ?? null;
}

function normalizePriceString(raw) {
	const englishDigits = toEnglishDigits(raw);
	return englishDigits.replace(/[.,]/g, "");
}

function formatNumber(
	value,
	{ persianDigits = true, withSeparator = true } = {},
) {
	let str = value.toString();

	if (withSeparator) {
		// جداکنندهٔ هزار (،) – ابتدا به انگلیسی اضافه می‌کنیم
		str = str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	// تبدیل به فارسی اگر نیاز باشد
	return persianDigits ? toPersianDigits(str) : str;
}

/**
 *
 *
 * @param {string} priceRangeString
 * @param {{ persianDigits?: boolean, withSeparator?: boolean }=} options
 *
 * @returns {string}
 */
export function convertMinPriceRangeToToman(priceRangeString, options = {}) {
	const { persianDigits = true, withSeparator = true } = options;

	if (!isNonEmptyString(priceRangeString)) {
		console.error(
			"Invalid input: priceRangeString must be a non‑empty string.",
		);
		return "ورودی نامعتبر";
	}

	const rawPrice = extractFirstNumber(priceRangeString);
	if (rawPrice === null) {
		console.error(
			"Could not extract a valid price from:",
			priceRangeString,
		);
		return "استخراج قیمت ناموفق";
	}

	const cleaned = normalizePriceString(rawPrice);
	const rial = Number.parseInt(cleaned, 10);
	if (Number.isNaN(rial)) {
		console.error(
			"Failed to parse cleaned price string into a number:",
			cleaned,
		);
		return "تبدیل به عدد ناموفق";
	}

	const toman = Math.floor(rial / 10);
	return formatNumber(toman, { persianDigits, withSeparator });
}
