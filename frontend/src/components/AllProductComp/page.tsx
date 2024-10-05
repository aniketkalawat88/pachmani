import { forum } from "@/app/font";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export default function AllProductComp() {
  return (
    <div className="max-w-7xl mx-auto m-10 ">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-11">
        <div className="relative w-full md:h-96 h-44">
          <Image
            src="/Assests/Images/AboutUs/02.jpg"
            alt="No Preview"
            fill
            className="rounded-xl"
          />
        </div>
        <div className="grid gap-3">
          <h1 className={cn("text-4xl font-bold", forum.className)}>
            We Are Here With 25 Years Of Experience
          </h1>
          <h2 className="text-[#00AB55] text-3xl">About Us</h2>
          <p> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis amet dignissimos beatae iste ullam earum, odit quasi ex est nisi! Temporibus, laboriosam quo. Quae consectetur exercitationem assumenda temporibus incidunt dolorum numquam saepe!</p>
          <p> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis amet dignissimos beatae iste ullam earum, odit quasi ex est nisi! Temporibus, laboriosam quo. Quae consectetur exercitationem assumenda temporibus incidunt dolorum numquam saepe!</p>
        </div>
      </div>
    </div>
  );
}
