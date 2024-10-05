import React from 'react'
import { RxCross1 } from 'react-icons/rx'
import { FaChevronLeft } from "react-icons/fa6";
import CustomHead from '@/UI/customHead';
import { Icons } from '@/app/icons';
import { PiSealPercentFill } from "react-icons/pi";

export default function OfferDrawer( {val} : {val : () => void }) {
    const arr = ["","","","","",""]
  return (
    <div>
        <div className="flex text-xs text-center items-center gap-5 p-3 text-primaryMain font-normal shadow-lg w-full">
            <FaChevronLeft onClick={val} className="cursor-pointer text-2xl text-[#625D60] hover:text-red-400" />
            <h1 className="text-center w-full"> Apply Promo Code</h1>
        </div>
        <div className='px-4'>
            <div className='shadow-[2px_2px_20px_0px_rgba(0,0,0,0.10)] p-4 my-4 rounded-sm flex justify-between'>
                <input type='text' placeholder='Enter Coupon Code Here' className='outline-none' />
                <span className='text-primaryMain font-medium'>Apply</span>
            </div>
            <p className='text-sm text-[#625D60] shadow-[2px_2px_20px_0px_rgba(0,0,0,0.10)] p-4 rounded-sm my-4'><span className='text-primaryMain'>Login</span> to apply code</p>
        </div>
        <div className='bg-[rgba(0,171,85,0.05)] p-4'>
            <CustomHead name='Available Coupons' className='w-1/2' />
            <ul className='grid gap-4'>
                { arr?.map((ele,i) => (
                    <li key={i} className='flex items-center gap-2 font-medium justify-between'>
                        <div className='flex items-center gap-2'>
                            <PiSealPercentFill className='text-primaryMain bg-[#00AB551A] p-2 text-4xl rounded-full' />
                            <p className='text-[#000000]'>10 % off on this coupon</p>
                        </div>
                        <p className='text-primaryMain'>Applied</p>
                    </li>

                ))
                }
            </ul>
        </div>
    </div>
  )
}
