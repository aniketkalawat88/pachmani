"use client";
import CustomHead from "@/UI/customHead";
import { forum } from "@/app/font";
import { Icons } from "@/app/icons";
import ApplyCart from "@/components/ApplyCart/page";
import { cn } from "@/lib/utils";
import { getAllCartItemsAsync } from "@/redux/action/addTocartAction";
import { AppDispatch, RootState } from "@/redux/store";
import RecommandSlider from "@/slider/RecommandSlider/page";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

export default function MyCartCard() {


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

  const arr = ["", ""];
  return (
    <div className="grid md:grid-cols-3 gap-10 h-auto xl:p-0 p-4">
      <div className="md:col-span-2 flex flex-col gap-5 h-full w-full ">
        <div className=" grid gap-2">
          {arr?.map((ele, i) => (
            <div className="grid md:grid-cols-7 grid-cols-6 items-center md:gap-3 gap-1 rounded-md md:p-4 p-1 shadow-[2px_2px_20px_0px_rgba(0,0,0,0.10)]">
              <div className="md:col-span-2 col-span-2 flex items-start">
                <div className="relative w-full md:h-32 h-44 ">
                  <Image
                    src="/Assests/Images/HomeImage/27.png"
                    alt="No Preview"
                    fill
                    className=" object-cover rounded-sm"
                  />
                </div>
              </div>

              <div className="md:col-span-4 col-span-3 gap-2">
                <h1 className="md:text-base text-sm font-medium text-black">
                  Black Shine Shampoo
                </h1>
                <p className="md:text-sm text-xs text-[#625D60] my-2">
                  It is a long established fact that a reader will be distracted
                  by the{" "}
                </p>
                <div className="grid md:grid-cols-3 items-center">
                  <div className="text-primaryMain flex border border-primaryMain items-center justify-around rounded-[2px] w-[50%] md:text-sm text-xs">
                    <h4 onClick={handleDec} className="cursor-pointer">
                      <AiOutlineMinus />{" "}
                    </h4>
                    <h4>{isSet}</h4>
                    <h4 onClick={handleInce} className="cursor-pointer">
                      <AiOutlinePlus />{" "}
                    </h4>
                  </div>
                  <div className="text-xs flex items-center gap-1 md:gap-2 p-1  text-ternary-main md:mt-2 mt-1">
                    <span className="bg-[#2D8A40] text-white px-2 md:py-0.5 max-md:flex max-md:justify-center items-center text-[0.625rem] rounded-full">
                      4.5 &#9733;
                    </span>
                    <span className="md:text-xs text-[10px]">763 Review</span>
                  </div>
                </div>
                <div className="border-primaryMain/25 border md:mt-4 mt-2 w-full h-[0.5px] border-dashed" />
                <div className="text-[#625D60] text-sm flex gap-2 md:mt-3 mt-1 items-center justify-between">
                  {" "}
                  Subtotal{" "}
                  <span className="font-semibold text-[#313131]">
                    ₹265.00
                  </span>{" "}
                </div>
              </div>
              <div className="h-full w-full flex justify-end p-2 md:pt-6">
                <Icons.delete />
              </div>
            </div>
          ))}
        </div>

        <div className="h-full w-full">
          <CustomHead name="Recommendations" className="w-1/2" />
          {/* <RecommandSlider /> */}
        </div>
      </div>
      <div className="col-span-1">
        <ApplyCart />
      </div>
    </div>
  );
}
