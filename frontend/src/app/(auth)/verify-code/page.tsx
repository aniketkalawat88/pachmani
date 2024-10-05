"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronLeft, Loader } from "lucide-react";
import Link from "next/link";
import { poppin } from "@/app/font";
import { cn } from "@/lib/utils";
import LeftSlider from "../_components/left-slider";
import api from "@/lib/axios";

export default function VerifyCode() {
  const router = useRouter();
  const [isVal, setIsVal] = useState({ otp: "", password: "" });
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const email =
    typeof window !== "undefined" ? localStorage.getItem("email") : null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsVal({
      ...isVal,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await api.post("/user/verify-otp", {
        email: email,
        otp: isVal.otp,
        password: isVal.password,
      });
      router.push("/login");
    } catch (error: any) {
      console.error(error.data?.response?.message);
      setError(
        error.data.response.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
      setIsVal({ otp: "", password: "" });
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
            Verify code
          </h1>
          <p className="text-[#625D60] my-4 font-normal text-base">
            An authentication code has been sent to your email.
          </p>
          <form onSubmit={handleSubmit} className="grid gap-6">
            <div>
              <h3 className="text-sm text-[#332F32] font-medium">Enter Code</h3>
              <input
                type="text"
                name="otp"
                value={isVal.otp}
                onChange={handleChange}
                className="border border-[#625D60] outline-none p-2.5 rounded-lg w-full mt-1.5"
                placeholder="Enter Your OTP"
                required
              />
            </div>
            <div>
              <h3 className="text-sm text-[#332F32] font-medium">
                New Password
              </h3>
              <input
                type="password"
                name="password"
                value={isVal.password}
                onChange={handleChange}
                className="border border-[#625D60] outline-none p-2.5 rounded-lg w-full mt-1.5"
                placeholder="Enter Your New Password"
                required
              />
            </div>
            <div className="text-[#313131] text-sm font-medium">
              Didn’t receive a code?{" "}
              <span className="text-[#FF8682] cursor-pointer">Resend</span>
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
              Verify
            </button>
          </form>
        </div>
        <div className="w-full sticky top-0 h-[80vh] max-md:hidden">
          <LeftSlider img="/Assests/Images/LoginImage/02.png" />
        </div>
      </div>
    </div>
  );
}
