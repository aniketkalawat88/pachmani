"use client"

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import './styles.css';

// import required modules
import { Autoplay, Pagination } from 'swiper/modules';
import Image from 'next/image';

interface imageProps {
  img :string
}

export default function LeftSlider({img} :  imageProps) {
    const arr = ["",""]
  return (
      
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        spaceBetween={10}
        modules={[Pagination , Autoplay]}
        className="mySwiper h-full w-[80%] mx-auto"
      >
        {
          arr?.map((ele,i)=>(
            <SwiperSlide key={i} className='relative h-full w-full bg-[#D9D9D9] rounded-3xl'>
                    <Image src={img} alt='No Preview' className='object-cover rounded-2xl' fill />

            </SwiperSlide>
          ))
        }
      </Swiper>
  )
}
