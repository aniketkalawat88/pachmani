import CustomHead from '@/UI/customHead'
import Image from 'next/image'
import React from 'react'

export default function OurCertification() {
  return (
    <div className='md:my-10 sm:my-8 my-6 '>
      <CustomHead name='Our Certifications' className='w-10/12' />
      <div className='flex gap-3'>
        <div className='relative h-24 w-28'>
            <Image src={'/Assests/Images/HomeImage/10.png'} alt='No Preview' fill className='object-contain'/>
        </div>
        <div className='relative h-24 w-28'>
            <Image src={'/Assests/Images/HomeImage/31.png'} alt='No Preview' fill className='object-contain scale-75'/>
        </div>
        <div className='relative h-24 w-28'>
            <Image src={'/Assests/Images/HomeImage/29.png'} alt='No Preview' fill className='object-contain'/>
        </div>
        <div className='relative h-24 w-28'>
            <Image src={'/Assests/Images/HomeImage/30.png'} alt='No Preview' fill className='object-contain scale-95'/>
        </div>
      </div>
    </div>
  )
}
