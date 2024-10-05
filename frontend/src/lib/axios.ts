"use client";
import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_URL}/api/`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    authorization: typeof window !== 'undefined' ? localStorage.getItem("token") : null,
  },
});

export default api;
