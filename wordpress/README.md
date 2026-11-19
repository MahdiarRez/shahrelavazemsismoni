# WordPress / WooCommerce Setup for Headless BitPay.ir

This document outlines the setup required on WordPress / WooCommerce for the Nuxt-native headless checkout with BitPay.ir.

---

## 1. Install Official BitPay Gateway Plugin

1. In WordPress admin, go to **Plugins → Add New → Upload Plugin**.
2. Upload the official BitPay plugin zip (`bitpay-woocommerce-V4.2.0.zip`).
3. Activate the plugin.

---

## 2. Configure BitPay in WooCommerce

Go to **WooCommerce → Settings → Payments → پرداخت امن بیت پی**:

| Setting | Value |
|---------|-------|
| Enable / فعالسازی | Checked (Yes) |
| Title / عنوان | پرداخت امن بیت پی |
| Api | Your BitPay.ir merchant API key |
| Sandbox / حالت آزمایشی | Checked for test transactions; Unchecked for live production |

---

## 3. Install Companion MU-Plugins

Copy both PHP files in this directory to `wp-content/mu-plugins/` on your WordPress instance (e.g. Liara):

1. **`headless-checkout-api.php`**
   - Provides the internal `POST /wp-json/headless-checkout/v1/order` endpoint.
   - Creates the order, applies customer address to billing and shipping, sets shipping to 0, and initiates the BitPay transaction directly.

2. **`nuxt-payment-redirect.php`**
   - Rewrites return and failure URLs to redirect customers back to Nuxt (`/payment/success` and `/payment/failed`).
   - Ensures WooCommerce "Coming Soon" exclusions work correctly.

---

## 4. Configure `wp-config.php`

Add the following constants to your WordPress `wp-config.php`:

```php
// The origin of your Nuxt storefront
define('NUXT_SITE_URL', 'https://your-nuxt-domain.com');

// Shared secret for headless checkout (must match NUXT_HEADLESS_CHECKOUT_SECRET in Nuxt)
define('HEADLESS_CHECKOUT_SECRET', 'YOUR_NEW_SECURE_SECRET_HERE');
```

For local development:
```php
define('NUXT_SITE_URL', 'http://localhost:3000');
```

---

## 5. WooCommerce REST API (Read-Only)

Used by Nuxt's `/api/payment/verify` endpoint to verify order status on the payment confirmation screen.

In WordPress admin:
**WooCommerce → Settings → Advanced → REST API → Add key**:
- Description: `Nuxt payment verify`
- Permissions: **Read**

Ensure `NUXT_WC_CONSUMER_KEY` and `NUXT_WC_CONSUMER_SECRET` in Nuxt match this API key.
