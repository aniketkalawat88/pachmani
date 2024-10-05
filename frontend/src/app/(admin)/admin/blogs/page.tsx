"use client"

import api from '@/lib/axios';
import { blogs } from '@/lib/types/blogs';
import axios from 'axios'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { CiMenuKebab } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import DeleteToggle from '../_components/delete-toggle';

export default function page() {
    const [isVal , setIsVal ] = useState<blogs[]>([]);
    const [loading, setLoading] = useState(false);
    
    const isFetch = async () => {
        try{
            const res = await api.get("blogs");
            // console.log(res.data, "aa gya");
            setIsVal(res?.data?.data)
        }
        catch(err){
            console.log(err , " error hai");
        }
    }
    const handleDelete =async (id: string) => {
      try{
          await api.delete(`/blogs/${id}`);
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
        <Link href={'/admin/blogs/add-blogs'} className='bg-primaryMain text-white p-2 w-44 font-medium rounded-sm flex justify-center items-center'>Add Blogs</Link>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-base font-semibold text-[#8E95A9] capitalize bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
              Title
              </th>
              <th scope="col" className="px-6 py-3">
              Author
              </th>
              <th scope="col" className="px-6 py-3">
              Blog Date
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
                      maxWidth: '35rem',  /* Adjust the max-width as needed */
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                  }}
                    >
                    {ele?.content}
                    </th>
                    <td className="px-6 py-4">{ele?.author}</td>
                    <td className="px-6 py-4">
                    {new Date(ele?.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 flex items-center gap-2">
                      <DeleteToggle onDelete={handleDelete} id={ele?._id} /> 
                      <Link href={`/admin/blogs/update-blog/${ele?._id}`}> <CiMenuKebab /></Link>
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
