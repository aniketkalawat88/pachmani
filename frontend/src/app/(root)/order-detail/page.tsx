"use client";
import { forum } from "@/app/font";
import { Icons } from "@/app/icons";
import AboutComp from "@/components/AboutComp/page";
import api from "@/lib/axios";
import { formatMongoDate } from "@/lib/constants/dateFormatter";
import { IOrder } from "@/lib/types/order";
import { cn } from "@/lib/utils";
import { RootState } from "@/redux/store";
import CustomHead from "@/UI/customHead";
import axios from "axios";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useSelector } from "react-redux";
import ItsLoader from "../_components/itsLoader";

const OrderDetail: React.FC = () => {
  const [data, setData] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get("order");
      console.log(data.orders);
      if (data.length === 0) {
        setError("No orders found.");
      } else {
        setData(data.orders);
      }
    } catch (err) {
      setError("An error occurred while fetching orders.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <ItsLoader />
        
      </div>
    );
  }
  return (
    <div className="min-h-[50vh]">
      <AboutComp name="Orders Details" />
      <div className="max-w-7xl mx-auto w-full h-full my-10">
        <div className="grid gap-2 p-2">
          {data?.map((order) => (
            <Link
              key={order.id}
              href={`/order-detail/orders-process/${order._id}`}
              className="grid md:grid-cols-9 grid-cols-1 items-start gap-3 rounded-md p-4 shadow-[2px_2px_20px_0px_rgba(0,0,0,0.10)]"
            >
              <div className="md:col-span-2 flex items-start">
                <div className="relative w-full md:h-32 h-44">
                  <Image
                    src={order?.items[0]?.product?.thumbnail?.url ?? ""}
                    alt="No Preview"
                    fill
                    className="object-cover rounded-sm"
                  />
                </div>
              </div>

              <div className="md:col-span-3 gap-2">
                <h1 className="text-base font-medium text-black">
                  Payment Method
                  <p>{order.paymentMethod + ""}</p>
                </h1>
                <h1 className="text-base font-medium text-black">
                  Payment Status
                  <p>{order.paymentStatus}</p>
                </h1>

                <div className="grid grid-cols-2 items-center">
                  <div className="text-xs flex items-center gap-1 text-ternary-main mt-2">
                    <span className="bg-[#2D8A40] text-white px-2 py-0.5 text-[0.625rem] rounded-full">
                      4.5 &#9733;
                    </span>
                    <span className="text-xs">763 Rating</span>
                  </div>
                </div>
              </div>
              <div className="text-sm gap-2 font-semibold text-[#313131] col-span-1 mt-1">
                ₹{order.totalPrice}
              </div>
              <div className="h-full w-full col-span-3 text-[#625D60] pl-10">
                <h1 className="font-medium flex items-center gap-1">
                  <span className="h-2 w-2 bg-primaryMain rounded-full"></span>
                  Order at {formatMongoDate(order?.createdAt)}
                </h1>

                {/* TODO */}
                {/* <h1 className="font-medium flex items-center gap-1">
                  <span className="h-2 w-2 bg-primaryMain rounded-full"></span>
                  Delivered on Mon 11 Jun
                </h1> 
                */}
                <p className="text-[#625D60] text-xs my-2">
                  Your item has been delivered
                </p>
                <div className="text-primaryMain text-xs">
                  Rate & Review Product
                </div>
                <h1 className="text-base font-medium text-black">
                  Delivery status
                  <p>{order.status}</p>
                </h1>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
