import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'
import { forum } from '../../font'
import { FaGoogle } from "react-icons/fa";

export default function SignIn() {
  return (
    <div className='relative h-screen w-full'>
      <div className='fixed top-0 left-0 h-full w-full -z-20'>
        <Image src='/Assests/Images/HomeImage/02.png' alt='No Preview' fill className='object-cover'/>
      </div>
      <div className='relative w-full h-full max-w-7xl mx-auto items-center grid  justify-items-center gap-10'>
        <div className='bg-white md:w-[50%] md:h-64 p-10 gap-5 grid rounded-xl items-start'>
          <h2 className={cn('md:text-4xl text-2xl text-center' , forum.className)}>Login/SignUp</h2>
          <button className='bg-primaryMain text-white md:text-lg text-sm font-semibold rounded-lg w-[50% ] p-2 flex justify-center gap-5 items-center'>Sign Up With google <FaGoogle className='text-xl' />
          </button>
        </div>
       
     
       
      </div>
    </div>
  )
}
