"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "../../app/(root)/style.css";
import { Pagination } from "swiper/modules";
import HomeSlideCard from "./HomeSlideCard/page";
import { Carousel } from "@/lib/types/banner";
import useFetchCarousel from "@/redux/action/bannerAction";

interface HomeSliderCompProps {
  pageName: string;
}

const HomeSliderComp: React.FC<HomeSliderCompProps> = ({ pageName }) => {
  /* TODO */ 
  const { carousels, loading, error } = useFetchCarousel(pageName);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Check initial window size

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full ">
      <Swiper
        pagination={{
          dynamicBullets: true,
          el: ".swiper-pagination.custom-pagination",
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {carousels &&
          carousels.map((carousel, i) => (
            <SwiperSlide key={i}>
              <HomeSlideCard img={isMobile ? carousel.mobileUrl : carousel.desktopUrl} />
            </SwiperSlide>
          ))}
        <div className="swiper-pagination custom-pagination"></div>
      </Swiper>
    </div>
  );
};

export default HomeSliderComp;
