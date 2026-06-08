<?php
/**
 * Plugin Name: Nuxt Payment Redirect
 * Description: Redirects WooCommerce thank-you page to the headless Nuxt storefront after ZarinPal payment.
 * Version: 1.0.0
 *
 * Install: copy this file to wp-content/mu-plugins/ or wp-content/plugins/ and activate.
 */

if (!defined('ABSPATH')) {
    exit;
}

add_filter('woocommerce_get_return_url', function ($return_url, $order) {
    $nuxt_base = defined('NUXT_SITE_URL') ? NUXT_SITE_URL : 'http://localhost:3000';
    $nuxt_base = rtrim($nuxt_base, '/');

    return $nuxt_base . '/payment/success'
        . '?order_id=' . $order->get_id()
        . '&key=' . $order->get_order_key();
}, 10, 2);

add_filter('woocommerce_get_cancel_order_url', function ($cancel_url, $order) {
    $nuxt_base = defined('NUXT_SITE_URL') ? NUXT_SITE_URL : 'http://localhost:3000';
    $nuxt_base = rtrim($nuxt_base, '/');

    return $nuxt_base . '/payment/failed'
        . '?order_id=' . $order->get_id()
        . '&key=' . $order->get_order_key();
}, 10, 2);
