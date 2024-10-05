import CustomHead from "@/UI/customHead";
import { forum } from "@/app/font";
import { Icons } from "@/app/icons";
import { cn } from "@/lib/utils";
import React from "react";

export default function OurRecentArch() {
  const arr = [
    {
      name:'Product Purity',
      data:'100%',
      icons:Icons.purity,
    },
    {
      name:'Happy Customer',
      data:'458+',
      icons:Icons.customer,
    },
    {
      name:'Years Experience',
      data:'25+',
      icons:Icons.experience,
    },
  ]
  return (
    <div className="my-10 xl:px-0 px-6">
      <CustomHead name="Our Recent Achievements" className="w-1/3" />
      <div className="grid grid-cols-3 mt-8 xl:gap-8 lg:gap-6 sm:gap-4 gap-2">
        {
          arr?.map((ele,i) => (
          <div className="border border-primaryMain w-full rounded grid justify-items-center sm:gap-4 gap-2 xl:p-6 lg:p-5 md:p-4 sm:p-3 p-1 relative">
            <div className="absolute -top-5 bg-white shadow sm:p-1.5 p-1 rounded-full"><ele.icons className="p-0.5 md:scale-105 sm:scale-100 scale-90" /></div>
            <h1 className="xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl text-xs max-sm:mt-4 font-bold text-primaryMain">{ele?.data}</h1>
            <h3 className="xl:text-3xl lg:text-2xl md:text-xl sm:text-base text-[8px] text-[#333333] font-bold">{ele?.name}</h3>
          </div>
          ))
        }
      </div>
    </div>
  );
}
