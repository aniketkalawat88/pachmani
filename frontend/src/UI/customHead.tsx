import { forum } from '@/app/font'
import { cn } from '@/lib/utils'
import React from 'react'

export default function CustomHead({name , className}:{name:string , className:string}) {
  return (
    <div className={cn('md:text-2xl text-xl md:my-6 sm:my-4 max-sm:mb-2 flex flex-col gap-0.5 w-fit capitalize' , forum.className)}>
      {name}
      <span className={cn('bg-[#00AB55] h-[3px] rounded-md ',className)}/>
    </div>
  )
}
