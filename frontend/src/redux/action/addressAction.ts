import api from "@/lib/axios";
import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { addAddressCheckout, setError, setLoading } from "../slice/addresSlice";
import { Address } from "@/lib/types/address";

export const addAddress = (address: Address) => async (dispatch: Dispatch) => {
  try {
    dispatch(setLoading(true));
    const { data } = await api.post(`user/address`, address);
    dispatch(addAddressCheckout(data.user.addresses));
  } catch (error) {
    const err = error as { response?: { data?: { message?: string } } };
    console.log(err?.response?.data?.message, "===");
    dispatch(setError(err?.response?.data?.message || "addAddress error"));
  }
};
export const getAddress = () => async (dispatch: Dispatch) => {
  try {
    dispatch(setLoading(true));
    const { data } = await api.get(`user/address`);
    dispatch(addAddressCheckout(data.addresses));
  } catch (error) {
    const err = error as { response?: { data?: { message?: string } } };
    console.log(err?.response?.data?.message, "===");
    dispatch(setError(err?.response?.data?.message || "getAddress error"));
  }
};
export const updateAddress =
  (addressIndex: number, address: Address) => async (dispatch: Dispatch) => {
    try {
      dispatch(setLoading(true));
      const { data } = await api.put(`user/address`, {
        addressIndex: addressIndex,
        ...address,
      });
      dispatch(addAddressCheckout(data.user.addresses));
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      console.log(err?.response?.data?.message, "===");
      dispatch(setError(err?.response?.data?.message || "updateAddress error"));
    }
  };
export const deleteAddress = (index: number) => async (dispatch: Dispatch) => {
  try {
    dispatch(setLoading(true));
    const { data } = await api.delete(`user/address/${index}`);
    dispatch(addAddressCheckout(data.user.addresses));
  } catch (error) {
    console.log(error);
    const err = error as { response?: { data?: { message?: string } } };
    console.log(err?.response?.data?.message, "===");
    dispatch(setError(err?.response?.data?.message || "deleteAddress error"));
  }
};
