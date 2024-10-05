"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Navigation, Autoplay } from "swiper/modules";
import CustomHead from "@/UI/customHead";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getHomeCart } from "@/redux/action/homeProductAction";

import OurBestSellerCard from "../Card/OurBestSellerCard/page";
import { Loader } from "lucide-react";
import ItsLoader from "@/app/(root)/_components/itsLoader";
import ItsLoaderSmall from "@/app/(root)/_components/ItsLoaderSmall";

export default function OurBestSeller() {
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96 h-full w-full">
       <ItsLoaderSmall />
      </div>
    );
  }
  return (
    <div className="md:my-10 sm:my-8 my-6 w-full h-full max-w-7xl mx-auto xl:px-0 px-6">
      <div className="flex justify-between items-center">
        <CustomHead name="Our Bestsellers" className="w-2/3" />
        <Link
          href={"/our-best-seller"}
          className="md:text-xl sm:text-base text-sm text-primaryMain font-normal hover:underline transition-transform"
        >
          View More
        </Link>
      </div>
      <div className="relative h-full w-full mt-6">
        <div className=" w-full h-full text-3xl">
          {/* <button className='HomeSlidePrev text-primaryMain absolute top-1/2 -translate-y-1/2 -left-10 z-10'><FaChevronLeft /></button>
            <button className='HomeSlideNext text-primaryMain absolute top-1/2 -translate-y-1/2 -right-10 z-10'><FaChevronRight /></button> */}
        </div>
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
            delay: 3000,
            disableOnInteraction: false,
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
      </div>
    </div>
  );
}
