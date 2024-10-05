
import { Loader } from 'lucide-react'
import React from 'react'

export default function loading() {
  return (
    <div className='h-screen w-full flex justify-center items-center'>
      <Loader className='h-8 w-8 text-primaryMain animate-spin'/>
    </div>
  )
}
