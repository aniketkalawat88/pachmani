import { Icons } from "@/app/icons";
import React from "react";

export default function TopRanker() {
  const arr = [
    {
      name:'Top Rank Frams',
      icon: Icons.topRankerFrams,
    },
    {
      name:'Trusted Products',
      icon: Icons.trustedProduct,
    },
    {
      name:'Organic Certification',
      icon:Icons.organicProduct,
    },
    {
      name:'Fast Delivery',
      icon:Icons.fastDelivery,
    },
  ]
  return (
    <div className="flex justify-between overflow-hidden md:my-10 sm:my-8 my-6  md:p-0 p-3 max-w-4xl mx-auto lg:px-0 px-6 gap-4">
      {
        arr?.map((ele,i) => (
        <div className="grid justify-items-center gap-2">
            <div className="md:h-[7.5rem] md:w-[7.5rem] sm:h-[7rem] sm:w-[7rem] h-14 w-14 border border-primaryMain border-dashed flex justify-center items-center rounded-full">
              <div className="shadow-[0px_0px_10px_rgba(0,0,0,0.07)] rounded-full md:w-[6.25rem] md:h-[6.25rem] sm:h-[5.5rem] sm:w-[5.5rem] h-12 w-12 flex items-center justify-center max-sm:p-2">
               <ele.icon className="mx-auto"/>
              </div>
            </div>
          <span className="md:text-xl sm:text-base text-[10px] font-medium text-primaryMain max-sm:text-center max-sm:w-full">{ele.name}</span>
        </div>

        ))
      }
    </div>
  );
}
