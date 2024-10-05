"use client";
import Stepper from "@/app/(admin)/admin/_components/stepper";
import ItsLoader from "@/app/(root)/_components/itsLoader";
import { forum } from "@/app/font";
import AboutComp from "@/components/AboutComp/page";
import api from "@/lib/axios";
import { IOrder } from "@/lib/types/order";
import { cn } from "@/lib/utils";
import { RootState } from "@/redux/store";
import CustomHead from "@/UI/customHead";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import { useSelector } from "react-redux";

interface proprs {
  params: {
    id: string;
  };
}

export default function OrderProcess({ params }: proprs) {
  const [data, setData] = useState<IOrder>();

  const [currentStep, setCurrentStep] = useState(0);
  const steps: string[] = ["pending", "processing", "shipped", "delivered"];

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get<IOrder>(`order/${params.id}`);
      setData(data);
      steps.forEach((e, i) => {
        if (e == data.status) {
          setCurrentStep(i);
        }
      });
    } catch (err) {
      setError("An error occurred while fetching orders.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        
        <ItsLoader />
      </div>
    );
  }

  return (
    <div>
      <AboutComp name="Order Detail" />
      <div className="p-4 shadow-[2px_2px_20px_0px_rgba(0,0,0,0.10)] max-w-7xl mx-auto w-full h-full my-10 rounded-sm grid md:grid-cols-2">
        <div className="grid md:grid-cols-2 items-start md:border-r md:border-r-primaryMain">
          <div className="">
            <div
              className={cn(
                "md:text-2xl text-xl flex flex-col gap-0.5 w-fit capitalize",
                forum.className
              )}
            >
              Delivery Address
              <span className={cn("bg-[#00AB55] h-[3px] rounded-md w-1/2")} />
            </div>
            <h1 className="text-[#332F32] md:text-2xl sm:text-xl font-medium mt-4">
              {data?.shippingAddress?.firstname +
                " " +
                data?.shippingAddress?.lastname}
            </h1>
            <p className="text-[#625D60] text-base mt-2 font-medium">
              {data?.shippingAddress?.street +
                "," +
                data?.shippingAddress?.city +
                "," +
                data?.shippingAddress?.state}
            </p>
            <div className="mt-4">
              <h1 className="text-[#332F32] md:text-xl  font-medium">
                Phone Number
              </h1>
              <p className="text-[#625D60] text-base mt-2 font-medium">
                {data?.shippingAddress?.mobile}
              </p>
            </div>
            {/* <div className="text-primaryMain text-xl font-medium mt-2">
              Change or Add Number
            </div> */}
          </div>
          {/* <div className="">
            <button className="text-primaryMain shadow-[0px_0px_16px_0px_rgba(0,0,0,0.10)] p-2.5 w-fit px-8 rounded-sm text-xl">
              Change
            </button>
          </div> */}
        </div>
        <div className="md:px-6 max-md: mt-5">
          <div
            className={cn(
              "text-2xl flex flex-col gap-0.5 w-fit capitalize",
              forum.className
            )}
          >
            More Actions
            <span className={cn("bg-[#00AB55] h-[3px] rounded-md w-1/2")} />
          </div>
          <div className="grid grid-cols-2 items-center">
            {/* <p className="text-[#332F32] text-xl font-medium">
              Share order details
            </p>
            <div className="">
              <button className="text-primaryMain shadow-[0px_0px_16px_0px_rgba(0,0,0,0.10)] p-2.5 w-fit px-8 rounded-sm text-xl">
                Share order
              </button>
            </div> */}
          </div>
          <p className="text-[#332F32] md:text-xl sm:text-lg text-base font-medium my-1">
            Payment Method : {data?.paymentMethod}
          </p>
          <p className="text-[#332F32] md:text-xl sm:text-lg text-base font-medium my-1">
            Payment Status : {data?.paymentStatus}
          </p>
          <p className="text-[#332F32] md:text-xl sm:text-lg text-base font-medium my-1">
            Payment Delivery : {data?.status}
          </p>
          <p className="text-[#332F32] md:text-xl sm:text-lg text-base font-medium my-1">
            totalPrice : {data?.totalPrice}
          </p>
        </div>
      </div>
      <div className="md:px-0 px-3">
        {data?.items?.map((elem, index) => (
          <div
            key={index}
            className="md:p-4 p-2 shadow-[2px_2px_20px_0px_rgba(0,0,0,0.10)] max-w-7xl mx-auto w-full h-full my-10 rounded-sm grid md:grid-cols-7"
          >
            <div className="flex items-start gap-4 md:col-span-2">
              <div className="relative w-full md:h-28 sm:h-44 h-32 ">
                <Image
                  src="/Assests/Images/HomeImage/27.png"
                  alt="No Preview"
                  fill
                  className=" object-cover rounded-sm"
                />
              </div>

              <div className="">
                <h1 className="text-base text-black font-medium">
                  {elem.product.productName}
                </h1>
                <h1 className="text-base text-black font-medium my-2">
                  Qty:{elem.quantity}
                </h1>
                <p className="text-sm font-normal text-primaryMain truncate w-40">
                  {elem.product.description}
                </p>
                <div className="flex gap-3.5 items-center mt-5">
                  <span className="text-sm text-[#625D60]">Total </span>
                  <span className="text-[#313131] font-semibold">
                    ₹{data.totalPrice}
                  </span>
                </div>
              </div>
            </div>
            <div></div>
            <div className=" md:col-span-4">
              <div className="container mx-auto p-4">
                <h1 className="md:text-2xl text-xl font-bold md:mb-4 ">Order Tracking</h1>
                <Stepper currentStep={currentStep} steps={steps} />
              </div>
            </div>
            {/* <div className="h-full w-full flex items-center justify-center">
            <button className="text-primaryMain flex items-center gap-2">
              <RxCrossCircled /> Cancel
            </button>
          </div> */}
          </div>
        ))}

      </div>
    </div>
  );
}
