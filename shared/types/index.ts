export type Money = string | number;

export interface VariationNode {
  databaseId: number;
  name?: string;
  salePrice?: Money | null;
  regularPrice?: Money | null;
  price?: Money | null;
  stockQuantity?: number | null;
  stockStatus?: string | null;
  image?: { sourceUrl?: string; altText?: string } | null;
}

export interface Variation {
  node: VariationNode;
  attributes?: Array<{ name?: string; value: string }> | null;
}

export interface ProductNode {
  databaseId?: number;
  sku?: string;
  slug?: string;
  name: string;
  salePrice?: Money | null;
  regularPrice?: Money | null;
  price?: Money | null;
  stockQuantity?: number | null;
  stockStatus?: string | null;
  image?: { sourceUrl?: string; altText?: string } | null;
}

export interface CartItem {
  key: string;
  quantity: number;
  total?: string | null;
  subtotal?: string | null;
  product: { node: ProductNode };
  variation?: Variation | null;
}

export interface CartContents {
  itemCount?: number;
  productCount?: number;
  nodes: CartItem[];
}

export interface CartData {
  total?: string | null;
  subtotal?: string | null;
  isEmpty?: boolean;
  contents?: CartContents;
}

export interface AddToCartResponse {
  addToCart: {
    cartItem?: CartItem;
    cart?: CartData;
  };
}

export interface UpdateCartResponse {
  updateItemQuantities: {
    cart?: CartData;
    items?: Array<{ key: string }>;
  };
}

export interface RemoveCartResponse {
  removeItemsFromCart: {
    cart?: CartData;
  };
}

export interface EmptyCartResponse {
  emptyCart: {
    cart?: CartData;
  };
}

export interface GetCartResponse {
  cart: CartData | null;
}

export type AddBtnStatus = 'add' | 'loading' | 'added';

export type RemoveBtnStatus = 'remove' | 'loading';
