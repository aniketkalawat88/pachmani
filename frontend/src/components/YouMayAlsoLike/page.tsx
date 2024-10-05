"use client"

import CustomHead from '@/UI/customHead'
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Navigation, Autoplay } from "swiper/modules";
import { getHomeCart } from '@/redux/action/homeProductAction';
import { AppDispatch, RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import OurBestSellerCard from '../Card/OurBestSellerCard/page';

export default function YouMayAlsoLike() {
  const dispatch = useDispatch<AppDispatch>();

  const { error, loading, product } = useSelector(
    (state: RootState) => state.homeProducts
  );
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [products, setProducts] = useState(product);

  useEffect(() => {
    dispatch(getHomeCart());
  }, [dispatch]);

  useEffect(() => {
    setProducts(product);
  }, [product]);

  return (
    <div>
        <CustomHead name='You may also like' className='w-11/12' />
        {/* <div className='max-w-7xl mx-auto grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-8'> */}
          
        <Swiper
          keyboard={{
            enabled: true,
          }}
          breakpoints={{
            320: {
              slidesPerView: 1.1,
              spaceBetween: 2,
            },
            600: {
              slidesPerView: 2,
              spaceBetween: 4,
            },
            900: {
              slidesPerView: 3,
              spaceBetween: 8,
            },
            1124: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
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
          modules={[Keyboard, Navigation, Autoplay]}
          className="mySwiper"
        >
          {product?.map(
            (product,i) => (
              <SwiperSlide key={i} className="px-2">
              <OurBestSellerCard product={product} />
              </SwiperSlide>
            )
          )}
        </Swiper>
        {/* </div> */}
    </div>
  )
}
