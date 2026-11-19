<?php
/**
 * Plugin Name: Nuxt Headless Checkout Bridge
 * Description: Loads the headless (WooGraphQL) cart on the native WooCommerce checkout page and redirects the thank-you / cancel pages back to the Nuxt storefront after payment.
 * Version: 2.0.0
 *
 * Install: copy this file to wp-content/mu-plugins/ or wp-content/plugins/ and activate.
 *
 * Define the storefront origin in wp-config.php, e.g.
 *   define('NUXT_SITE_URL', 'https://your-storefront.example');
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Keep the WordPress frontend hidden behind WooCommerce "Coming soon" mode
 * (WooCommerce → Settings → Site Visibility) — the Nuxt app is the real
 * storefront — but let shoppers still reach the native cart/checkout pages
 * (and their endpoints: order-pay, order-received) that we hand them off to.
 *
 * Without this, the whole WP frontend, including /checkout/, is replaced by the
 * "Pardon our dust!" placeholder and payment can never happen.
 */
add_filter('woocommerce_coming_soon_exclude', function ($excluded) {
    if (!function_exists('wc_get_page_permalink')) {
        return $excluded;
    }

    $request_path = trim(
        (string) parse_url($_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH),
        '/'
    );

    foreach (['checkout', 'cart'] as $page) {
        $permalink = wc_get_page_permalink($page);
        if (!$permalink) {
            continue;
        }

        $page_path = trim((string) parse_url($permalink, PHP_URL_PATH), '/');
        if ($page_path === '') {
            continue;
        }

        // Match the page itself and any of its WooCommerce endpoints.
        if (
            $request_path === $page_path
            || strpos($request_path, $page_path . '/') === 0
        ) {
            return true;
        }
    }

    return $excluded;
});

/**
 * Restore the shopper's WooGraphQL cart when they are handed off to the native
 * checkout page via `/checkout/?session_id=<id>`. The id is the WooCommerce
 * session key that WooGraphQL used to store the cart, so we simply copy that
 * session's data into the current request's session before the cart is built.
 */
add_action('woocommerce_load_cart_from_session', function () {
    if (empty($_GET['session_id'])) {
        return;
    }

    $session_id   = sanitize_text_field(wp_unslash($_GET['session_id']));
    $handler      = new WC_Session_Handler();
    $session_data = $handler->get_session($session_id);

    if (empty($session_data) || !is_array($session_data)) {
        return;
    }

    foreach ($session_data as $key => $value) {
        WC()->session->set($key, maybe_unserialize($value));
    }
});

/**
 * Helper to get the Nuxt storefront base URL.
 */
function nuxt_redirect_get_base_url() {
    $nuxt_base = defined('NUXT_SITE_URL') ? NUXT_SITE_URL : 'http://localhost:3000';
    return rtrim($nuxt_base, '/');
}

/**
 * Send the shopper back to the Nuxt storefront after a successful payment.
 */
add_filter('woocommerce_get_return_url', function ($return_url, $order) {
    if (!$order) {
        return $return_url;
    }

    // Ensure payment_complete is recorded if returning with success (e.g. status 1 or status 11)
    if (isset($_GET['wc_status']) && $_GET['wc_status'] === 'success' && $order->needs_payment()) {
        $trans_id = sanitize_text_field($_GET['trans_id'] ?? $_POST['trans_id'] ?? '');
        $order->payment_complete($trans_id);
    }

    $nuxt_base = nuxt_redirect_get_base_url();

    return $nuxt_base . '/payment/success'
        . '?order_id=' . $order->get_id()
        . '&key=' . $order->get_order_key();
}, 10, 2);

/**
 * Send the shopper back to the storefront when they cancel / a payment fails.
 */
add_filter('woocommerce_get_cancel_order_url', function ($cancel_url, $order) {
    if (!$order) {
        return $cancel_url;
    }

    $nuxt_base = nuxt_redirect_get_base_url();

    return $nuxt_base . '/payment/failed'
        . '?order_id=' . $order->get_id()
        . '&key=' . $order->get_order_key();
}, 10, 2);

/**
 * Redirect payment failures/cancellations to the Nuxt storefront
 * instead of the native WooCommerce checkout page.
 *
 * The BitPay plugin calls wp_redirect(get_checkout_url()) on failure/cancel.
 * This filter intercepts that URL and points it to Nuxt.
 */
