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
import { Loader } from "lucide-react";
import ItsLoader from "@/app/(root)/_components/itsLoader";

const DELIVERY_CHARGE = 100;

export default function CartDrawer({ val }: { val: () => void }) {
  const dispatch = useDispatch<AppDispatch>();
  const [quantityMap, setQuantityMap] = useState<{ [id: string]: number }>({});
  const { cartItems, loading, error } = useSelector(
    (state: RootState) => state.addToCart
  );

  const handleDelete = (id: string) => {
    dispatch(removeFromCartAsync(id));
  };

  useEffect(() => {
    dispatch(getAllCartItemsAsync());
  }, [dispatch]);

  const handleIncrement = (id: string) => {
    setQuantityMap((prev) => ({
      ...prev,
      [id]: (prev?.[id] || 1) + 1,
    }));
  };

  const handleDecrement = (id: string) => {
    setQuantityMap((prev) => ({
      ...prev,
      [id]: prev?.[id] > 1 ? prev?.[id] - 1 : 1,
    }));
  };

  const calculateTotal = () => {
    return cartItems?.reduce((acc, item) => {
      const quantity = quantityMap?.[item?._id] || item?.quantity;
      return acc + quantity * item?.variant?.price;
    }, 0);
  };

  useEffect(() => {
    const updatedCartItems = cartItems?.map((item) => ({
      ...item,
      quantity: quantityMap?.[item?._id] || item?.quantity,
    }));
    dispatch(updateCartAsync(updatedCartItems));
  }, [dispatch, quantityMap]);

  const calculateDiscount = () => {
    return cartItems?.reduce((acc, item) => {
      const quantity = quantityMap?.[item?._id] || item?.quantity;
      return (
        acc +
        quantity * (item?.variant?.price - item?.variant?.priceAfterDiscount)
      );
    }, 0);
  };

  const calculateTotalPayable = () => {
    return (
      cartItems?.reduce((acc, item) => {
        const quantity = quantityMap?.[item?._id] || item?.quantity;
        return acc + quantity * item?.variant?.priceAfterDiscount;
      }, 0) + DELIVERY_CHARGE
    );
  };

  const calculateSavings = () => {
    return cartItems?.reduce((acc, item) => {
      const quantity = quantityMap?.[item?._id] || item?.quantity;
      return (
        acc +
        quantity * (item?.variant?.price - item?.variant?.priceAfterDiscount)
      );
    }, 0);
  };

  return (
    <>
      <div className="fixed top-0 left-0 h-screen w-full z-50 bg-black/40">
        <motion.div
          animate={{ x: "-100" }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ duration: 1 }}
          className=""
        >
          <div
            className="h-full w-full absolute top-0 left-0 bg-black/10 backdrop-blur"
            onClick={val}
          />
          {loading ? (
            <div className="h-screen w-full flex justify-center items-center">
             <ItsLoader />

            </div>
          ) : (
            <div className="fixed top-0 right-0 md:w-[31.25rem] w-full bg-white h-full">
              <div className="bg-white shadow-xl">
                <div className="flex text-xs text-center items-center gap-5 p-3 text-primaryMain font-normal shadow-lg w-full">
                  <h1 className="text-center w-full">
                    {cartItems?.length || 0} Items in your bag
                  </h1>
                  <RxCross1
                    onClick={val}
                    className="cursor-pointer text-2xl text-[#625D60] hover:text-primaryMain"
                  />
                </div>
                {
                  cartItems?.length > 0 ?
                  <div className="h-screen overflow-y-scroll custom-y-scrollbar py-4 pb-20 flex flex-col justify-between">
                    <div className="grid gap-4 max-h-72 overflow-y-scroll">
                      {cartItems && cartItems.length > 0 ? (
                        // _id, product, variant, quantity
                        cartItems?.map((items, i) => (
                          <div
                            key={i}
                            className="grid grid-cols-7 items-center gap-2 shadow-[2px_2px_20px_0px_rgba(0,0,0,0.10)]  p-3 rounded-md"
                          >
                            <div className="col-span-3">
                              <div className="relative w-full md:h-28 h-28">
                                <Image
                                  src={items?.product?.thumbnail?.url ?? ""}
                                  alt="No Preview"
                                  fill
                                  className="md:object-contain object-cover rounded-sm scale-105"
                                />
                              </div>
                            </div>
                            <div className="col-span-4 grid gap-1">
                              <h1 className="text-base font-semibold">
                                {items?.product.productName}
                              </h1>
                              <p className="text-xs text-ternary-main truncate">
                                {items?.product.description}
                              </p>
                              <div className="text-xs flex items-center gap-1 text-ternary-main mt-2">
                                <span className="bg-[#2D8A40] text-white px-1.5 py-0.5 text-[0.625rem] rounded-full">
                                  4.5 &#9733;
                                </span>
                                763 Rating
                              </div>
                              <h2>₹ {items?.variant.price}</h2>
                            </div>
                            <div className="col-span-7 grid grid-cols-7 gap-2">
                              <div className="col-span-3">
                                <div className="text-primaryMain flex border border-primaryMain items-center justify-around rounded-[2px] mt-3 md:w-[55%] text-sm mx-auto">
                                  <h4
                                    onClick={() => handleDecrement(items?._id)}
                                    className="cursor-pointer"
                                  >
                                    <AiOutlineMinus />
                                  </h4>
                                  <h4>
                                    {quantityMap[items?._id] || items?.quantity}
                                  </h4>
                                  <h4
                                    onClick={() => handleIncrement(items?._id)}
                                    className="cursor-pointer"
                                  >
                                    <AiOutlinePlus />
                                  </h4>
                                </div>
                              </div>
                              <div className="col-span-4">
                                <div className="border-primaryMain/25 border w-full h-[0.5px] border-dashed" />
                                <div className="text-[#625D60] text-sm flex gap-2 mt-3 items-center justify-between">
                                  <span className="flex gap-2">
                                    Subtotal{" "}
                                    <span className="font-semibold text-[#313131]">
                                      ₹
                                      {(
                                        (quantityMap[items?._id] ||
                                          items?.quantity) * items?.variant.price
                                      ).toFixed(2)}
                                    </span>
                                  </span>
                                  <div
                                    className="cursor-pointer"
                                    onClick={() => handleDelete(items?._id)}
                                  >
                                    <Icons.delete />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div>No items in the cart.</div>
                      )}
                    </div>
                    {/* <div className="text-center rounded-lg text-[#332F32] font-medium cursor-pointer p-4 shadow-[2px_2px_20px_0px_rgba(0,0,0,0.10)] my-2 flex justify-between items-center">
                      <span className="flex items-center gap-2">
                        <Icons.discount /> Apply Promo code
                      </span>
                      <AiOutlineRight className="text-xl" />
                    </div> */}
                    <div>
                      <div className=" p-4 mt-2 ">
                        <div className="rounded-lg w-full shadow-[2px_2px_20px_0px_rgba(0,0,0,0.10)] bg-white p-4 my-4">
                          <h1 className="text-[#332F32] text-base font-bold">
                            Payment detail
                          </h1>
                          <div className="text-sm grid gap-1 mt-4">
                            <div className="flex justify-between text-[#625D60] font-medium">
                              MRP Total
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
                            <div className="border-primaryMain/25 border w-full h-[0.5px] border-dashed" />
                            <div className="flex justify-between text-primaryMain">
                              Total Payable
                              <span className="font-semibold">
                                ₹ {calculateTotalPayable().toFixed(2)}
                              </span>
                            </div>
                            <p className="text-xs font-normal text-[#625D60] mt-1">
                              You are saving ₹ {calculateSavings().toFixed(2)} on
                              this order
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 drop-shadow-xl bg-white rounded-md shadow-[2px_2px_20px_0px_rgba(0,0,0,0.10)]  bottom-1 md:w-[29rem] right-6">
                        <div className="flex flex-col justify-center items-center rounded-l-md">
                          <span className="text-[#625D60] text-sm">Grand Total</span>
                          <span className="text-primaryMain md:text-xl font-semibold my-1.5">
                            ₹ {calculateTotalPayable().toFixed(2)}
                          </span>
                        </div>

                        <Link
                          href={"/myCart/shipping-cost"}
                          className="text-white bg-primaryMain p-3 flex gap-2 w-full justify-center items-center font-medium rounded-r-md"
                          onClick={val}
                        >
                          <span className="md:text-xl" >Checkout</span>
                          <span className="mt-1.5">
                            <AiOutlineRight className="text-xl" />
                          </span>
                        </Link>
                      </div>

                    </div>
                  </div>
                  :
                  <div className="h-screen w-full overflow-y-scroll custom-scrollbar p-4 pb-28">
                    
                    <div className="flex justify-center items-center text-xl font-bold h-full w-full flex-col gap-3">
                      <Link href={"/"} className="relative h-16 w-40 ">
                        <Image
                          src="/Assests/Images/HomeImage/logo.png"
                          alt="No Preview"
                          fill
                          className="object-contain max-sm:scale-75"
                        />
                      </Link>
                      Your Cart Is Empty
                    </div>
                  </div>
                }
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
}
