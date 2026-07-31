// nuxt.config.ts
import process from "process";
import pkg from "./package.json";

// Bare hostname of the WordPress/WooCommerce backend, used both to allow-list
// remote images for the image optimizer and to emit early connection hints.
const wpHost = (process.env.NUXT_PUBLIC_WP_BASE_URL || "")
	.replace(/^https?:\/\//, "")
	.replace(/\/.*$/, "");

export default defineNuxtConfig({
	devtools: { enabled: false },

	app: {
		head: {
			// Warm up the connection to the WordPress/image origin so the first
			// product image and API call don't pay the full DNS+TLS handshake cost.
			link: wpHost
				? [
						{
							rel: "preconnect",
							href: `https://${wpHost}`,
							crossorigin: "",
						},
						{ rel: "dns-prefetch", href: `https://${wpHost}` },
				  ]
				: [],
		},
	},

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
				dir: "ltr",
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
