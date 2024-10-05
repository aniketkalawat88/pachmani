import { forum } from '@/app/font'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Ayurvedexpert() {
  return (
    <div className='grid sm:grid-cols-9 max-w-7xl mx-auto bg-[rgba(0,171,85,0.05)] sm:px-0 px-6 grid-cols-2'>
        <div className='sm:col-span-5 grid md:justify-items-center w-full md:text-center sm:p-6 p-2'>
            <h1 className={cn('xl:text-6xl md:text-4xl sm:text-3xl text-base' , forum.className)}>Free Ayurvedic Doctor Consultation</h1>
            <Link href={'tel:+918989091645'} className='w-44 max-sm:w-28 font-medium bg-primaryMain text-white md:p-2 p-1.5 xl:mt-16 md:mt-10 sm:mt-8 mt-2 rounded-sm text-center md:text-base text-xs'>Call Now</Link>
        </div>
        <div className='sm:col-span-4 relative h-auto w-full'>
            <Image src={'/Assests/Images/HomeImage/doctor.png'} alt='No Preview' fill className=' object-cover '/>
        </div>
    </div>
  )
}
