"use client";
import CustomHead from "@/UI/customHead";
import { lato, opensans } from "@/app/font";
import { Icons } from "@/app/icons";
import HairCareCard from "@/components/Card/HairCareCard/page";
import OurBestSellerCard from "@/components/Card/OurBestSellerCard/page";
import HairCareCompDetail from "@/components/HairComp/HairCareCompDetail/page";
import HairComp from "@/components/HairComp/page";
import HomeSlideCard from "@/components/HomeSliderComp/HomeSlideCard/page";
import HomeSliderComp from "@/components/HomeSliderComp/page";
import TestimonalSlider from "@/components/TestimonalSlider/page";
import Banner2 from "@/components/banner2/page";
import OurCertification from "@/components/ourCertification/page";
import { cn } from "@/lib/utils";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { MdAddShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { Loader } from "lucide-react";
import {  getAllMensAsyn, getAllSkincareAsyn } from "@/redux/action/productAction";
import api from "@/lib/axios";
import { addWish } from "@/redux/action/wishlistAddAction";
import ItsLoader from "../_components/itsLoader";

interface Product {
  category: string;
  description: string;
}

const skinCare = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { skincare, loading, error } = useSelector(
    (state: RootState) => state.products
  );
  const { isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const [products, setProducts] = useState(skincare.products);

  useEffect(() => {
    if (skincare.products.length == 0) dispatch(getAllSkincareAsyn({category:"skincare"}));
  }, []);

  useEffect(()=>{
    setProducts(skincare.products)
  },[skincare.products])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        
        <ItsLoader />
      </div>
    );
  }

  return (
    <div>
      <HomeSliderComp pageName="skincare"/>
      <div className="h-full max-w-7xl mx-auto md:p-0 p-6">
        <CustomHead name={"Skin Care"} className="w-10/12" />
        <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-5 my-10 p-2">
        {products?.map((product,i) => (
              <OurBestSellerCard product={product} />   
            )
          )}
        </div>
        {skincare.totalPages > 1 && Array.from(Array(skincare.totalPages).keys()).map((pageNumber) => (
          <button
            onClick={() =>
              dispatch(getAllSkincareAsyn({ page: pageNumber + 1 }))
            }
            key={pageNumber}
            style={{
              color: skincare.currentPage === pageNumber + 1 ? "red" : "black",
            }}
          >
            {pageNumber + 1}
          </button>
        ))}
        <HairCareCompDetail />
        <TestimonalSlider />
        <OurCertification />
      </div>
    </div>
  );
};

export default skinCare;
