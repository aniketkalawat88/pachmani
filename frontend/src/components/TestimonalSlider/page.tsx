"use client";

import CustomHead from "@/UI/customHead";
import React from "react"; // Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import '../../app/(root)/style.css';
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
// import required modules
import { FreeMode, Navigation, Pagination } from "swiper/modules";
import TestimonalCard from "../Card/TestimonalCard/page";
import ReviewPopup from "../review-popup/page";

export default function TestimonalSlider() {
    
  const arr = [
    {
      "name": "John Doe",
      "title": "Health Enthusiast",
      "image": "https://randomuser.me/api/portraits/men/1.jpg",
      "data": "I have been using the products from Pachmarhi Ayurveda for a few months now, and I can confidently say that they are of top-notch quality. The natural ingredients used in the products have significantly improved my overall well-being. Highly recommend!"
    },
    {
      "name": "Jane Smith",
      "title": "Yoga Instructor",
      "image": "https://randomuser.me/api/portraits/women/2.jpg",
      "data": "Pachmarhi Ayurveda's products have become an essential part of my daily routine. Their quality and effectiveness are unmatched. My skin and health have never felt better."
    },
    {
      "name": "Michael Johnson",
      "title": "Fitness Trainer",
      "image": "https://randomuser.me/api/portraits/men/3.jpg",
      "data": "As a fitness trainer, I am very particular about the products I use. Pachmarhi Ayurveda has exceeded my expectations with their all-natural and effective products. I highly recommend them to anyone looking to improve their health."
    },
    {
      "name": "Emily Davis",
      "title": "Nutritionist",
      "image": "https://randomuser.me/api/portraits/women/4.jpg",
      "data": "The quality and purity of Pachmarhi Ayurveda products are impressive. As a nutritionist, I appreciate their commitment to natural ingredients. Their products have positively impacted my clients and me."
    },
    {
      "name": "Robert Brown",
      "title": "Wellness Coach",
      "image": "https://randomuser.me/api/portraits/men/5.jpg",
      "data": "I am extremely satisfied with Pachmarhi Ayurveda's products. Their attention to detail and dedication to quality make them stand out. I recommend their products to all my clients."
    },
    {
      "name": "Sophia Wilson",
      "title": "Herbalist",
      "image": "https://randomuser.me/api/portraits/women/6.jpg",
      "data": "Pachmarhi Ayurveda offers the best Ayurvedic products I have ever used. Their natural formulations are highly effective, and I have noticed significant improvements in my health since using them."
    }]
  return (
    <div>
      <CustomHead name="Testimonials" className="w-1/2" />
      <span className="text-[#4A3F3F]">What our happy Customers say</span>
      
      <div className="relative mt-6 w-full h-full">
        <div className=' w-full h-full text-3xl'>
          <button className='HomeSlidePrev text-white bg-primaryMain absolute top-1/2 -translate-y-1/2 left-0 z-10 rounded-sm hover:bg-primaryMain/80 max-sm:hidden'><FaArrowLeftLong  className="px-1.5 "/></button>
          <button className='HomeSlideNext text-white bg-primaryMain absolute top-1/2 -translate-y-1/2 right-0 z-10 rounded-sm hover:bg-primaryMain/80 max-sm:hidden'><FaArrowRightLong className="px-1.5 " /></button>
        </div>
        <Swiper
          spaceBetween={20}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination ,Navigation]}
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            700: {
              slidesPerView: 2,
            },
            1000: {
              slidesPerView: 3,
            },
          }}
          navigation={{
            prevEl: `.HomeSlidePrev`,
            nextEl: `.HomeSlideNext`,
        }}
          className="mySwiper md:h-[20rem] w-full h-[15rem] "
        >
          {arr?.map((ele, i) => (
            <SwiperSlide className='p-4'>
              <TestimonalCard key={i} val={ele} /> 
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="w-full flex justify-center mt-2">
        {/* <button className="bg-transparent text-primaryMain font-semibold border-2 border-primaryMain p-2 rounded-md mx-auto bg-white">Write Your Review</button> */}
        <ReviewPopup />
      </div>
    </div>
  );
}
