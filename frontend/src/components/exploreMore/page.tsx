import CustomHead from '@/UI/customHead'
import Image from 'next/image'
import React from 'react'
import ExploreMoreCard from '../Card/ExploreMoreCard/page'

export default function ExploreMore() {
  const arr = [ 
    {
      name:'Haircare',
      img:'/Assests/Images/HomeImage/05.png',
      link:'/hairCare'
    },
    {
      name:'Skincare',
      img:'/Assests/Images/HomeImage/skincare.png',
      link:'/skinCare'
    },
    {
      name:'Health Care',
      img:'/Assests/Images/HomeImage/men.png',
      link:'/healthCare'
    },
    {
      name:"Men's",
      img:'/Assests/Images/HomeImage/health.png',
      link:'/mens'
    },
  ]
  return (
    <div className=':my-10 sm:my-8 my-6 xl:px-0 px-6'>
      <CustomHead name="Explore More" className='w-11/12' />
      <div className='grid md:grid-cols-4 md:gap-8 sm:gap-6 gap-4 grid-cols-2'>
        {
          arr?.map((ele,i)=>(
            <ExploreMoreCard key={i} val={ele} />
          ))
        }
      </div>
    </div>
  )
}
