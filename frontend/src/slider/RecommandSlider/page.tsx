"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs, Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";

export default function RecommandSlider() {
  const arr = ["01.png", "01.png", "01.png", "01.png", "01.png"];
  return (
    <div className="h-96 w-full">
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        centeredSlides={true}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper2 h-full w-full"
      >
        {arr.map((ele, i) => (
          <SwiperSlide>
            <div className=" grid items-center shadow-xl h-80 border-2 w-full mt-10 group">
              <div className="relative h-52 w-full ">
                <Image
                  src="/Assests/Images/HairImage/01.png"
                  alt="No Preview"
                  fill
                  className="object-cover"
                />
              </div>
              <div className=" grid justify-items-center gap-2">
                <h6 className="uppercase">Bhringraj Oil</h6>
                <div className="text-[#00AB55]">4.3 &#9733; (26)</div>
                <div className="text-[#212f28]">₹445.00</div>
              </div>
              <button className="bg-primaryMain text-white p-2 opacity-0 group-hover:opacity-100">Add to bag</button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
