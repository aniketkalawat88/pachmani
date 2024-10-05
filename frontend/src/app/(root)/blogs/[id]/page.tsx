"use client"

import AboutComp from '@/components/AboutComp/page'
import api from '@/lib/axios'
import { blogs } from '@/lib/types/blogs'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import ItsLoader from '../../_components/itsLoader'

export default function page({params} : {params :{id: string}}) {
  const [isVal , setIsData] = useState<blogs>();
  const [isLoader , setIsLoader] = useState(false);
  
  const isFetch = async () => {
    try{
      setIsLoader(true)
      const {data} = await api.get(`blogs/${params.id}`)
      setIsData(data?.data)
      console.log(data?.data);
        setIsLoader(false)
    }
    catch(err){
      console.log(err,"error hai");
      setIsLoader(false)
    }
  }

  if(isLoader){
      <div> <ItsLoader /> </div>
  }

  useEffect(()=>{
    isFetch();
  }, [])
  return (
    <div className='min-h-screen h-full w-full'>
        <div className=''>
          <AboutComp name="Blogs" />
        </div>
      <div className='max-w-7xl mx-auto w-full h-full grid md:grid-cols-5 gap-6 my-10 xl:px-0 px-6'>
        <span className='w-full md:h-96 sm:h-80 h-56 col-span-2 rounded-md overflow-hidden  md:sticky relative top-5'>
            <Image src={isVal?.image?.url} alt='No Preview' fill className='object-cover' />
        </span>
        <div className='md:col-span-3 sticky top-2 h-auto text-xl text-[#625D60]'>
          <span className='md:text-2xl text-xl font-semibold block '>{isVal?.title}</span>
          <span className='my-8 block md:text-base text-sm'>
            {isVal?.content}
          </span>
          <div className='italic md:text-base text-sm'>{isVal?.author}</div>
        </div>
      </div>
    </div>
  )
}
