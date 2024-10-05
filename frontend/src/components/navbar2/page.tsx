"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Navbar2() {
  const pathname = usePathname();
  const arr = [
    {
      name: "Home",
      page: "/",
    },
    {
      name: "Haircare",
      page: "/hairCare",
    },
    {
      name: "Healthcare",
      page: "/healthCare",
    },
    {
      name: "Skincare",
      page: "/skinCare",
    },
    {
      name: "Men's",
      page: "/mens",
    },
    {
      name: "All Products",
      page: "/AllProduct",
    },
    {
      name: "Contact Us",
      page: "/ContactUs",
    },
  ];
  return (
    <div className=" border-t-[1px] border-[#00AB55] bg-white z-40 shadow-md py-5 max-md:hidden">
      <div className="list-none md:flex hidden justify-between text-xl md:py-5 font-medium text-[#000000] mx-auto max-w-7xl h-full xl:p-0 px-6 max-md:text-base">
        {arr?.map((ele, i) => (
          <Link href={ele?.page}>
            <li
              className={cn(
                `hover:text-[#00AB55] cursor-pointer group `,
                pathname === ele?.page ? "text-[#00AB55]" : ""
              )}
            >
              {ele?.name}
              <div
                className={cn(
                  `h-[1px] bg-primaryMain w-0 group-hover:w-full transition-all duration-300 ease-linear `,
                  pathname === ele?.page ? "w-full" : ""
                )}
              />
            </li>
          </Link>
        ))}
      </div>
    </div>
  );
}
