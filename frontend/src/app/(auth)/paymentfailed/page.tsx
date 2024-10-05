"use client"

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function PaymentFailed() {
  const router = useRouter();
  const handleClick = () => {
    router.back();
  }
  return (
    <div className='flex flex-col h-full w-full justify-center items-center'>
      <h1 className='text-2xl text-[#DB3A3E] font-semibold  mt-[10vh]'>OOps ! Payment Fail ☹️</h1>
      <div className='relative w-[80%] mx-auto h-56 my-20'>
          <Image src={'/Assests/Images/OtherImage/payment-failed.png'} alt='No Preview' fill className='object-contain scale-125' />
      </div>
      <button onClick={handleClick} className='text-xl font-medium w-64 bg-[#DB3A3E] text-white p-2 rounded-sm mt-14'>Try Again</button>
      
    </div>
  )
}
