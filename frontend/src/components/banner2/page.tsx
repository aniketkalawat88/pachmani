import { forum } from '@/app/font'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

export default function Banner2() {
  return (
    <div className='bg-[#F5ECE2] my-12'>
        <div className=' grid md:grid-cols-2 max-w-7xl mx-auto h-full gap-20  md:p-12 p-3 items-center'>
        <div className='relative md:h-[440px] h-56 md:w-[90%] md:border-8 border-white '>
            <Image src='/Assests/Images/HairImage/05.png' alt='No Preview' fill className='object-cover md:m-3 md:ml-5' />
        </div>
        <div className='md:p-3'>
            <h1 className={cn('text-4xl', forum.className)}>All over the world trust Sharko to create their website</h1>
            <p className='text-[#12141D] md:my-8 my-4 md:text-lg text-sm'>"Easy, affordable, and mobile-friendly way to create a website. I use Sharko for almost all of my plugins. These plugs are as professional as it gets. The team puts in a lot of work to make their product top notch and you can tell. Their tutorials on how to use the plugins are easy to follow which makes it so anybody can use them.”</p>
            <button className='text-white bg-[#00AB55] p-3 px-10 md:mt-10 mt-3 text-sm'>Read Article</button>
        </div>
        </div>

    </div>
  )
}
