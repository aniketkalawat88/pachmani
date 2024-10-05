"use client"

import { opensans } from "@/app/font";
import { Icons } from "@/app/icons";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { MdAddShoppingCart } from "react-icons/md";

interface CardProps {
  ele: {
    img:string,
    name:string,
    data:string,
    price:number,
    rating:string,
    review:number,
    title:string,
  };
  key:number
}

export default function HairCareCard({ ele , key}: CardProps) {
    const [isVal , setIsVal] = useState(false);
    
  return (
    <div className="border-[#00AB55] border-2 grid md:gap-2 rounded-sm shadow-[0px_4px_16px_0px_rgba(0,171,85,0.25)]">
      <div className="md:p-4 md:px-12 px-5 relative p-1">
        <div className="relative w-full h-44 ">
          <Image src={ele?.img === "" ? "/Assests/Images/no-image.jpg" : ele?.img} alt="No Preview" fill objectFit="contain" />
        </div>
        <div className="absolute top-0 right-0 p-5" onClick={()=>setIsVal(!isVal)}>{isVal ? <Icons.like /> : <Icons.notLike /> }</div>
      </div>
      <div className="text-[#00AB55] text-xs flex justify-between font-medium md:p-2 p-2">
        <h6 className="uppercase">{ele?.title}</h6>
        <div>{ele?.rating} &#9733; ({ele?.review})</div>
      </div>
      <div className="grid md:gap-4 gap-2 md:p-2 p-1">
        <h2 className="text-xl font-medium">{ele?.name}</h2>
        <p className="text-[#4A3F3F] text-sm md:text-lg">
          {ele?.data}
        </p>
        <h1 className={cn("text-xl", opensans.className)}>₹ {ele?.price}</h1>
      </div>
      <Link href={'/hairCare/hairCareDetail'}>
      <button className="md:text-xl text-lg bg-[#00AB55] text-white md:p-3 p-1 flex justify-center items-center gap-2 w-full">
        <MdAddShoppingCart /> Add to Cart
      </button>
      </Link>
    </div>
  );
}
