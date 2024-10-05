import axios from "axios";
import { Dispatch } from "@reduxjs/toolkit";
import {
  haircare,
  healthcare,
  mens,
  products,
  setLoading,
  skincare,
} from "../slice/productSclice";
import { setError } from "../slice/userSclice";
import api from "@/lib/axios";



interface Filter {
  [key: string]: string | number | boolean; // Define the types of values filter can have
}

export const getAllProductsAsyn =
  (filter: Filter) => async (dispatch: Dispatch) => {
    try {
      dispatch(setLoading(true));
      let queryString = "";
      for (const key in filter) {
        if (filter.hasOwnProperty(key)) {
          queryString += `${key}=${filter[key]}&`;
        }
      }
      queryString = queryString.slice(0, -1);
      const { data } = await api.get(`product?${queryString}`);
      dispatch(products(data));
    } catch (error) {
      console.log(error);
      dispatch(setError("get all products error"));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const getAllMensAsyn =
  (filter: Filter) => async (dispatch: Dispatch) => {
    try {
      dispatch(setLoading(true));

      let queryString = "";
      for (const key in filter) {
        if (filter.hasOwnProperty(key)) {
          queryString += `${key}=${filter[key]}&`;
        }
      }
      queryString = queryString.slice(0, -1);

      const { data } = await api.get(`product?${queryString}`);
      dispatch(mens(data));
    } catch (error) {
      console.log(error);
      dispatch(setError("get all products error"));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const getAllSkincareAsyn =
  (filter: Filter) => async (dispatch: Dispatch) => {
    try {
      dispatch(setLoading(true));
      let queryString = "";
      for (const key in filter) {
        if (filter.hasOwnProperty(key)) {
          queryString += `${key}=${filter[key]}&`;
        }
      }
      queryString = queryString.slice(0, -1);
      const { data } = await api.get(`product?${queryString}`);
      dispatch(skincare(data));
    } catch (error) {
      console.log(error);
      dispatch(setError("get all products error"));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const getAllHaircareAsyn =
  (filter: Filter) => async (dispatch: Dispatch) => {
    try {
      dispatch(setLoading(true));

      let queryString = "";
      for (const key in filter) {
        if (filter.hasOwnProperty(key)) {
          queryString += `${key}=${filter[key]}&`;
        }
      }
      queryString = queryString.slice(0, -1);

      const { data } = await api.get(`product?${queryString}`);
      dispatch(haircare(data));
    } catch (error) {
      console.log(error);
      dispatch(setError("get all products error"));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const getAllhealthcareAsyn =
  (filter: Filter) => async (dispatch: Dispatch) => {
    try {
      dispatch(setLoading(true));

      let queryString = "";
      for (const key in filter) {
        if (filter.hasOwnProperty(key)) {
          queryString += `${key}=${filter[key]}&`;
        }
      }
      queryString = queryString.slice(0, -1);

      const { data } = await api.get(`product?${queryString}`);
      dispatch(healthcare(data));
    } catch (error) {
      console.log(error);
      dispatch(setError("get all products error"));
    } finally {
      dispatch(setLoading(false));
    }
  };
