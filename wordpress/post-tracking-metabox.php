<?php
/**
 * Plugin Name: WooCommerce Post Tracking Metabox
 * Description: Adds a dedicated Post Tracking Number box in WooCommerce Order Edit page.
 */

// ۱. افزودن کادر در صفحه سفارش
add_action('add_meta_boxes', function () {
    add_meta_box(
        'wc_post_tracking_box',
        'اطلاعات ارسال و رهگیری پستی',
        'render_post_tracking_box',
        'shop_order',
        'side',
        'high'
    );
    // برای پشتیبانی از ووکامرس جدید (HPOS)
    if (class_exists('\Automattic\WooCommerce\Internal\DataStores\Orders\CustomOrdersTableController')) {
        add_meta_box(
            'wc_post_tracking_box',
            'اطلاعات ارسال و رهگیری پستی',
            'render_post_tracking_box',
            'woocommerce_page_wc-orders',
            'side',
            'high'
        );
    }
});

function render_post_tracking_box($post_or_order) {
    $order = ($post_or_order instanceof WC_Order) ? $post_or_order : wc_get_order($post_or_order->ID);
    if (!$order) return;

    $tracking_code = $order->get_meta('_post_tracking_code');
    wp_nonce_field('save_post_tracking', 'post_tracking_nonce');
    ?>
    <p>
        <label for="post_tracking_code" style="display:block;margin-bottom:5px;font-weight:600;">کد رهگیری پست / تیپاکس:</label>
        <input type="text" id="post_tracking_code" name="post_tracking_code" value="<?php echo esc_attr($tracking_code); ?>" style="width:100%;direction:ltr;text-align:left;font-family:monospace;" placeholder="مثال: 123456789012345678901234" />
    </p>
    <p style="font-size:11px;color:#666;margin-top:4px;">
        با وارد کردن این کد، وضعیت در سایت مشتری به «تحویل به پست» تغییر می‌کند.
    </p>
    <?php
}

// ۲. ذخیره مقدار هنگام ذخیره سفارش
add_action('woocommerce_process_shop_order_meta', function ($order_id) {
    if (!isset($_POST['post_tracking_nonce']) || !wp_verify_nonce($_POST['post_tracking_nonce'], 'save_post_tracking')) {
        return;
    }
    if (isset($_POST['post_tracking_code'])) {
        $order = wc_get_order($order_id);
        if ($order) {
            $code = sanitize_text_field($_POST['post_tracking_code']);
            $order->update_meta_data('_post_tracking_code', $code);
            $order->save();
        }
    }
});