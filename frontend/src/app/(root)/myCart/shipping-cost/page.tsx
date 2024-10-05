"use client";
import CustomHead from "@/UI/customHead";
import CheckOutCartItems from "@/components/cartDrawer/cheackOut/page";
import PhonePay from "@/components/phonepe/phonepe";
import { Address } from "@/lib/types/address";
import {
  addAddress,
  deleteAddress,
  getAddress,
  updateAddress,
} from "@/redux/action/addressAction";
import { AppDispatch, RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "lucide-react";
import Link from "next/link";
import { RxCross2 } from "react-icons/rx";
import ItsLoader from "../../_components/itsLoader";

export default function ShippingCost() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, address } = useSelector(
    (state: RootState) => state.address
  );

  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState<number>(-1);

  const {
    register,
    handleSubmit,
    formState,
    reset,
    formState: { errors },
  } = useForm<Address>();

  useEffect(() => {
    dispatch(getAddress());
  }, [dispatch]);

  const onSubmit: SubmitHandler<Address> = (data) => {
    const addressData: Address = {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      mobile: data.mobile,
      pincode: data.pincode,
      city: data.city,
      street: data.street,
      zip: data.zip,
      state: data.state,
      address: data.address,
    };

    if (isEditing && editIndex !== null) {
      dispatch(updateAddress(editIndex, addressData));
      setIsEditing(false);
      setEditIndex(null);
    } else {
      dispatch(addAddress(addressData));
    }
    dispatch(getAddress());
    reset({
      firstname: "",
      lastname: "",
      email: "",
      mobile: "",
      pincode: "",
      city: "",
      street: "",
      zip: "",
      state: "",
      address: "",
    });
  };

  const handleDelete = (index: number) => {
    dispatch(deleteAddress(index));
  };

  const handleEdit = (index: number) => {
    setIsEditing(true);
    setEditIndex(index);
    if (address && address[index]) {
      reset(address[index]);
    }
  };

  const handleSelectAddress = (index: number) => {
    setSelectedAddressIndex(index);
  };

  const handelResetForm = () => {
    setIsEditing(false);
    setEditIndex(null);
    setSelectedAddressIndex(-1);
    reset({
      firstname: "",
      lastname: "",
      email: "",
      mobile: "",
      pincode: "",
      city: "",
      street: "",
      zip: "",
      state: "",
      address: "",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        
        <ItsLoader />
      </div>
    );
  }

  return (
    <div className="shadow-[2px_2px_20px_0px_rgba(0,0,0,0.10)] grid md:grid-cols-5 p-6 gap-12">
      <div className="md:col-span-3">
        <div>
          <div className="flex items-center w-full justify-between">
            <CustomHead name="Sign in or Checkout as guest" className="w-1/2" />
            <button
              onClick={handelResetForm}
              className="text-primaryMain font-medium"
            >
              Add Address
            </button>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid md:grid-cols-2 gap-6"
          >
            <div>
              <h3 className="text-sm text-[#332F32] font-medium">First Name</h3>
              <input
                type="text"
                {...register("firstname", { required: true })}
                className="border border-[#625D60] outline-none p-2.5 rounded-lg w-full mt-1.5"
                placeholder="Please Enter Your First Name"
              />
              {errors.firstname && (
                <p className="text-red-500 text-xs">First name is required</p>
              )}
            </div>
            <div>
              <h3 className="text-sm text-[#332F32] font-medium">Last Name</h3>
              <input
                type="text"
                {...register("lastname", { required: true })}
                className="border border-[#625D60] outline-none p-2.5 rounded-lg w-full mt-1.5"
                placeholder="Please Enter Your Last Name"
              />
              {errors.lastname && (
                <p className="text-red-500 text-xs">Last name is required</p>
              )}
            </div>
            <div>
              <h3 className="text-sm text-[#332F32] font-medium">
                Mobile Number
              </h3>
              <input
                type="number"
                {...register("mobile", { required: true })}
                className="border border-[#625D60] outline-none p-2.5 rounded-lg w-full mt-1.5"
                placeholder="Please Enter Your Mobile Number"
              />
              {errors.mobile && (
                <p className="text-red-500 text-xs">
                  Mobile number is required
                </p>
              )}
            </div>
            <div>
              <h3 className="text-sm text-[#332F32] font-medium">Email</h3>
              <input
                type="email"
                {...register("email", { required: true })}
                className="border border-[#625D60] outline-none p-2.5 rounded-lg w-full mt-1.5"
                placeholder="Please Enter Your Email"
              />
              {errors.email && (
                <p className="text-red-500 text-xs">Email is required</p>
              )}
            </div>
            <div>
              <h3 className="text-sm text-[#332F32] font-medium">Pincode</h3>
              <input
                type="number"
                {...register("pincode", { required: true })}
                className="border border-[#625D60] outline-none p-2.5 rounded-lg w-full mt-1.5"
                placeholder="Please Enter Your Pincode"
              />
              {errors.pincode && (
                <p className="text-red-500 text-xs">Pincode is required</p>
              )}
            </div>
            <div>
              <h3 className="text-sm text-[#332F32] font-medium">City</h3>
              <input
                type="text"
                {...register("city", { required: true })}
                className="border border-[#625D60] outline-none p-2.5 rounded-lg w-full mt-1.5"
                placeholder="Please Enter Your City"
              />
              {errors.city && (
                <p className="text-red-500 text-xs">City is required</p>
              )}
            </div>
            <div>
              <h3 className="text-sm text-[#332F32] font-medium">street</h3>
              <input
                type="text"
                {...register("street", { required: true })}
                className="border border-[#625D60] outline-none p-2.5 rounded-lg w-full mt-1.5"
                placeholder="Please Enter Your street"
              />
              {errors.street && (
                <p className="text-red-500 text-xs">street is required</p>
              )}
            </div>
            <div>
              <h3 className="text-sm text-[#332F32] font-medium">zip</h3>
              <input
                type="text"
                {...register("zip", { required: true })}
                className="border border-[#625D60] outline-none p-2.5 rounded-lg w-full mt-1.5"
                placeholder="Please Enter Your zip"
              />
              {errors.zip && (
                <p className="text-red-500 text-xs">zip is required</p>
              )}
            </div>
            <div className="md:col-span-2">
              <h3 className="text-sm text-[#332F32] font-medium">State</h3>
              <input
                type="text"
                {...register("state", { required: true })}
                className="border border-[#625D60] outline-none p-2.5 rounded-lg w-full mt-1.5"
                placeholder="Please Enter Your State"
              />
              {errors.state && (
                <p className="text-red-500 text-xs">State is required</p>
              )}
            </div>
            <div className="md:col-span-2">
              <h3 className="text-sm text-[#332F32] font-medium">Address</h3>
              <textarea
                {...register("address", { required: true })}
                className="border border-[#625D60] outline-none p-2.5 rounded-lg w-full mt-1.5 resize-none"
                placeholder="Please Enter Your Address"
              />
              {errors.address && (
                <p className="text-red-500 text-xs">Address is required</p>
              )}
            </div>
            <button
              type="submit"
              className="w-fit p-2 text-xl font-medium rounded-sm bg-primaryMain text-white cursor-pointer"
            >
              Submit
            </button>
          </form>
          <div className="space-y-2 grid grid-cols-2 items-center gap-12 w-full mt-4 ">
            {address?.map((addr, index) => (
              <div
                key={index}
                className=" flex justify-between shadow-[2px_2px_20px_0px_rgba(0,0,0,0.10)] p-4 rounded"
              >
                <div className="flex gap-6" onClick={() => handleEdit(index)}>
                  <input
                    type="radio"
                    id={`address_${index}`}
                    name="selectedAddress"
                    checked={selectedAddressIndex === index}
                    onChange={() => handleSelectAddress(index)}
                  />
                  <label htmlFor={`address_${index}`}>
                    <p className="text-[#332F32] text-sm">
                      Deliver to : {addr.firstname + " " + addr.lastname}
                    </p>
                    <p className="text-sm text-[#625D60] my-1">
                      {addr.address}
                    </p>
                    <p className="text-[#332F32] text-sm font-medium">
                      {addr.pincode}
                    </p>
                  </label>
                </div>
                <button
                  onClick={() => handleDelete(index)}
                  className="h-full flex items-center"
                >
                  <RxCross2 />
                </button>
                {/* <button onClick={() => handleEdit(index)}>Edit</button> */}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="md:col-span-2">
        <CheckOutCartItems></CheckOutCartItems>
        <PhonePay shippingAddress={selectedAddressIndex}></PhonePay>
        <Link
          href={"/AllProduct"}
          className="text-primaryMain  p-2 w-full flex justify-center items-center cursor-pointer mt-2"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
