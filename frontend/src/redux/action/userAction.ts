import {
  login,
  logout,
  register,
  setError,
  setLoading,
} from "../slice/userSclice";
import { Dispatch } from "@reduxjs/toolkit";
import api from "@/lib/axios";

export const loginAsyn = (userData: {}) => async (dispatch: Dispatch) => {
  try {
    dispatch(setLoading(true));
    const { data } = await api.post(`user/login`, userData);
    dispatch(login(data.user));
    localStorage.setItem("token", data.token);
  } catch (error) {
    console.log(error, "==");
    const err = error as { response?: { data?: { message?: string } } };
    console.log(err?.response?.data?.message, "===");
    dispatch(setError(err?.response?.data?.message || "login error"));
  } finally {
    dispatch(setLoading(false));
  }
};

export const getLoginUserAsyn = () => async (dispatch: Dispatch) => {
  try {
    dispatch(setLoading(true));
    const { data } = await api.post(`user`);
    dispatch(login(data.user));
    localStorage.setItem("token", data.token);
  } catch (error) {
    console.log(error, "===");
    dispatch(setError("jwtError"));
  } finally {
    dispatch(setLoading(false));
  }
};

export const signAsyn = (userData: {}) => async (dispatch: Dispatch) => {
  try {
    dispatch(setLoading(true));
    const { data } = await api.post(`user/sign-up`, userData);
    dispatch(register(data.user));
    localStorage.setItem("token", data.token);
  } catch (error) {
    const err = error as { response?: { data?: { message?: string } } };
    dispatch(setError(err?.response?.data?.message || "signup error"));
  } finally {
    dispatch(setLoading(false));
  }
};

export const logoutAsyn = () => async (dispatch: Dispatch) => {
  try {
    dispatch(setLoading(true));
    const { data } = await api.get(`user/logout`);
    dispatch(logout());
    localStorage.removeItem("token");
  } catch (error) {
    dispatch(setError("Login failed"));
  } finally {
    dispatch(setLoading(false));
  }
};
