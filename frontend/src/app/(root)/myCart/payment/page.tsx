"use client"

import { forum } from '@/app/font'
import { Icons } from '@/app/icons'
import { cn } from '@/lib/utils'
import CustomHead from '@/UI/customHead'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { FaChevronRight } from "react-icons/fa6";

export default function page() {
    const [isRadio , setIsRadio] = useState("");
    const arr = ["", ""];
    const [isSet, setIsSet] = useState(0);
    const handleInce = () => {
      if (isSet < 7) {
        setIsSet(isSet + 1);
      }
    };
    const handleDec = () => {
      if (isSet > 0) {
        setIsSet(isSet - 1);
      }
    };
  return (
    
    <div className='shadow-[2px_2px_20px_0px_rgba(0,0,0,0.10)] grid md:grid-cols-5 px-6 max-md:p-6 md:gap-x-12 max-md:gap-6 pb-6 rounded-sm max-md:flex max-md:flex-col-reverse'>
        <div className='md:col-span-3'>
          <div className='md:col-span-3'>
              <CustomHead name='Select Payment Method' className='w-1/2' />
          </div>
            <form className='grid gap-6'>
                <label className={cn('flex text-base font-medium items-center justify-between shadow-[2px_2px_20px_0px_rgba(0,0,0,0.10)] p-5 rounded-sm' , isRadio === "option1" ? "text-primaryMain" : "")} onClick={() => setIsRadio("option1")}>
                    <div className="radio flex items-center gap-2">
                        <input type="radio" className='accent-[#00AB55] scale-125' value="option1" checked={ isRadio === "option1"} />
                        Debit/ Credit cart
                    </div>
                    <div className='md:pr-10 '>
                        <FaChevronRight className='text-sm text-[#625D60]' />
                    </div>
                </label>
                <label className={cn('flex text-base font-medium items-center justify-between shadow-[2px_2px_20px_0px_rgba(0,0,0,0.10)] p-5 rounded-sm' , isRadio === "option2" ? "text-primaryMain" : "")} onClick={() => setIsRadio("option2")}>
                    <div className="radio flex items-center gap-2">
                        <input type="radio" className='accent-[#00AB55] scale-125' value="option2" checked={isRadio === "option2"} />
                        Net banking
                    </div>
                    <div className='md:pr-10 '>
                        <FaChevronRight className='text-sm text-[#625D60]' />
                    </div>
                </label>
                <label className={cn('flex text-base font-medium items-center justify-between shadow-[2px_2px_20px_0px_rgba(0,0,0,0.10)] p-5 rounded-sm' , isRadio === "option3" ? "text-primaryMain" : "")} onClick={() => setIsRadio("option3")}>
                    <div className="radio  flex items-center gap-2" >
                        <input type="radio" className='accent-[#00AB55] scale-125' value="option3" checked={isRadio === "option3"} />
                        UPI 
                    </div>
                    <div className='md:pr-10 '>
                        <FaChevronRight className='text-sm text-[#625D60]' />
                    </div>
                </label>
                <label className={cn('flex text-base font-medium items-center justify-between shadow-[2px_2px_20px_0px_rgba(0,0,0,0.10)] p-5 rounded-sm' , isRadio === "option4" ? "text-primaryMain" : "")} onClick={() => setIsRadio("option4")}>
                    <div className="radio flex items-center gap-2" >
                        <input type="radio" className='accent-[#00AB55] scale-125' value="option4" checked={isRadio === "option4"} />
                        Wallet 
                    </div>
                    <div className='md:pr-10 '>
                        <FaChevronRight className='text-sm text-[#625D60]' />
                    </div>
                </label>
                <label className={cn('flex text-base font-medium items-center justify-between shadow-[2px_2px_20px_0px_rgba(0,0,0,0.10)] p-5 rounded-sm' , isRadio === "option5" ? "text-primaryMain" : "")} onClick={() => setIsRadio("option5")}>
                    <div className="radio flex items-center gap-2" >
                        <input type="radio" className='accent-[#00AB55] scale-125' value="option5" checked={isRadio === "option5"} />
                        Cash on delivery 
                    </div>
                    <div className='md:pr-10 '>
                        <FaChevronRight className='text-sm text-[#625D60]' />
                    </div>
                </label>
                
                <Link href={'/paymentfailed'} className='w-fit p-2 text-xl font-medium rounded-sm bg-primaryMain text-white'>Proceed to Payment</Link>
            </form>
        </div>
        <div className='md:col-span-2 md:mt-[5.4rem]'>
          <div className="rounded-lg w-full shadow-[2px_2px_20px_0px_rgba(0,0,0,0.10)] bg-white p-4">
            <h1 className="text-[#332F32] text-base font-bold">Payment detail</h1>
            <div className="text-sm grid gap-1 mt-4">
              <div className="flex justify-between text-[#625D60] font-medium">
                MRP Total <span className="text-[#332F32] font-semibold">₹ 706.00</span>
              </div>
              <div className="flex justify-between text-[#625D60] font-medium">
                Discount<span className="text-[#332F32] font-semibold">₹ 100.00</span>
              </div>
              <div className="flex justify-between text-[#625D60] font-medium">
                Promo Code<span className="text-[#332F32] font-semibold">₹ 0.00</span>
              </div>
              <div className="flex justify-between text-[#625D60] font-medium">
                Delivery charge<span className="text-[#332F32] font-semibold">₹ 0.00</span>
              </div>
              <div className="border-primaryMain/25 border  w-full h-[0.5px] border-dashed"/>
              
              <div className="flex justify-between text-primaryMain">
                Total Payable<span className="font-semibold">₹ 606.00</span>
              </div>
              <p className="text-xs font-normal text-[#625D60] mt-1">You are save ₹ 100.00 on this order </p>
            </div>
          </div>
        </div>
    </div>
  )
}