add_filter('woocommerce_get_checkout_url', function ($url) {
    if (empty($_GET['wc_order']) && empty($_POST['wc_order'])) {
        return $url;
    }

    $order_id = absint($_GET['wc_order'] ?? $_POST['wc_order'] ?? 0);
    $order    = wc_get_order($order_id);
    if (!$order) {
        return $url;
    }

    $nuxt_base = nuxt_redirect_get_base_url();

    return $nuxt_base . '/payment/failed'
        . '?order_id=' . $order->get_id()
        . '&key=' . $order->get_order_key();
});

/**
 * Flag order on cancellation or failure so any subsequent retry generates
 * a fresh BitPay transaction token instead of reusing a failed/cancelled one.
 */
add_action('WC_bitpayir2_Return_from_Gateway_Cancelled', function ($order_id) {
    $order = wc_get_order($order_id);
    if ($order) {
        $order->update_meta_data('_bitpay_failed', '1');
        $order->save();
    }
});

add_action('WC_bitpayir2_Return_from_Gateway_Failed', function ($order_id) {
    $order = wc_get_order($order_id);
    if ($order) {
        $order->update_meta_data('_bitpay_failed', '1');
        $order->save();
    }
});

/**
 * Priority 1: Bridge POST data to GET for the BitPay plugin.
 * BitPay sends callback parameters (id_get, trans_id, cardNum, factorId) via HTTP POST,
 * but the official WC_bitpayir2 plugin reads exclusively from $_GET['id_get'] and $_GET['trans_id'].
 * We populate $_GET from $_POST so the official plugin can successfully verify the transaction.
 */
add_action('woocommerce_api_wc_bitpayir2', function () {
    if (empty($_GET['id_get']) && !empty($_POST['id_get'])) {
        $_GET['id_get'] = sanitize_text_field($_POST['id_get']);
    }
    if (empty($_GET['trans_id']) && !empty($_POST['trans_id'])) {
        $_GET['trans_id'] = sanitize_text_field($_POST['trans_id']);
    }
    if (empty($_GET['wc_order']) && !empty($_POST['wc_order'])) {
        $_GET['wc_order'] = absint($_POST['wc_order']);
    }
}, 1);

/**
 * Priority 5: Intercept BitPay callback BEFORE the BitPay plugin's Priority 10 handler
 * to strictly prevent stale/superseded transactions or cancelled orders from being verified.
 */
add_action('woocommerce_api_wc_bitpayir2', function () {
    $order_id = absint($_GET['wc_order'] ?? $_POST['wc_order'] ?? 0);
    $id_get   = sanitize_text_field($_GET['id_get'] ?? $_POST['id_get'] ?? '');

    if (!$order_id || empty($id_get)) {
        return;
    }

    $order = wc_get_order($order_id);
    if (!$order) {
        return;
    }

    $status = $order->get_status();

    // If order is already completed or processing, let the default handler redirect cleanly.
    if ($status === 'completed' || $status === 'processing') {
        return;
    }

    $base_url = nuxt_redirect_get_base_url();

    // Reject callbacks for cancelled orders
    if ($status === 'cancelled') {
        $order->add_order_note(sprintf(
            'تلاش برای بازگشت از درگاه روی سفارش لغو شده مسدود شد. شناسه تراکنش: %s',
            $id_get
        ));
        wp_redirect(trailingslashit($base_url) . 'payment/failed?order_id=' . $order_id . '&key=' . $order->get_order_key() . '&reason=order_cancelled');
        exit;
    }

    // Stale Token Guard: Ensure the incoming id_get matches the active transaction for this order!
    $active_id_get = $order->get_meta('_bitpay_id_get');
    if (!empty($active_id_get) && $id_get !== $active_id_get) {
        $order->add_order_note(sprintf(
            'تلاش برای بازگشت از درگاه با شناسه تراکنش منقضی یا نامعتبر مسدود شد. شناسه دریافتی: %s | شناسه فعال سفارش: %s',
            $id_get,
            $active_id_get
        ));
        wp_redirect(trailingslashit($base_url) . 'payment/failed?order_id=' . $order_id . '&key=' . $order->get_order_key() . '&reason=stale_token');
        exit;
    }
}, 5);



