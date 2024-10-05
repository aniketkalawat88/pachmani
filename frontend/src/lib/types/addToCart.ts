import { IProduct } from "./products";

export interface CartItem {
  variant: any;
  _id: any;
  productId: string;
  variantId: string;
  quantity: number;
  product:any
}

export interface CartState {
  cartItems: CartItem[];
  loading: boolean;
  error: string | null;
}

