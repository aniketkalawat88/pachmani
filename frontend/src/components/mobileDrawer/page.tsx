import Link from "next/link";
import React from "react";

export default function MobileDrawer() {
  return (
    <div className="border-2 list-none text-xl bg-[#00AB55] text-white grid gap-2 md:hidden ">
      <Link href="/">
        <li className="cursor-pointer hover:bg-white hover:text-[#00AB55] p-2">
          Home
        </li>
      </Link>
      <Link href="/hairCare">
        <li className="cursor-pointer hover:bg-white hover:text-[#00AB55] p-2">
          Hair Care
        </li>
      </Link>
      <Link href="/skinCare">
        <li className="cursor-pointer hover:bg-white hover:text-[#00AB55] p-2">
          SkinCare
        </li>
      </Link>
      <Link href="/mens">
        <li className="cursor-pointer hover:bg-white hover:text-[#00AB55] p-2">
          Men's
        </li>
      </Link>
      <Link href="/AllProduct">
        <li className="cursor-pointer hover:bg-white hover:text-[#00AB55] p-2">
          All Product
        </li>
      </Link>
      <Link href="/AboutUs">
        <li className="cursor-pointer hover:bg-white hover:text-[#00AB55] p-2">
          About us
        </li>
      </Link>
      <li className="cursor-pointer hover:bg-white hover:text-[#00AB55] p-2">
        <Link href="/ContactUs">Contact us</Link>
      </li>
    </div>
  );
}
