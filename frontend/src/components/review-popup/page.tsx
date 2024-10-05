'use client'

import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { RxCross2 } from 'react-icons/rx'
import ReviewStar from '@/app/(root)/_components/reviewRating'
import { IoCloudUploadOutline } from 'react-icons/io5'

export default function ReviewPopup() {
  const [open, setOpen] = useState(false)
  const [isImg , setIsImg] = useState<any>("")

    const handleUploadPic = async (e : any) => {
       const file = e.target.files[0];
       const imagePic = await imageToBase(file)
       setIsImg(imagePic)
       console.log(imagePic,"imagePic")
    };

    const handleSubmit = (e :  any) => {
        e.preventDefault();
    }
    const imageToBase = async (image : any) => {
        const reader = new FileReader()
        reader.readAsDataURL(image)

        const data = await new Promise((resolve , reject) => {
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error)
        })
        return data
    }



  return (
    <div>
        <button className="bg-transparent text-primaryMain font-semibold border-2 border-primaryMain p-2 rounded-md mx-auto bg-white cursor-pointer" onClick={() => setOpen(true)}>Write Your Review</button>
        <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
                transition
                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-3xl data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="flex flex-col  relative">
                        <button className='absolute right-0 cursor-pointer'  type="button" data-autofocus onClick={() => setOpen(false)}><RxCross2 className='text-xl hover:text-primaryMain' /></button>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <DialogTitle as="h3" className="text-xl font-medium  text-gray-900 flex justify-center">
                            <div className="mx-auto flex flex-col justify-center flex-shrink-0 rounded-full  sm:mx-0 font-bold text-[2rem] text-[#333333]">
                                Write Review
                                <div className='h-[1px] w-1/2 bg-primaryMain mt-1' />
                            </div>
                        </DialogTitle>
                        <div className="mt-2">
                            <div>
                                <div className='text-xl font-medium pb-2'>Upload Product Image</div>
                                    <label className='my-4'>
                                        <div className='border border-dashed border-black/20 rounded-md text-center md:h-32 sm:h-24 h-16 cursor-pointer flex justify-center items-center overflow-hidden' >
                                            {isImg ?
                                                <img src={isImg || ""} alt='No Preview' className='h-full w-full object-cover' />
                                                :
                                                <IoCloudUploadOutline className='text-5xl text-black/20' />

                                            }
                                        </div>
                                        <input type='file' className='hidden' onChange={handleUploadPic} />
                                    </label>                            
                                </div> 
                                <div className='text-xl font-medium mt-4'>Overall Rating</div>
                                <ReviewStar rating={3} setRating={() => 2} />
                                <div className='text-xl font-medium mt-4'>Add a written review</div>
                                <textarea className='outline-none border w-full resize-none p-2 rounded-md border-black/20 md:h-32 sm:h-24 h-16' />
                                


                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:px-10 sm:py-3">
                <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="inline-flex w-full justify-center rounded-md bg-primaryMain px-3 py-2 text-xl font-medium text-white shadow-sm hover:bg-primaryMain sm:w-44"
                >
                    Submit
                </button>
                </div>
            </DialogPanel>
            </div>
        </div>
        </Dialog>
    </div>
  )
}
