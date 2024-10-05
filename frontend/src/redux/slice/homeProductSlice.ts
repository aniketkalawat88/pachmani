// productSlice.ts
import { CartState } from '@/lib/types/addToCart';
import { IProduct } from '@/lib/types/products';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface HomeState {
  product: IProduct[];
  loading: boolean;
  error: string | null;
}


const initialState:HomeState = {
  loading: false,
  error: null,
  product:[] ,
};
  

const homeProductSlice = createSlice({
  name: 'homeProducts',
  initialState ,
  reducers: {
    getHomeProducts: (state, action) => {
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


export const { getHomeProducts, setError, setIsLoading } = homeProductSlice.actions;
export default homeProductSlice.reducer;