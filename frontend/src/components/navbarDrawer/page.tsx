
"use client";
import React from "react";
import { FaChevronRight } from "react-icons/fa";
import { useEffect, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import Image from 'next/image';
import { RxCross1 } from 'react-icons/rx';
import { forum } from '@/app/font';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { useRouter } from 'next/navigation';
import { logoutAsyn } from '@/redux/action/userAction';
import styles from './styles.module.css';
// import { XMarkIcon } from '@heroicons/react/24/outline'


export default function NavbarDrawer({ val }: { val: () => void }) {
  const { isAuthenticated, error, loading, user } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  function handleLogout() {
    dispatch(logoutAsyn())
    router.push("/login");
    return val;
  }
  const arr = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Hair Care",
      path: "/hairCare",
    },
    {
      name: "Health Care",
      path: "/healthCare",
    },
    {
      name: "Skin Care",
      path: "/skinCare",
    },
    {
      name: "Men's",
      path: "/mens",
    },
  ];


  const [open, setOpen] = useState(true)


  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:-translate-x-full sm:duration-700"
            >
              <div className="bg-white h-full p-6 overflow-y-scroll no-scrollbar">
                <div className="flex text-xs justify-between text-primaryMain font-normal w-full">
                  <div className="relative h-16 w-40">
                    <Image
                      src="/Assests/Images/HomeImage/logo.png"
                      alt="No Preview"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <RxCross1
                    onClick={val}
                    className="cursor-pointer md:text-2xl text-xl text-[#625D60] hover:text-primaryMain"
                  />
                </div>
                {!isAuthenticated && (
                  <div
                    className={cn(
                      "px-4 grid grid-cols-2 sm:text-lg text-base gap-6",
                      forum.className
                    )}
                  >
                    <Link
                      href={"/login"}
                      className="flex justify-center items-center border-b-[0.5px] border-b-[#D0D5DD] rounded-sm  md:p-5 sm:p-4 p-3"
                    >
                      Login
                    </Link>
                    <Link
                      href={"/sign-up"}
                      className="flex justify-center items-center border-b-[0.5px] border-b-[#D0D5DD] rounded-sm  md:p-5 sm:p-4 p-3"
                    >
                      Sign up
                    </Link>
                  </div>
                )}
                <div>
                  {isAuthenticated && user?.role == "admin" && (
                    <Link
                      href={"/admin"}
                      className={cn(
                        "flex justify-between md:p-5 p-4 hover:border-b-primaryMain border-b rounded-sm text-[#332F32] hover:text-primaryMain md:text-lg sm:text-base text-sm items-center transition-shadow font-medium"
                      )}
                      onClick={val}
                    >
                      Dashboard 
                    </Link>
                  )}
                  {arr?.map((ele, i) => (
                    <Link
                      href={ele?.path}
                      key={i}
                      className={cn(
                        "flex justify-between md:p-5 p-4 hover:border-b-primaryMain border-b rounded-sm text-[#332F32] hover:text-primaryMain md:text-lg sm:text-base text-sm items-center transition-shadow font-medium",
                        ele.path
                      )}
                      onClick={val}
                    >
                      {ele.name} <FaChevronRight />
                    </Link>
                  ))}
                  {isAuthenticated && (
                    <>
                      <Link
                        href={"/wishlist"}
                        className={cn(
                          "flex justify-between md:p-5 p-4 hover:border-b-primaryMain border-b rounded-sm text-[#332F32] hover:text-primaryMain md:text-lg sm:text-base text-sm items-center transition-shadow font-medium"
                        )}
                        onClick={val}
                      >
                        Wishlist
                        <FaChevronRight />
                      </Link>{" "}
                      <Link
                        href={"/order-detail"}
                        className={cn(
                          "flex justify-between md:p-5 p-4 hover:border-b-primaryMain border-b rounded-sm text-[#332F32] hover:text-primaryMain md:text-lg sm:text-base text-sm items-center transition-shadow font-medium"
                        )}
                        onClick={val}
                      >
                        Order
                        <FaChevronRight />
                      </Link>
                    </>
                  )}
                  {isAuthenticated && (
                    <div
                      className={cn(
                        "flex justify-between md:p-5 p-4 hover:border-b-primaryMain border-b rounded-sm text-[#332F32] hover:text-primaryMain md:text-lg sm:text-base text-sm items-center transition-shadow font-medium"
                      )}
                      onClick={() => handleLogout()}
                    >
                      Logout
                      <FaChevronRight />
                    </div>
                  )}
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  )
}





// "use client";
// import React from "react";
// import { RxCross1 } from "react-icons/rx";
// import { FaChevronRight } from "react-icons/fa";
// import Link from "next/link";
// import { cn } from "@/lib/utils";
// import { forum } from "@/app/font";
// import Image from "next/image";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "@/redux/store";
// import { logoutAsyn } from "@/redux/action/userAction";
// import { useRouter } from "next/navigation";

