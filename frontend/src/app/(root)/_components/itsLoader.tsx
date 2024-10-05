import React from 'react'
import "../style.css"

export default function ItsLoader() {
  return (
    <div className='h-screen w-full flex justify-center items-center'>
      {/* <Loader className='h-8 w-8 text-primaryMain animate-spin'/> */}
      <div className="loader-1">
        <div className="loader-2"></div>
        <div className="loader-3"></div>
        <div className="loader-4"></div>
      </div>
    </div>
  )
}
