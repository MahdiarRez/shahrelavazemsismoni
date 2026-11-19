<?php
/**
 * Plugin Name: Headless Checkout REST API for BitPay
 * Description: Creates or reuses WooCommerce orders from headless cart session and initiates BitPay payment directly with safe retry and idempotency support.
 * Version: 1.2.0
 */

if (!defined('ABSPATH')) {
    exit;
}

add_action('rest_api_init', function () {
    register_rest_route('headless-checkout/v1', '/order', [
        'methods'             => 'POST',
        'callback'            => 'headless_checkout_create_order',
        'permission_callback' => 'headless_checkout_verify_secret',
    ]);
});

function headless_checkout_verify_secret(WP_REST_Request $request) {
    $secret = $request->get_header('X-Checkout-Secret');
    $defined = defined('HEADLESS_CHECKOUT_SECRET') ? HEADLESS_CHECKOUT_SECRET : '';
    if (empty($defined) || empty($secret) || !hash_equals($defined, $secret)) {
        return new WP_Error('unauthorized', 'Invalid checkout secret', ['status' => 401]);
    }
    return true;
}

function headless_checkout_create_order(WP_REST_Request $request) {
    $params = $request->get_json_params();
    $session_id = sanitize_text_field($params['session_id'] ?? '');
    $billing    = $params['billing'] ?? [];

    if (empty($session_id)) {
        return new WP_REST_Response([
            'code'    => 'missing_session',
            'message' => 'شناسه سبد خرید الزامی است',
        ], 400);
    }

    // 1. Validation
    $first_name = sanitize_text_field(trim($billing['first_name'] ?? ''));
    $last_name  = sanitize_text_field(trim($billing['last_name'] ?? ''));
    $phone      = sanitize_text_field(trim($billing['phone'] ?? ''));
    $state      = sanitize_text_field(trim($billing['state'] ?? ''));
    $city       = sanitize_text_field(trim($billing['city'] ?? ''));
    $address_1  = sanitize_text_field(trim($billing['address_1'] ?? ''));
    $postcode   = sanitize_text_field(trim($billing['postcode'] ?? ''));

    // Normalize Persian/Arabic digits
    $persian = ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
    $arabic  = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];
    $english = ['0','1','2','3','4','5','6','7','8','9'];
    $phone    = str_replace($persian, $english, $phone);
    $phone    = str_replace($arabic, $english, $phone);
    $postcode = str_replace($persian, $english, $postcode);
    $postcode = str_replace($arabic, $english, $postcode);

    if (mb_strlen($first_name) < 2) {
        return new WP_REST_Response(['code' => 'invalid_field', 'message' => 'نام معتبر نیست', 'field' => 'first_name'], 400);
    }
    if (mb_strlen($last_name) < 2) {
        return new WP_REST_Response(['code' => 'invalid_field', 'message' => 'نام خانوادگی معتبر نیست', 'field' => 'last_name'], 400);
    }
    if (!preg_match('/^09\d{9}$/', $phone)) {
        return new WP_REST_Response(['code' => 'invalid_field', 'message' => 'شماره همراه باید ۱۱ رقم و با ۰۹ شروع شود', 'field' => 'phone'], 400);
    }
    if (empty($state)) {
        return new WP_REST_Response(['code' => 'invalid_field', 'message' => 'انتخاب استان الزامی است', 'field' => 'state'], 400);
    }
    if (empty($city)) {
        return new WP_REST_Response(['code' => 'invalid_field', 'message' => 'انتخاب شهر الزامی است', 'field' => 'city'], 400);
    }
    if (mb_strlen($address_1) < 5) {
        return new WP_REST_Response(['code' => 'invalid_field', 'message' => 'آدرس کامل الزامی است', 'field' => 'address_1'], 400);
    }
    if (empty($postcode) || !preg_match('/^\d{10}$/', $postcode)) {
        return new WP_REST_Response(['code' => 'invalid_field', 'message' => 'کد پستی باید ۱۰ رقم باشد', 'field' => 'postcode'], 400);
    }

    // 2. Load Woo Session & Restore Cart
    $handler = new WC_Session_Handler();
    $session_data = $handler->get_session($session_id);
    if (empty($session_data) || !is_array($session_data)) {
        return new WP_REST_Response([
            'code'    => 'empty_cart',
            'message' => 'سبد خرید یافت نشد یا منقضی شده است',
        ], 409);
    }

    // In WordPress REST API requests, WooCommerce does not initialize session and cart by default.
    if (is_null(WC()->session)) {
        $session_class = apply_filters('woocommerce_session_handler', 'WC_Session_Handler');
        WC()->session  = new $session_class();
        WC()->session->init();
    }
    if (is_null(WC()->customer)) {
        WC()->customer = new WC_Customer(0, true);
    }
    if (is_null(WC()->cart)) {
        WC()->cart = new WC_Cart();
    }

    foreach ($session_data as $key => $value) {
        WC()->session->set($key, maybe_unserialize($value));
    }
    WC()->cart->get_cart_from_session();
    WC()->cart->calculate_totals();

    if (WC()->cart->is_empty()) {
        return new WP_REST_Response([
            'code'    => 'empty_cart',
            'message' => 'سبد خرید شما خالی است',
        ], 409);
    }

    // 3. BitPay configuration settings
    $settings   = get_option('woocommerce_WC_bitpayir2_settings', []);
    $sandbox    = ($settings['sandbox'] ?? 'no');
    $is_sandbox = ($sandbox === 'yes' || $sandbox === '1' || $sandbox === 1);

    if ($is_sandbox) {
        $send_url     = 'https://bitpay.ir/payment-test/gateway-send';
        $page_pattern = 'https://bitpay.ir/payment-test/gateway-%s';
        $api_id       = 'adxcv-zzadq-polkjsad-opp13opoz-1sdf455aadzmck1244567';
    } else {
        $send_url     = 'https://bitpay.ir/payment/gateway-send';
        $page_pattern = 'https://bitpay.ir/payment/gateway-%s-get';
        $api_id       = $settings['api'] ?? '';
    }

    if (empty($api_id)) {
        return new WP_REST_Response([
            'code'    => 'gateway_not_configured',
            'message' => 'درگاه پرداخت بیت پی تنظیم نشده است',
        ], 500);
    }

    // 4. Idempotency Check & Order Resolution
    // Calculate current cart total (subtotal minus discounts)
    $subtotal    = WC()->cart->get_subtotal();
    $discount    = WC()->cart->get_discount_total();
    $final_total = max(0, $subtotal - $discount);

    // Look for an existing pending/on-hold order created from this session
    $existing = wc_get_orders([
        'limit'      => 1,
        'status'     => ['pending', 'on-hold'],
        'meta_key'   => '_headless_session_id',
        'meta_value' => $session_id,
        'orderby'    => 'date',
        'order'      => 'DESC',
    ]);

    $order = null;
    $reuse_order = false;

    if (!empty($existing)) {
        $existing_order  = $existing[0];
        $id_get          = $existing_order->get_meta('_bitpay_id_get');
        $initiated_at    = intval($existing_order->get_meta('_bitpay_initiated_at'));
        $is_failed       = ($existing_order->get_meta('_bitpay_failed') === '1');
        $seconds_elapsed = time() - $initiated_at;
        $existing_total  = intval($existing_order->get_total());

        // A Shaparak banking payment session is valid for up to 15 minutes (900 seconds).
        // If an active transaction exists, has not failed/cancelled, is within 15 minutes,
        // and the cart total has not changed:
        // We MUST return the existing payment URL so the customer continues that same transaction.
        // This guarantees NO duplicate BitPay transaction is created while the previous one is payable!
        if (!empty($id_get) && !$is_failed && $seconds_elapsed < 900 && $existing_total === $final_total) {
            return new WP_REST_Response([
                'payment_url' => sprintf($page_pattern, $id_get),
                'order_id'    => $existing_order->get_id(),
                'order_key'   => $existing_order->get_order_key(),
            ], 200);
        }

        // If the cart content/amount changed while an order was pending:
        // The old order is obsolete and cannot be paid with the old amount.
        // We cancel the old order so it cannot be mistakenly paid, and create a fresh order.
        if (!empty($id_get) && !$is_failed && $existing_total !== $final_total) {
            $existing_order->update_status('cancelled', 'لغو سفارش به دلیل تغییر محتویات سبد خرید در تلاش جدید');
            $existing_order->save();
            $reuse_order = false;
        } else {
            // Otherwise (explicitly failed/cancelled, or > 15 min expired at bank):
            // It is completely safe to reuse the order and request a fresh BitPay token.
            $order = $existing_order;
            $reuse_order = true;
        }
    }

    if (!$reuse_order) {
        $order = wc_create_order();
    }

    // 5. Populate / Re-sync Order Data from Current Cart
    // If reusing an existing order, replace line items with current cart items
    if ($reuse_order) {
        $order->remove_order_items();
    }

    foreach (WC()->cart->get_cart() as $cart_item) {
        $order->add_product($cart_item['data'], $cart_item['quantity']);
    }

    $synthetic_email = $phone . '@shahrelavazemsismoni.ir';

    // Map Billing
    $order->set_billing_first_name($first_name);
    $order->set_billing_last_name($last_name);
    $order->set_billing_phone($phone);
    $order->set_billing_email($synthetic_email);
    $order->set_billing_state($state);
    $order->set_billing_city($city);
    $order->set_billing_address_1($address_1);
    $order->set_billing_country('IR');
    if (!empty($postcode)) {
        $order->set_billing_postcode($postcode);
    }

    // Map Shipping
    $order->set_shipping_first_name($first_name);
    $order->set_shipping_last_name($last_name);
    $order->set_shipping_phone($phone);
    $order->set_shipping_state($state);
    $order->set_shipping_city($city);
    $order->set_shipping_address_1($address_1);
    $order->set_shipping_country('IR');
    if (!empty($postcode)) {
        $order->set_shipping_postcode($postcode);
    }

    // Payment method & Zero shipping
    $order->set_payment_method('WC_bitpayir2');
    $order->set_payment_method_title('پرداخت امن بیت پی');
    $order->set_shipping_total(0);

    // Strict products total (subtotal minus discounts)
    $subtotal = WC()->cart->get_subtotal();
    $discount = WC()->cart->get_discount_total();
    $final_total = max(0, $subtotal - $discount);
    $order->set_total($final_total);

    $order->update_meta_data('_headless_session_id', $session_id);
    $order->save();
    $order_id = $order->get_id();

    // 6. Request Fresh BitPay Payment Token
    $amount = intval($order->get_total()); // IRR store currency
    $callback_raw = add_query_arg('wc_order', $order_id, WC()->api_request_url('WC_bitpayir2'));
    $callback_encoded = headless_bitpay_encode_url(urlencode($callback_raw));

    $full_name = $first_name . ' ' . $last_name;
    $mobile = $phone;
    if (substr($mobile, 0, 3) === '+98') $mobile = substr($mobile, 3);
    if (substr($mobile, 0, 2) === '98') $mobile = substr($mobile, 2);
    if (strlen($mobile) === 10) $mobile = '0' . $mobile;

    $products = [];
    foreach ($order->get_items() as $item) {
        $products[] = $item->get_name() . ' (' . $item->get_quantity() . ')';
    }
    $description = 'سفارش #' . $order->get_order_number() . ' | ' . implode(' - ', $products) . ' | همراه: ' . $mobile;

    // Match the official BitPay plugin's raw-string curl POST to preserve byte-encoded redirect URL
    $post_fields = sprintf(
        'api=%s&amount=%s&redirect=%s&name=%s&email=%s&description=%s&mobileNum=%s',
        urlencode($api_id),
        urlencode((string) $amount),
        $callback_encoded, // Already percent-encoded; must not be re-encoded by http_build_query
        urlencode($full_name),
        urlencode('-'),
        urlencode($description),
        urlencode($mobile)
    );

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $send_url);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $post_fields);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 20);

    $result = curl_exec($ch);
    $curl_err = curl_error($ch);
    curl_close($ch);

    if ($result === false || !empty($curl_err)) {
        return new WP_REST_Response([
            'code'    => 'gateway_network_error',
            'message' => 'خطا در ارتباط با درگاه پرداخت: ' . $curl_err,
        ], 502);
    }

    $result = trim((string) $result);

    if (is_numeric($result) && intval($result) > 0) {
        $id_get = $result;
        $order->update_meta_data('_bitpay_id_get', $id_get);
        $order->update_meta_data('_bitpay_initiated_at', time());
        $order->delete_meta_data('_bitpay_failed');
        $order->add_order_note('شناسه تراکنش بیت پی ایجاد شد: ' . $id_get);
        $order->save();

        // Note: Cart is NOT emptied here. It remains intact so customers do not
        // lose items if payment is cancelled or fails at the bank.
        // Cart is cleared only upon verified, completed payment.

        return new WP_REST_Response([
            'payment_url' => sprintf($page_pattern, $id_get),
            'order_id'    => $order_id,
            'order_key'   => $order->get_order_key(),
        ], 200);
    }

    $error_msg = headless_bitpay_fault_message($result);
    $order->add_order_note('خطا در ایجاد پرداخت بیت پی: کد ' . $result . ' - ' . $error_msg);
    $order->save();

    return new WP_REST_Response([
        'code'        => 'payment_gateway_error',
        'message'     => $error_msg,
        'bitpay_code' => intval($result),
    ], 502);
}

function headless_bitpay_encode_url($url) {
    $encoded = '';
    $length = mb_strlen($url);
    for ($i = 0; $i < $length; $i++) {
        $encoded .= '%' . wordwrap(bin2hex(mb_substr($url, $i, 1)), 2, '%', true);
    }
    return $encoded;
}

function headless_bitpay_fault_message($err_code) {
    switch ($err_code) {
        case '-1':  return 'API وارد شده صحیح نمی باشد.';
        case '-2':  return 'مبلغ ارسالی معتبر نیست.';
        case '-3':  return 'شناسه تراکنش معتبر نمی باشد.';
        case '-4':  return 'آدرس درگاه با دامنه هماهنگ نیست.';
        case '-11': return 'API ارسالی با نوع API تعریف شده سازگار نیست.';
        case '-21': return 'مبلغ کمتر از حداقل مجاز است.';
        case '-31': return 'آدرس بازگشت نامعتبر است.';
        case '-41': return 'درگاه غیرفعال یا در انتظار تایید است.';
        default:    return 'خطا در اتصال به درگاه پرداخت (' . $err_code . ')';
    }
}
