"use client";

import api from "@/lib/axios";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Categories() {
  const [data, setData] = useState({
    haircare: 0,
    skincare: 0,
    healthcare: 0,
    mens: 0,
  });
  const [loading, setLoading] = useState(false);
  const isFetch = async () => {
    try {
      setLoading(true);
      const res = await api.post("/product/category-item-counts");
      // console.log(data, "wert");
      setData({...data,...res.data.data});
      setLoading(false);
    } catch (err) {
      console.log(err, "error");
      setLoading(false);
    }
  };
  useEffect(() => {
    isFetch();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="w-8 h-8 animate-spin" />
      </div>
    )
  ;
  }

  const arr = [
    {
      name: "Haircare",
      product: data?.haircare,
      img: "/Assests/Images/HomeImage/05.png",
      path: "hairCare",
      link: "/admin/add-banners/haircare",
    },
    {
      name: "skincare",
      product: data?.skincare,
      img: "/Assests/Images/HomeImage/Skincare.png",
      path: "skincare",
      link: "/admin/add-banners/skinecare",
    },
    {
      name: "Healthcare",
      product: data?.healthcare,
      img: "/Assests/Images/HomeImage/07.png",
      path: "healthcare",
      link: "/admin/add-banners/healthcare",
    },
    {
      name: "Men's",
      product: data?.mens,
      img: "/Assests/Images/HomeImage/men.png",
      path: "mens",
      link: "/admin/add-banners/mens",
    },
    // {
    //   name: "Bestseller",
    //   product: "30",
    //   img: "/Assests/Images/HomeImage/09.png",
    //   path: "",
    // },
  ];
  return (
    <div className="grid grid-cols-2 gap-6">
      {arr?.map((ele, i) => (
        <div className="grid grid-cols-2 bg-white p-2 rounded-xl">
          <div className="h-auto w-full relative rounded-xl overflow-hidden">
            <Image
              src={ele?.img}
              alt="No Preview"
              fill
              className="object-cover"
            />
            <div className="bg-black/50 h-full w-full absolute top-0 left-0" />
            <Link
              href={ele?.link}
              className="absolute w-full text-primaryMain font-medium text-sm bg-white border border-primaryMain bottom-0 text-center rounded-b-xl p-1"
            >
              Add Banner
            </Link>
          </div>
          <div className="p-4">
            <h1 className="text-xl font-medium">{ele?.name}</h1>
            <div className="text-[#332F32] font-normal mt-2">
              Totals Product - {ele?.product}
            </div>
            <Link href={"/admin/add-product"}>
              <button className="bg-primaryMain p-2 text-white rounded-sm w-full mt-4">
                Add Product
              </button>
            </Link>
            <Link href={`/admin/product/${ele?.path}`}>
              <button className="text-primaryMain p-2 rounded-sm block w-full">
                View all Product
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
