"use client"

import Image from 'next/image'
import React, { useState } from 'react'
import Stepper from '../../_components/stepper'

export default function OrderDetails() {
  const [currentStep, setCurrentStep] = useState(2); 
  const steps: string[] = ['Order Confirmed', 'Shipping', 'Out for Delivery', 'Delivered'];


  return (
    <div className='shadow-[0px_8px_32px_0px_rgba(51,38,174,0.08)] p-4 bg-white rounded-2xl'>
      <h1 className='text-[#1C2A53] font-medium text-xl'>Customer Details</h1>
      <div className='flex gap-2 my-4'>
        <div className='h-10 w-10 relative rounded-full overflow-hidden'>
          <Image src="/Assests/Images/HomeImage/08.png" alt="" fill className='object-cover'  />
        </div>
        <p className=''>
          <span className='font-semibold text-[#332F32]'>Priscilla Warren</span>
          <span className='block text-[#8E95A9] font-medium text-[10px]'>Customer</span>
        </p>
      </div>

      <form className='grid grid-cols-2 gap-8 my-6'>
        <div>
          <h3 className="text-sm text-[#332F32] font-medium">Orders Id</h3>
          <input type="text" className="border border-[#625D60] outline-none p-2.5 rounded-lg w-full mt-1.5" placeholder="Please Enter Your Product Name" required />
        </div>
        <div>
          <h3 className="text-sm text-[#332F32] font-medium">Revenue</h3>
          <input type="text" className="border border-[#625D60] outline-none p-2.5 rounded-lg w-full mt-1.5" placeholder="Please Enter Your Product Name" required />
        </div>
        <div>
          <h3 className="text-sm text-[#332F32] font-medium">Net Profit</h3>
          <input type="text" className="border border-[#625D60] outline-none p-2.5 rounded-lg w-full mt-1.5" placeholder="Please Enter Your Product Name" required />
        </div>
        <div>
          <h3 className="text-sm text-[#332F32] font-medium">Qty</h3>
          <input type="text" className="border border-[#625D60] outline-none p-2.5 rounded-lg w-full mt-1.5" placeholder="Please Enter Your Product Name" required />
        </div>
      </form>

      <div>
        <h1 className='text-sm font-medium my-4'>Product Order Date - <span className='text-primaryMain'> Jun 10, 2024</span></h1>
    
        <div
          className="p-4 shadow-[2px_2px_20px_0px_rgba(0,0,0,0.10)] max-w-7xl mx-auto w-full h-full rounded-sm grid grid-cols-7"
        >
          <div className="grid grid-cols-3 gap-4 col-span-3">
            <div className="relative w-full md:h-28 h-44 ">
              <Image
                src="/Assests/Images/HomeImage/27.png"
                alt="No Preview"
                fill
                className=" object-cover rounded-sm"
              />
            </div>

            <div className="w-full col-span-2">
              <h1 className="text-base text-black font-medium">
                Black Shine Shampoo
              </h1>
              <h1 className="text-base text-black font-medium my-1">
              Order  ID
              </h1>
              <p className="text-sm font-normal text-primaryMain">
              #1000487563
              </p>
              <div className="flex gap-3.5 items-center mt-5">
                <span className="text-sm text-[#625D60]">Total </span>
                <span className="text-[#313131] font-semibold">
                  ₹265.00
                </span>
              </div>
            </div>
          </div>

          <div className=" col-span-4">
          <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Order Tracking</h1>
          <Stepper currentStep={currentStep} steps={steps} />
          <div className="mt-4">
            <button
              className="bg-primaryMain text-white px-4 py-2 rounded"
              onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
            >
              Previous Step
            </button>
            <button
              className="bg-primaryMain text-white px-4 py-2 rounded ml-2"
              onClick={() => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))}
            >
              Next Step
            </button>
          </div>
        </div>

          </div>
          {/* <div className="h-full w-full flex items-center justify-center">
          <button className="text-primaryMain flex items-center gap-2">
            <RxCrossCircled /> Cancel
          </button>
        </div> */}
        </div>
      </div>
      
    </div>
  )
}
