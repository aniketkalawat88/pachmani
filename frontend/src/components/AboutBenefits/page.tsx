"use client"

import { forum, opensans, soureSerif } from "@/app/font";
import { cn } from "@/lib/utils";
import React from "react";
import CountUp from "react-countup";

export default function AboutBenefits() {
  return (
    <div className="bg-[#257c51] text-white text-center md:h-[450px] md:p-0 p-6">
      <h1 className="md:text-4xl text-2xl text-center md:p-5 md:pt-14">
        Benefit From Choosing The Best
      </h1>
      <h3 className={cn("md:text-3xl text-2xl my-5", forum.className)}>
        Our Recent Achievements
      </h3>
      <div className="grid md:grid-cols-4 md:gap-10 gap-4 md:h-44 h-full max-w-7xl  mx-auto  ">
        <div className="bg-white text-black flex flex-col justify-center items-center md:gap-3 gap-2 rounded-lg">
          <div className={cn("md:text-3xl text-2xl", soureSerif.className)}>
          <CountUp end={25} enableScrollSpy/>
          </div>
          <div className={cn("md:text-2xl text-xl", opensans.className)}>
            Years Experience
          </div>
        </div>
        <div className="bg-white text-black flex flex-col justify-center items-center md:gap-3 gap-2 rounded-lg">
          <div className={cn("md:text-3xl text-2xl", soureSerif.className)}>
          <CountUp end={5000} enableScrollSpy/>
          </div>
          <div className={cn("md:text-2xl text-xl", opensans.className)}>
            Happy Customers
          </div>
        </div>
        <div className="bg-white text-black flex flex-col justify-center items-center md:gap-3 gap-2 rounded-lg">
          <div className={cn("md:text-3xl text-2xl", soureSerif.className)}>
          <CountUp end={800} enableScrollSpy/> +
          </div>
          <div className={cn("md:text-2xl text-xl", opensans.className)}>
            Products
          </div>
        </div>
        <div className="bg-white text-black flex flex-col justify-center items-center md:gap-3 gap-2 rounded-lg">
          <div className={cn("md:text-3xl text-2xl", soureSerif.className)}>
          <CountUp end={100} enableScrollSpy/>%
          
          </div>
          <div className={cn("md:text-2xl text-xl", opensans.className)}>
            Product Purity
          </div>
        </div>
      </div>
    </div>
  );
}
