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
import {
  getAllHaircareAsyn,
  getAllMensAsyn,
  getAllProductsAsyn,
} from "@/redux/action/productAction";
import api from "@/lib/axios";
import { addWish } from "@/redux/action/wishlistAddAction";
import ItsLoader from "../_components/itsLoader";

interface Product {
  category: string;
  description: string;
}

const mens = () => {
  const [isVal, setIsVal] = useState(false);
  const [isData, setIsData] = useState<Product[]>([]);

  const dispatch = useDispatch<AppDispatch>();
  const { mens, loading, error } = useSelector(
    (state: RootState) => state.products
  );
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const [products, setProducts] = useState(mens.products);

  useEffect(() => {
    if (mens.products.length == 0)
      dispatch(getAllMensAsyn({ category: "mens" }));
  }, []);

  useEffect(() => {
    setProducts(mens.products);
  }, [mens.products]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        
        <ItsLoader />
      </div>
    );
  }

  return (
    <div>
      <HomeSliderComp pageName={"mens"} />
      <div className="h-full max-w-7xl mx-auto md:p-0 p-6">
        <CustomHead name={"Men's"} className="w-10/12" />
        <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-5 my-10 p-2">
          {products?.map((product, i) => (
            <OurBestSellerCard product={product} />
          ))}
        </div>
        {mens.totalPages > 1 &&
          Array.from(Array(mens.totalPages).keys()).map((pageNumber) => (
            <button
              onClick={() => dispatch(getAllMensAsyn({ page: pageNumber + 1 }))}
              key={pageNumber}
              style={{
                color: mens.currentPage === pageNumber + 1 ? "red" : "black",
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

export default mens;
