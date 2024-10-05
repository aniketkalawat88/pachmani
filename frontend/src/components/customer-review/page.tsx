"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import { Keyboard, Pagination, Navigation } from "swiper/modules";
import CustomHead from "@/UI/customHead";
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa";
import VideoCard from "../Card/videoCard/page";

export default function CustomerReview() {
  const arr = ["", "", "", "", "", "", ""];
  return (
    <div className="my-10">
      <CustomHead name="OUR CUSTOMERS REVIEW" className="w-9/12" />
        <div className="relative h-full w-full">
          <div className=" w-full h-full text-3xl">
            <button className="HomeSlidePrevVideo text-primaryMain absolute top-1/2 -translate-y-1/2 -left-10 z-10">
              <FaChevronLeft />
            </button>
            <button className="HomeSlideNextVideo text-primaryMain absolute top-1/2 -translate-y-1/2 -right-10 z-10">
              <FaChevronRight />
            </button>
          </div>
          <Swiper
            slidesPerView={5}
            spaceBetween={12}
            keyboard={{
              enabled: true,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={{
              prevEl: `.HomeSlidePrevVideo`,
              nextEl: `.HomeSlideNextVideo`,
            }}
            loop={true}
            modules={[Keyboard, Navigation]}
            className="mySwiper"
          >
            {arr?.map((ele, i) => (
              <SwiperSlide key={i} className="px-2">
                <VideoCard />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
    </div>
  );
}
