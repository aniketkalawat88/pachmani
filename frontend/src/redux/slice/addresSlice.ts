import { CartItem, CartState } from "@/lib/types/addToCart";
import { Address } from "@/lib/types/address";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AddresState {
  loading: boolean;
  error: string | null;
  address: Address[] | [];
}

const initialState: AddresState = {
  loading: false,
  error: null,
  address: [],
};

const addressCheckoutSlice = createSlice({
  name: "addressCheckout",
  initialState,
  reducers: {
    addAddressCheckout: (state, action) => {
      state.address = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state,action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { addAddressCheckout, setError, setLoading } =
  addressCheckoutSlice.actions;
export default addressCheckoutSlice.reducer;
