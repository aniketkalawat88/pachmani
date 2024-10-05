"use client";

import { poppin } from "@/app/font";
import { Icons } from "@/app/icons";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import LeftSlider from "../_components/left-slider";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Loader } from "lucide-react";
import { AppDispatch, RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { signAsyn } from "@/redux/action/userAction";

export default function Login() {
  const [isPass1, setisPass1] = useState(true);
  const [isPass2, setisPass2] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  interface FormData {
    username: string;
    lastname: string;
    email: string;
    phoneNumber: string;
    password: string;
    cpassword: string;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    mode: "onChange",
  });
  const password = watch("password", "");

  const {
    user,
    loading,
    error: reduxError,
    isAuthenticated,
  } = useSelector((state: RootState) => state.auth);

  const onSubmit = (data: FormData) => {
    dispatch(signAsyn(data));
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, user]);

  return (
    <div className=" max-w-7xl mx-auto ">
      <div className="flex justify-end p-10">
        <div className="relative h-14 w-40 ">
          <Image
            src="/Assests/Images/HomeImage/logo.png"
            alt="No Preview"
            fill
            className="object-contain"
          />
        </div>
      </div>
      <div className="grid md:grid-cols-5 gap-24 xl:p-0 p-6">
        <div className="md:col-span-2 w-full sticky top-5 h-[95vh] max-md:hidden">
          <LeftSlider img={"/Assests/Images/LoginImage/01.png"} />
        </div>

        <div className={cn("md:col-span-3 mb-3", poppin.className)}>
          <h1 className="text-[2.5rem] font-semibold text-[#313131]">
            Sign up
          </h1>
          <p className="text-[#625D60] my-4 font-normal text-base">
            Let’s get you all st up so you can access your personal account.
          </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid md:grid-cols-2 grid-cols-1 gap-6"
          >
            <div>
              <h3 className="text-sm text-[#332F32] font-medium">username</h3>
              <input
                type="text"
                {...register("username", {
                  required: "username is required",
                  minLength: {
                    value: 3,
                    message: "username must be at least 2 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "username must be at less than 20 characters",
                  },
                })}
                className="border border-[#625D60] outline-none p-2.5 rounded-lg w-full mt-1.5"
                placeholder="Please Enter Your First Name"
              />
              {errors.username && (
                <p className="text-red-400">{errors.username.message}</p>
              )}
            </div>
            <div>
              <h3 className="text-sm text-[#332F32] font-medium">Last Name</h3>
              <input
                type="text"
                {...register("lastname", {
                  minLength: {
                    value: 3,
                    message: "lastname must be at least 2 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "lastname must be at less than 20 characters",
                  },
                })}
                className="border border-[#625D60] outline-none p-2.5 rounded-lg w-full mt-1.5"
                placeholder="Please Enter Your Last Name"
              />
              {errors.lastname && (
                <p className="text-red-400">{errors.lastname.message}</p>
              )}
            </div>
            <div>
              <h3 className="text-sm text-[#332F32] font-medium">Email</h3>
              <input
                type="email"
                {...register("email", {
                  required: "email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className="border border-[#625D60] outline-none p-2.5 rounded-lg w-full mt-1.5"
                placeholder="Please Enter Your Email"
              />
              {errors.email && (
                <p className="text-red-400">{errors.email.message}</p>
              )}
            </div>
            <div>
              <h3 className="text-sm text-[#332F32] font-medium">
                Mobile Number
              </h3>
              <input
                type="number"
                {...register("phoneNumber", {
                  required: "mobile is required",
                  minLength: {
                    value: 10,
                    message: "mobile number should be 10 digits",
                  },
                  maxLength: {
                    value: 10,
                    message: "mobile number should be 10 digits",
                  },
                })}
                className="border border-[#625D60] outline-none p-2.5 rounded-lg w-full mt-1.5"
                placeholder="Please Enter Your Mobile Number"
              />
              {errors.phoneNumber && (
                <p className="text-red-400">{errors.phoneNumber.message}</p>
              )}
            </div>
            <div className="md:col-span-2">
              <h3 className="text-sm text-[#332F32] font-medium">Password</h3>
              <div className="flex border border-[#625D60] rounded-lg mt-1.5 items-center">
                <input
                  type={isPass1 ? "password" : "text"}
                  {...register("password", {
                    required: "password is required",
                  })}
                  className="outline-none p-2.5 w-full rounded-lg"
                  placeholder="Please Enter Your Password"
                />
                <span
                  className="px-5 text-xl"
                  onClick={() => setisPass1(!isPass1)}
                >
                  {isPass1 ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.password && (
                <p className="text-red-400">Password is required</p>
              )}
            </div>
            <div className="md:col-span-2">
              <h3 className="text-sm text-[#332F32] font-medium">
                Confirm Password
              </h3>
              <div className="flex border border-[#625D60] rounded-lg mt-1.5 items-center">
                <input
                  type={isPass2 ? "password" : "text"}
                  {...register("cpassword", {
                    required: "Confirm password is required",
                    validate: (value) =>
                      value === password || "The passwords do not match",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className="outline-none p-2.5 rounded-lg w-full"
                  placeholder="Confirm Password"
                />
                <span
                  className="px-5 text-xl"
                  onClick={() => setisPass2(!isPass2)}
                >
                  {isPass2 ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.cpassword && (
                <p className="text-red-400">Confirm password is required</p>
              )}
            </div>
            {/* Other form fields and components */}
           {reduxError && <p className="text-red-500">{reduxError + ''}</p>}
            <div className="w-full md:col-span-2 p-2 text-sm font-medium rounded-sm bg-primaryMain text-white flex items-center justify-center gap-2">
              <button type="submit">SignUp</button>
              {loading && <Loader className="animate-spin w-4 h-4" />}
            </div>
          </form>
          <div className="text-[#313131] text-sm font-semibold text-center my-4">
            Already have an account?{" "}
            <Link href={"/login"} className="text-[#FF8682]">
              Login
            </Link>
          </div>
          <div className="flex items-center w-full text-sm text-[#313131]/70 my-10">
            <div className="h-[0.5px] w-full bg-[#313131]/70" />
            <span className="md:w-72 w-52 text-center"> Or Sign up with </span>
            <div className="h-[0.5px] w-full bg-[#313131]/70" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="border border-[#515DEF] rounded-sm p-4 w-full flex justify-center items-center">
              <Icons.fb2 />
            </div>
            <div className="border border-[#515DEF] rounded-sm p-4 w-full flex justify-center items-center">
              <Icons.google />
            </div>
            <div className="border border-[#515DEF] rounded-sm p-4 w-full flex justify-center items-center">
              <Icons.apple />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
