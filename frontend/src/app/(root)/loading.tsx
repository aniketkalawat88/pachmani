
import { Loader } from 'lucide-react'
import React from 'react'
import "./style.css"
import ItsLoader from './_components/itsLoader'

export default function loading() {
  return (
    <div className='h-screen w-full flex justify-center items-center'>
      {/* <Loader className='h-8 w-8 text-primaryMain animate-spin'/> */}
      
      <ItsLoader />
    </div>
  )
}
