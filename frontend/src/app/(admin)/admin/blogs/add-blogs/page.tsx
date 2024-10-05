"use client";

import api from "@/lib/axios";
import axios from "axios";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";

export default function AddBlogs() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);

  const [isImg, setIsImg] = useState<any>("");
  const [isData, setIsData] = useState({
    title: "",
    author: "",
    content: "",
    image: { fileId: "", url: "" },
  });

  const handleChange = (e: any) => {
    setIsData({
      ...isData,
      [e.target.name]: e.target.value,
    });
  };


  const handleUploadPic = async (e: any) => {
    const file = e.target.files[0];
    const imagePic = await imageToBase(file);
    setIsImg(imagePic);
    setFile(file);
  };

  const imageToBase = async (image: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(image);

    const data = await new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
    return data;
  };

  const [loading, setLoading] =  useState(false)
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("hey")  
    try {
      if (!file) {
        console.log("please select image");
        return;
      }
      setLoading(true)
      const formData = new FormData();
      formData.append("heroImage", file);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/api/cloudinary/upload-image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(data, "image data");
      const { fileId, url } = data;
      isData.image = {
        fileId: data.fileId,
        url: data.url,
      };
      console.log(isData, "send data");
      // Make POST request with updated isData
      if (fileId) {
        const { data } = await api.post("/blogs", isData);
        console.log(data, "response");
      }
      setIsData({
        title: "",
        author: "",
        content: "",
        image: { fileId: "", url: "" },
      });
      setLoading(false)
    } catch (err) {
      setLoading(false)
      console.log(err, "error");
    }

    router.push("/admin/blogs")
  };
  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full">
      <div className="">
        <h1 className="text-xl font-medium text-[#1C2A53]">Add New Blogs</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <label className="my-6 col-span-2">
          <div className="block text-sm text-[#332F32] font-medium">
            Blog Image*
          </div>
          <div className="mt-1.5 border border-dashed border-black/20 rounded-md text-center md:h-32 sm:h-24 h-16 cursor-pointer flex justify-center items-center overflow-hidden">
            {isImg ? (
              <img
                src={isImg || ""}
                alt="No Preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <IoCloudUploadOutline className="text-5xl text-black/20" />
            )}
          </div>
          <input type="file" className="hidden" onChange={handleUploadPic} />
        </label>
        <div className="my-6 col-span-2">
          <label
            htmlFor="productName"
            className="block text-sm text-[#332F32] font-medium"
          >
            Author Name*
          </label>
          <input
            type="text"
            name="author"
            value={isData.author}
            className="border border-gray-300 outline-none p-2.5 rounded-lg w-full mt-1.5"
            placeholder="Please Enter Your Author Name"
            onChange={handleChange}
            required
          />
        </div>
        <div className="my-6 col-span-2">
          <label
            htmlFor="productName"
            className="block text-sm text-[#332F32] font-medium"
          >
            Title Name*
          </label>
          <input
            type="text"
            name="title"
            value={isData.title}
            className="border border-gray-300 outline-none p-2.5 rounded-lg w-full mt-1.5"
            placeholder="Please Enter Your title Name"
            onChange={handleChange}
            required
          />
        </div>

        <div className="my-6 col-span-2">
          <label
            htmlFor="description"
            className="block text-sm text-[#332F32] font-medium"
          >
            Description
          </label>
          <textarea
            name="content"
            className="border border-gray-300 outline-none p-2.5 rounded-lg w-full mt-1.5 h-32 resize-none"
            placeholder="Please Enter Your Description"
            value={isData.content}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-primaryMain text-white p-2 w-44 rounded-md flex justify-center items-center gap-2"
        >
          {loading && <Loader className="w-4 h-4 animate-spin"></Loader>}
          Submit
        </button>
      </form>
    </div>
  );
}
