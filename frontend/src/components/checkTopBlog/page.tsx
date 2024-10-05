"use client";

import CustomHead from "@/UI/customHead";
import { forum } from "@/app/font";
import { cn } from "@/lib/utils";
import { Forum } from "next/font/google";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";
import api from "@/lib/axios";
import { blogs } from "@/lib/types/blogs";
import { json } from "stream/consumers";
import ItsLoader from "@/app/(root)/_components/itsLoader";

export default function CheckTopBlog() {
  const arr = ["", "", "", ""];
  const [isVal, setIsVal] = useState<blogs[]>([]);
  const [isLoader , setIsLoader] = useState(false);
 

  useEffect(() => {
    const isFetch = async () => {
      try {
        setIsLoader(true)
        const { data } = await api.get("blogs");
        setIsVal(data.data);
        setIsLoader(false)
      } catch (err) {
        console.error(err,"blog featch error");
        setIsLoader(false)
      }
    };

    isFetch()
  }, []);

  if(isLoader){
    return (
      <><ItsLoader /></>
    )
  }

   
  if (isVal.length == 0) {
    return (
      <></>
    );
  }


  

  return (
    <div className="my-10 max-w-7xl mx-auto xl:px-0 px-6">
      <CustomHead name="Check Out Our Top Blogs" className="w-1/2" />
      <div className="grid md:grid-cols-3 gap-8 max-md:hidden">
        <div className="h-[554px] col-span-1 row-span-2">
        {isVal.slice(0, 1).map((blog) => (
          <div key={blog._id} className="relative w-full md:h-full h-96 rounded-sm overflow-hidden flex items-end text-white">
            <Image
              src={"/Assests/Images/HomeImage/08.png"}
              alt="No Preview"
              fill
              objectFit="cover"
            />
            <div className="h-full w-full bg-black/60 absolute top-0 left-0" />
            <div className="relative p-6 grid gap-3">
              <h2 className={cn("text-2xl", forum.className)}>{blog.author}</h2>
              <p>{blog.title}</p>
              <Link
                href={`/blogs/${blog._id}`}
                className={cn(
                  "uppercase border-white p-2.5 border-2 rounded-md w-fit mt-8",
                  forum.className
                )}
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
        </div>
        <div className="col-span-2 grid grid-cols-2 gap-8">
          {isVal.slice(1, 5).map((blog) => (
            <div key={blog._id} className="relative w-full md:h-[260px] h-96 rounded-sm overflow-hidden flex items-end text-white">
              <Image
                src={"/Assests/Images/HomeImage/08.png"}
                alt="No Preview"
                fill
                objectFit="cover"
              />
              <div className="h-full w-full bg-black/60 absolute top-0 left-0" />
              <div className="relative p-6 grid gap-3">
                <h2 className={cn("text-2xl", forum.className)}>{blog.author}</h2>
                <p>{blog?.title}</p>
                <Link
                  href={`/blogs/${blog?._id}`}
                  className={cn(
                    "uppercase border-white p-2.5 border-2 rounded-md w-fit mt-8",
                    forum.className
                  )}
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}

        </div>
      </div>

      <div className="md:hidden inline">
        <Swiper
          slidesPerView={1.7}
          spaceBetween={8}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {isVal?.map((ele, i) => (
            <SwiperSlide key={i}>
              <div className="relative w-full md:h-[260px] sm:h-96 p-2 rounded-sm overflow-hidden flex items-end text-white">
                <Image
                  src={"/Assests/Images/HomeImage/08.png"}
                  alt="No Preview"
                  fill
                  objectFit="cover"
                />
                <div className="h-full w-full bg-black/60 absolute top-0 left-0" />
                <div className="relative grid gap-3">
                  <h2 className={cn("text-base", forum.className)}>
                    {ele?.author}
                  </h2>
                  <p className="text-xs">
                   {ele?.content}.
                  </p>
                  <Link
                    href={`/blogs/${ele?._id}`}
                    className={cn(
                      "uppercase border-white p-2 border-2 rounded-md w-full mt-4 text-sm flex justify-center items-center",
                      forum.className
                    )}
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
