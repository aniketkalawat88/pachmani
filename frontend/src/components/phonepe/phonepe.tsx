import api from "@/lib/axios";
import { RootState } from "@/redux/store";
import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";

// Define interface for the props
interface PhonePayProps {
  shippingAddress: number;
}

// Extend the Window interface for Razorpay
declare global {
  interface Window {
    Razorpay: any;
  }
}

const loadRazorpayScript = (src: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

const PhonePay = ({ shippingAddress }: { shippingAddress: number }) => {
  const { cartItems, loading } = useSelector(
    (state: RootState) => state.addToCart
  );

  const calculateTotalPayable = (): number => {
    return cartItems?.reduce((acc, item) => {
      const quantity = item.quantity;
      return acc + quantity * item.variant.priceAfterDiscount;
    }, 0);
  };

  const checkoutHandler = async (amount: number) => {
    const res = await loadRazorpayScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const {
      data: { order },
    } = await api.post("order/checkout", {
      amount,
    });

    const options = {
      key: "rzp_test_tGN5HF7JdjxxRb",
      amount: order.amount,
      currency: "INR",
      name: "Your Company Name",
      description: "Purchase Description",
      image: "https://avatars.githubusercontent.com/u/25058652?v=4",
      order_id: order.id,
      callback_url: `${process.env.NEXT_PUBLIC_URL}/api/order/paymentverification/${shippingAddress}`,
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    const razor = new window.Razorpay(options);
    razor.open();
  };

  return (
    <div className="bg-primaryMain text-white cursor-pointer p-2 rounded-sm flex justify-center"
      onClick={() => {
        if (shippingAddress == -1) {
          alert("Please select a shipping address");
        } else {
          checkoutHandler(parseFloat(calculateTotalPayable().toFixed(0)) + 100);
        }
      }}
    >
      Pay Now
    </div>
  );
};
export default PhonePay;
