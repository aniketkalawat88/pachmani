"use client"

import { forum } from '@/app/font';
import api from '@/lib/axios';
import { IProduct } from '@/lib/types/products';
import { cn } from '@/lib/utils';
import { debounce } from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6';
import { FiSearch } from 'react-icons/fi'
import { RxCross1 } from 'react-icons/rx';

export default function page() {
    const router = useRouter();
    const [showInput, setShowInput] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState<IProduct[] | []>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchProducts = async (query: string) => {
        setIsLoading(true);
        try {
          const { data } = await api.get(`/product?search=${query}`);
          setSearchResults(data.products);
          console.log(data?.products)
        } catch (error) {
          console.error("Error fetching products:", error);
        } finally {
          setIsLoading(false);
        }
      };
    
        const debouncedFetchProducts = useCallback(debounce(fetchProducts, 300), []);

        useEffect(() => {
            // if (searchTerm) {
            debouncedFetchProducts(searchTerm);
            // } else {
            // setSearchResults([]);
            // }
        }, [searchTerm, debouncedFetchProducts]);
    
    const handleRouteClick = () => {
        router.back();
      };
  return (
    <div>
        <div className='bg-[#00AB550F]'>
            <div className='max-w-5xl mx-auto w-full items-center py-4 flex justify-between'>
                <div className='flex items-center gap-4 w-[80%]'>
                    <FaArrowLeftLong className='text-xl text-primaryMain cursor-pointer' onClick={handleRouteClick} />
                    <div className='w-full'>
                        <input
                            type="text"
                            placeholder="Search..."
                            className={cn("outline-none bg-transparent text-xl text-black w-full" , forum.className)}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />   
                    </div>
                </div>
                <div className='' onClick={() => setSearchTerm("")} >
                    <RxCross1 className='text-2xl text-primaryMain cursor-pointer' />
                </div>
            </div>         
        </div>
        <div className='max-w-5xl mx-auto w-full min-h-screen'>
            <div className="my-4 grid gap-4">
                {isLoading ? (
                <p>Loading...</p>
                ) : (
                searchResults.map((product) => (
                    <Link href={`/AllProduct/${product?._id}`} key={product._id} className="">
                    <div className="flex items-center gap-4 p-2 w-full shadow-[2px_2px_20px_0px_rgba(0,0,0,0.10)] border-b-2 border-b-primaryMain rounded-sm">
                        <div className="w-28 h-28 flex-shrink-0 relative">
                        <Image
                            src={product?.thumbnail?.url ?? ''} 
                            alt={product.productName}
                            fill
                            className="object-cover rounded-md"
                        />
                        </div>
                        <div>
                        <p className="text-primaryMain font-medium">{product.category}</p>
                        <p className="text-black text-xl font-medium">{product.productName}</p>
                        <p className="text-[#313131] text-base font-semibold mt-6 flex gap-3">₹{product?.variants[0]?.priceAfterDiscount?.toFixed(2)} <span className='text-gray-400 line-through font-normal'>{product.variants?.[0].price}</span></p>
                        </div>
                    </div>
                    </Link>
                ))
                )}
      </div>
        
        </div>
    </div>
  )
}
