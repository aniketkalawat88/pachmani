import { forum } from '@/app/font'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

export default function VideoCard() {
  return (
    <div className='w-full h-full shadow-[2px_2px_20px_0px_rgba(0,0,0,0.10)] border-b-2 border-b-primaryMain rounded-md relative'>
        <video width="100%" height="100%" preload="none" className='h-[410px] rounded-md' autoPlay muted loop>
        <source src="/Assests/videos/01.mp4" type="video/mp4"  />
        <track
            src="/Assests/videos/01.mp4"
            kind="subtitles"
            srcLang="en"
            label="English"
        />
        Your browser does not support the video
        </video>
        <div className='absolute left-1/3 pl-2 bottom-12'>
        <div className='h-16 w-20  relative mx-auto'>
            <Image src={'/Assests/Images/HomeImage/27.png'} alt='No Preview' fill className='object-cover rounded-sm' />
        </div>

        </div>
        <div className='text-center mt-8'>
            <h1 className={cn('text-base font-normal' , forum.className)}>Mrittika Lepa</h1>
            <p className='text-[#313131] font-semibold'>₹265</p>
        </div>
    </div>
  )
}
