"use client";

import api from "@/lib/axios";
import axios from "axios";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function AddBlogs({ params }: { params: { id: string } }) {
  const [isImg, setIsImg] = useState<any>("");
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  const [blogData, setBlogData] = useState({
    title: "",
    author: "",
    content: "",
    image: { fileId: "", url: "" },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setBlogData({
      ...blogData,
      [e.target.name]: e.target.value,
    });
  };

  const updateBlog = async () => {
    try {
      setLoading(true);
      if (file) {
        await api.delete(`/cloudinary/delete-image`, {
          data: { fileId: blogData.image.fileId },
        });
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
        const { fileId, url } = data;
        blogData.image = {
          fileId: data.fileId,
          url: data.url,
        };
      }
      const { data } = await api.patch(`/blogs/${params.id}`, {
        title: blogData.title,
        author: blogData.author,
        content: blogData.content,
        image: {
          fileId: blogData.image.fileId,
          url: blogData.image.url,
        },
      });
      router.push("/admin/blogs");
      setLoading(false);
      // console.log(data , "res");
    } catch (err) {
      console.log(err, " error hai");
      setLoading(false);
    }
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

  const handleUploadPic = async (e: any) => {
    const file = e.target.files[0];
    const imagePic = await imageToBase(file);
    setIsImg(imagePic);
    setFile(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateBlog();
  };

  useEffect(() => {
    async function getBlog() {
      const { data } = await api.patch(`/blogs/${params.id}`);
      setBlogData(data.data);
    }
    getBlog();
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full">
      <div className="">
        <h1 className="text-xl font-medium text-[#1C2A53] mb-6">
          Update Blogs
        </h1>
      </div>
      <form onSubmit={handleSubmit}>
        <label className="my-6 col-span-2">
          <div className="block text-sm text-[#332F32] font-medium">
            Blog Image*
          </div>
          <div
            title="Click to change the image"
            className="mt-1.5 border border-dashed border-black/20 rounded-md text-center md:h-32 sm:h-24 h-16 cursor-pointer flex justify-center items-center overflow-hidden"
          >
            <img
              src={isImg ? isImg : blogData?.image?.url}
              alt="No Preview"
              className="h-full w-full object-cover"
            />
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
            value={blogData.author}
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
            value={blogData.title}
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
            value={blogData.content}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-primaryMain text-white p-2 w-44 rounded-md flex items-center justify-center gap-2"
        >
          {loading && <Loader className="w-4 h-4 animate-spin"></Loader>}
          Update
        </button>
      </form>
    </div>
  );
}
