// server/plugins/wp-tls.ts
//
// Some hosting providers (e.g. Liara and other Iranian PaaS) serve the
// WordPress backend with a TLS certificate signed by a local CA that is not in
// Node's trust store. Browsers may trust it, but Node's server-side fetch /
// GraphQL calls fail with `UNABLE_TO_VERIFY_LEAF_SIGNATURE`, breaking every
// data request from the Nuxt server to WordPress.
//
// When `WP_INSECURE_TLS=true`, relax certificate verification for this server
// process so those internal backend calls succeed. This is opt-in and should be
// left OFF in production whenever the backend can use a publicly-trusted
// certificate (Let's Encrypt) or the CA is provided via NODE_EXTRA_CA_CERTS.
export default defineNitroPlugin(() => {
	if (process.env.WP_INSECURE_TLS === "true") {
		process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
		console.warn(
			"[wp-tls] TLS certificate verification is DISABLED for outbound requests (WP_INSECURE_TLS=true). Use a trusted certificate in production.",
		);
	}
});
