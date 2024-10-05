// "use client";
// import CustomHead from "@/UI/customHead";
// import { lato, opensans } from "@/app/font";
// import { Icons } from "@/app/icons";
// import { cn } from "@/lib/utils";
// import Image from "next/image";
// import Link from "next/link";
// import React, { useEffect, useState } from "react";
// import { HiOutlineShoppingBag } from "react-icons/hi2";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "@/redux/store";
// import { Loader } from "lucide-react";
// import { getAllHaircareAsyn, getAllMensAsyn, getAllProductsAsyn } from "@/redux/action/productAction";
// import { addWish } from "@/redux/action/wishlistAddAction";

// interface Product {
//   category: string;
//   description: string;
// }

// const ViewProduct = ({params}: {params:any}) => {
//   const [isVal, setIsVal] = useState(false);
//   const [isData, setIsData] = useState<Product[]>([]);

//   const dispatch = useDispatch<AppDispatch>();
//   const { haircare,skincare,healthcare,mens, loading, error } = useSelector(
//     (state: RootState) => state.products
//   );

//   useEffect(() => {
//     if (haircare.products.length == 0) dispatch(getAllHaircareAsyn({category:"hairCare"}));
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <Loader className="animate-spin w-8 h-8"></Loader>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <div className="h-full max-w-7xl mx-auto md:p-0 p-6">
//         <CustomHead name={params.id} className="w-10/12" />
//         <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-5 my-10 p-2">
//           {haircare.products?.map(
//             ({ productName, description, reviews, variants, _id , isLike }, i) => (
//               <div className="rounded-2xl shadow-[2px_2px_20px_0px_rgba(0,0,0,0.10)] my-3 overflow-auto hover:scale-105 transition-all duration-300 ease-in-out ">
//                 <div className="relative md:h-52 h-44 w-full">
//                   <Image
//                     src={"/Assests/Images/HomeImage/27.png"}
//                     alt="No Preview"
//                     fill
//                     className="object-cover rounded-t-2xl"
//                   />
//                 </div>
//                 <div className="grid p-2 gap-1">
//                   <h3 className="text-xs text-primaryMain font-medium capitalize">
//                     {productName}
//                   </h3>
//                   <h2 className="text-base font-medium mt-1">oil</h2>
//                   <div className="md:text-sm text-xs text-[#313131] ">
//                     {description}
//                   </div>
//                   <div className="my-2 ">
//                     <div className="flex items-center gap-2">
//                       <span className="text-black font-semibold">₹252</span>
//                       <span className="text-[#858585] font-extralight line-through">
//                         ₹950
//                       </span>
//                       <span className="text-[#858585]">|</span>
//                       <span className="text-primaryMain font-extralight">
//                         35%
//                       </span>
//                     </div>
//                     <div className="flex justify-between items-center">
//                       <div className="flex gap-2 my-2.5">
//                         {variants?.map(({ price }, i) => (
//                           <span className="font-normal text-primaryMain border border-primaryMain text-xs p-0.5 rounded-xl px-2">
//                             {price}ml
//                           </span>
//                         ))}
//                       </div>
//                       <div className="flex text-xs items-center gap-2 pr-3">
//                         <span className="bg-[#2D8A40] text-white p-1 px-2 font-normal rounded-full">
//                           2.5 &#x2605;
//                         </span>
//                         <span className="text-[#4A3F3F]">Rating</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <Link
//                   href={`AllProduct/${_id}`}
//                   className={cn(
//                     "flex gap-2 bg-[#00AB55] w-full md:p-2.5 p-1 justify-center items-center text-lg font-medium text-white rounded-b-2xl",
//                     lato.className
//                   )}
//                 >
//                   <HiOutlineShoppingBag className="text-xl" />
//                   Add to Cart
//                 </Link>
//               </div>
//             )
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewProduct;



"use client"

import { lato } from '@/app/font'
import { Icons } from '@/app/icons'
import api from '@/lib/axios'
import { IOrder } from '@/lib/types/order'
import { IProduct } from '@/lib/types/products'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { HiOutlineShoppingBag } from 'react-icons/hi2'



export default function ViewProduct({params} : {params:any}) {
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
    
  const [isApi, setIsApi] = useState<IProduct[]>([]);
  const [error, setError] = useState<string | null>(null);
    const isFetch = async () => {
      try{
        const res = await api.get(`product?category=${params?.id}`)
        setIsApi(res?.data?.products)
      }
      catch(err){
        console.log(err, "admin-order error");
      }
    }
    useEffect(()=> {
      isFetch();
    },[])
    
  return (
    <div>
        <h1 className='text-2xl font-semibold text-[#332F32] capitalize'>{params.id} Product </h1>
      <div className='grid grid-cols-4 gap-6 py-6'>
      { isApi.map((ele,i) => (
              <div className="rounded-2xl shadow-[2px_2px_20px_0px_rgba(0,0,0,0.10)] my-3 overflow-auto hover:scale-105 transition-all duration-300 ease-in-out ">
                <div className="relative md:h-52 h-44 w-full">
                  <Image
                    src={"/Assests/Images/HomeImage/27.png"}
                    alt="No Preview"
                    fill
                    className="object-cover rounded-t-2xl"
                  />
                  {/* <div
                    className="absolute top-0 right-0 p-5 cursor-pointer"
                    onClick={() => addWish(_id)}
                  >
                    {isLike ? <Icons.like /> : <Icons.notLike />}
                  </div> */}
                </div>
                <div className="grid p-2 gap-1">
                  <h3 className="text-xs text-primaryMain font-medium capitalize">
                    {ele?.category}
                  </h3>
                  <h2 className="text-base font-medium mt-1">{ele?.productName}</h2>
                  <div className="md:text-sm text-xs text-[#313131] ">
                    {ele?.description}
                  </div>
                  <div className="my-2 ">
                    <div className="flex items-center gap-2">
                      <span className="text-black font-semibold">₹252</span>
                      <span className="text-[#858585] font-extralight line-through">
                        ₹950
                      </span>
                      <span className="text-[#858585]">|</span>
                      <span className="text-primaryMain font-extralight">
                        35%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2 my-2.5">
                        {ele?.variants?.map(({ price }, i) => (
                          <span className="font-normal text-primaryMain border border-primaryMain text-xs p-0.5 rounded-xl px-2">
                            {price}ml
                          </span>
                        ))}
                      </div>
                      <div className="flex text-xs items-center gap-2 pr-3">
                        <span className="bg-[#2D8A40] text-white p-1 px-2 font-normal rounded-full">
                          2.5 &#x2605;
                        </span>
                        <span className="text-[#4A3F3F]">Rating</span>
                      </div>
                    </div>
                  </div>
                </div>
                <Link
                  href={`AllProduct/${ele?._id}`}
                  className={cn(
                    "flex gap-2 bg-[#00AB55] w-full md:p-2.5 p-1 justify-center items-center text-lg font-medium text-white rounded-b-2xl",
                    lato.className
                  )}
                >
                  <HiOutlineShoppingBag className="text-xl" />
                  Add to Cart
                </Link>
              </div>
            ))}
        <div className='flex justify-center items-start h-full w-full'>
            <div className='border border-dashed border-primaryMain bg-white grid justify-items-center gap-3 p-14 rounded-2xl  my-auto'>
                <Icons.adminShop />
                <div className='text-lg font-medium text-primaryMain capitalize'>Add more product</div>
            </div>
        </div>
      </div>
    </div>
  )
}
