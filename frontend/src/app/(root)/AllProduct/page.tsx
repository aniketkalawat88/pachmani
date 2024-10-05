"use client";
// import React from 'react'
import CustomHead from "@/UI/customHead";
import OurBestSellerCard from "@/components/Card/OurBestSellerCard/page";
import { getAllProductsAsyn } from "@/redux/action/productAction";
import { AppDispatch, RootState } from "@/redux/store";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ItsLoader from "../_components/itsLoader";

export default function AllProduct() {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [product, setProducts] = useState(products.products);

  useEffect(() => {
    if (products.products.length == 0) dispatch(getAllProductsAsyn({}));
  }, []);

  useEffect(() => {
    setProducts(products.products);
  }, [products.products]);

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
        {product?.map((product, i) => (
          <OurBestSellerCard product={product} />
        ))}
      </div>
      <div className="flex">
        {products.totalPages > 1 &&
          Array.from(Array(products.totalPages).keys()).map((pageNumber , index) => (
            <button
              onClick={() =>
                dispatch(getAllProductsAsyn({ page: pageNumber + 1 }))
              }
              className={`flex items-center justify-center px-3 h-8 leading-tight border ${products.currentPage === pageNumber + 1 ? 'text-blue-600 bg-blue-50' : 'text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'}`}
              key={pageNumber}
            >
              {pageNumber + 1}
            </button>
          ))}

      </div>
    </div>
  );
}

{
  /* <div className="w-full h-full max-w-7xl mx-auto md:my-20  md:p-0 p-6 grid grid-cols-3 gap-10">
{arr2?.slice(0 , isLoad).map((ele, i) => (
  <HairCareCard key={i} ele={ele} />
))}
</div> */
}
