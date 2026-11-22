// app/composables/useCart.ts
import { push } from "notivue";
import type {
  CartItem,
  CartData,
  AddToCartResponse,
  UpdateCartResponse,
  RemoveCartResponse,
  EmptyCartResponse,
  AddBtnStatus,
} from "~~/shared/types";

// Sequential mutation queue: prevents concurrent mutations from racing against
// the shared WooCommerce session on WordPress / MySQL.
let mutationQueue: Promise<any> = Promise.resolve();

function enqueueMutation<T>(task: () => Promise<T>): Promise<T> {
  const run = async () => {
    try {
      return await task();
    } catch (err) {
      throw err;
    }
  };
  const next = mutationQueue.then(run, run);
  mutationQueue = next.catch(() => {});
  return next;
}

// Module-level tracking of debounced targets and in-flight operations
const pendingTargets = new Map<string, number>();
const debounceTimers = new Map<string, ReturnType<typeof setTimeout>>();
const inFlightKeys = new Set<string>();

export const useCart = () => {
  const cart = useState<CartItem[]>("cart", () => []);
  const cartTotals = useState<{ total: string; subtotal: string }>(
    "cartTotals",
    () => ({ total: "", subtotal: "" })
  );
  const isCartUpdating = useState<boolean>("isCartUpdating", () => false);
  const updatingItemKeys = useState<string[]>("updatingItemKeys", () => []);
  const addToCartButtonStatus = ref<AddBtnStatus>("add");
  const isCartInitialized = useState<boolean>("isCartInitialized", () => false);
  const isSyncing = ref(false);
  const isClearingCart = ref(false);

  // Backward compatibility with legacy components expecting updatingVariationId
  const updatingVariationId = computed<number | null>(() => {
    if (updatingItemKeys.value.length === 0) return null;
    const firstKey = updatingItemKeys.value[0];
    const item = cart.value.find((i) => i.key === firstKey);
    return (
      item?.variation?.node?.databaseId ??
      item?.product?.node?.databaseId ??
      null
    );
  });

  const findItemByKey = (key: string): CartItem | undefined =>
    cart.value.find((i) => i.key === key);

  const findItem = (identifier: string | number): CartItem | undefined => {
    return cart.value.find(
      (i) =>
        i.key === identifier ||
        i.variation?.node?.databaseId === identifier ||
        i.product?.node?.databaseId === identifier
    );
  };

  const updateCartState = (
    next: CartItem[],
    totals?: { total?: string | null; subtotal?: string | null }
  ) => {
    cart.value = next;
    if (totals?.total !== undefined) {
      cartTotals.value = {
        total: totals.total || "",
        subtotal: totals.subtotal || "",
      };
    }
    if (process.client) {
      try {
        localStorage.setItem("cart", JSON.stringify(next));
      } catch (e) {
        console.warn("[useCart] Failed to persist cart to localStorage:", e);
      }
    }
  };

  /**
   * Synchronize cart state with authoritative WooCommerce backend.
   */
  const syncCart = async () => {
    if (isSyncing.value || !process.client) return;
    try {
      isSyncing.value = true;
      const res = await $fetch<{ cart: CartData }>("/api/cart");
      const nodes = res.cart?.contents?.nodes || [];
      updateCartState(nodes, {
        total: res.cart?.total,
        subtotal: res.cart?.subtotal,
      });
    } catch (err) {
      console.warn("[useCart] Failed to sync cart from server:", err);
    } finally {
      isSyncing.value = false;
      isCartInitialized.value = true;
    }
  };

  /**
   * Execute coalesced quantity update for a specific item key.
   */
  const flushQuantityUpdate = async (key: string) => {
    if (!process.client) return;

    // Request Coalescing: if an update is already in-flight for this key,
    // let it finish; its completion will see the newer target and trigger another flush.
    if (inFlightKeys.has(key)) {
      return;
    }

    const targetQty = pendingTargets.get(key);
    if (targetQty === undefined) {
      return;
    }

    await enqueueMutation(async () => {
      const currentTarget = pendingTargets.get(key);
      if (currentTarget === undefined) return;

      inFlightKeys.add(key);
      if (!updatingItemKeys.value.includes(key)) {
        updatingItemKeys.value = [...updatingItemKeys.value, key];
      }
      isCartUpdating.value = true;

      try {
        const res = await $fetch<UpdateCartResponse>("/api/cart/update", {
          method: "POST",
          body: { items: [{ key, quantity: currentTarget }] },
        });

        const returnedNodes = res.updateItemQuantities?.cart?.contents?.nodes;
        const returnedTotals = {
          total: res.updateItemQuantities?.cart?.total,
          subtotal: res.updateItemQuantities?.cart?.subtotal,
        };

        // Check if user changed the quantity again while this request was in flight:
        const latestTarget = pendingTargets.get(key);
        if (latestTarget !== undefined && latestTarget !== currentTarget) {
          // User clicked again! Preserve optimistic local state and flush again.
          if (Array.isArray(returnedNodes)) {
            const merged = returnedNodes.map((node) =>
              node.key === key ? { ...node, quantity: latestTarget } : node
            );
            updateCartState(merged, returnedTotals);
          }
          inFlightKeys.delete(key);
          // Trigger coalesced follow-up immediately
          flushQuantityUpdate(key);
          return;
        }

        // Reached steady state for this key
        pendingTargets.delete(key);
        if (Array.isArray(returnedNodes)) {
          updateCartState(returnedNodes, returnedTotals);
        }
      } catch (err: any) {
        console.warn("[useCart] update quantity failed:", err);
        pendingTargets.delete(key);
        push.error(
          err?.data?.message ||
            "خطا در به‌روزرسانی تعداد کالا. در حال هماهنگ‌سازی با سرور..."
        );
        // Safe reconciliation on ambiguous failure
        await syncCart();
      } finally {
        inFlightKeys.delete(key);
        updatingItemKeys.value = updatingItemKeys.value.filter((k) => k !== key);
        if (updatingItemKeys.value.length === 0 && pendingTargets.size === 0) {
          isCartUpdating.value = false;
        }
      }
    });
  };

  /**
   * Flush all active debounces immediately (e.g. before initiating checkout).
   */
  const flushAllPendingUpdates = async () => {
    if (!process.client) return;
    const keys = Array.from(debounceTimers.keys());
    for (const key of keys) {
      const timer = debounceTimers.get(key);
      if (timer) {
        clearTimeout(timer);
        debounceTimers.delete(key);
      }
      flushQuantityUpdate(key);
    }
    await mutationQueue;
  };

  /**
   * Add a product (or variation) to the cart.
   */
  const handleAddToCart = async (
    productId: number,
    quantity = 1,
    variationId?: number
  ) => {
    if (addToCartButtonStatus.value === "loading") return;

    return await enqueueMutation(async () => {
      try {
        isCartUpdating.value = true;
        addToCartButtonStatus.value = "loading";

        const body: { productId: number; quantity: number; variationId?: number } = {
          productId,
          quantity,
        };
        if (variationId) {
          body.variationId = variationId;
        }

        const res = await $fetch<AddToCartResponse>("/api/cart/add", {
          method: "POST",
          body,
        });

        const returnedNodes = res.addToCart?.cart?.contents?.nodes;
        if (Array.isArray(returnedNodes)) {
          updateCartState(returnedNodes, {
            total: res.addToCart?.cart?.total,
            subtotal: res.addToCart?.cart?.subtotal,
          });
        } else if (res.addToCart?.cartItem) {
          const incoming = res.addToCart.cartItem;
          const idx = cart.value.findIndex((i) => i.key === incoming.key);
          if (idx > -1) {
            updateCartState([
              ...cart.value.slice(0, idx),
              incoming,
              ...cart.value.slice(idx + 1),
            ]);
          } else {
            updateCartState([...cart.value, incoming]);
          }
        }

        addToCartButtonStatus.value = "added";
        push.success("کالا با موفقیت به سبد خرید اضافه شد");
        setTimeout(() => {
          addToCartButtonStatus.value = "add";
        }, 2000);
      } catch (err: any) {
        addToCartButtonStatus.value = "add";
        push.error(
          err?.data?.message ||
            err?.message ||
            "امکان افزودن این کالا به سبد خرید وجود ندارد"
        );
        if (err?.data?.data?.isNetworkError) {
          await syncCart();
        }
      } finally {
        if (updatingItemKeys.value.length === 0 && pendingTargets.size === 0) {
          isCartUpdating.value = false;
        }
      }
    });
  };

  /**
   * Directly remove an item by its key.
   */
  const removeItem = async (key: string) => {
    // Clear any pending debounce for this key
    const timer = debounceTimers.get(key);
    if (timer) {
      clearTimeout(timer);
      debounceTimers.delete(key);
    }
    pendingTargets.delete(key);

    // Optimistic removal from UI immediately
    updateCartState(cart.value.filter((i) => i.key !== key));

    return await enqueueMutation(async () => {
      if (!updatingItemKeys.value.includes(key)) {
        updatingItemKeys.value = [...updatingItemKeys.value, key];
      }
      isCartUpdating.value = true;

      try {
        const res = await $fetch<RemoveCartResponse>("/api/cart/remove", {
          method: "POST",
          body: { keys: [key] },
        });

        const returnedNodes = res.removeItemsFromCart?.cart?.contents?.nodes;
        if (Array.isArray(returnedNodes)) {
          updateCartState(returnedNodes, {
            total: res.removeItemsFromCart?.cart?.total,
            subtotal: res.removeItemsFromCart?.cart?.subtotal,
          });
        }
        push.info("کالا از سبد خرید حذف شد");
      } catch (err: any) {
        console.warn("[useCart] remove item failed:", err);
        push.error(
          err?.data?.message ||
            "خطا در حذف کالا از سبد خرید. در حال هماهنگ‌سازی با سرور..."
        );
        // Safe reconciliation: verify with WooCommerce
        await syncCart();
      } finally {
        updatingItemKeys.value = updatingItemKeys.value.filter((k) => k !== key);
        if (updatingItemKeys.value.length === 0 && pendingTargets.size === 0) {
          isCartUpdating.value = false;
        }
      }
    });
  };

  /**
   * Update quantity for a specific cart item key with debouncing and request coalescing.
   */
  const changeQty = (key: string, quantity: number) => {
    const item = findItemByKey(key);
    if (!item) return;

    const targetQty = Math.max(0, Math.floor(quantity));
    if (targetQty === item.quantity && !pendingTargets.has(key)) return;

    if (targetQty === 0) {
      const timer = debounceTimers.get(key);
      if (timer) {
        clearTimeout(timer);
        debounceTimers.delete(key);
      }
      pendingTargets.delete(key);
      return removeItem(key);
    }

    // Check stock limit if known
    const maxStock =
      item.variation?.node?.stockQuantity ??
      item.product?.node?.stockQuantity;
    if (typeof maxStock === "number" && targetQty > maxStock) {
      push.error(`حداکثر موجودی این کالا (${maxStock} عدد) در سبد شما قرار دارد`);
      return;
    }

    // OPTIMISTIC UPDATE: instant feedback in UI
    updateCartState(
      cart.value.map((i) =>
        i.key === key ? { ...i, quantity: targetQty } : i
      )
    );

    pendingTargets.set(key, targetQty);
    isCartUpdating.value = true;

    // Debounce: reset timer on rapid clicks
    const existingTimer = debounceTimers.get(key);
    if (existingTimer) {
      clearTimeout(existingTimer);
    }

    const timer = setTimeout(() => {
      debounceTimers.delete(key);
      flushQuantityUpdate(key);
    }, 350);
    debounceTimers.set(key, timer);
  };

  /**
   * Increment quantity by key or databaseId.
   */
  const increment = (keyOrId: string | number) => {
    const item =
      typeof keyOrId === "string" ? findItemByKey(keyOrId) : findItem(keyOrId);

    if (!item) {
      if (typeof keyOrId === "number") {
        return handleAddToCart(keyOrId);
      }
      return;
    }

    const maxStock =
      item.variation?.node?.stockQuantity ??
      item.product?.node?.stockQuantity ??
      Infinity;
    const currentQty = pendingTargets.get(item.key) ?? item.quantity;
    if (currentQty >= maxStock) {
      return push.error("حداکثر موجودی این کالا در سبد شما قرار دارد");
    }

    changeQty(item.key, currentQty + 1);
  };

  /**
   * Decrement quantity by key or databaseId.
   */
  const decrement = (keyOrId: string | number) => {
    const item =
      typeof keyOrId === "string" ? findItemByKey(keyOrId) : findItem(keyOrId);

    if (item) {
      const currentQty = pendingTargets.get(item.key) ?? item.quantity;
      changeQty(item.key, currentQty - 1);
    }
  };

  /**
   * Explicitly set quantity by key or databaseId.
   */
  const setQuantity = (keyOrId: string | number, qty: number) => {
    const item =
      typeof keyOrId === "string" ? findItemByKey(keyOrId) : findItem(keyOrId);

    if (item) {
      changeQty(item.key, qty);
    }
  };

  /**
   * Clear all items from the cart.
   */
  const clearCart = async () => {
    if (isClearingCart.value || cart.value.length === 0) return;

    for (const timer of debounceTimers.values()) {
      clearTimeout(timer);
    }
    debounceTimers.clear();
    pendingTargets.clear();

    // Optimistic clear
    updateCartState([], { total: null, subtotal: null });

    return await enqueueMutation(async () => {
      try {
        isClearingCart.value = true;
        isCartUpdating.value = true;

        await $fetch<EmptyCartResponse>("/api/cart/empty", {
          method: "POST",
        });
        push.info("سبد خرید خالی شد");
      } catch (err: any) {
        console.warn("[useCart] clear cart failed:", err);
        push.error(
          err?.data?.message ||
            "خطا در خالی کردن سبد خرید. در حال هماهنگ‌سازی با سرور..."
        );
        await syncCart();
      } finally {
        isClearingCart.value = false;
        if (updatingItemKeys.value.length === 0 && pendingTargets.size === 0) {
          isCartUpdating.value = false;
        }
      }
    });
  };

  // Client-side initialization
  onMounted(() => {
    if (!process.client) return;

    // Load cached cart immediately to avoid UI pop-in
    if (!isCartInitialized.value) {
      const stored = localStorage.getItem("cart");
      if (stored) {
        try {
          const parsed = JSON.parse(stored) as CartItem[];
          if (Array.isArray(parsed) && parsed.length > 0 && cart.value.length === 0) {
            cart.value = parsed;
          }
        } catch {
          // Ignore invalid JSON in localStorage
        }
      }
    }

    // Always sync with authoritative server state on mount
    syncCart();
  });

  return {
    cart,
    cartTotals,
    addToCartButtonStatus,
    isCartUpdating,
    updatingItemKeys,
    updatingVariationId,
    isCartInitialized,
    handleAddToCart,
    increment,
    decrement,
    setQuantity,
    changeQty,
    removeItem,
    clearCart,
    syncCart,
    flushAllPendingUpdates,
    findItem,
  };
};
