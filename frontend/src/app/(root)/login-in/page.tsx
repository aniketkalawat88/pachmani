"use client";
import { forum } from "@/app/font";
import { cn } from "@/lib/utils";
import { loginAsyn } from "@/redux/action/userAction";
import { AppDispatch, RootState } from "@/redux/store";
import axios from "axios";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, error, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  const [isVal, setIsVal] = useState({
    email: "",
    password: "",
  });

  const onChangeHandle = (e: any) => {
    setIsVal({
      ...isVal,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandle = async (e: any) => {
    e.preventDefault();
    dispatch(loginAsyn(isVal));
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, user]);

  return (
    <div className=" min-h-screen">
      <div className="fixed top-0 left-0 h-full w-full -z-20">
        <Image
          src="/Assests/Images/HomeImage/02.png"
          alt="No Preview"
          fill
          className="object-cover"
        />
      </div>
      <div className="bg-white md:w-[50%] md:h-auto p-10 gap-5 mt-16 mx-auto  grid rounded-xl items-start">
        <h2 className={cn("md:text-4xl text-2xl text-center", forum.className)}>
          Login
        </h2>
        <div>
          <form className="grid gap-4 " onSubmit={onSubmitHandle}>
            <input
              type="email"
              placeholder="Enter Email"
              className="w-full border p-2 rounded-sm"
              name={"email"}
              value={isVal.email}
              onChange={onChangeHandle}
              required
            />
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full border p-2 rounded-sm"
              name="password"
              value={isVal.password}
              onChange={onChangeHandle}
              required
            />
            <button
              type="submit"
              className="border bg-primaryMain text-white p-2 rounded-md w-44 flex items-center justify-center gap-2"
            >
              {loading && <Loader className="animate-spin w-4 h-4"></Loader>}
              <p>Submit</p>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
