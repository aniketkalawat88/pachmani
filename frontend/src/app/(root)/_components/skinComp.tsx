
import HairCareCard from '@/components/Card/HairCareCard/page'
import CustomHead from '@/UI/customHead'
import React, { useState } from 'react'

export default function SkinComp({name}:{name:string}) {
    const arr = [
        {
            img:'/Assests/Images/HairImage/14.jpg',
            name:'Bhringraj Oil',
            data:'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
            price:450,
            rating:'4.6',
            review:43,
            title:'oil'
        },
    ]
  return (
    <div>
      <CustomHead name={name} className='w-10/12' />
      <div className='grid xl:grid-cols-3 md:grid-cols-2 gap-8 my-10 p-2'>
        {arr?.map((ele,i)=>(
            <HairCareCard ele={ele} key={i}/>
        ))}

      </div>
    </div>
  )
}
