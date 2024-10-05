"use client";
// import React from 'react'
import CustomHead from "@/UI/customHead";
import { lato, opensans } from "@/app/font";
import { Icons } from "@/app/icons";
import AllProductComp from "@/components/AllProductComp/page";
import HairCareCard from "@/components/Card/HairCareCard/page";
import OurBestSellerCard from "@/components/Card/OurBestSellerCard/page";
import Banner from "@/components/banner/page";
import api from "@/lib/axios";
import { IProduct, IProductVariant } from "@/lib/types/products";
import { cn } from "@/lib/utils";
import { getAllProductsAsyn } from "@/redux/action/productAction";
import { addWish } from "@/redux/action/wishlistAddAction";
import { AppDispatch, RootState } from "@/redux/store";
import axios from "axios";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { MdAddShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import ItsLoader from "@/app/(root)/_components/itsLoader";


export default function AllProduct() {
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  /* API CALL OF PRODUCT */
  const getAllMensAsyn = async (page: number) => {
    try {
      setLoading(true);
      const { data } = await api.get(`product?category=${params.slug}&page=${page}`);
      setProducts(data.products);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
    }
  };

  useEffect(() => {
    getAllMensAsyn(currentPage);
  }, [currentPage]);


  useEffect(() => {
    getAllMensAsyn(1);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        
        <ItsLoader />
      </div>
    );
  }

  return (
    <div className="w-full h-full max-w-7xl mx-auto xl:p-0 p-6 min-h-screen">
      <CustomHead name="All Products" className="w-10/12" />
      <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-5 my-10 p-2">
        {products.length > 0 &&
          products.map(
            ({
              productName,
              description,
              reviews,
              variants,
              _id,
              isLiked,
              thumbnail,
            }) => (
              <div className="rounded-2xl shadow-[2px_2px_20px_0px_rgba(0,0,0,0.10)] my-3 overflow-auto hover:scale-105 transition-all duration-300 ease-in-out ">
                <div className="relative md:h-52 h-44 w-full">
                  <Image
                    src={thumbnail?.url ?? ""}
                    alt="No Preview"
                    fill
                    className="object-cover rounded-t-2xl"
                  />
                  <Menu as="div" className="relative inline-block text-left float-right">
                    <div>
                      <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md  text-sm p-3 ">
                        <CiMenuKebab aria-hidden="true" className="-mr-1 h-5 w-5" />
                      </MenuButton>
                    </div>

                    <MenuItems
                      transition
                      className="absolute right-0 z-10 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in mr-4"
                    >
                      <div className="">
                        <MenuItem>
                          <Link href={`/admin/update-product/${_id}`}
                            className="block px-2 py-2 text-sm text-gray-700 data-[focus]:text-gray-900" >
                            Update
                          </Link>
                        </MenuItem>
                      </div>
                    </MenuItems>
                  </Menu>
                </div>
                <div className="grid p-2 gap-1">
                  <h3 className="text-xs text-primaryMain font-medium capitalize">
                    {productName}
                  </h3>
                  <h2 className="text-base font-medium mt-1">oil</h2>
                  <div className="md:text-sm text-xs text-[#313131] truncate">
                    {description}
                  </div>
                  <div className="my-2 ">
                    <div className="flex items-center gap-2">
                      <span className="text-black font-semibold">
                        ₹{variants[0]?.priceAfterDiscount?.toFixed(2)}
                      </span>
                      <span className="text-[hsl(0,0%,52%)] font-extralight line-through">
                        ₹{(variants[0]?.price)?.toFixed(2)}
                      </span>
                      <span className="text-[#858585]">|</span>
                      <span className="text-primaryMain font-extralight">
                        {variants[0]?.discount}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2 my-2.5">
                        {variants?.map(({ price }, i) => (
                          <span className="font-normal text-primaryMain border border-primaryMain text-xs p-0.5 rounded-xl px-2">
                            {price}ml
                          </span>
                        ))}
                      </div>
                      <div className="flex text-xs items-center gap-2 pr-3">
                        <span className="bg-[#2D8A40] text-white p-1 px-2 font-normal rounded-full">
                          2.5 &#x2605;
                        </span>
                        <span className="text-[#4A3F3F]">Rating</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <Link
                  href={`/admin/update-product/${_id}`}
                  className={cn(
                    "flex gap-2 bg-[#00AB55] w-full md:p-2.5 p-1 justify-center items-center text-lg font-medium text-white rounded-b-2xl",
                    lato.className
                  )}
                >
                  <HiOutlineShoppingBag className="text-xl" />
                  Add to Cart
                </Link> */}
              </div>
            )
          )}
      </div>
      <div className="flex justify-end mt-4 pr-6">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`mx-1 px-3 py-1 border rounded ${
              currentPage === index + 1 ? 'bg-primaryMain text-white' : 'bg-white text-black'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
