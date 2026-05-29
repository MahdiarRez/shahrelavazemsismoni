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
		detectBrowserLanguage: {
			useCookie: true,
			cookieKey: "i18n_redirected",
			redirectOn: "root",
			alwaysRedirect: true,
		},
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

	css: ["notivue/notification.css", "notivue/animations.css"],

	runtimeConfig: {
		gqlHost: process.env.GQL_HOST || "",
		public: {
			version: pkg.version,
		},
	},

	routeRules: {
		"/": { prerender: false },
		"/categories": { cache: false },
		"/favorites": { cache: false },
	},

	nitro: {
		prerender: { routes: ["/sitemap.xml", "/robots.txt"] },
	},

	compatibilityDate: "2024-08-03",
});
