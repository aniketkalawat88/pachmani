import axios from "axios";
import {
  addItemToCart,
  removeItemFromCart,
  updateCart,
  setError,
  setLoading,
  getAllCartItems,
} from "../slice/addToCartSlice";
import { setUnauthorized } from "../slice/userSclice";
import { Dispatch } from "@reduxjs/toolkit";
import { CartItem } from "@/lib/types/addToCart";
import api from "@/lib/axios";

export const getAllCartItemsAsync = () => async (dispatch: Dispatch) => {
  try {
    dispatch(setLoading(true));
    const { data } = await api.get(`cart`);
    dispatch(getAllCartItems(data.cartItems));
    dispatch(setLoading(false));
  } catch (error) {
    const err = error as { response?: { data?: { message?: string } } };
    if (err?.response?.data?.message == "Unauthorized") {
      dispatch(setUnauthorized(err?.response?.data?.message));
    }
    dispatch(
      setError(err?.response?.data?.message || "getAllCartItemsAsync error")
    );
  } finally {
    dispatch(setLoading(false));
  }
};

export const addToCartAsync =
  (cartItem: CartItem) => async (dispatch: Dispatch) => {
    try {
      dispatch(setLoading(true));
      const { data } = await api.post(`cart/add`, cartItem);
      dispatch(addItemToCart(data.cartItem));
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      if (err?.response?.data?.message == "Unauthorized") {
        dispatch(setUnauthorized(err?.response?.data?.message));
      }
      dispatch(
        setError(err?.response?.data?.message || "addToCartAsync error")
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

export const removeFromCartAsync =
  (cartId: string) => async (dispatch: Dispatch) => {
    try {
      dispatch(setLoading(true));
      const { data } = await api.delete(`cart/remove/${cartId}`);
      dispatch(removeItemFromCart(cartId));
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      if (err?.response?.data?.message == "Unauthorized") {
        dispatch(setUnauthorized(err?.response?.data?.message));
      }
      dispatch(
        setError(err?.response?.data?.message || "removeFromCartAsync error")
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

export const updateCartAsync =
  (cartItems: CartItem[]) => async (dispatch: Dispatch) => {
    try {
      dispatch(setLoading(true));
      const { data } = await api.patch(`cart/update`, { items: cartItems });
      dispatch(updateCart(data.cartItems));
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      if (err?.response?.data?.message == "Unauthorized") {
        dispatch(setUnauthorized(err?.response?.data?.message));
      }
      dispatch(
        setError(err?.response?.data?.message || "updateCartAsync error")
      );
    } finally {
      dispatch(setLoading(false));
    }
  };
