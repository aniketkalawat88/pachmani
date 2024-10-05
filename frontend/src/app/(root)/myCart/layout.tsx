import React, { ReactNode } from 'react'

export default function RootLayout({children}: {children:React.ReactNode}) {
  return (
    <div className='max-w-7xl mx-auto my-10'>
        <div className="shadow-[2px_2px_20px_0px_rgba(0,0,0,0.10)] h-36 my-10 rounded-sm">
          <div>
          <ol className="flex max-w-4xl mx-auto pt-10 items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
          <li className="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-primaryMain after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
            <span className="flex flex-col text-primaryMain items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500 relative">
              <span className='h-4 w-4 rounded-full bg-primaryMain' />
              <span className="hidden sm:inline-flex sm:ms-2 absolute top-5">Bag</span>
            </span>
          </li>
          <li className="flex md:w-full items-center text-blue-600 dark:text-blue-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
            <span className="flex flex-col items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500 relative ">
            <span className='h-4 w-4 rounded-full bg-primaryMain' />
              <div className="w-44 hidden sm:inline-flex sm:ms-2 absolute top-5 text-primaryMain">Shipping Information</div>
            </span>
          </li>
          <li className="flex items-center flex-col relative">
          <span className='h-4 w-4 rounded-full bg-primaryMain' />
            <span className='top-5 text-primaryMain absolute'>Payment</span>
          </li>
        </ol>

          </div>
        </div>
      {children}
    </div>
  )
}
