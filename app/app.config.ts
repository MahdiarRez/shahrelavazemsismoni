// app/app.config.ts
export default defineAppConfig({
	site: {
		name: "شهر لوازم سیسمونی",
		description:
			"NuxtCommerce is a dynamic e-commerce solution developed with Nuxt 4 and GraphQL, tailored for WooCommerce.",
		phone: "+982112345678",
		email: "info@sismoni.local",
		socials: [
			{ icon: "i-iconamoon-comment-dots", url: "#", label: "WhatsApp" },
			{ icon: "i-iconamoon-send-fill", url: "#", label: "Telegram" },
			{ icon: "i-iconamoon-camera-image", url: "#", label: "Instagram" },
		],
	},
	ui: {
		primary: "blue",
		gray: "neutral",
	},
});
