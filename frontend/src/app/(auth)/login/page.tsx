"use client";

import { poppin } from "@/app/font";
import { Icons } from "@/app/icons";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import LeftSlider from "../_components/left-slider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { loginAsyn } from "@/redux/action/userAction";
import { Loader } from "lucide-react";
import { AppDispatch, RootState } from "@/redux/store";

export default function Login() {
  const router = useRouter();
  
  const dispatch = useDispatch<AppDispatch>();

  const { user, loading, error, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const [isPass1, setisPass1] = useState(true);

  const [isVal, setIsVal] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setIsVal({
      ...isVal,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    dispatch(loginAsyn(isVal));
  };

  useEffect(() => {
    if (isAuthenticated && user?.role == "admin" ) {
      router.replace("/admin");
    }
    if (isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, user]);

  return (
    <div className=" max-w-7xl mx-auto ">
      <div className="flex py-10">
        <div className="relative h-14 w-40 ">
          <Image
            src="/Assests/Images/HomeImage/logo.png"
            alt="No Preview"
            fill
            className="object-contain"
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-10 xl:p-0 p-6">
        <div className={cn(" my-3", poppin.className)}>
          <h1 className="text-[2.5rem]  font-semibold text-[#313131]">Login</h1>
          <p className="text-[#625D60] my-4 font-normal text-base">
            Login to access your travelwise account
          </p>
          <form onSubmit={handleSubmit} className="grid gap-6">
            <div>
              <h3 className="text-sm text-[#332F32] font-medium">Email</h3>
              <input
                type="email"
                name="email"
                value={isVal.email}
                onChange={handleChange}
                className="border border-[#625D60] outline-none p-2.5 rounded-lg w-full mt-1.5"
                placeholder="Please Enter Your Email"
                required
              />
            </div>
            <div className="">
              <h3 className="text-sm text-[#332F32] font-medium">Password</h3>
              <div className="flex border border-[#625D60] rounded-lg mt-1.5 items-center">
                <input
                  type={isPass1 ? "password" : "text"}
                  name="password"
                  value={isVal.password}
                  onChange={handleChange}
                  className=" outline-none p-2.5 w-full rounded-lg"
                  placeholder="Please Enter Your Password"
                  required
                />
                <span
                  className="px-5 text-xl"
                  onClick={() => setisPass1(!isPass1)}
                >
                  {isPass1 ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 font-semibold cursor-pointer w-fit">
                <input type="checkbox" required className="text-2xl" />
                <p className="text-[#313131] text-sm font-medium">
                  Remember me
                </p>
              </label>
              <Link
                href={"/forget-password"}
                className="text-[#FF8682] font-medium"
              >
                Forgot Password
              </Link>
            </div>
            <p className="text-red-400">{error}</p>
            <button
              type="submit"
              className="w-full flex justify-center items-center p-2 text-sm font-medium rounded-sm bg-primaryMain text-white cursor-pointer"
            >
              {loading && <Loader className="animate-spin w-4 h-4"></Loader>}
              <p>Login</p>
            </button>
          </form>
          <div className="text-[#313131] text-sm font-semibold text-center my-4">
            Don’t have an account?{" "}
            <Link href={"/sign-up"} className="text-[#FF8682]">
              Sign up
            </Link>
          </div>
          <div className="flex items-center w-full text-sm text-[#313131]/70 my-10">
            <div className="h-[0.5px] w-full bg-[#313131]/70" />
            <span className="md:w-72 w-52 text-center"> Or Sign up with </span>
            <div className="h-[0.5px] w-full bg-[#313131]/70" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="border border-[#00AB55] rounded-sm p-4 w-full flex justify-center items-center">
              <Icons.fb2 />
            </div>
            <div className="border border-[#00AB55] rounded-sm p-4 w-full flex justify-center items-center">
              <Icons.google />
            </div>
            <div className="border border-[#00AB55] rounded-sm p-4 w-full flex justify-center items-center">
              <Icons.apple />
            </div>
          </div>
        </div>
        <div className="w-full sticky top-0 md:h-[80vh] max-md:hidden">
          <LeftSlider img={"/Assests/Images/LoginImage/02.png"} />
        </div>
      </div>
    </div>
  );
}
