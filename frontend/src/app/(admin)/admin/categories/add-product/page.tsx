import { lato } from '@/app/font'
import { Icons } from '@/app/icons'
import OurBestSellerCard from '@/components/Card/OurBestSellerCard/page'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { HiOutlineShoppingBag } from 'react-icons/hi2'

export default function AddProduct() {
    const arr = [
        {
            img:'/Assests/Images/HomeImage/28.png',
            name:'Bhringraj Oil',
            data:'It is a long established fact that a reader will be distracted by the distracted.',
            price:450,
            rating:'4.6',
            review:43,
            title:'oil',
            page:'01'
        },
        {
            img:'/Assests/Images/HomeImage/28.png',
            name:'Black Shine Shampoo',
            data:'It is a long established fact that a reader will be distracted by the distracted.',
            price:265,
            rating:'4.6',
            review:43,
            title:'oil',
            page:'02'
        },
        {
            img:'',
            name:'Pachmarhi Hair Oil',
            data:'It is a long established fact that a reader will be distracted by the distracted.',
            price:159,
            rating:'4.6',
            review:43,
            title:'oil',
            page:'03'
        },
        {
            img:'/Assests/Images/HomeImage/28.png',
            name:'Pachmarhi Hair Oil (200ml)',
            data:'It is a long established fact that a reader will be distracted by the distracted.',
            price:300,
            rating:'4.6',
            review:43,
            title:'oil',
            page:'04'
        },
        {
            img:'/Assests/Images/HairImage/16.jpg',
            name:'Red Onion Shampoo',
            data:'It is a long established fact that a reader will be distracted by the distracted.',
            price:650,
            rating:'4.6',
            review:43,
            title:'oil',
            page:'05'
        },
    ]
  return (
    <div>
        <h1 className='text-2xl font-semibold text-[#332F32]'>Haircare Product </h1>
      <div className='grid grid-cols-4 gap-6 py-6'>
      
        <div>
            <div className='border border-dashed border-primaryMain h-40'>

            </div>
        </div>
      </div>
    </div>
  )
}
