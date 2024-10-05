import CustomHead from "@/UI/customHead";
import { forum } from "@/app/font";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export default function Benifit() {
  return (
    <div className="bg-[rgba(0,171,85,0.05)] py-5 md:p-0 p-6">
      <div className=" max-w-7xl py-5 mx-auto w-full h-full">
        <CustomHead name="Benefits" className="w-1/2" />
        <div className="grid md:gap-10 gap-5">
          <div className="bg-white grid md:grid-cols-5 md:w-[70%] items-start">
            <div className="relative h-52 md:col-span-2 col-span-3 w-full">
              <Image
                src="/Assests/Images/HairCardDetailImage/03.png"
                alt="No Preview"
                fill
                className="rounded-md object-cover"
              />
            </div>
            <div className="col-span-3 md:p-6 p-2 grid">
              <h1 className={cn("text-[#212B36] text-2xl", forum.className)}> 88% Natural Hair Conditioner For Dry Hair</h1>
              <p className="text-[#4A3F3F] text-sm mt-4"> It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. 
              </p>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="bg-white grid md:grid-cols-5 md:w-[70%] items-start">
                <div className="relative h-52 md:col-span-2 col-span-3">
                <Image
                    src="/Assests/Images/HairCardDetailImage/03.png"
                    alt="No Preview"
                    fill
                    className="rounded-md object-cover"
                />
                </div>
                <div className="col-span-3 md:p-6 p-2 grid gap-4">
                <h1 className={cn("text-[#212B36] text-2xl", forum.className)}> 88% Natural Hair Conditioner For Dry Hair</h1>
                <p className="text-[#4A3F3F] text-sm"> It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. 
                </p>
                </div>
            </div>

          </div>
          <div className="bg-white grid md:grid-cols-5 md:w-[70%] items-start">
            <div className="relative h-52 md:col-span-2 col-span-3">
              <Image
                src="/Assests/Images/HairCardDetailImage/03.png"
                alt="No Preview"
                fill
                className="rounded-md object-cover"
              />
            </div>
            <div className="col-span-3 md:p-6 p-2 grid gap-4">
              <h1 className={cn("text-[#212B36] text-2xl", forum.className)}> 88% Natural Hair Conditioner For Dry Hair</h1>
              <p className="text-[#4A3F3F] text-sm"> It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. 
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
