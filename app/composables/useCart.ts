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

// Module-level mutation queue: serializes all cart mutations (ADD, UPDATE, REMOVE, EMPTY)
// to prevent race conditions on the shared WooCommerce session.
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

// Module-level in-flight GET promise coalescing (ensures concurrent callers share 1 network request)
let activeCartFetchPromise: Promise<CartData | null> | null = null;
let activeFetchAbortController: AbortController | null = null;

export const useCart = () => {
  const cart = useState<CartItem[]>("cart", () => []);
  const cartTotals = useState<{ total: string; subtotal: string }>(
    "cartTotals",
    () => ({ total: "", subtotal: "" })
  );
  const isCartUpdating = useState<boolean>("isCartUpdating", () => false);
  const updatingItemKeys = useState<string[]>("updatingItemKeys", () => []);
  const removingItemKeys = useState<string[]>("removingItemKeys", () => []);
  const isCartSyncing = useState<boolean>("isCartSyncing", () => false);
  const cartSyncError = useState<string | null>("cartSyncError", () => null);
  const isCartInitialized = useState<boolean>("isCartInitialized", () => false);
  const isClearingCart = useState<boolean>("isClearingCart", () => false);
  const lastSyncedAt = useState<number>("cartLastSyncedAt", () => 0);
  const addToCartButtonStatus = ref<AddBtnStatus>("add");

  // Immediate client-side hydration from localStorage (avoids UI pop-in)
  if (process.client && !isCartInitialized.value && cart.value.length === 0) {
    try {
      const stored = localStorage.getItem("cart");
      if (stored) {
        const parsed = JSON.parse(stored) as CartItem[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          cart.value = parsed;
        }
      }
    } catch {
      // Ignore invalid JSON in localStorage
    }
  }

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
   * - Deduplicates concurrent requests (coalesces into single Promise).
   * - Reuses valid cached data if recently synced (< 30s) unless forced.
   * - Supports cancellation via AbortSignal without user-facing error noise.
   */
  const syncCart = async (options?: { force?: boolean; signal?: AbortSignal }): Promise<CartData | null> => {
    if (!process.client) return null;

    // Cache freshness: if initialized and recently synced (within 30s), reuse valid cached state
    const isCacheFresh =
      !options?.force &&
      isCartInitialized.value &&
      lastSyncedAt.value > 0 &&
      Date.now() - lastSyncedAt.value < 30000;

    if (isCacheFresh && !activeCartFetchPromise) {
      return {
        contents: { nodes: cart.value },
        total: cartTotals.value.total,
        subtotal: cartTotals.value.subtotal,
      } as unknown as CartData;
    }

    // Coalesce with any currently active GET request
    if (activeCartFetchPromise) {
      return await activeCartFetchPromise;
    }

    isCartSyncing.value = true;
    cartSyncError.value = null;

    const controller = new AbortController();
    activeFetchAbortController = controller;

    const onCallerAbort = () => controller.abort();
    if (options?.signal) {
      if (options.signal.aborted) {
        controller.abort();
      } else {
        options.signal.addEventListener("abort", onCallerAbort, { once: true });
      }
    }

    activeCartFetchPromise = (async () => {
      try {
        const res = await $fetch<{ cart: CartData }>("/api/cart", {
          signal: controller.signal,
        });
        const nodes = res.cart?.contents?.nodes || [];
        updateCartState(nodes, {
          total: res.cart?.total,
          subtotal: res.cart?.subtotal,
        });
        lastSyncedAt.value = Date.now();
        cartSyncError.value = null;
        isCartInitialized.value = true;
        return res.cart;
      } catch (err: any) {
        if (
          err?.name === "AbortError" ||
          err?.cause?.name === "AbortError" ||
          controller.signal.aborted
        ) {
          // Intentional abort (e.g. user navigated away while initial fetch was pending)
          return null;
        }
        console.warn("[useCart] Failed to sync cart from server:", err);
        const errMsg =
          err?.data?.message ||
          "خطا در دریافت اطلاعات سبد خرید از سرور. لطفاً دوباره تلاش کنید.";
        cartSyncError.value = errMsg;
        return null;
      } finally {
        if (options?.signal) {
          options.signal.removeEventListener("abort", onCallerAbort);
        }
        isCartSyncing.value = false;
        activeCartFetchPromise = null;
        activeFetchAbortController = null;
      }
    })();

    return await activeCartFetchPromise;
  };

  /**
   * Safe initial cart loader with optional signal.
   */
  const initCart = async (options?: { force?: boolean; signal?: AbortSignal }) => {
    return await syncCart(options);
  };

  /**
   * Flush all pending updates (awaits active mutation queue before checkout).
   */
  const flushAllPendingUpdates = async () => {
    if (!process.client) return;
    await mutationQueue;
  };

  /**
   * Add a product (or variation) to the cart.
   * Updates state directly from mutation response without redundant GET cart query.
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

        lastSyncedAt.value = Date.now();
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
          await syncCart({ force: true });
        }
      } finally {
        if (
          updatingItemKeys.value.length === 0 &&
          removingItemKeys.value.length === 0
        ) {
          isCartUpdating.value = false;
        }
      }
    });
  };

  /**
   * Directly remove an item by its key.
   * - Marks item as removing immediately (disables buttons, shows loading indicator).
   * - Non-optimistic: item remains until server confirms removal.
   */
  const removeItem = async (key: string) => {
    if (!process.client) return;

    // Prevent duplicate clicks on the same item
    if (removingItemKeys.value.includes(key)) return;

    // Mark as removing immediately for per-item loading state
    removingItemKeys.value = [...removingItemKeys.value, key];
    isCartUpdating.value = true;

    return await enqueueMutation(async () => {
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
        } else {
          updateCartState(cart.value.filter((i) => i.key !== key));
        }
        lastSyncedAt.value = Date.now();
        push.info("کالا از سبد خرید حذف شد");
      } catch (err: any) {
        console.warn("[useCart] remove item failed:", err);
        push.error(
          err?.data?.message ||
            "خطا در حذف کالا از سبد خرید. در حال هماهنگ‌سازی با سرور..."
        );
        // Safe reconciliation on server
        await syncCart({ force: true });
      } finally {
        removingItemKeys.value = removingItemKeys.value.filter((k) => k !== key);
        updatingItemKeys.value = updatingItemKeys.value.filter((k) => k !== key);
        if (
          updatingItemKeys.value.length === 0 &&
          removingItemKeys.value.length === 0
        ) {
          isCartUpdating.value = false;
        }
      }
    });
  };

  /**
   * Update quantity for a specific cart item key.
   * NON-OPTIMISTIC: cart.value is NOT updated prematurely.
   * Item enters updatingItemKeys immediately -> UI hides the numeric display and shows a loading spinner
   * until the server response confirms the new quantity.
   */
  const changeQty = async (key: string, quantity: number) => {
    const item = findItemByKey(key);
    if (!item) return;

    // Ignore while already updating or removing
    if (updatingItemKeys.value.includes(key) || removingItemKeys.value.includes(key)) {
      return;
    }

    const targetQty = Math.max(0, Math.floor(quantity));
    if (targetQty === item.quantity) return;

    if (targetQty === 0) {
      return await removeItem(key);
    }

    // Check stock limit if known
    const maxStock =
      item.variation?.node?.stockQuantity ??
      item.product?.node?.stockQuantity;
    if (typeof maxStock === "number" && targetQty > maxStock) {
      push.error(`حداکثر موجودی این کالا (${maxStock} عدد) در سبد شما قرار دارد`);
      return;
    }

    // Enter loading state immediately (NON-OPTIMISTIC: number is hidden until server confirms)
    updatingItemKeys.value = [...updatingItemKeys.value, key];
    isCartUpdating.value = true;

    return await enqueueMutation(async () => {
      try {
        const res = await $fetch<UpdateCartResponse>("/api/cart/update", {
          method: "POST",
          body: { items: [{ key, quantity: targetQty }] },
        });

        const returnedNodes = res.updateItemQuantities?.cart?.contents?.nodes;
        const returnedTotals = {
          total: res.updateItemQuantities?.cart?.total,
          subtotal: res.updateItemQuantities?.cart?.subtotal,
        };

        if (Array.isArray(returnedNodes)) {
          updateCartState(returnedNodes, returnedTotals);
        }
        lastSyncedAt.value = Date.now();
      } catch (err: any) {
        console.warn("[useCart] update quantity failed:", err);
        push.error(
          err?.data?.message ||
            "خطا در به‌روزرسانی تعداد کالا. در حال هماهنگ‌سازی با سرور..."
        );
        // Safe reconciliation on server
        await syncCart({ force: true });
      } finally {
        updatingItemKeys.value = updatingItemKeys.value.filter((k) => k !== key);
        if (
          updatingItemKeys.value.length === 0 &&
          removingItemKeys.value.length === 0
        ) {
          isCartUpdating.value = false;
        }
      }
    });
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

    if (updatingItemKeys.value.includes(item.key) || removingItemKeys.value.includes(item.key)) {
      return;
    }

    const maxStock =
      item.variation?.node?.stockQuantity ??
      item.product?.node?.stockQuantity ??
      Infinity;
    if (item.quantity >= maxStock) {
      return push.error("حداکثر موجودی این کالا در سبد شما قرار دارد");
    }

    changeQty(item.key, item.quantity + 1);
  };

  /**
   * Decrement quantity by key or databaseId.
   */
  const decrement = (keyOrId: string | number) => {
    const item =
      typeof keyOrId === "string" ? findItemByKey(keyOrId) : findItem(keyOrId);

    if (item && !updatingItemKeys.value.includes(item.key) && !removingItemKeys.value.includes(item.key)) {
      changeQty(item.key, item.quantity - 1);
    }
  };

  /**
   * Explicitly set quantity by key or databaseId.
   */
  const setQuantity = (keyOrId: string | number, qty: number) => {
    const item =
      typeof keyOrId === "string" ? findItemByKey(keyOrId) : findItem(keyOrId);

    if (item && !updatingItemKeys.value.includes(item.key) && !removingItemKeys.value.includes(item.key)) {
      changeQty(item.key, qty);
    }
  };

  /**
   * Clear all items from the cart.
   * Non-optimistic: clears state only after server confirmation.
   */
  const clearCart = async () => {
    if (isClearingCart.value || cart.value.length === 0) return;

    isClearingCart.value = true;
    isCartUpdating.value = true;

    return await enqueueMutation(async () => {
      try {
        await $fetch<EmptyCartResponse>("/api/cart/empty", {
          method: "POST",
        });
        updateCartState([], { total: null, subtotal: null });
        lastSyncedAt.value = Date.now();
        push.info("سبد خرید با موفقیت خالی شد");
      } catch (err: any) {
        console.warn("[useCart] clear cart failed:", err);
        push.error(
          err?.data?.message ||
            "خطا در خالی کردن سبد خرید. در حال هماهنگ‌سازی با سرور..."
        );
        await syncCart({ force: true });
      } finally {
        isClearingCart.value = false;
        if (updatingItemKeys.value.length === 0 && removingItemKeys.value.length === 0) {
          isCartUpdating.value = false;
        }
      }
    });
  };

  return {
    cart,
    cartTotals,
    addToCartButtonStatus,
    isCartUpdating,
    updatingItemKeys,
    removingItemKeys,
    updatingVariationId,
    isCartSyncing,
    isSyncing: isCartSyncing, // backward compatibility
    cartSyncError,
    isCartInitialized,
    isClearingCart,
    handleAddToCart,
    increment,
    decrement,
    setQuantity,
    changeQty,
    removeItem,
    clearCart,
    syncCart,
    initCart,
    flushAllPendingUpdates,
    findItem,
  };
};
