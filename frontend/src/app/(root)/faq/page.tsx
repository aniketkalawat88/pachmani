"use client"

import AboutComp from '@/components/AboutComp/page'
import { cn } from '@/lib/utils';
import CustomHead from '@/UI/customHead'
import React, { useState } from 'react'
import { FaWindowMinimize } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";

export default function FAQ() {
    const arr = ["","","","","",""]
    const arr1 = ["","","","","",""]
    const arr2 = ["","","","","",""]
    const [isVal ,setIsVal] = useState(-1)
    const [isVal1 ,setIsVal1] = useState(-1)
    const [isVal2 ,setIsVal2] = useState(-1)
  return (
    <div>
        <AboutComp name='Frequently asked question' />
      <div className='max-w-7xl mx-auto w-full h-full'>
        <CustomHead name='Pachmarhi Ayurveda' className='w-1/2' />
        <div className='border border-[#E4E4E7] rounded-md '>
            { arr?.map((ele,i) => (
                <div key={i} className='p-6 grid gap-3 border-b border'>
                    <h1 className='text-lg font-medium text-primaryMain flex justify-between cursor-pointer' onClick={()=> setIsVal(i)}>Q.  What is SEO and does my business need SEO ? <span>{isVal === i ?  <FaWindowMinimize /> : <FaPlus /> }</span> </h1>
                    <p className={cn('text-[#332F32] text-base font-normal leading-6' , isVal === i ? "" : "hidden"  )}>Search Engine Optimization is the practice of ranking a website. Yes, your business should be investing in SEO. Search engine optimization offers a way to increase traffic without paying for each and every click.</p>
                </div>
            ))
            }
        </div>
      </div>
      <div className='max-w-7xl mx-auto w-full h-full'>
        <CustomHead name='Authenticity And Genuineness' className='w-1/2' />
        <div className='border border-[#E4E4E7] rounded-md '>
            { arr1?.map((ele,i) => (
                <div key={i} className='p-6 grid gap-3 border-b border'>
                    <h1 className='text-lg font-medium text-primaryMain flex justify-between cursor-pointer' onClick={()=> setIsVal1(i)}>Q.  What is SEO and does my business need SEO ? <span>{isVal1 === i ?  <FaWindowMinimize /> : <FaPlus /> }</span> </h1>
                    <p className={cn('text-[#332F32] text-base font-normal leading-6' , isVal1 === i ? "" : "hidden"  )}>Search Engine Optimization is the practice of ranking a website. Yes, your business should be investing in SEO. Search engine optimization offers a way to increase traffic without paying for each and every click.</p>
                </div>
            ))
            }
        </div>
      </div>
      <div className='max-w-7xl mx-auto w-full h-full'>
        <CustomHead name='Ordering' className='w-1/2' />
        <div className='border border-[#E4E4E7] rounded-md '>
            { arr2?.map((ele,i) => (
                <div key={i} className='p-6 grid gap-3 border-b border'>
                    <h1 className='text-lg font-medium text-primaryMain flex justify-between cursor-pointer' onClick={()=> setIsVal2(i)}>Q.  What is SEO and does my business need SEO ? <span>{isVal2 === i ?  <FaWindowMinimize /> : <FaPlus /> }</span> </h1>
                    <p className={cn('text-[#332F32] text-base font-normal leading-6' , isVal2 === i ? "" : "hidden"  )}>Search Engine Optimization is the practice of ranking a website. Yes, your business should be investing in SEO. Search engine optimization offers a way to increase traffic without paying for each and every click.</p>
                </div>
            ))
            }
        </div>
      </div>


    </div>
  )
}
