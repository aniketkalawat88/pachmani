// Popup.js
import Image from 'next/image';
import React from 'react';
import { IoMdCloseCircleOutline } from "react-icons/io";

const Popup = ({ item, onClose } : any) => {
    const handleSave = () => {
        // Handle save logic here
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-4xl px-5">
                <IoMdCloseCircleOutline  onClick={onClose} className='float-right text-2xl text-primaryMain'/>
                <h2 className="font-medium mb-4 text-[2rem] text-center text-[#332F32]">Upload Image*</h2>
                {/* <input type="file" className="border p-2 w-full mb-4" /> */}
                <div className='w-full relative h-48  mb-4 '> 
                    <Image src={'/Assests/Images/HairImage/05.png'} alt='No Preview' fill className='object-cover rounded-sm p-1 border border-dashed border-primaryMain' />
                </div>
                    
                <div className="flex justify-center">
                    {/* <button className="mr-2 px-4 py-2 bg-gray-300 rounded" onClick={onClose}>Cancel</button> */}
                    <button className="px-4 py-2 bg-primaryMain text-white rounded" onClick={handleSave}>Save & Change</button>
                </div>
            </div>
        </div>
    );
};

export default Popup;
