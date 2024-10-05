"use client"

import api from '@/lib/axios';
import { faq } from '@/lib/types/faq';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function page() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [isVal , setIsVal ] = useState({
        ques:'',
        ans:'',
    });
       
    const handleChange = (e : any) => {
        setIsVal({
            ...isVal , 
            [e.target.name] : e.target.value
        })
    }
    const isFetch = async () => {
        try{
            setLoading(true);
            const { data } = await api.post("faq" , isVal);
            setIsVal(data)
            setLoading(false);
        }
        catch(err){
            setLoading(false);
            console.log(err , " error hai");
        }
    }
    

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        isFetch();
        console.log(isVal , "dfghjk")
        router.push("/admin/faq")
    }

  return (
    
    <div className="p-6 bg-white rounded-lg shadow-md w-full">
      <div className="">
        <h1 className="text-xl font-medium text-[#1C2A53] mb-6">
          Update Blogs
        </h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="my-6 col-span-2">
          <label
            htmlFor="ques"
            className="block text-sm text-[#332F32] font-medium"
          >
            Question
          </label>
          <input
            type="text"
            name="question"
            onChange={handleChange}
            className="border border-gray-300 outline-none p-2.5 rounded-lg w-full mt-1.5"
            placeholder="Please Enter Your Author Name"
            required
          />
        </div>

        <div className="my-6 col-span-2">
          <label
            htmlFor="ans"
            className="block text-sm text-[#332F32] font-medium"
          >
            Answer
          </label>
          <textarea
            name="answer"
            onChange={handleChange}
            className="border border-gray-300 outline-none p-2.5 rounded-lg w-full mt-1.5 h-32 resize-none"
            placeholder="Please Enter Your Description"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-primaryMain text-white p-2 w-44 rounded-md flex items-center justify-center gap-2"
        >
          {loading && <Loader className="w-4 h-4 animate-spin"></Loader>}
          Submit
        </button>
      </form>
    </div>
  )
}
