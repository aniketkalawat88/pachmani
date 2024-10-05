"use client"

import CustomHead from "@/UI/customHead";
import { forum } from "@/app/font";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { FaFacebook, FaTwitterSquare, FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { motion } from "framer-motion"

export default function AboutExperts() {
  const arr = ["03.jpg", "03.jpg", "03.jpg", "03.jpg"];
  return (
    <div className="max-w-7xl mx-auto md:p-0 p-6">
      <CustomHead name="Our Experts" className="w-1/2" />
      <div className="grid md:grid-cols-4 grid-cols-1 gap-10">
        {arr?.map((ele,i)=>(
        <div className="shadow-md rounded-lg hover:shadow-green-500 cursor-pointer">
          <div className="relative h-72 w-full">
            <Image
              src="/Assests/Images/AboutUs/03.jpg"
              alt="No Preview"
              fill
              className="object-cover rounded-t-lg"
            />
          </div>
          <div className="text-center grid gap-2 my-3">
            {/* <div className="text-2xl flex text-[#00AB55] justify-center gap-3">
                <FaInstagram className="border-[1px] rounded-lg border-[#00AB55] p-1 hover:bg-[#00AB55] hover:text-white" />
                <FaTwitterSquare className="border-[1px] rounded-lg border-[#00AB55] p-1 hover:bg-[#00AB55] hover:text-white" />
                <FaFacebook className="border-[1px] rounded-lg border-[#00AB55] p-1 hover:bg-[#00AB55] hover:text-white" />
                <FaYoutube className="border-[1px] rounded-lg border-[#00AB55] p-1 hover:bg-[#00AB55] hover:text-white" />
            </div> */}
            <h1 className={cn("text-3xl", forum.className)}>John Doe</h1>
            <p>Team Leader</p>
          </div>
        </div>

        ))}
      </div>
    </div>
  );
}
