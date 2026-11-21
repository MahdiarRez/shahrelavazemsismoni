// app/composables/useCart.ts
import { push } from "notivue";

export const useCart = () => {
	const cart = useState<CartItem[]>("cart", () => []);
	const addToCartButtonStatus = ref<AddBtnStatus>("add");
	const isCartUpdating = useState<boolean>("isCartUpdating", () => false);
	const updatingVariationId = useState<number | null>(
		"updatingVariationId",
		() => null,
	);

	const findItem = (variationId: number) =>
		cart.value.find((i) => i.variation?.node?.databaseId === variationId);

	const updateCart = (next: CartItem[]) => {
		cart.value = next;
		if (process.client) localStorage.setItem("cart", JSON.stringify(next));
	};

	const handleAddToCart = async (productId: number) => {
		if (isCartUpdating.value) return;
		try {
			isCartUpdating.value = true;
			addToCartButtonStatus.value = "loading";
			const res = await $fetch<AddToCartResponse>("/api/cart/add", {
				method: "POST",
				body: { productId },
			});

			const incoming = res.addToCart.cartItem;
			const idx = cart.value.findIndex((i) => i.key === incoming.key);

			if (idx > -1) {
				const merged = { ...cart.value[idx], ...incoming };
				if (typeof incoming.variation?.node?.stockQuantity === "number") {
					merged.variation.node.stockQuantity =
						incoming.variation.node.stockQuantity;
				}
				updateCart([
					...cart.value.slice(0, idx),
					merged,
					...cart.value.slice(idx + 1),
				]);
			} else {
				updateCart([...cart.value, incoming]);
			}

			addToCartButtonStatus.value = "added";
			setTimeout(() => (addToCartButtonStatus.value = "add"), 2000);
		} catch (err: any) {
			addToCartButtonStatus.value = "add";
			push.error(
				err?.data?.message || "موجودی کالا کافی نیست یا خطا در ارتباط رخ داد",
			);
		} finally {
			isCartUpdating.value = false;
		}
	};

	const changeQty = async (
		key: string,
		quantity: number,
		variationId?: number,
	) => {
		if (isCartUpdating.value) return;

		// Keep snapshot of current cart for rollback on error
		const previousCart = [...cart.value];

		try {
			isCartUpdating.value = true;
			if (variationId) {
				updatingVariationId.value = variationId;
			}

			// Optimistically update UI so user sees immediate feedback
			updateCart(
				quantity <= 0
					? cart.value.filter((i) => i.key !== key)
					: cart.value.map((i) =>
							i.key === key ? { ...i, quantity } : i,
						),
			);

			// Await WooCommerce server update
			await $fetch("/api/cart/update", {
				method: "POST",
				body: { items: [{ key, quantity: Math.max(0, quantity) }] },
			});
		} catch (err: any) {
			// Rollback to previous state on failure
			updateCart(previousCart);
			push.error(
				err?.data?.message ||
					"خطا در به‌روزرسانی سبد خرید. لطفاً دوباره تلاش کنید.",
			);
		} finally {
			isCartUpdating.value = false;
			updatingVariationId.value = null;
		}
	};

	const increment = async (variationId: number) => {
		if (isCartUpdating.value) return;
		const item = findItem(variationId);
		if (!item) return handleAddToCart(variationId);
		const max = item.variation?.node?.stockQuantity ?? Infinity;
		if (item.quantity >= max) {
			return push.error("حداکثر موجودی این کالا در سبد شما قرار دارد");
		}
		await changeQty(item.key, item.quantity + 1, variationId);
	};

	const decrement = async (variationId: number) => {
		if (isCartUpdating.value) return;
		const item = findItem(variationId);
		if (item) {
			await changeQty(item.key, item.quantity - 1, variationId);
		}
	};

	onMounted(() => {
		if (!process.client) return;
		const stored = localStorage.getItem("cart");
		if (!stored) return;
		try {
			updateCart(JSON.parse(stored) as CartItem[]);
		} catch {
			updateCart([]);
		}
	});

	return {
		cart,
		addToCartButtonStatus,
		isCartUpdating,
		updatingVariationId,
		handleAddToCart,
		increment,
		decrement,
		changeQty,
	};
};
