import { forum } from "@/app/font";
import { Icons } from "@/app/icons";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <div className=" mt-10 relative w-full bg-[#EEEDEC] text-[#212B36] md:p-10 sm:p-8 p-4">
        <Image src='/Assests/Images/HomeImage/footer.png' alt="No Preview" fill className=" bg-cover max-sm:hidden w-full"/>
        <div className=" md:py-10 grid xl:grid-cols-4 md:gap-16 gap-5 mx-auto max-w-7xl relative z-20 grid-cols-1 p-4 md:p-0 items-start sm:mb-4 mb-10">
            <div className="p-2 grid md:gap-6 gap-3">
                <div className="relative h-11 w-24 ml-2">
                <Image
                    src="/Assests/Images/HomeImage/logo.png"
                    alt="No Preview"
                    fill
                    className="object-contain scale-125"
                />
                </div>
                <p className="max-sm:hidden">
                We manufacture 100 % effective ayurvedic medicine which is ISO, GMB and other Government certified license
                </p>
            </div>
            <div className="list-none grid md:gap-6 gap-3 items-start">
                <h1 className={cn("text-3xl", forum.className)}>Quick Link</h1>
                <div className="grid grid-cols-2 md:text-base text-sm">
                    <div className="grid gap-4">
                        <Link href={'/'} className="cursor-pointer hover:text-primaryMain">Home</Link>
                        <Link href={'/hairCare'} className="cursor-pointer hover:text-primaryMain">Haircare</Link>
                        <Link href={'/skinCare'} className="cursor-pointer hover:text-primaryMain">Skincare</Link>
                        <Link href={'/mens'} className="cursor-pointer hover:text-primaryMain">Men's</Link>
                    </div>
                    <div className="grid gap-4">
                        <li className="cursor-pointer hover:text-primaryMain">Health Care</li>
                        <Link href={'/AllProduct'} className="cursor-pointer hover:text-primaryMain">All Products</Link>
                        <Link href={'/AboutUs'} className="cursor-pointer hover:text-primaryMain">About Us</Link>
                        <Link href={'/ContactUs'} className="cursor-pointer hover:text-primaryMain">Contact Us</Link>
                    </div>
                </div>
            </div>
            <div className="list-none grid md:gap-6 gap-3 md:text-base text-sm">
                <h1 className={cn("text-3xl", forum.className)}>Help & Guide</h1>
                <div className="grid gap-4">
                    <Link href={'/terms-and-condition'} className="hover:text-primaryMain">Term and Condition</Link>
                    <Link href={'/privacy-policy'} className="hover:text-primaryMain">Privacy Policy</Link>
                    <Link href={'/shipping-and-delivery'} className="hover:text-primaryMain">Shipping and Delivery</Link>
                    <Link href={'/refund-and-cancellation'} className="hover:text-primaryMain">Refund & Cancellation</Link>
                </div>
            </div>
            <div className="list-none grid md:gap-6 gap-3">
                <h1 className={cn("text-3xl", forum.className)}>Reservation</h1>
                <div className="flex items-center md:gap-6 gap-2">
                    <div className=" border-[1px] rounded-full border-black p-2"><Icons.call /></div>
                    <div className="grid gap-2">
                        <Link href={'tel:+91 89890 91645'} className="text-sm md:text-[1rem] hover:text-primaryMain">+91 89890 91645</Link>
                        <Link href={'tel:+91 94256 62832'} className="text-sm md:text-[1rem] hover:text-primaryMain">+91 94256 62832</Link>
                    </div>
                </div>
                <div className="flex items-center md:gap-6 gap-2">
                    <div className=" border-[1px] rounded-full border-black p-2"><Icons.message /></div>
                    <Link href={'mailto:pachmarhiayurveda@gmail.com'} className="text-sm md:text-[1rem] hover:text-primaryMain">pachmarhiayurveda@gmail.com</Link>
                </div>
                <div className="flex items-center md:gap-6 gap-2">
                    <div className=" border-[1px] rounded-full border-black p-2"><Icons.location /></div>
                    <span  className="text-sm md:text-[1rem] hover:text-primaryMain cursor-pointer">Arvind Mark, Main Market, Madhya Pradesh</span>
                </div>
            </div>
        </div>
        <div className="absolute bottom-0 xl:right-28 md:right-20 flex-wrap sm:right-10  flex max-sm:justify-center md:gap-6 gap-2 sm:p-8 max-sm:w-full max-sm:left-0 p-4 max-sm:pt-44">
            <div className="w-full h-[2px] bg-[#5B7700] sm:hidden "></div>
            <Icons.fb className="hover:transition-transform cursor-pointer" />
            <Icons.insta className="hover:transition-transform cursor-pointer" />
            <Icons.twit className="hover:transition-transform cursor-pointer" />
        </div>
    </div>
  );
}
