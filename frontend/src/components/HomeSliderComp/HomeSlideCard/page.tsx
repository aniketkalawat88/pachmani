import { bitter, forum } from "@/app/font";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
export default function HomeSlideCard(img: { img: string }) {
  return (
    <div>
      <div className="relative w-full md:h-[29rem] h-64">
        <Image
          src={`${img.img}`}
          alt="No Preview"
          fill
          objectFit="cover"
          objectPosition="center"
          quality={90}
        />
        <div className="grid md:grid-cols-3 lg:grid-cols-2 h-full w-full max-w-7xl mx-auto items-center xl:p-0 p-6">
          <div className="relative grid md:col-span-2 lg:col-span-1 font-normal">
            <h1
              className={cn(
                "md:text-[2.5rem] sm:text-2xl text-base ",
                forum.className
              )}
            ></h1>
            <h3
              className={cn(
                "md:text-[2rem] sm:text-2xl text-base md:mt-2",
                forum.className
              )}
            ></h3>
            <p className="text-[#625D60] md:pr-32 text-xs md:text-sm md:mt-4 sm:mt-3 mt-2.5"></p>
            {/* <button className='text-[#00AB55] bg-white rounded-b-sm font-medium p-3 max-sm:p-2 border-t-[#00AB55] border-t-2 md:w-56 w-40 md:mt-56 sm:mt-44 mt-20 '>Shop Now</button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
