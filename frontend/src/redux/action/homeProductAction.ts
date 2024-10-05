import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { getHomeProducts, setError, setIsLoading } from "../slice/homeProductSlice";
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

  export const getHomeCart = () => async (dispatch: Dispatch) => {
    try {
      dispatch(setIsLoading(true));
      const { data } = await api.get(`product`);
      // console.log(data.products)
      dispatch(getHomeProducts(data.products));
    } catch (err) {
      console.log(err , "===")
      dispatch(setError("home product error"));
    }finally {
        dispatch(setIsLoading(false));
      }
  };