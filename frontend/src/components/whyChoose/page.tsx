import CustomHead from '@/UI/customHead'
import { forum } from '@/app/font'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

export default function WhyChoose() {
  const arr = ["","",""]
  return (
    <div className='md:my-10 sm:my-8 my-6 xl:px-0 px-6'>
      <CustomHead name='Why choose us' className='w-7/12' />
      <div className='grid md:grid-cols-2 md:gap-16 gap-4 items-center grid-cols-1'>
        <div className='grid gap-4'>
            <h1 className='md:text-3xl sm:text-2xl text-xl font-normal capital'>Nature’s secret for your truly health</h1>
            <p className='text-[#4A3F3F] pr-6 sm:mt-4 max-sm:text-xs'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. </p>
            {
              arr?.map((ele,i) => (
              <div className='flex gap-4 items-center '>
                  <Check className='bg-[#00AB55] text-white p-1'/>
                  <div className='md:w-[55%]'>
                      <h3 className={cn('md:text-xl sm:text-base text-sm text-primaryMain', forum.className)}>100%  Organic Herbel</h3>
                      <p className='text-xs text-[#4A3F3F] '>It is a long established fact that a reader will be distracted by the </p>
                  </div>
              </div>
              ))
            }
          
        </div>
        <div className='relative w-full h-full'>
            <Image src={'/Assests/Images/HomeImage/07.png'} alt='No Preview' fill objectFit='cover' className='rounded-md' />
        </div>
      </div>
    </div>
  )
}
