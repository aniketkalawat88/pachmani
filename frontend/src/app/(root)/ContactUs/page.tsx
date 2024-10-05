"use client"

import { forum } from '@/app/font'
import { Icons } from '@/app/icons'
import AboutComp from '@/components/AboutComp/page'
import { Toast } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'
import api from '@/lib/axios'
import { cn } from '@/lib/utils'
import { Loader } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

export default function ContactUs() {
  
  const [loading, setLoading] = useState(false);
  const { toast } = useToast()
  const [isVal , setIsVal] = useState({
    name:'',
    email:"",
    phoneNumber:'',
    message:''
  })
  const handleChange = (e: { target: { name: any; value: any } }) => {
    setIsVal({
      ...isVal,
      [e.target.name]: e.target.value
    })
  }

  const isFetch = async () => {
    try{
      const res = await api.post("/contact" , isVal)
      // console.log(res, "wertyu")
    }
    catch(err){
      console.log(err)
    }
  }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    toast({ title: "Data submitted successfully" });
    isFetch().finally(() => {
      setLoading(false);
      setIsVal({
        name: '',
        email: '',
        phoneNumber: '',
        message: ''
      });
    });
    }
    
 
  return (
    <div>
      <AboutComp name="Contact Us"/>
      <div className='max-w-7xl mx-auto h-full w-full md:text-xl sm:text-base text-sm font-medium text-[#625D60] my-6 xl:px-0 px-6 text-justify'>
          <span className='text-[#332F32] md:text-2xl sm:text-xl text-base font-bold'>Pachmarhi Ayurveda ,</span>
          based in Pachmarhi, Madhya Pradesh, began offering Ayurvedic medicines in 2010. Our medicines are made with specific herbs from the Pachmarhi forest to help address health, skin, and hair issues, as well as prevent future ones — they are effective, authentic, time-tested, and well-balanced.
      </div>
      <div className='grid lg:grid-cols-4 sm:grid-cols-2 gap-8 max-w-7xl mx-auto my-6 xl:px-0 px-6'>
        <div className='shadow-[0px_0px_10px_0px_rgba(0,0,0,0.07)] border-[rgba(0,171,85,0.20)] border-[1px] xl:p-6 md:p-5 sm:p-4 p-2 grid justify-items-center gap-4 rounded-sm'>
          <Icons.contactCall className='max-sm:scale-75' />
          <p className='xl:text-xl sm:text-base text-sm text-[#625D60] font-medium'>+91 8989091645</p>
          <Link href={"tel:+91 8989091645"} className=' text-primaryMain border-primaryMain md:p-2.5 sm:p-2 p-1.5 text-center w-full rounded-sm md:text-xl sm:text-base text-sm  font-medium border'>Contact us</Link>
        </div>
        <div className='shadow-[0px_0px_10px_0px_rgba(0,0,0,0.07)] border-[rgba(0,171,85,0.20)] border-[1px] xl:p-6 md:p-5 sm:p-4 p-2 grid justify-items-center gap-4 rounded-sm'>
          <Icons.contactMess className='max-sm:scale-75' />
          <p className='xl:text-xl sm:text-base text-sm text-[#625D60] font-medium'>pachmadi@gmail.com</p>
          <Link href={'mailto:pachmadi@gmail.com'} className='text-primaryMain border-primaryMain md:p-2.5 sm:p-2 p-1.5 text-center w-full rounded-sm md:text-xl sm:text-base text-sm  font-medium border'>Email</Link>
        </div>
        <div className='shadow-[0px_0px_10px_0px_rgba(0,0,0,0.07)] border-[rgba(0,171,85,0.20)] border-[1px] xl:p-6 md:p-5 sm:p-4 p-2 grid justify-items-center gap-4 rounded-sm'>
          <Icons.contactChat className='max-sm:scale-75' />
          <p className='xl:text-xl sm:text-base text-sm text-[#625D60] font-medium'>Chat with us</p>
          <Link href={'https://wa.me/8989091645'} className='text-primaryMain border-primaryMain md:p-2.5 sm:p-2 p-1.5 text-center w-full rounded-sm md:text-xl sm:text-base text-sm  font-medium border'>Chat</Link>
        </div>
        <div className='shadow-[0px_0px_10px_0px_rgba(0,0,0,0.07)] border-[rgba(0,171,85,0.20)] border-[1px] xl:p-6 md:p-5 sm:p-4 p-2 grid justify-items-center gap-4 rounded-sm'>
          <Icons.contactWhat className='max-sm:scale-75' />
          <p className='xl:text-xl sm:text-base text-sm text-[#625D60] font-medium text-center'>Reach out on WhatsApp</p>
          <Link href={'https://wa.me/8989091645'} className='text-primaryMain border-primaryMain md:p-2.5 sm:p-2 p-1.5 text-center w-full rounded-sm md:text-xl sm:text-base text-sm  font-medium border'>WhatsApp</Link>
        </div>
      </div>
      <div className='max-w-7xl mx-auto w-full h-full grid md:grid-cols-2 xl:gap-20 lg:gap-14 md:gap-10 sm:gap-6 text-center xl:p-10 md:p-8 sm:p-6 p-4 bg-[#00AB550D] rounded-sm'>
        <div className='md:w-[70%] mx-auto p-2 '>
          <h1 className={cn('md:text-5xl sm:text-3xl text-2xl' , forum.className)}>For product related & other queries</h1>
          <p className=' md:mt-6 sm:mt-4 mt-2'>Please submit your question below and we will respond within 48hrs</p>
        </div>
        <form className='text-start grid md:gap-6 gap-4' onSubmit={handleSubmit} >
          <div>
              <h3 className="text-sm text-[#332F32] font-medium">Full Name</h3>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                value={isVal.name}
                className="border border-[#625D60] outline-none md:p-2.5 sm:p-2 p-1.5 rounded-lg w-full mt-1.5 bg-transparent"
                placeholder="Please Enter Your name"
                required
              />
            </div>
            <div className='grid md:grid-cols-2 grid-cols-1 md:gap-6 gap-4'>
              <div>
                  <h3 className="text-sm text-[#332F32] font-medium">Email</h3>
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={isVal.email}
                    className="border border-[#625D60] outline-none md:p-2.5 sm:p-2 p-1.5 rounded-lg w-full mt-1.5 bg-transparent"
                    placeholder="Please Enter Your Email"
                    required
                  />
                </div>
              <div>
                  <h3 className="text-sm text-[#332F32] font-medium">Number</h3>
                  <input
                    type="number"
                    minLength={10}
                    maxLength={10}
                    value={isVal.phoneNumber}
                    onChange={handleChange}
                    name="phoneNumber"
                    className="border border-[#625D60] outline-none md:p-2.5 sm:p-2 p-1.5 rounded-lg w-full mt-1.5 bg-transparent"
                    placeholder="Please Enter Your Number"
                    required
                  />
                </div>

            </div>
          <div>
              <h3 className="text-sm text-[#332F32] font-medium">Message</h3>
              <textarea
                value={isVal.message}
                onChange={handleChange}
                name="message"
                className="border border-[#625D60] outline-none md:p-2.5 sm:p-2 p-1.5 rounded-lg w-full mt-1.5 bg-transparent resize-none"
                placeholder="Please Enter Your Message"
                required
              />
            </div>
            <button type='submit' disabled={loading} className='bg-primaryMain text-white md:text-xl text-base font-medium p-2 rounded-sm md:w-56 w-44 flex justify-center items-center gap-2'>
            {loading && <Loader className='w-4 h-4 animate-spin'/>}
            <p>Submit</p>
            </button>
          </form>
      </div>
        

    </div>
  )
}
