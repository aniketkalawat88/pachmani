"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { motion } from "framer-motion";
import { AiOutlineMinus, AiOutlinePlus, AiOutlineRight } from "react-icons/ai";
import { Icons } from "@/app/icons";
import CustomHead from "@/UI/customHead";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCartItemsAsync,
  removeFromCartAsync,
  updateCartAsync,
} from "@/redux/action/addTocartAction";
import Link from "next/link";
import PaymentButton from "@/components/phonepe/phonepe";

export default function CheckOutCartItems() {
  const dispatch = useDispatch<AppDispatch>();
  const [quantityMap, setQuantityMap] = useState<{ [id: string]: number }>({});
  const { cartItems, loading, error } = useSelector(
    (state: RootState) => state.addToCart
  );

  useEffect(() => {
    dispatch(getAllCartItemsAsync());
  }, [dispatch]);

  const DELIVERY_CHARGE = 100;

  const handleDelete = (id: string) => {
    dispatch(removeFromCartAsync(id));
  };

  const handleIncrement = (id: string) => {
    setQuantityMap((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  const handleDecrement = (id: string) => {
    setQuantityMap((prev) => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1,
    }));
  };

  const calculateTotal = () => {
    return cartItems?.reduce((acc, item) => {
      const quantity = quantityMap[item._id] || item.quantity;
      return acc + quantity * item.variant.price;
    }, 0);
  };

  useEffect(() => {
    const updatedCartItems = cartItems.map((item) => ({
      ...item,
      quantity: quantityMap[item._id] || item.quantity,
    }));
    dispatch(updateCartAsync(updatedCartItems));
  }, [dispatch, quantityMap]);

  const calculateDiscount = () => {
    return cartItems?.reduce((acc, item) => {
      const quantity = quantityMap[item._id] || item.quantity;
      return (
        acc + quantity * (item.variant.price - item.variant.priceAfterDiscount)
      );
    }, 0);
  };

  const calculateTotalPayable = () => {
    return (
      cartItems?.reduce((acc, item) => {
        const quantity = quantityMap[item._id] || item.quantity;
        return acc + quantity * item.variant.priceAfterDiscount;
      }, 0) + DELIVERY_CHARGE
    );
  };

  const calculateSavings = () => {
    return cartItems?.reduce((acc, item) => {
      const quantity = quantityMap[item._id] || item.quantity;
      return (
        acc + quantity * (item.variant.price - item.variant.priceAfterDiscount)
      );
    }, 0);
  };

  return (
    <>
      <div>
        <div className="flex text-xs text-center items-center gap-5 p-3 text-primaryMain font-normal shadow-lg w-full mb-4">
          <h1 className="text-center w-full">
            {" "}
            {cartItems?.length || 0} Items in your bag
          </h1>
        </div>
        <div className="grid gap-4 ">
          {cartItems && cartItems.length > 0 ? (
            cartItems?.map(({ _id, product, variant, quantity }, i) => (
              <div
                key={i}
                className="grid md:grid-cols-7 grid-cols-1 items-center gap-2 shadow-[2px_2px_20px_0px_rgba(0,0,0,0.10)]  p-3 rounded-md"
              >
                <div className="md:col-span-3">
                  <div className="relative w-full md:h-28">
                    <Image
                      src="/Assests/Images/HomeImage/27.png"
                      alt="No Preview"
                      fill
                      className="md:object-contain object-cover rounded-sm scale-105"
                    />
                  </div>
                </div>

                <div className="md:col-span-4 grid gap-1">
                  <h1 className="text-base font-semibold">
                    {product.productName}
                  </h1>
                  <p className="text-xs text-ternary-main truncate">
                    {product.description}
                  </p>
                  <div className="text-xs flex items-center gap-1 text-ternary-main mt-2">
                    {" "}
                    <span className="bg-[#2D8A40] text-white px-1.5 py-0.5 text-[0.625rem] rounded-full">
                      4.5 &#9733;
                    </span>{" "}
                    763 Rating
                  </div>
                  <h2>₹ {variant.price}</h2>
                </div>
                <div className="col-span-7 grid grid-cols-7">
                  <div className="col-span-3">
                    <div className="text-primaryMain flex border border-primaryMain items-center justify-around rounded-&#91;2px] mt-3 md:w-[55%] text-sm mx-auto">
                      <h4
                        onClick={() => handleDecrement(_id)}
                        className="cursor-pointer"
                      >
                        <AiOutlineMinus />
                      </h4>
                      <h4>{quantityMap[_id] || quantity}</h4>
                      <h4
                        onClick={() => handleIncrement(_id)}
                        className="cursor-pointer"
                      >
                        <AiOutlinePlus />
                      </h4>
                    </div>
                  </div>
                  <div className="col-span-4">
                    <div className="border-primaryMain/25 border  w-full h-[0.5px] border-dashed" />
                    <div className="text-[#625D60] text-sm flex gap-2 mt-3 items-center justify-between">
                      <span className="flex gap-2">
                        Subtotal
                        <span className="font-semibold text-[#313131]">
                          ₹ {calculateTotal().toFixed(2)}
                        </span>
                      </span>
                      {/* <Icons.delete /> */}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>No items in the cart.</div>
          )}
        </div>
        <div className="rounded-lg w-full shadow-[2px_2px_20px_0px_rgba(0,0,0,0.10)] bg-white p-4 my-4">
          <h1 className="text-[#332F32] text-base font-bold">Payment detail</h1>
          <div className="text-sm grid gap-1 mt-4">
            <div className="flex justify-between text-[#625D60] font-medium">
              MRP Total{" "}
              <span className="text-[#332F32] font-semibold">
                ₹ {calculateTotal().toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-[#625D60] font-medium">
              Discount
              <span className="text-[#332F32] font-semibold">
                ₹ {calculateDiscount().toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-[#625D60] font-medium">
              Delivery charge
              <span className="text-[#332F32] font-semibold">
                ₹ {DELIVERY_CHARGE.toFixed(2)}
              </span>
            </div>
            {/* <div className="flex justify-between text-[#625D60] font-medium">
              Promo Code
              <span className="text-[#332F32] font-semibold">₹ 0.00</span>
            </div>
            <div className="flex justify-between text-[#625D60] font-medium">
              Delivery charge
              <span className="text-[#332F32] font-semibold">₹ 0.00</span>
            </div>
            <div className="border-primaryMain/25 border  w-full h-[0.5px] border-dashed" /> */}

            <div className="flex justify-between text-primaryMain">
              Total Payable
              <span className="font-semibold">
                ₹{calculateTotalPayable().toFixed(2)}
              </span>
            </div>
            <p className="text-xs font-normal text-[#625D60] mt-1">
              You are save ₹ {calculateDiscount().toFixed(2)}
            </p>
          </div>
        </div>
        {/* <PaymentButton></PaymentButton> */}
      </div>
    </>
  );
}
