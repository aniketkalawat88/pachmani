"use client";
import CustomHead from "@/UI/customHead";
import { forum, lato } from "@/app/font";
import ClinicallyTested from "@/components/ClinicallyTested/page";
import FAQ from "@/components/FAQ/page";
import HomeSlideCard from "@/components/HomeSliderComp/HomeSlideCard/page";
import Review from "@/components/Review/page";
import YouMayAlsoLike from "@/components/YouMayAlsoLike/page";
import Banner from "@/components/banner/page";
import Benifit from "@/components/benefit/page";
import OurCertification from "@/components/ourCertification/page";
import { cn } from "@/lib/utils";
import CardDetailSlider from "@/slider/CardDetailSlider/page";
import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { MdOutlineShoppingBag, MdOutlineShoppingCart } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper/modules";
import Image from "next/image";
import OurIngradient from "@/components/ourIngradient/page";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import api from "@/lib/axios";
import { Loader, Loader2 } from "lucide-react";
import { IProduct } from "@/lib/types/products";
import { addItemToCart } from "@/redux/slice/addToCartSlice";
import { addToCartAsync } from "@/redux/action/addTocartAction";
import { AddressFormModal } from "@/components/AddressModal/page";
import { CheckoutModal } from "../../_components/CheckoutModal";
import ItsLoader from "../../_components/itsLoader";
import TestimonalSlider from "@/components/TestimonalSlider/page";

