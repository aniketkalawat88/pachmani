import React from "react";
import { LuBadgePercent } from "react-icons/lu";
import { FaAngleRight } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import { forum } from "@/app/font";
import { AiOutlineRight } from "react-icons/ai";
import { Icons } from "@/app/icons";
import Link from "next/link";

export default function ApplyCart() {
  return (
    <div className="grid gap-5">
      <div className="flex justify-between items-center shadow-[2px_2px_20px_0px_rgba(0,0,0,0.10)] p-4 rounded-sm px-3">
        <div className="flex gap-2 items-center">
          <Icons.discount className="text-primaryMain"/>
          <div className="font-medium text-[#332F32]">Apply Promo code</div>
        </div>
          <AiOutlineRight className="text-xl text-[#625D60]" />
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
      <Link href={'/myCart/shipping-cost'} className="text-white bg-primaryMain w-[60%] rounded-sm p-2 text-xl font-medium flex justify-center items-center gap-2">
        checkout
        <AiOutlineRight className="text-xl" />
      </Link>
    </div>
  );
}
