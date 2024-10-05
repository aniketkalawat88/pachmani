"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import Image from "next/image";
import LeftSlider from "../_components/left-slider";
import Link from "next/link";
import { ChevronLeft, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { poppin } from "@/app/font";
import { Icons } from "@/app/icons";
import { cn } from "@/lib/utils";

interface FormData {
  email: string;
}

export default function ForgetPassword() {
  const router = useRouter();
  const [isPass1, setisPass1] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);
    try {
      const response = await api.post("user/request-otp", {
        email: data.email,
      });
      if (response.status === 200) {
        localStorage.setItem("email", data.email);
        router.push("/verify-code");
      }
    } catch (error) {
      setLoading(false);
      console.error((error as any)?.response?.data?.message);
      setError((error as any)?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto md:p-0 p-6">
      <div className="flex py-10">
        <div className="relative h-14 w-40">
          <Image
            src="/Assests/Images/HomeImage/logo.png"
            alt="No Preview"
            fill
            className="object-contain"
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-10">
        <div className={cn("my-3", poppin.className)}>
          <Link
            href="/login"
            className="my-4 text-[#313131] flex items-center gap-2"
          >
            <ChevronLeft /> Back to login
          </Link>
          <h1 className="text-[2.5rem] font-semibold text-[#313131]">
            Forgot your password?
          </h1>
          <p className="text-[#625D60] my-4 font-normal text-base">
            Don’t worry, happens to all of us. Enter your email below to recover
            your password
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
            <div>
              <h3 className="text-sm text-[#332F32] font-medium">Email</h3>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="border border-[#625D60] outline-none p-2.5 rounded-lg w-full mt-1.5"
                placeholder="Please Enter Your Email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full p-2 text-sm font-medium rounded-sm bg-primaryMain text-white cursor-pointer flex items-center justify-center ${
                isLoading ? "opacity-50" : ""
              }`}
            >
              {isLoading && <Loader className="w-4 h-4 animate-spin mr-2" />}
              Submit
            </button>
          </form>
          <div className="flex items-center w-full text-sm text-[#313131]/70 my-10">
            <div className="h-[0.5px] w-full bg-[#313131]/70" />
            <span className="md:w-72 w-52 text-center"> Or login with </span>
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
        <div className="w-full sticky top-0 h-[80vh] max-md:hidden">
          <LeftSlider img="/Assests/Images/LoginImage/02.png" />
        </div>
      </div>
    </div>
  );
}
