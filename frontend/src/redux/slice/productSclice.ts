import { IProduct } from "@/lib/types/products";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductList {
  products: IProduct[];
  totalPages: number;
  currentPage: number;
}

interface AppState {
  loading: boolean;
  error: Error | null;
  products: ProductList;
  skincare: ProductList;
  mens: ProductList;
  haircare: ProductList;
  healthcare: ProductList;
}

const initialState: AppState = {
  loading: false,
  error: null,
  products: {
    products: [],
    totalPages: 1,
    currentPage: 1,
  },
  mens: {
    products: [],
    totalPages: 1,
    currentPage: 1,
  },
  skincare: {
    products: [],
    totalPages: 1,
    currentPage: 1,
  },
  haircare: {
    products: [],
    totalPages: 1,
    currentPage: 1,
  },
  healthcare: {
    products: [],
    totalPages: 1,
    currentPage: 1,
  },
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    products(state, action) {
      state.loading = false;
      state.error = null;
      state.products = action.payload;
    },
    mens(state, action) {
      state.loading = false;
      state.error = null;
      state.mens = action.payload;
    },
    skincare(state, action) {
      state.loading = false;
      state.error = null;
      state.skincare = action.payload;
    },
    haircare(state, action) {
      state.loading = false;
      state.error = null;
      state.haircare = action.payload;
    },
    healthcare(state, action) {
      state.loading = false;
      state.error = null;
      state.healthcare = action.payload;
    },
    setError(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.error = null;
    },
    setLoading(state, action) {
      state.loading = action.payload;
      state.error = null;
    },
  },
});
export const { products, mens,skincare,haircare,healthcare,setLoading, setError } = productSlice.actions;
export default productSlice.reducer;
