"use client"

import { forum } from '@/app/font'
import { Icons } from '@/app/icons';
import { cn } from '@/lib/utils'
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'
import { AiOutlineRight } from 'react-icons/ai';

export default function OrderCancel() {
    
    const [isRadio , setIsRadio] = useState("");
  return (
    <div className='grid grid-cols-3 gap-10 items-start h-auto shadow-[2px_2px_20px_0px_rgba(0,0,0,0.10)] my-10 max-w-7xl mx-auto p-6 rounded-sm'>
        <div className='col-span-2 flex flex-col h-full w-full'>
            <div className={cn('bg-[#00AB551A] text-2xl p-5 rounded-sm' , forum.className)}>1. {" "}Easy Cancellation</div>
            <div className='mt-8'>
                <div className='text-sm text-[#332F32] font-medium'>Reason of Cancellation*</div>
                <input type='text' placeholder='Select Reason' className='outline-none border border-[#625D60] p-2.5 rounded-md w-full my-2' />
            </div>
            <div className='mt-4'>
                <div className='text-sm text-[#332F32] font-medium'>Comments*</div>
                <textarea  placeholder='Please Enter Comment' className='outline-none border border-[#625D60] p-2.5 rounded-md w-full my-2 h-28 resize-none ' />
            </div>
            <div className='w-full h-full flex justify-end'>
                <button className='text-primaryMain border border-primaryMain w-44 p-3 rounded-sm'>Continue</button>
            </div>
            <div className={cn('bg-[#00AB551A] text-2xl p-5 rounded-sm mt-4' , forum.className)}>2. {" "}Refund Mods</div>
            <h1 className='text-2xl font-medium my-4'>Select a Mode or Refund</h1>
            <div>
                <label className={cn('flex text-base font-medium items-center justify-between p-5 rounded-sm' , isRadio === "option1" ? "text-primaryMain" : "")} onClick={() => setIsRadio("option1")}>
                    <div className="radio flex items-start gap-2" >
                        <input type="radio" className='accent-[#00AB55] scale-125 mt-1.5' value="option1" checked={isRadio === "option1"} />
                        <div className=''>
                            Original Payments Mode
                            <div className='text-[#625D60] text-sm font-medium block'>Refund will be processed within 8 days</div>
                        </div>
                    </div>
                </label>
                <label className={cn('flex text-base font-medium items-center justify-between p-5 rounded-sm' , isRadio === "option2" ? "text-primaryMain" : "")} onClick={() => setIsRadio("option2")}>
                    <div className="radio flex items-center gap-2" >
                        <input type="radio" className='accent-[#00AB55] scale-125' value="option2" checked={isRadio === "option2"} />
                        Reason of Cancellation*
                    </div>
                </label>
            </div>

        </div>

        <div className="border-[rgba(0,171,85,0.10)] border">
            <p className='text-primaryMain p-2.5 shadow-[2px_2px_20px_0px_rgba(0,0,0,0.10)] text-center'> Items Details</p>
            <div className="grid gap-5 p-4">
            <div className="grid md:grid-cols-6 grid-cols-1 gap-3 p-2 items-start rounded-md shadow-[2px_2px_20px_0px_rgba(0,0,0,0.10)]">
                <div className="md:col-span-2 flex flex-col items-start">
                    <div className="relative w-full md:h-32 h-44 ">
                    <Image
                        src="/Assests/Images/HomeImage/27.png"
                        alt="No Preview"
                        fill
                        className=" object-cover rounded-sm"
                    />
                    </div>
                    <p className='text-center text-[#625D60] text-xs w-full'>Qty : 1</p>
                </div>

                <div className="md:col-span-4 gap-2">
                    <h1 className="text-base font-medium text-black">
                    Black Shine Shampoo
                    </h1>
                    <p className="text-sm text-[#625D60] my-2">
                    It is a long established fact that a reader will be distracted
                    by the{" "}
                    </p>
                    <div className="grid items-center">
                    <div className="text-xs flex items-center gap-1 text-ternary-main mt-2">
                        <span className="bg-[#2D8A40] text-white w-16 flex justify-center items-center py-0.5 text-[0.625rem] rounded-full">
                        4.5 &#9733;
                        </span>
                        <span className="text-xs w-full">763 Rating</span>
                    </div>
                    </div>
                    <div className="border-primaryMain/25 border mt-4 w-full h-[0.5px] border-dashed" />
                    <div className="text-[#625D60] text-sm flex gap-2 mt-3 items-center justify-between">
                    {" "}
                    Subtotal{" "}
                    <span className="font-semibold text-[#313131]">
                        ₹265.00
                    </span>{" "}
                    </div>
                </div>
                </div>
                <div>
                <div className="rounded-lg w-full shadow-[2px_2px_20px_0px_rgba(0,0,0,0.10)] bg-white p-4 my-4">
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

        </div>
      
    </div>
  )
}
