import { Dispatch } from "@reduxjs/toolkit";
import { getProducts, setError, setIsLoading } from "../slice/wishlistSlice";
import api from "@/lib/axios";

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
  }
  
  // productSlice.ts
  export interface ProductState {
    products: Product[];
    isLoading: boolean;
    error: string | null;
  }

  export const getWishlistCart = () => async (dispatch: Dispatch) => {
    try {
      dispatch(setIsLoading(true));
      const { data } = await api.post(`product/wishlist`);
      dispatch(getProducts(data?.wishlist));
    } catch (err) {
      console.log(err , "===")
      dispatch(setError("wishlist product error"));
    }finally {
        dispatch(setIsLoading(false));
      }
  };

  