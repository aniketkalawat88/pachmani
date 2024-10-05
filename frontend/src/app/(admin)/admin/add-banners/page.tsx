"use client"

import Image from 'next/image'
import React, { useState } from 'react'
import { CiMenuKebab } from "react-icons/ci";
import { FaRegEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import Popup from '../_components/popup';
import Link from 'next/link';

interface Item {
    img: string;
    name: string;
}

export default function AddBanner() {
    const [isVal , setIsVal] = useState(false);
    const [isVal1 , setIsVal1] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [currentItem, setCurrentItem] =  useState<Item | null>(null);
    const arr = ["", "", "", "", ""]
    
    const arr2 = [
        {
            img:'',
            name:'Home Banner',
            link:'home'
        },
        {
            img:'',
            name:'Haircare',
            link:'haircare'
        },
        {
            img:'',
            name:'Healthcare',
            link:'skinecare'
        },
        {
            img:'',
            name:'Skincare',
            link:'healthcare'
        },
        {
            img:'',
            name:'Mens',
            link:'mens'
        },
    ]
  return (
    <div className='grid gap-8'>
        {/* <div className='shadow-[0px_8px_32px_0px_rgba(51,38,174,0.08)] bg-white p-6 rounded-xl'>
            <div className='flex justify-between'>
                <h1 className='text-2xl font-semibold text-[#332F32]'>Haircare Product </h1>
                <button className='bg-primaryMain text-white p-2 rounded-sm font-medium'>Add More Banner</button>
            </div>
            <h1 className='text-[#332F32] text-xl my-4 font-medium'>Upload Image*</h1>
            <div className='grid grid-cols-3 gap-4'>
                {
                    arr?.map((ele, i) => (
                        <div key={i}>
                            <div className='relative h-48 w-full rounded-xl overflow-hidden'>
                                <Image src={'/Assests/Images/HairImage/05.png'} alt='No Preview' fill className='object-cover' />
                                <div className='absolute top-0 right-0 p-3'>
                                <div>
                                    <CiMenuKebab className='cursor-pointer bg-white rounded-full'  onClick={()=> setIsVal(!isVal)} /> 
                                    {isVal && 
                                        <div className="absolute top-5 right-4 shadow-md m-2 p-1 grid  bg-white rounded-sm w-20 h-20">
                                            <h1 className=" font-semibold">Actions</h1>
                                            <div className="grid text-secondary-main text-xs gap-1">
                                            
                                    <div className="flex gap-2 w-full cursor-pointer hover:text-primary-main" onClick={() => { setIsPopupVisible(true); setIsVal1(false); }}><FaRegEdit /> Change</div>
                                            <div className="flex gap-2 w-full cursor-pointer hover:text-primary-main" onClick={()=> setIsVal(false)}><MdDelete /> Remove</div>
                                            </div>
                                        </div>
                                    }

                                </div>
                                
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            
        </div> */}
        
        <div className='shadow-[0px_8px_32px_0px_rgba(51,38,174,0.08)] bg-white p-6 rounded-xl'>
            <h1 className='text-2xl font-semibold text-[#332F32]'>Add Banners in Categories </h1>
            <div className='grid grid-cols-3 gap-4 my-4'>
    {
        arr2?.map((ele, i) => (
            <Link href={`/admin/add-banners/${ele?.link}`}  key={i}>
                <div className='relative h-48 w-full rounded-xl overflow-hidden cursor-pointer'>
                    <Image src={'/Assests/Images/HairImage/05.png'} alt='No Preview' fill className='object-cover' />
                    <div className='absolute top-0 right-0 p-3'>
                        <CiMenuKebab className='cursor-pointer bg-white rounded-full p-0.5'/>
                    </div>
                </div>
                <h1 className='text-[#332F32] text-2xl font-medium text-center w-full my-4'>{ele?.name}</h1>
            </Link>
        ))
    }
    {isPopupVisible && <Popup item={currentItem} onClose={() => setIsPopupVisible(false)} />}
</div>

            
        </div>
      
    </div>
  )
}
