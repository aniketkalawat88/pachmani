"use client";

import React, { useState } from "react";
// Import Swiper React components
import { Swiper as SwiperComponent, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import Image from "next/image";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

// Import Swiper type
import { Swiper as SwiperType } from 'swiper/types';

export default function CardDetailSlider({ imgArr }: { imgArr: { fileId: string; url: string }[] }) {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleSwiper = (swiper: SwiperType) => {
    setThumbsSwiper(swiper);
  };

  const handleThumbnailClick = (index: number) => {
    setActiveIndex(index);
    if (swiper) {
      swiper.slideTo(index);
    }
  };

  return (
    <div>
      <div className="">
        <div className="mt-4 relative md:h-80 sm:h-64 h-56">
          <SwiperComponent
            spaceBetween={0}
            navigation={{
              prevEl: ".HomeSlidePrev",
              nextEl: ".HomeSlideNext",
            }}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper h-full w-full"
            onSwiper={setSwiper} // Add this
          >
            {imgArr?.map(({ url }, index) => (
              <SwiperSlide key={index} className="h-full w-full">
                <div className="h-full w-full relative">
                  <img
                    src={url}
                    alt={url}
                    className="object-cover rounded-sm w-full h-full"
                  />
                </div>
              </SwiperSlide>
            ))}
          </SwiperComponent>
        </div>
        <div className="relative w-[90%] mx-auto">
          <div className="w-full h-full text-3xl">
            <button 
              className="HomeSlidePrev text-white bg-primaryMain absolute top-1/2 -translate-y-1/2 -left-5 z-10 rounded-sm hover:bg-primaryMain/80 scale-75"
              onClick={() => swiper?.slidePrev()} // Add this
            >
              <FaArrowLeftLong className="px-1 " />
            </button>
            <button 
              className="HomeSlideNext text-white bg-primaryMain absolute top-1/2 -translate-y-1/2 -right-5 z-10 rounded-sm hover:bg-primaryMain/80 scale-75"
              onClick={() => swiper?.slideNext()} // Add this
            >
              <FaArrowRightLong className="px-1" />
            </button>
          </div>
          <SwiperComponent
            onSwiper={handleSwiper}
            direction="horizontal"
            spaceBetween={16}
            slidesPerView={3}
            modules={[FreeMode, Navigation, Thumbs]}
            navigation={{
              prevEl: `.HomeSlidePrev`,
              nextEl: `.HomeSlideNext`,
            }}
            className="mySwiper2 md:h-32 h-24 w-full mt-4"
          >
            {imgArr.map(({ url }, index) => (
              <SwiperSlide key={index} className={`h-full w-full ${activeIndex === index ? 'border-2 border-primaryMain rounded-md' : ''}`}>
                <div
                  className="h-full w-full relative cursor-pointer rounded-sm"
                  onClick={() => handleThumbnailClick(index)}
                >
                  <Image
                    src={`${url}`}
                    fill
                    alt={`Thumbnail ${index}`}
                    className="object-cover rounded-sm"
                  />
                </div>
              </SwiperSlide>
            ))}
          </SwiperComponent>
        </div>
      </div>
    </div>
  );
}
