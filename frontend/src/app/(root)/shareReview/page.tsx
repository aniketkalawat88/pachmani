"use client"

import CustomHead from '@/UI/customHead'
import React, { useState } from 'react'

export default function ShareReview() {
    const [isPass1, setisPass1] = useState(true);
  const [isPass2, setisPass2] = useState(true);
  const [isVal, setIsVal] = useState({
    firstname: "",
    lastname: "",
    mobile: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const handleChange = (e: { target: { name: any; value: any } }) => {
    setIsVal({
      ...isVal,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(isVal);
    setIsVal({
      firstname: "",
      lastname: "",
      mobile: "",
      email: "",
      password: "",
      cpassword: "",
    });
  };
  return (
    <div className='max-w-7xl mx-auto w-full h-full my-10'>
        <div className='flex justify-center'>
            <CustomHead name='Share your review' className='w-1/2' />

        </div>
        <form
            onSubmit={handleSubmit}
            action={"/"}
            className="grid grid-cols-2 gap-6"
          >
            <div>
              <h3 className="text-sm text-[#332F32] font-medium">Full Name</h3>
              <input
                type="text"
                name="firstname"
                value={isVal.firstname}
                onChange={handleChange}
                className="border border-[#625D60] outline-none p-2.5 rounded-lg w-full mt-1.5"
                placeholder="Please Enter Your Name"
                required
              />
            </div>
            <div>
              <h3 className="text-sm text-[#332F32] font-medium">Email</h3>
              <input
                type="email"
                name="email"
                value={isVal.email}
                onChange={handleChange}
                className="border border-[#625D60] outline-none p-2.5 rounded-lg w-full mt-1.5"
                placeholder="Please Enter Your Email"
                required
              />
            </div>
            <div className='col-span-2'>
              <h3 className="text-sm text-[#332F32] font-medium">
              Message
              </h3>
              <textarea
                name="mobile"
                value={isVal.mobile}
                onChange={handleChange}
                className="border border-[#625D60] outline-none p-2.5 rounded-lg w-full mt-1.5 resize-none h-40"
                placeholder="Enter Your message"
                required
              />
            </div>
            <input
              type="submit"
              value={"Submit"}
              className="w-64 col-span-2 p-2.5 text-xl font-medium rounded-sm bg-primaryMain text-white"
            />
          </form>
    </div>
  )
}
