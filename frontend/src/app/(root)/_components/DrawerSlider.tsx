"use client"

import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Keyboard, Pagination, Navigation, Autoplay } from 'swiper/modules';
import CustomHead from '@/UI/customHead';
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from 'react-icons/fa';
import Link from 'next/link';
import OurBestSellerCard from '@/components/Card/OurBestSellerCard/page';
import { Icons } from '@/app/icons';
import { lato } from '@/app/font';
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import { cn } from '@/lib/utils';
import Image from 'next/image';


export default function DrawerSlider() {
    const [isVal , setIsVal] = useState(false);
    const arr = [
        {
            img:'/Assests/Images/HomeImage/28.png',
            name:'Bhringraj Oil',
            data:'It is a long established fact that a reader will be distracted by the distracted.',
            price:450,
            rating:'4.6',
            review:43,
            title:'oil',
            page:'01'
        },
        {
            img:'/Assests/Images/HomeImage/28.png',
            name:'Black Shine Shampoo',
            data:'It is a long established fact that a reader will be distracted by the distracted.',
            price:265,
            rating:'4.6',
            review:43,
            title:'oil',
            page:'02'
        },
        {
            img:'',
            name:'Pachmarhi Hair Oil',
            data:'It is a long established fact that a reader will be distracted by the distracted.',
            price:159,
            rating:'4.6',
            review:43,
            title:'oil',
            page:'03'
        },
        {
            img:'/Assests/Images/HomeImage/28.png',
            name:'Pachmarhi Hair Oil (200ml)',
            data:'It is a long established fact that a reader will be distracted by the distracted.',
            price:300,
            rating:'4.6',
            review:43,
            title:'oil',
            page:'04'
        },
        {
            img:'/Assests/Images/HairImage/16.jpg',
            name:'Red Onion Shampoo',
            data:'It is a long established fact that a reader will be distracted by the distracted.',
            price:650,
            rating:'4.6',
            review:43,
            title:'oil',
            page:'05'
        },
    ]
  return (
    <div>
      <div className='relative h-full w-full mt-6'>
        <div className=' w-full h-full text-3xl'>
        {/* <button className='HomeSlidePrev text-primaryMain absolute top-1/2 -translate-y-1/2 -left-10 z-10'><FaChevronLeft /></button>
        <button className='HomeSlideNext text-primaryMain absolute top-1/2 -translate-y-1/2 -right-10 z-10'><FaChevronRight /></button> */}
        </div>
        <Swiper
        slidesPerView={2}
        spaceBetween={5}
        keyboard={{
          enabled: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={{
          prevEl: `.HomeSlidePrev`,
          nextEl: `.HomeSlideNext`,
      }}
      autoplay={{
        delay: 3000, // Delay between slides in milliseconds
        disableOnInteraction: false, // Continue autoplay after user interactions
      }}
      loop={true}
        modules={[Keyboard , Navigation , Autoplay]}
        className="mySwiper"
      >
        {
          arr?.map((ele,i)=>(
            <SwiperSlide key={i} className='px-2'>
                <div className='rounded-2xl shadow-[2px_2px_20px_0px_rgba(0,0,0,0.10)] my-3 overflow-auto hover:scale-105 transition-all duration-300 ease-in-out '>
                    <div className='relative h-44 w-full'>
                        <Image src="/Assests/Images/HomeImage/27.png" alt='No Preview' fill className='object-cover rounded-t-2xl' />
                        <div className="absolute top-0 right-0 p-5 cursor-pointer" onClick={()=>setIsVal(!isVal)}>{isVal ? <Icons.like /> : <Icons.notLike /> }</div>
                    </div>
                    <div className='grid p-2 gap-1'>
                    <h3 className='text-xs text-primaryMain font-medium capitalize'>{ele?.title}</h3>
                        <h2 className='text-[10px] font-medium mt-1'>{ele?.name}</h2>
                        <div className='text-[7px] text-[#313131] '>{ele?.data} </div>
                        <div className='my-2 '>
                        <div className='flex items-center gap-2'>
                            <span className='text-black font-semibold'>₹{ele?.price}</span>
                            <span className='text-[#858585] font-extralight line-through'>₹950</span>
                            <span className='text-[#858585]'>|</span>
                            <span className='text-primaryMain font-extralight '>35%</span>
                        </div>
                        <div className='flex justify-between items-center'>
                            <div className='flex gap-2 my-2.5'>
                            <span className='font-normal text-primaryMain border border-primaryMain text-xs p-0.5 rounded-xl px-2'>200ml</span>
                            <span className='font-normal text-primaryMain border border-primaryMain text-xs p-0.5 rounded-xl px-2'>400ml</span>
                            </div>
                            <div className='flex text-xs items-center gap-2 pr-3'>
                            <span className='bg-[#2D8A40] text-white p-1 px-2 font-normal rounded-full'>{ele?.rating} &#x2605;</span>
                            <span className='text-[#4A3F3F]'>{ele?.review} Rating</span>
                            </div>
                        </div>

                        </div>
                    </div>
                    <Link href={`/AllProduct/${ele?.page}`} className={cn('flex gap-2 bg-[#00AB55] w-full md:p-2.5 p-1 justify-center items-center text-lg font-medium text-white rounded-b-2xl' , lato.className)}><HiOutlineShoppingBag className='text-xl' />Add  to Cart</Link>
                </div>  
            </SwiperSlide>
          ))
        }
      </Swiper>
      </div>
    </div>
  )
}
