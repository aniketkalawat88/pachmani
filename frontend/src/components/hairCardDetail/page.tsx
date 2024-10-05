// "use client";

// import CustomHead from "@/UI/customHead";
// import { forum, lato } from "@/app/font";
// import { cn } from "@/lib/utils";
// import CardDetailSlider from "@/slider/CardDetailSlider/page";
// import { MdOutlineShoppingBag } from "react-icons/md";
// import { MdOutlineShoppingCart } from "react-icons/md";
// import { Lato } from "next/font/google";
// import React, { useState } from "react";
// import { AddressFormModal } from "../AddressModal/page";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";

// import { Button } from "@/components/ui/button";

// export default function HairCareDetail() {
//   const [isModal, setIsModal] = useState(false);
//   return (
//     <>
//       <div>
//         <div>
//           <CustomHead name="Hair Care" className="w-10/12" />
//           <div className=" grid md:grid-cols-2 gap-8 grid-cols-1">
//             <div className="md:h-[485px] border-2 border-[#00AB55] w-full h-52">
//               {/* <CardDetailSlider /> */}
//             </div>
//             <div className="grid md:gap-0 gap-3">
//               <h1 className={cn("md:text-5xl text-3xl", forum.className)}>
//                 Bhringraj Oil
//               </h1>
//               <div className="text-xs text-[#00AB55]">4.6 &#9733; (43)</div>
//               <p className="md:text-2xl text-sm text-[#4A3F3F] ">
//                 It is a long established fact that a reader will be distracted
//                 by the readable content of a page when looking at its layout. 
//               </p>
//               <h2 className={cn("md:text-3xl text-xl", forum.className)}>
//                 MRP{" "}
//                 <span className={cn("font-normal", lato.className)}>
//                   {" "}
//                   ₹100.00
//                 </span>
//               </h2>
//               <p className="md:text-sm text-xs text-[#4A3F3F]">
//                 (incl. off all taxes)
//               </p>
//               <h4 className="md:text-2xl text-lg text-[#4A3F3F]">
//                 Available in : (Net Quantity)
//               </h4>
//               <div className="flex md:gap-8 gap-2">
//                 <span className="rounded-full flex justify-center items-center md:text-lg md:h-14 md:w-14 h-10 w-10  hover:bg-[#00AB55] hover:text-white text-[#00AB55] border-[#00AB55] border-[1px]">
//                   8g
//                 </span>
//                 <span className="rounded-full flex justify-center items-center md:text-lg md:h-14 md:w-14 h-10 w-10  hover:bg-[#00AB55] hover:text-white text-[#00AB55] border-[#00AB55] border-[1px]">
//                   25g
//                 </span>
//                 <span className="rounded-full flex justify-center items-center md:text-lg md:h-14 md:w-14 h-10 w-10  hover:bg-[#00AB55] hover:text-white text-[#00AB55] border-[#00AB55] border-[1px]">
//                   50g
//                 </span>
//               </div>

//               <AlertDialog>
//                 <div className="grid md:grid-cols-2 md:gap-8 gap-3">
//                   <AlertDialogTrigger asChild>
//                     {/* <Button variant="outline">Show Dialog</Button> */}
//                     <Button className="flex gap-3 p-3  bg-whitejustify-center items-center hover:bg-[#00A958] md:text-xl text-sm font-medium hover:text-white text-[#00A958] border-[#00A958] border-2 rounded-md md:h-12 h-8">
//                       <MdOutlineShoppingBag /> Buy Now
//                     </Button>
//                   </AlertDialogTrigger>
//                   <AlertDialogContent>
//                     <AlertDialogHeader>
//                       <AlertDialogTitle>
//                       Add Address
//                       </AlertDialogTitle>
//                       <AlertDialogDescription>
//                         <AddressFormModal />
//                       </AlertDialogDescription>
//                     </AlertDialogHeader>
//                   </AlertDialogContent>

//                   <button className="flex gap-3 p-3 justify-center items-center hover:bg-[#00A958] md:text-xl text-sm font-medium hover:text-white text-[#00A958] border-[#00A958] border-2 rounded-md md:h-12 h-8">
//                     <MdOutlineShoppingCart /> Add to Cart
//                   </button>
//                 </div>
//               </AlertDialog>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page