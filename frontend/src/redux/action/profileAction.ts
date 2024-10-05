import api from "@/lib/axios";
import { userProfile, setLoading, setError } from "../slice/profileSlice";
import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";

export const getuserProfile = () => async (dispatch: Dispatch) => {
  try {
    dispatch(setLoading(true));
    const { data } = await api.patch(`user/profile`);
    dispatch(userProfile(data.user));
  } catch (error) {
    console.log(error, "===>");
    dispatch(setError("profile error"));
  } finally {
    dispatch(setLoading(false));
  }
};

export const updateProfile = (userData: {}) => async (dispatch: Dispatch) => {
  try {
    dispatch(setLoading(true));
    const { data } = await api.patch(`user/profile`, userData);
    dispatch(userProfile(data.user));
  } catch (err) {
    console.log(err, "profile error");
    dispatch(setError("profile error"));
  } finally {
    dispatch(setLoading(false));
  }
};
