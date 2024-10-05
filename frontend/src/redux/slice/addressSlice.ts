import { CartItem, CartState } from "@/lib/types/addToCart";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Address {
  firstname: string;
  lastname: string;
  phoneNumber?: string;
  email: string;
  pincode:string;
  city: string;
  street: string;
  zip: string;
  address:string;
}



interface AuthState {
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  address: Address | [];
  UnauthorizedError: string | null;
}

const initialState: AuthState = {
  loading: false,
  error: null,
  isAuthenticated: false,
  address: [],
  UnauthorizedError:null
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
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
    addAddressCheckout,
  setError,
  setLoading,
} = addressCheckoutSlice.actions;
export default addressCheckoutSlice.reducer;
