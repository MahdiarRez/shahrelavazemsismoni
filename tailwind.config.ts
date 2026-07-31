import plugin from "tailwindcss/plugin";

export default {
	theme: {
		extend: {
			fontFamily: {
				sans: [
					"IranSans",
					"ui-sans-serif",
					"system-ui",
					"Arial",
					"sans-serif",
				],
				en: [
					"IranSansEn",
					"ui-sans-serif",
					"system-ui",
					"Calibri",
					"sans-serif",
				],
			},

			screens: {
				xs: "320px",
				"3xl": "1920px",
			},

			colors: {
				primary: {
					DEFAULT: "#009fd6",
					50: "#effaff",
					100: "#def5ff",
					200: "#b6edff",
					300: "#75dfff",
					400: "#2ccbff",
					500: "#009fd6",
					600: "#0086bc",
					700: "#006b98",
					800: "#005a7e",
					900: "#064b68",
				},
				secondary: {
					DEFAULT: "#ffc5da",
					50: "#fff0f5",
					100: "#ffe3ed",
					200: "#ffc5da",
					300: "#ff97bc",
					400: "#ff5a92",
					500: "#f92b6a",
					600: "#e9114d",
					700: "#c4073a",
					800: "#a20a33",
					900: "#870e2f",
				},
				"secondary-text": "#737373",
				"secondary-text-d": "#a8a8a8",
				"alizarin-crimson": {
					50: "#fff0f2",
					100: "#ffdde2",
					200: "#ffc1ca",
					300: "#ff95a5",
					400: "#ff5972",
					500: "#ff2646",
					600: "#fc062a",
					700: "#e60022",
					800: "#af051e",
					900: "#900c20",
					950: "#50000c",
				},
			},
		},
	},

	plugins: [
		plugin(({ addUtilities }) => {
			addUtilities({
				/*
				 * برای متن‌های دینامیک/چندزبانه (اسم محصول، دسته‌بندی و ...)
				 * که ممکنه فارسی، انگلیسی یا ترکیبی باشن.
				 * معادل CSS-ای dir="auto" — جهت رو بر اساس اولین کاراکتر
				 * قوی (strong character) خودِ متن تشخیص می‌ده، مستقل از
				 * dir والد، بدون به‌هم‌ریختن ترتیب کلمات.
				 */
				".bidi-auto": {
					"unicode-bidi": "plaintext",
				},
				/*
				 * برای بخش‌های کوچیک‌تر داخل یه بلاک متنی (مثل یه عدد یا
				 * کد لاتین وسط جمله‌ی فارسی) که نباید روی جهت کل جمله
				 * تأثیر بذاره یا ازش تأثیر بگیره.
				 */
				".bidi-isolate": {
					"unicode-bidi": "isolate",
				},
			});
		}),
	],
};
