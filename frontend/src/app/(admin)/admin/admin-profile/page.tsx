import React from 'react'

export default function AdminProfile() {
  return (
    <div className='shadow-[0px_8px_32px_0px_rgba(51,38,174,0.08)] bg-white p-8 rounded-2xl'>
        <h1 className='text-[#1C2A53] text-xl font-medium flex justify-between items-center'>Edit Admin Profile</h1>
        <form className='grid grid-cols-2 gap-6 my-6'>
            <div>
                <h3 className="text-sm text-[#332F32] font-medium">Full Name*</h3>
                <input
                type="text"
                name=""
                className="border border-[#625D60] outline-none p-2.5 rounded-lg w-full mt-1.5"
                placeholder="Please Enter Your Name"
                required
                />
            </div>
            <div>
                <h3 className="text-sm text-[#332F32] font-medium">Email*</h3>
                <input
                type="text"
                name=""
                className="border border-[#625D60] outline-none p-2.5 rounded-lg w-full mt-1.5"
                placeholder="Please Enter Your Email"
                required
                />
            </div>
            <div>
                <h3 className="text-sm text-[#332F32] font-medium">Phone No.*</h3>
                <input
                type="text"
                name=""
                className="border border-[#625D60] outline-none p-2.5 rounded-lg w-full mt-1.5"
                placeholder="Please Enter Your Phone"
                required
                />
            </div>
            <div>
                <h3 className="text-sm text-[#332F32] font-medium">Gender*</h3>
                <input
                type="text"
                name=""
                className="border border-[#625D60] outline-none p-2.5 rounded-lg w-full mt-1.5"
                placeholder="Please Enter Your Gender"
                required
                />
            </div>
            
            <button className='bg-primaryMain text-xl  font-medium w-44 p-2 text-white rounded-sm'>Update</button>
        </form>
     
    </div>
  )
}
