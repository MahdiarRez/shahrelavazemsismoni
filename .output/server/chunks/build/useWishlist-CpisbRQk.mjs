import { G as useState } from './server.mjs';
import { computed } from 'vue';

const useWishlist = (product) => {
  const wishlist = useState("wishlist", () => []);
  const isWishlisted = computed(
    () => product ? wishlist.value.some((item) => item.databaseId === product.databaseId) : false
  );
  const updateLocalStorage = () => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist.value));
  };
  const toggleWishlist = (item) => {
    if (isWishlisted.value) {
      wishlist.value = wishlist.value.filter(
        (existingItem) => existingItem.databaseId !== item.databaseId
      );
    } else {
      wishlist.value.push(item);
    }
    updateLocalStorage();
  };
  const removeFromList = (databaseId) => {
    wishlist.value = wishlist.value.filter((item) => item.databaseId !== databaseId);
    updateLocalStorage();
  };
  return {
    isWishlisted,
    toggleWishlist,
    removeFromList,
    wishlist
  };
};

export { useWishlist as u };
//# sourceMappingURL=useWishlist-CpisbRQk.mjs.map