// export default function NavbarDrawer({ val }: { val: () => void }) {
  // const { isAuthenticated, error, loading, user } = useSelector(
  //   (state: RootState) => state.auth
  // );
  // const dispatch = useDispatch<AppDispatch>();
  // const router = useRouter();

  // function handleLogout() {
  //   dispatch(logoutAsyn())
  //   router.push("/login");
  //   return val;
  // }

  

  // const arr = [
  //   {
  //     name: "Home",
  //     path: "/",
  //   },
  //   {
  //     name: "Hair Care",
  //     path: "/hairCare",
  //   },
  //   {
  //     name: "Health Care",
  //     path: "/healthCare",
  //   },
  //   {
  //     name: "Skin Care",
  //     path: "/skinCare",
  //   },
  //   {
  //     name: "Men's",
  //     path: "/mens",
  //   },
  // ];

//   return (
    // <div className="fixed top-0 left-0 h-screen w-full z-50 bg-white/50">
    //   {/* <div className="fixed top-0 left-0 md:w-[22rem] bg-white h-full p-6">
    //     <div className="flex text-xs justify-between text-primaryMain font-normal w-full">
    //       <div className="relative h-16 w-40">
    //         <Image
    //           src="/Assests/Images/HomeImage/logo.png"
    //           alt="No Preview"
    //           fill
    //           className="object-contain"
    //         />
    //       </div>
    //       <RxCross1
    //         onClick={val}
    //         className="cursor-pointer md:text-2xl text-xl text-[#625D60] hover:text-primaryMain"
    //       />
    //     </div>
    //     {!isAuthenticated && (
    //       <div
    //         className={cn(
    //           "px-4 grid grid-cols-2 sm:text-lg text-base gap-6",
    //           forum.className
    //         )}
    //       >
    //         <Link
    //           href={"/login"}
    //           className="flex justify-center items-center border-b-[0.5px] border-b-[#D0D5DD] rounded-sm  md:p-5 sm:p-4 p-3"
    //         >
    //           Login
    //         </Link>
    //         <Link
    //           href={"/sign-up"}
    //           className="flex justify-center items-center border-b-[0.5px] border-b-[#D0D5DD] rounded-sm  md:p-5 sm:p-4 p-3"
    //         >
    //           Sign up
    //         </Link>
    //       </div>
    //     )}
    //     <div>
    //       {isAuthenticated && user?.role == "admin" && (
    //         <Link
    //           href={"/admin"}
    //           className={cn(
    //             "flex justify-between md:p-5 p-4 hover:border-b-primaryMain border-b rounded-sm text-[#332F32] hover:text-primaryMain md:text-lg sm:text-base text-sm items-center transition-shadow font-medium"
    //           )}
    //           onClick={val}
    //         >
    //           Dashboard 
    //         </Link>
    //       )}
    //       {arr?.map((ele, i) => (
    //         <Link
    //           href={ele?.path}
    //           key={i}
    //           className={cn(
    //             "flex justify-between md:p-5 p-4 hover:border-b-primaryMain border-b rounded-sm text-[#332F32] hover:text-primaryMain md:text-lg sm:text-base text-sm items-center transition-shadow font-medium",
    //             ele.path
    //           )}
    //           onClick={val}
    //         >
    //           {ele.name} <FaChevronRight />
    //         </Link>
    //       ))}
    //       {isAuthenticated && (
    //         <>
    //           <Link
    //             href={"/wishlist"}
    //             className={cn(
    //               "flex justify-between md:p-5 p-4 hover:border-b-primaryMain border-b rounded-sm text-[#332F32] hover:text-primaryMain md:text-lg sm:text-base text-sm items-center transition-shadow font-medium"
    //             )}
    //             onClick={val}
    //           >
    //             Wishlist
    //             <FaChevronRight />
    //           </Link>{" "}
    //           <Link
    //             href={"/order-detail"}
    //             className={cn(
    //               "flex justify-between md:p-5 p-4 hover:border-b-primaryMain border-b rounded-sm text-[#332F32] hover:text-primaryMain md:text-lg sm:text-base text-sm items-center transition-shadow font-medium"
    //             )}
    //             onClick={val}
    //           >
    //             Order
    //             <FaChevronRight />
    //           </Link>
    //         </>
    //       )}
    //       {isAuthenticated && (
    //         <div
    //           className={cn(
    //             "flex justify-between md:p-5 p-4 hover:border-b-primaryMain border-b rounded-sm text-[#332F32] hover:text-primaryMain md:text-lg sm:text-base text-sm items-center transition-shadow font-medium"
    //           )}
    //           onClick={() => handleLogout()}
    //         >
    //           Logout
    //           <FaChevronRight />
    //         </div>
    //       )}
    //     </div>
    //   </div> */}
    // </div>
  // );
// }
