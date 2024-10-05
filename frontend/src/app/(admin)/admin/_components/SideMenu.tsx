"use client";

import { cn } from "@/lib/utils";
import { logoutAsyn } from "@/redux/action/userAction";
import { AppDispatch, RootState } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoIosLogOut } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

export default function SideMenu() {
  const dispatch = useDispatch<AppDispatch>();
  const path = usePathname();
  const router = useRouter();
  const [bannerDropdown, setBannerDropdown] = useState(false);

  const {isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  const handelLogout = async () => {
    dispatch(logoutAsyn());
    router.push("/login");
  };
  const arr = [
    {
      name: "Dashboard",
      icon: "",
      path: "/admin",
    },
    {
      name: "Order",
      icon: "",
      path: "/admin/orders",
    },
    {
      name: "Leads",
      icon: "",
      path: "/admin/contact-us",
    },
    {
      name: "Add Product",
      icon: "",
      path: "/admin/add-product",
    },
    {
      name: "Category",
      icon: "",
      path: "/admin/categories",
    },
    {
      name: "Blogs",
      path: "/admin/blogs",
    },
    {
      name: "Add Banners",
      icon: "",
      path: "/admin/add-banners",
    },
    {
      name: "Add Faq",
      icon: "",
      path: "/admin/faq",
    },
  ];

  const handleBannerClick = () => {
    setBannerDropdown(!bannerDropdown);
  };

  return (
    <div className="p-4">
      <div className="relative h-16 w-40 ">
        <Image
          src="/Assests/Images/HomeImage/logo.png"
          alt="No Preview"
          fill
          className="object-contain"
        />
      </div>
      <div className="mt-6 flex flex-col gap-1 h-[75vh]">
        {arr?.map((ele, i) =>
          // ele.dropdown ? (
          //   <div key={i}>
          //     <div
          //       className={cn(
          //         "p-3 hover:bg-primaryMain hover:text-white rounded-sm cursor-pointer block",
          //         bannerDropdown ? "bg-primaryMain text-white" : ""
          //       )}
          //       onClick={handleBannerClick}
          //     >
          //       {ele.name}
          //     </div>
          //     {bannerDropdown && (
          //       <div className="ml-4">
          //         {ele.dropdown.map((item, j) => (
          //           <Link
          //             href={item.path}
          //             key={j}
          //             className={cn(
          //               "p-2 text-primaryMain rounded-sm cursor-pointer block hover:underline",
          //               item.path === path ? "underline " : ""
          //             )}
          //           >
          //             {item.name}
          //           </Link>
          //         ))}
          //       </div>
          //     )}
          //   </div>
          // ) : (

            <Link
              href={ele.path}
              key={i}
              className={cn(
                "p-3 hover:bg-primaryMain hover:text-white rounded-sm cursor-pointer block",
                ele.path === path ? "bg-primaryMain text-white" : ""
              )}
            >
              {ele.name}
            </Link>
          // )
        )}
      </div>
      {/* <span className="h-full w-full p-4 cursor-pointer text-gray-600 hover:text-black flex items-center gap-2" onClick={handelLogout}>Logout <IoIosLogOut /></span> */}
    </div>
  );
}
