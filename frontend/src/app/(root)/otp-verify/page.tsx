"use client";
import { forum } from "@/app/font";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useState} from "react";


export default function OtpVerify() {
    const [ isVal, setIsVal] = useState({
        email:'',
        number:'',
    })
    const onChangeHandle = (e :any) =>{
        setIsVal({
            ...isVal,[e.target.name]:[e.target.value]
        })
    }
    const onSubmitHandle = (e : any) =>{
        e.preventDefault();
        setIsVal({
            email:'',
            number:''
        })
    }


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
          Otp
        </h2>
        <div>
            <form className="grid gap-4 " onSubmit={onSubmitHandle}>
                <input type="email" placeholder="Enter Email" className="w-full border p-2 rounded-sm" name={'email'} value={isVal.email} onChange={onChangeHandle} required/>
                <input type="number" placeholder="Enter Otp"  className="w-full border p-2 rounded-sm" name="number" value={isVal.number} onChange={onChangeHandle} required/>
                <button type="submit" className="border bg-primaryMain text-white p-2 rounded-md w-44">Submit</button>
            </form>
        </div>

      </div>
    </div>
  );
}