export default function page({ params }: { params: { id: string } }) {
  const [isQuant, setIsQuant] = useState("");
  interface Price {
    priceAfterDiscount: string;
    price: string;
    discount: number;
    stock: number;
  }

  const [sPrice, setPrice] = useState<Price>({
    priceAfterDiscount: "0.00",
    price: "0.00",
    discount: 0,
    stock: 0,
  });
  const [product, setProduct] = useState<IProduct>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [address, setAddress] = useState<any>(null);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [isAddressOpen, setIsAddressOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const {
    cartItems,
    loading: loading2,
    error: error2,
  } = useSelector((state: RootState) => state.addToCart);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get(`product/${params.id}`);
        setProduct(data.product);
        console.log(data.product.ingredients[0].image,"wertyuioiuyg")
        const defaultVariant = data.product.variants[0];
        setPrice({
          priceAfterDiscount: defaultVariant.priceAfterDiscount.toFixed(2),
          price: defaultVariant.price.toFixed(2),
          discount: defaultVariant.discount.toFixed(2),
          stock: defaultVariant.stock,
        });
        setIsQuant(defaultVariant._id);
        setLoading(false);
      } catch (error: any) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
    return () => {};
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <ItsLoader />
      </div>
    );
  }

  const filteredImages = (product?.images ?? []).filter(
    (img): img is { fileId: string; url: string } => img !== undefined
  );

  const handleAddressSubmit = (data: any) => {
    setAddress(data);
    setIsAddressOpen(false);
    setIsCheckoutOpen(true);
  };

  const selectedVariant = product?.variants.find(
    (variant) => variant._id === isQuant
  );

  return (
    <div>
      {product && (
        <div>
          <div className="max-w-7xl mx-auto w-full h-full md:p-2 p-6">
            <div>
              <div>
                <CustomHead name={product?.category + ""} className="w-10/12" />
                <div className=" grid md:grid-cols-7 md:gap-8 sm:gap-6 gap-4 grid-cols-1">
                  <div className="col-span-3 w-full rounded-md overflow-hidden">
                    <div className="h-full w-full">
                      {filteredImages.length > 0 && (
                        <CardDetailSlider imgArr={filteredImages} />
                      )}
                    </div>
                  </div>
                  <div className="grid col-span-4 md:w-[90%] w-full">
                    <h1
                      className={cn(
                        "md:text-[2.5rem] text-3xl",
                        forum.className
                      )}
                    >
                      {product?.productName + ""}
                    </h1>
                    <div className="text-xs text-[#00AB55] mt-3">
                      4.3 &#9733; ({product?.reviews?.length})
                    </div>
                    <p className="md:text-xl text-sm text-[#4A3F3F] mt-2">
                      {product?.description + ""}
                    </p>
                    <h2
                      className={cn(
                        "md:text-[1.75rem] text-xl md:mt-6 sm:mt-4 mt-2 flex gap-4 items-center",
                        forum.className
                      )}
                    >
                      MRP
                      <span
                        className={cn(
                          "font-normal md:text-[2rem] sm:text-[1.5rem] text-base", 
                          lato.className
                        )}
                      >
                        ₹ {sPrice?.priceAfterDiscount}
                      </span>
                      <span className="text-base">({sPrice?.stock})</span>
                      {sPrice?.discount > 0 && (
                        <>
                          <span className={cn("font-normal text-[1rem] line-through",lato.className )}>  ₹{sPrice?.price + ""}</span>
                          <span
                            className={cn(
                              "font-normal text-[1rem] ",
                              lato.className
                            )}
                          >
                            {sPrice?.discount + ""}%
                          </span>
                        </>
                      )}
                    </h2>
                    <p className="md:text-sm text-xs text-[#4A3F3F] mt-2">
                      (incl. off all taxes)
                    </p>
                    <h4 className="xl:text-xl md:text-lg sm:text-base text-sm text-[#4A3F3F] md:mt-6 sm:mt-4 mt-2">
                      Available in : (Net Quantity)
                    </h4>
                    <div className="flex md:gap-8 gap-2 md:mt-4 mt-2">
                      {product.variants.map(
                        (
                          {
                            packSize,
                            price,
                            priceAfterDiscount,
                            discount,
                            unit,
                            stock,
                            _id,
                          },
                          i
                        ) => (
                          <span
                            key={i}
                            className={cn(
                              "rounded-full flex justify-center items-center md:text-base md:h-14 md:w-14 h-12 w-12 cursor-pointer hover:bg-[#00AB55] hover:text-white text-[#00AB55] border-[#00AB55] border-[1px] md:p-2.5 sm:p-2 p-1.5 text-sm ",
                              isQuant === _id ? "text-white bg-primaryMain" : ""
                            )}
                            onClick={() => {
                              setPrice({
                                priceAfterDiscount:
                                  priceAfterDiscount?.toFixed(2) ??
                                  price.toFixed(2),
                                  price: price.toFixed(2),
                                  discount: discount,
                                  stock: stock,
                              });
                              setIsQuant(_id);
                            }}
                          >
                            {packSize + ""}
                            {unit + ""}
                          </span>
                        )
                      )}
                    </div>
                    {selectedVariant?.stock === 0 ? (
                      <div className="md:text-2xl sm:text-xl text-lg text-red-600 font-bold">
                        Out Of Stock
                      </div>
                    ) : (
                      <AlertDialog>
                        <div className="grid md:grid-cols-2 md:gap-8 gap-3 md:mt-8 sm:mt-6 mt-4">
                          <AlertDialogTrigger asChild>
                            <Button className="flex gap-3 p-3 bg-white justify-center items-center hover:bg-[#00A958] md:text-xl text-sm font-medium hover:text-white text-[#00A958] border-[#00A958] border-2 rounded-md md:h-12 h-8">
                              <MdOutlineShoppingBag /> Buy Now
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-center w-full">Add Address</AlertDialogTitle>
                              <AlertDialogDescription>
                                <AddressFormModal
                                  onClose={() => () => {}}
                                  onSubmit={handleAddressSubmit}
                                />
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                          </AlertDialogContent>

                          <button
                            onClick={() =>
                              dispatch(
                                addToCartAsync({
                                  productId: product._id,
                                  variantId: isQuant,
                                  quantity: 1,
                                  _id: undefined,
                                  variant: undefined,
                                  product: undefined,
                                })
                              )
                            }
                            className={cn(
                              "flex gap-3 p-3 justify-center items-center bg-primaryMain md:text-xl text-sm font-medium text-white border-[#00A958] border-2 rounded-md md:h-12 h-8"
                            )}
                          >
                            {loading2 && (
                              <Loader2 className="w-4 h-4 animate-spin"></Loader2>
                            )}
                            <MdOutlineShoppingCart /> Add to Cart
                          </button>
                        </div>
                      </AlertDialog>
                    )}
                  </div>

                  
                </div>
              </div>
            </div>
            <ClinicallyTested howToUse={product?.howToUse} highLight={product?.highlights} />
            {/* <ClinicallyTested howToUse={product?.howToUse} highLight={product?.highlights} ingradient={product?.ingredients} /> */}
          </div>
          <div className="md:my-10 sm:my-8 my-6 max-w-7xl mx-auto w-full h-full xl:px-0 px-6">
            <CustomHead name="Ingredients" className="w-11/12" /> 
            <div className="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 md:gap-x-8 md:gap-y-5 sm:gap-3 gap-2">
              { (product?.ingredients || []).map((ele, i) => (
                <div className="grid gap-1 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.07)]  items-center rounded-md p-4 border-[#00AB5533] border">
                  <div className="relative h-20">
                    <Image
                      src={ele?.image.url}
                      alt="No Preview"
                      fill
                      layout="fill"
                      objectFit="contain"
                      className=" md:scale-110 sm:scale-100 scale-100 bg-white rounded-sm drop-shadow-[0px_1px_1px_0px_rgba(0,0,0,0.15)]"
                    />
                    {/* <div className=" h-full w-[60%] rounded-full mx-auto shadow-[0px_1px_1px_0px_rgba(0,0,0,0.15)]" /> */}
                  </div>
                  {/* <div className="capitalize md:text-xl sm:text-lg text-base font-normal text-center">{ele?.name}</div> */}
                </div>
              ))}
            </div>

          </div>

          {/* <OurIngradient /> */}
          {/* <Benifit /> */}
          <div className="max-w-7xl mx-auto w-full h-full md:p-0 p-6">
            {/* <OurCertification /> */}
            <YouMayAlsoLike />
            {/* <Review /> */}
            <TestimonalSlider />
            <FAQ />
          </div>
        </div>
      )}
      {product && (
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          product={product}
          variantId={isQuant}
          address={address}
          price={sPrice}
          isPaymentLoading={isPaymentLoading}
          onUpdateQuantity={setQuantity}
        />
      )}
    </div>
  );
}
