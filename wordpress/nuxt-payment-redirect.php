<?php
/**
 * Plugin Name: Nuxt Headless Checkout Bridge
 * Description: Keeps WordPress dedicated to the admin panel, loads the headless cart on checkout, and redirects customers back to Nuxt ONLY after payment (success/fail).
 * Version: 2.1.0
 *
 * Install: copy this file to wp-content/mu-plugins/ or wp-content/plugins/ and activate.
 *
 * Define the storefront origin in wp-config.php, e.g.
 *   define('NUXT_SITE_URL', 'https://shahrsismoony.ir');
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * 1. Reverse Proxy SSL Detection (Liara).
 * Ensures WordPress properly recognizes HTTPS behind Liara's reverse proxy,
 * preventing redirect loops and protocol mismatches on admin URLs.
 */
if (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && strtolower($_SERVER['HTTP_X_FORWARDED_PROTO']) === 'https') {
    $_SERVER['HTTPS'] = 'on';
}

/**
 * 2. Fix for reverse proxies where accessing /wp-admin without a trailing slash
 * causes Apache to redirect to port 80 (http://.../wp-admin/) and time out.
 */
add_action('init', function () {
    $path = parse_url($_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH);
    if ($path === '/wp-admin') {
        wp_redirect(admin_url(), 301);
        exit;
    }
}, 1);

/**
 * 3. Helper to get the Nuxt storefront base URL.
 * Used EXCLUSIVELY for customer payment return/failure redirects.
 */
function nuxt_redirect_get_base_url() {
    if (defined('NUXT_SITE_URL') && !empty(NUXT_SITE_URL)) {
        return rtrim(NUXT_SITE_URL, '/');
    }

    $host = $_SERVER['HTTP_HOST'] ?? '';
    $is_local = (strpos($host, 'localhost') !== false || strpos($host, '127.0.0.1') !== false || strpos($host, '.local') !== false);

    if ($is_local) {
        return 'http://localhost:3000';
    }

    return rtrim(home_url(), '/');
}

/**
 * 4. Dedicated WordPress Admin Access:
 * The WordPress backend is reserved for the administrator.
 * When opening the root URL (https://wordpress-sismooni.liara.run/) or frontend pages,
 * visitors and admins are routed directly to the WordPress Admin panel (/wp-admin/).
 * - If logged in: opens the Admin Dashboard.
 * - If not logged in: opens the clean WordPress login page (wp-login.php).
 *
 * It NEVER redirects the admin to the main storefront site!
 */
add_action('template_redirect', function () {
    // Never interfere with admin, REST API, GraphQL, or cron
    if (is_admin() || (defined('REST_REQUEST') && REST_REQUEST) || (defined('DOING_CRON') && DOING_CRON)) {
        return;
    }

    $request_uri  = $_SERVER['REQUEST_URI'] ?? '/';
    $request_path = trim((string) parse_url($request_uri, PHP_URL_PATH), '/');

    // Allow WooCommerce checkout / cart pages and endpoints for shopper payment processing
    if (function_exists('wc_get_page_permalink')) {
        foreach (['checkout', 'cart'] as $page) {
            $permalink = wc_get_page_permalink($page);
            if (!$permalink) {
                continue;
            }
            $page_path = trim((string) parse_url($permalink, PHP_URL_PATH), '/');
            if ($page_path !== '' && ($request_path === $page_path || strpos($request_path, $page_path . '/') === 0)) {
                return;
            }
        }
    }

    // Direct all other visits to WordPress Admin (which prompts login if not authenticated)
    wp_redirect(admin_url());
    exit;
}, 1);

/**
 * 5. Keep the WordPress frontend hidden behind WooCommerce "Coming soon" mode
 * (WooCommerce → Settings → Site Visibility) but allow admins and checkout handoffs.
 */
add_filter('woocommerce_coming_soon_exclude', function ($excluded) {
    // Always exclude logged-in administrators and shop managers
    if (is_user_logged_in() && (current_user_can('manage_options') || current_user_can('manage_woocommerce'))) {
        return true;
    }

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
 * 6. Restore the shopper's WooGraphQL cart when they are handed off to the native
 * checkout page via `/checkout/?session_id=<id>`.
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
 * 7. Send the shopper back to the Nuxt storefront after a successful payment.
 * (This is the ONLY time a successful shopper is redirected to Nuxt).
 */
add_filter('woocommerce_get_return_url', function ($return_url, $order) {
    if (!$order) {
        return $return_url;
    }

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
 * 8. Send the shopper back to the storefront when they cancel / a payment fails.
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
 * 9. Redirect payment failures/cancellations to the Nuxt storefront
 * instead of the native WooCommerce checkout page.
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
 * 10. Flag order on cancellation or failure so any subsequent retry generates
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
 * 11. Priority 1: Bridge POST data to GET for the BitPay plugin.
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
 * 12. Priority 5: Intercept BitPay callback BEFORE the BitPay plugin's Priority 10 handler
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
