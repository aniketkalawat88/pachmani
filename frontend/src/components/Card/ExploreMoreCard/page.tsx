import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface CardProps {
  key:number,
  val:{
    name:string,
    img:string,
    link:string
  }
}

export default function ExploreMoreCard({val , key}:CardProps ,) {
  return (
    <Link href={val.link}>
      <div className='relative xl:h-[21.875rem] md:h-80 sm:h-72 h-32 w-full rounded-sm overflow-hidden'>
            <Image src={val.img} alt='No Preview' fill className='object-cover'  />
            <div className='relative top-0 left-0 bg-black/40 w-full h-full' />
            <h1 className='md:text-3xl sm:text-2xl text-base font-semibold absolute md:bottom-6 sm:bottom-4 bottom-2 left-2 text-white'>{val.name}</h1>
        </div>
      
    </Link>
  )
}
