"use client";

import { poppin } from "@/app/font";
import { Icons } from "@/app/icons";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import LeftSlider from "../_components/left-slider";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ForgetPassword() {
  const router = useRouter(); 
  const [isPass1, setisPass1] = useState(true);
  const [isPass2, setisPass2] = useState(true);
  const [isVal, setIsVal] = useState({
    password: "",
    cpassword:""
  });
  const handleChange = (e: { target: { name: any; value: any } }) => {
    setIsVal({
      ...isVal,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    router.push("/login")
    setIsVal({
        password: "",
        cpassword:"",
    });
  };
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
      <div className="grid grid-cols-2 gap-10">
        
      <div className={cn(" my-3", poppin.className)}>
          <h1 className="text-[2.5rem] font-semibold text-[#313131]">
          Set a password
          </h1>
          <p className="text-[#625D60] my-4 font-normal text-base">
          Your previous password has been reseted. Please set a new password for your account.
          </p>
          <form
            onSubmit={handleSubmit}
            action={"/"}
            className="grid gap-6"
          >
          
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
            <div className="">
              <h3 className="text-sm text-[#332F32] font-medium">
                Confirm Password
              </h3>
              <div className="flex border border-[#625D60] rounded-lg mt-1.5 items-center">
                <input
                  type={isPass2 ? "password" : "text"}
                  name="cpassword"
                  value={isVal.cpassword}
                  onChange={handleChange}
                  className="outline-none p-2.5 rounded-lg w-full"
                  placeholder="Confirm Password"
                  required
                />
                <span
                  className="px-5 text-xl"
                  onClick={() => setisPass2(!isPass2)}
                >
                  {isPass2 ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
            
            <input
              type="submit"
              value={"Set password"}
              className="w-full p-2 text-sm font-medium rounded-sm bg-primaryMain text-white cursor-pointer"
            />
          </form>
        </div>
        <div className="w-full sticky top-0 h-[80vh]">
            <LeftSlider img={"/Assests/Images/LoginImage/02.png"} />
        </div>
        
      </div>
    </div>
  );
}
