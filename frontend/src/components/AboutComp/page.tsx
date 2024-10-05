import { forum } from "@/app/font";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export default function AboutComp({name}:{name:string}) {
  return (
    <div className="relative w-full md:h-96 h-56 backdrop-blur-sm ">
      <Image
        src="/Assests/Images/AboutUs/01.webp"
        alt="No Preview"
        fill
        objectFit="cover"
      />
      <div className="h-full w-full absolute top-0 left-0 bg-black opacity-60" />
      <h1
        className={cn(
          "relative h-full w-full flex justify-center items-center text-white  text-5xl z-10",
          forum.className
        )}
      >
        {name}
      </h1>
    </div>
  );
}
