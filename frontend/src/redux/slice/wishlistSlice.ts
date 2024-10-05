// productSlice.ts
import { CartState } from '@/lib/types/addToCart';
import { IProduct } from '@/lib/types/products';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface wishState {
  product: IProduct[];
  loading: boolean;
  error: string | null;
}


const initialState:wishState = {
  loading: false,
  error: null,
  product:[] ,
};
  

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState ,
  reducers: {
    getProducts: (state, action) => {
      state.product = action.payload;
      state.error = null;
      loading: false

    },
    setError: (state, action) => {
      state.error = action.payload;
      loading: false
    },
    setIsLoading: (state, action) => {
      state.loading = action.payload;
      state.error = null;
    }
  }
});


export const { getProducts, setError, setIsLoading } = wishlistSlice.actions;
export default wishlistSlice.reducer;