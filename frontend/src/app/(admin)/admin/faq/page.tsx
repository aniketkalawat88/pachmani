"use client"

import api from '@/lib/axios';
import { blogs } from '@/lib/types/blogs';
import axios from 'axios'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { CiMenuKebab } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import DeleteToggle from '../_components/delete-toggle';
import { faq } from '@/lib/types/faq';

export default function page() {
    const [isVal , setIsVal ] = useState<faq[]>([]);
    const [loading, setLoading] = useState(false);
    
    const isFetch = async () => {
        try{
            const { data } = await api.get("faq");
            // console.log(res.data, "aa gya");
            setIsVal(data)
        }
        catch(err){
            console.log(err , " error hai");
        }
    }
    const handleDelete =async (id: string) => {
      try{
          await api.delete(`/faq/${id}`);
          setIsVal(isVal.filter(item => item._id !== id));
      }
      catch(err){
          console.log(err);
      }
      finally {
        setLoading(false);
      }
    }
    useEffect(()=>{
        isFetch();
    },[])
  return (
    <div>
      <div className='flex justify-end w-full bg-white p-2 mb-4 rounded-sm'>
        <Link href={'/admin/faq/add-faq'} className='bg-primaryMain text-white p-2 w-44 font-medium rounded-sm flex justify-center items-center'>Add Faq</Link>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-base font-semibold text-[#8E95A9] capitalize bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
              Question
              </th>
              <th scope="col" className="px-6 py-3">
              Answer
              </th>
              <th scope="col" className="px-6 py-3">
              Action
              </th>
            </tr>
          </thead>
          <tbody>
              {
                isVal.map((ele,i) => (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white truncate"
                    style={{
                      maxWidth: '25rem',  /* Adjust the max-width as needed */
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                  }}
                    >
                    {ele?.question}
                    </th>
                    <td className="px-6 py-4 truncate w-20">{ele?.answer}</td>
                    <td className="px-6 py-4 flex items-center gap-2">
                      <DeleteToggle onDelete={handleDelete} id={ele?._id} /> 
                      <Link href={`/admin/faq/update-faq/${ele?._id}`}> <CiMenuKebab /></Link>
                    </td>
                  </tr>
                ))
            }
          </tbody>
        </table>
      </div>

    </div>
  )
}
