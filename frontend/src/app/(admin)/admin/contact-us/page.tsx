"use client"

import api from '@/lib/axios'
import { Contact } from '@/lib/types/comman'
import { Loader } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import DeleteToggle from '../_components/delete-toggle'
import ItsLoader from '@/app/(root)/_components/itsLoader'

export default function page() {

  const [loading, setLoading] = useState(false);
    const [isData , setIsData] = useState<Contact[]>([]);

    const isFetch = async () => {
        setLoading(true);
        try{
            const res = await api.get("/contact")
            console.log(res?.data?.contactUsMessages)
            setIsData(res?.data?.contactUsMessages)
        }
        catch(err){
            console.log(err);
        }
        finally{
            setLoading(false)
        }
    }

    useEffect(()=> {
        isFetch();
    },[])

    const handleDelete =async (id: string) => {
        try{
            await api.delete(`/contact/${id}`);
            setIsData(isData.filter(item => item._id !== id));
        }
        catch(err){
            console.log(err);
        }
        finally {
          setLoading(false);
        }
    }
    if (loading) {
        return (
          <div className="flex items-center justify-center min-h-screen">
        <ItsLoader />
          </div>
        );
      }

  return (
    <div>
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="mx-auto max-w-screen-xl">
                <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                        <th scope="col" className="px-4 py-3">
                            Full Name
                        </th>
                        <th scope="col" className="px-4 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-4 py-3">
                            Phone Number
                        </th>
                        <th scope="col" className="px-4 py-3">
                            Message
                        </th>
                        <th scope="col" className="px-4 py-3">
                            <span className="sr-only">Actions</span>
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isData.map(({name,email,phoneNumber,message , _id},i) => (
                            <tr className="border-b dark:border-gray-700">
                            <th
                                scope="row"
                                className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                                {name}
                            </th>
                            <td className="px-4 py-3">{email}</td>
                            <td className="px-4 py-3">{phoneNumber}</td>
                            <td className="px-4 py-3">{message}</td>
                            <td className="px-4 py-3 flex items-center justify-end">
                                <button id="apple-imac-27-dropdown-button" data-dropdown-toggle="apple-imac-27-dropdown" className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100" type="button"> <DeleteToggle onDelete={handleDelete} id={_id} /> </button>
                            </td>
                            </tr>
                            ))
                        }                   
                    </tbody>
                    </table>
                </div>
                {/* <nav
                    className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
                    aria-label="Table navigation"
                >
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    Showing
                    <span className="font-semibold text-gray-900 dark:text-white">
                        1-10
                    </span>
                    of
                    <span className="font-semibold text-gray-900 dark:text-white">
                        1000
                    </span>
                    </span>
                    <ul className="inline-flex items-stretch -space-x-px">
                    <li>
                        <a
                        href="#"
                        className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                        <span className="sr-only">Previous</span>
                        <FaChevronLeft />
                        </a>
                    </li>
                    <li>
                        <a
                        href="#"
                        className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                        1
                        </a>
                    </li>
                    <li>
                        <a
                        href="#"
                        className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                        2
                        </a>
                    </li>
                    <li>
                        <a
                        href="#"
                        aria-current="page"
                        className="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                        >
                        3
                        </a>
                    </li>
                    <li>
                        <a
                        href="#"
                        className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                        ...
                        </a>
                    </li>
                    <li>
                        <a
                        href="#"
                        className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                        100
                        </a>
                    </li>
                    <li>
                        <a
                        href="#"
                        className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                        <span className="sr-only">Next</span>
                        <FaChevronRight />
                        </a>
                    </li>
                    </ul>
                </nav> */}
                </div>
            </div>
        </section>

    </div>
  )
}
