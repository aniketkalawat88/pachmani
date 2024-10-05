import CustomHead from '@/UI/customHead'
import { forum } from '@/app/font'
import { cn } from '@/lib/utils'
import React from 'react'
import { FaMinus } from "react-icons/fa";

export default function Review() {
  return (
    <div>
      <CustomHead name='Review' className='w-10/12' />
      <div className='md:w-[90%] grid gap-3'>
        <h4 className={cn('text-xl' , forum.className)}>Bhringraj Oil</h4>
        <p className='text-[#4A3F3F] md:text-2xl text-sm'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. </p>
        <h3 className='flex items-center gap-1 text-sm md:text-lg'><FaMinus className='text-[#00AB55]'/> Chanchal Asudani</h3>
      <hr className='w-full h-[0.5px]' />
      </div>
    </div>
  )
}
