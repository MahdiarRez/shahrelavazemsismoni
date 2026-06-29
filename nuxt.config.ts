// nuxt.config.ts
import process from "process";
import pkg from "./package.json";

export default defineNuxtConfig({
	devtools: { enabled: false },

	modules: [
		"nuxt-graphql-request",
		"@vueuse/nuxt",
		"@nuxt/ui",
		"@nuxt/image",
		"notivue/nuxt",
		"@nuxthub/core",
		"@nuxtjs/i18n",
	],

	i18n: {
		defaultLocale: "fa",
		strategy: "prefix_except_default",
		langDir: "locales",
		// Persian-first audience: always serve fa by default and never auto-redirect
		// visitors to another language based on their browser settings. Users can
		// still switch language manually via the footer selector.
		detectBrowserLanguage: false,
		locales: [
			{
				code: "fa",
				iso: "fa-IR",
				file: "fa-IR.json",
				name: "🇮🇷 فارسی",
				dir: "rtl",
			},

			{
				code: "en",
				iso: "en-GB",
				file: "en-GB.json",
				name: "🇬🇧 English",
			},
			{
				code: "nb",
				iso: "nb-NO",
				file: "nb-NO.json",
				name: "🇳🇴 Norsk (Bokmål)",
			},
			{
				code: "nl",
				iso: "nl-NL",
				file: "nl-NL.json",
				name: "🇳🇱 Nederlands",
			},
			{
				code: "de",
				iso: "de-DE",
				file: "de-DE.json",
				name: "🇩🇪 Deutsch",
			},
		],
	},

	hub: {
		cache: false,
	},

	notivue: {
		position: "top-center",
		limit: 3,
		notifications: { global: { duration: 3000 } },
	},

	css: [
		"notivue/notification.css",
		"notivue/animations.css",
		"~/iran-sans.css",
	],

	runtimeConfig: {
		gqlHost: process.env.GQL_HOST || "",
		wcConsumerKey: process.env.WC_CONSUMER_KEY || "",
		wcConsumerSecret: process.env.WC_CONSUMER_SECRET || "",
		public: {
			wpBaseUrl: process.env.NUXT_PUBLIC_WP_BASE_URL || "",
			siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "",
			zarinpalPaymentMethod:
				process.env.NUXT_PUBLIC_ZARINPAL_PAYMENT_METHOD || "WC_ZPal",
			version: pkg.version,
		},
	},

	routeRules: {
		"/": { prerender: false },
		"/shop": { cache: false },
		"/categories": { cache: false },
		"/favorites": { cache: false },
		"/payment/**": { cache: false },
	},

	nitro: {
		prerender: { routes: ["/sitemap.xml", "/robots.txt"] },
	},

	compatibilityDate: "2024-08-03",
});
