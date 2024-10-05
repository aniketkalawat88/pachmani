// components/CheckoutModal.tsx

"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import api from "@/lib/axios";
import { cn } from "@/lib/utils";
import { forum } from "@/app/font";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: any;
  address: any;
  price: any;
  isPaymentLoading: boolean;
  onUpdateQuantity: (quantity: number) => void;
  variantId: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const loadRazorpayScript = (src: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      console.error("Razorpay SDK failed to load.");
      reject(false);
    };
    document.body.appendChild(script);
  });
};

export function CheckoutModal({
  isOpen,
  onClose,
  product,
  address,
  price,
  isPaymentLoading,
  onUpdateQuantity,
  variantId,
}: CheckoutModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const deliveryCharges = 100; // example delivery charge

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  useEffect(() => {
    onUpdateQuantity(quantity);
  }, [quantity]);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0) {
      setQuantity(newQuantity);
    }
  };

  const discountAmount = price.price - price.priceAfterDiscount;
  const totalPrice = price.priceAfterDiscount * quantity + deliveryCharges;

  const serializeQueryParams = (params: any) => {
    return Object.keys(params)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
      )
      .join("&");
  };

  const checkoutHandler = async (amount: number) => {
    try {
      const res = await loadRazorpayScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );
      if (!res) {
        setErrorMessage("Razorpay SDK failed to load. Are you online?");
        return;
      }

      const requestData = {
        productId: product._id,
        variantId,
        quantity,
        shippingAddress: JSON.stringify(address),
        amount,
      };


      const response = await api.post("/order/direct-purchase", requestData);

      const { razorpayOrderId, amount: orderAmount, currency } = response.data;

      const queryParams = serializeQueryParams({
        productId: product._id,
        variantId,
        quantity,
        shippingAddress: JSON.stringify(address),
        amount,
      });

      const options = {
        key: "rzp_test_tGN5HF7JdjxxRb",
        amount: orderAmount,
        currency: "INR",
        name: "Your Company Name",
        description: "Purchase Description",
        image: product.thumbnail.url,
        order_id: razorpayOrderId,
        callback_url: `${process.env.NEXT_PUBLIC_URL}/api/order/direct-purchase/verify?${queryParams}`,
        prefill: {
          name: `${address.firstname} ${address.lastname}`,
          email: address.email,
          contact: address.mobile,
        },
        notes: {
          address: address.address,
        },
        theme: {
          color: "#3399cc",
        },
      };

      console.log("Opening Razorpay modal with options:", options);
      const razor = new window.Razorpay(options);
      razor.open();
      onClose();
    } catch (error) {
      console.log("Order initiation failed. Please try again.", error);
      const err = error as { response?: { data?: { message?: string } } };
      const errorMsg =
        err?.response?.data?.message ||
        "Order initiation failed. Please try again.";
      setErrorMessage(errorMsg);
    }
  };

  if (!isOpen) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="w-full max-w-lg p-6 bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="w-full text-center">Checkout</AlertDialogTitle>
          <AlertDialogDescription>
            <div>
              <div className="flex items-center mb-4">
                <img
                  src={product.thumbnail.url}
                  alt={product.productName}
                  className="w-16 h-16 mr-4"
                />
                <h2 className={cn("text-xl font-bold text-black" , forum.className)}>{product.productName}</h2>
              </div>
              <p className="text-secondary-main">{product.description}</p>
              <div className="flex justify-between mt-4 text-secondary-main ">
                <span>Price:</span>
                <span className="text-black">₹{ price.priceAfterDiscount}</span>
              </div>
              <div className="flex justify-between mt-2 text-secondary-main ">
                <span>Discount:</span>
                <span className="text-black">₹{discountAmount}</span>
              </div>
              <div className="flex justify-between mt-2 text-secondary-main ">
                <span>Delivery Charges:</span>
                <span className="text-black">₹{deliveryCharges}</span>
              </div>
              <div className="flex justify-between mt-2 text-secondary-main ">
                <span>Quantity:</span>
                <div className="flex items-center border border-black rounded-sm gap-3 p-0.5 px-1">
                  <span
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="bg-transparent text-black hover:bg-transparent"
                  >
                    -
                  </span>
                  <span className="mx-2">{quantity}</span>
                  <span 
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="bg-transparent text-black hover:bg-transparent"
                  >
                    +
                  </span>
                </div>
              </div>
              <div className="flex justify-between mt-2 text-secondary-main font-semibold text-lg">
                <span>Total:</span>
                <span className="">₹{totalPrice}</span>
              </div>
              {errorMessage && (
                <div className="text-red-500 mt-2">{errorMessage}</div>
              )}
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button className="bg-primaryMain hover:bg-primaryMain text-white hover:text-white"
            onClick={() => {
              if (!address) {
                alert("Please add a shipping address");
              } else {
                checkoutHandler(totalPrice);
              }
            }}
            disabled={isPaymentLoading}
          >
            {isPaymentLoading ? "Processing..." : "Pay Now"}
          </Button>
          <AlertDialogAction asChild onClick={onClose} >
            <Button className="bg-primaryMain hover:bg-primaryMain text-white hover:text-white" variant="outline">
              Cancel
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
