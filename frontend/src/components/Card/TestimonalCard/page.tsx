import Image from "next/image";
import React from "react";

interface CardProps {
    val:{
      name: string,
      title: string,
      image: string,
      data: string,
    }
}

export default function TestimonalCard({val}:CardProps) {
  return (
    <div className="md:p-9 sm:p-5 p-3 grid gap-7 shadow-[0px_3.6px_36px_0px_rgba(0,171,85,0.08)] rounded-sm w-full h-full">
      <div className="flex gap-5 items-center">
        <div className="relative h-14 w-14">
          <Image
            src={val?.image}
            alt="No Preview"
            fill
            className="object-cover rounded-full"
          />
        </div>
        <div className="grid gap-1 ">
          <h2 className="md:text-xl sm:text-lg text-sm font-normal">{val.name}</h2>
          <h5 className="text-[#000B33] md:text-sm text-[10px]">{val.title}</h5>
        </div>
      </div>
      <div className="text-[#000B33] md:text-base sm:text-sm text-xs text-justify pb-3">{val.data}</div>
    </div>
  );
}
