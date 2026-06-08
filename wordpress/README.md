# WordPress / WooCommerce Setup for ZarinPal

## 1. Install ZarinPal Gateway Plugin

1. In WordPress admin, go to **Plugins → Add New**
2. Search for **ZarinPal WooCommerce** (or install from [ZarinPal docs](https://www.zarinpal.com/docs/))
3. Activate the plugin

## 2. Configure ZarinPal

WooCommerce → **Settings → Payments → ZarinPal**:

| Setting | Value |
|---------|-------|
| Enable | Yes |
| Merchant ID | From ZarinPal merchant panel |
| Sandbox | ON for testing |
| Title | زرین‌پال |

Note the **payment method ID** (usually `WC_ZPal` or `zarinpal`) — set this as `ZARINPAL_PAYMENT_METHOD` in the Nuxt `.env`.

## 3. Install Nuxt Payment Redirect Plugin

Copy `nuxt-payment-redirect.php` to one of:

- `wp-content/mu-plugins/nuxt-payment-redirect.php` (auto-loaded), or
- `wp-content/plugins/nuxt-payment-redirect/nuxt-payment-redirect.php` (activate in Plugins)

Set your Nuxt URL in `wp-config.php`:

```php
define('NUXT_SITE_URL', 'https://your-nuxt-domain.com');
```

For local dev:

```php
define('NUXT_SITE_URL', 'http://localhost:3000');
```

## 4. WooCommerce REST API (read-only)

WooCommerce → **Settings → Advanced → REST API → Add key**:

- Description: `Nuxt payment verify`
- User: Admin
- Permissions: **Read**

Copy the Consumer key and Consumer secret into Nuxt `.env` as `WC_CONSUMER_KEY` and `WC_CONSUMER_SECRET`.

## 5. Verify Payment Method ID

Run this in WP admin or check WooCommerce → Settings → Payments. Common IDs:

- `WC_ZPal`
- `zarinpal`

Match the ID exactly in `ZARINPAL_PAYMENT_METHOD`.
