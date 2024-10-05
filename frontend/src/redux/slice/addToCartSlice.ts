import { CartItem, CartState } from "@/lib/types/addToCart";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: CartState = {
  cartItems: [],
  loading: false,
  error: null,
};

const addToCartSlice = createSlice({
  name: "addToCart",
  initialState,
  reducers: {
    getAllCartItems(state, action: PayloadAction<CartItem[]>) {
      state.cartItems = action.payload;
      state.loading = false;
      state.error = null;
    },

    addItemToCart(state, action: PayloadAction<CartItem>) {
      state.cartItems.push(action.payload);
      state.loading = false;
      state.error = null;
    },

    removeItemFromCart(state, action: PayloadAction<string>) {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
      state.loading = false;
    },

    updateCart(state, action: PayloadAction<CartItem[]>) {
      state.cartItems = action.payload;
      state.loading = false;
    },

    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },

    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  updateCart,
  setError,
  setLoading,
  getAllCartItems,
} = addToCartSlice.actions;
export default addToCartSlice.reducer;
