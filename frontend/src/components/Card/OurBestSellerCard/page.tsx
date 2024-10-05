"use client";
import { lato } from "@/app/font";
import { Icons } from "@/app/icons";
import api from "@/lib/axios";
import { IProduct } from "@/lib/types/products";
import { cn } from "@/lib/utils";
import { RootState } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { useSelector } from "react-redux";

export default function OurBestSellerCard({ product }: { product: IProduct }) {
  const {isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const [loading, setLoading] = useState(false);
  const [isLiked , setIsLiked] = useState(false);
  
  const toggleWishlist = async (_id: any) => {
    if (!isAuthenticated || loading) return;
    setLoading(true);
    try {
       const { data } =  await api.post(`/product/wishlist/${_id}`);
      //  console.log(data)
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Error updating wishlist", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    setIsLiked(product.isLiked)
  },[product])

  return (
    <div className="rounded-2xl shadow-[2px_2px_20px_0px_rgba(0,0,0,0.10)] my-3 overflow-auto hover:scale-105 transition-all duration-300 ease-in-out ">
      <div className="relative md:h-52 sm:h-44 h-40 w-full">
        <Image
          src={product?.thumbnail?.url ?? ""}
          alt="No Preview"
          fill
          className="object-cover rounded-t-2xl"
        />
        {isAuthenticated && (
          <div
            className="absolute top-0 right-0 p-5 cursor-pointer"
            onClick={() => toggleWishlist(product._id  )}
            // onClick={toggleWishlist}
          >
            <> {isLiked ? <Icons.like /> : <Icons.notLike />}</>
          </div>
        )}
      </div>
      <div className="grid p-2 gap-1 min-h-44">
        <h3 className="text-xs text-primaryMain font-medium capitalize">
          {product?.category}
        </h3>
        <h2 className="text-base font-medium mt-1"> {product?.productName} </h2>
        <div className="md:text-sm text-xs text-[#313131] truncate ">
          {product?.description}
        </div>
        <div className="md:my-2 my-1 ">
          <div className="flex items-center md:gap-2 gap-1">
            <span className="text-black font-semibold">
              ₹{product?.variants[0]?.priceAfterDiscount?.toFixed(2)}
            </span>
            {product?.variants[0]?.discount > 0  && (
              <>
                <span className="text-[hsl(0,0%,52%)] font-extralight line-through">
                  ₹{product?.variants[0]?.price?.toFixed(2)}
                </span>
                <span className="text-[#858585]">|</span>
                <span className="text-primaryMain font-extralight">
                  {product?.variants[0]?.discount}%
                </span>
              </>
            )}
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-2 my-2.5 max-sm:overflow-x-scroll no-scrollbar max-md:w-28">
              {product?.variants?.map(({ price }, i) => (
                <span className="font-normal text-primaryMain border border-primaryMain text-xs p-0.5 rounded-xl px-2">
                  {price}ml
                </span>
              ))}
            </div>
            <div className="flex md:text-xs text-[10px] items-center md:gap-2 md:pr-3">
              <span className="bg-[#2D8A40] text-white p-1 px-2 font-normal rounded-full">
                2.5 &#x2605;
              </span>
              <span className="text-[#4A3F3F]">Rating</span>
            </div>
          </div>
        </div>
      </div>
      <Link
        href={`/AllProduct/${product?._id}`}
        className={cn(
          "flex gap-2 bg-[#00AB55] w-full md:p-2.5 p-1.5 justify-center items-center md:text-lg text-base font-medium text-white rounded-b-2xl",
          lato.className
        )}
      >
        <HiOutlineShoppingBag className="text-xl" />
        Add to Cart
      </Link>
    </div>
  );
}
