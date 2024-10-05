"use client";

import { useParams } from "next/navigation";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import api from "@/lib/axios";
import { Carousel } from "@/lib/types/banner";
import { Loader } from "lucide-react";
import { RxCrossCircled } from "react-icons/rx";
import { IoAddCircleOutline } from "react-icons/io5";
import { RiPencilLine } from "react-icons/ri";

const Page: React.FC = () => {
  const params = useParams();
  const pageName = params.pageName as string;
  const [carousels, setCarousels] = useState<Carousel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (pageName) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await api.get(`carousel/pages/name/${pageName}`);
          setCarousels(response.data.page.carousels);
          setLoading(false);
        } catch (error) {
          console.log(error);
          setError("Error fetching page data");
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [pageName]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFiles(event.target.files);
    }
  };

  const handleUpload = async () => {
    if (!selectedFiles || selectedFiles.length !== 2) {
      alert(
        "Please select exactly two files: one for desktop and one for mobile."
      );
      return;
    }

    try {
      setLoading(true);
      const uploadDesktopRes = await uploadImage(selectedFiles[0]);
      const uploadMobileRes = await uploadImage(selectedFiles[1]);

      const newCarousel: Carousel = {
        desktopUrl: uploadDesktopRes.data.url,
        mobileUrl: uploadMobileRes.data.url,
        desktopFileId: uploadDesktopRes.data.fileId,
        mobileFileId: uploadMobileRes.data.fileId,
      };

      const res = await api.put(`carousel/pages/name/${pageName}`, {
        carousels: [...carousels, newCarousel],
        pageName,
      });

      setCarousels((prevState) => [...prevState, newCarousel]);
      setSelectedFiles(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setLoading(false);
    } catch (error) {
      console.error("Failed to upload images:", error);
      setLoading(false);
    }
  };

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("heroImage", file);

    return axios.post(
      `${process.env.NEXT_PUBLIC_URL}/api/cloudinary/upload-image`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  };

  const handleRemoveThumbnail = async (
    desktopFileId: string,
    mobileFileId: string
  ) => {
    try {
      setLoading(true);
      await api.delete(`cloudinary/delete-image`, {
        data: { fileId: desktopFileId },
      });
      await api.delete(`cloudinary/delete-image`, {
        data: { fileId: mobileFileId },
      });
      const updatedCarousels = carousels.filter(
        (carousel) =>
          carousel.desktopFileId !== desktopFileId &&
          carousel.mobileFileId !== mobileFileId
      );
      setCarousels(updatedCarousels);
      await api.put(`carousel/pages/name/${pageName}`, {
        carousels: updatedCarousels,
        pageName,
      });
      setLoading(false);
    } catch (error) {
      console.error("Failed to delete thumbnails:", error);
      setLoading(false);
    }
  };

  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    event.dataTransfer.setData("index", index.toString());
  };

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>,
    dropIndex: number
  ) => {
    const dragIndex = Number(event.dataTransfer.getData("index"));
    if (dragIndex === dropIndex) return;

    const updatedCarousels = [...carousels];
    const [draggedItem] = updatedCarousels.splice(dragIndex, 1);
    updatedCarousels.splice(dropIndex, 0, draggedItem);

    setCarousels(updatedCarousels);

    const updateCarouselsOrder = async () => {
      try {
        await api.put(`carousel/pages/name/${pageName}`, {
          carousels: updatedCarousels,
          pageName: pageName,
        });
      } catch (error) {
        console.error("Failed to update carousel order:", error);
      }
    };
    updateCarouselsOrder();
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleUploadButtonClick = () => {
    fileInputRef.current?.click();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  const handleImageChange = (type: 'desktop' | 'mobile', index: number) => {
    // Open a file picker dialog
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
      if (!file) return;
  
      // Update the image URL
      if (type === 'desktop') {
        carousels[index].desktopUrl = URL.createObjectURL(file);
      } else {
        carousels[index].mobileUrl = URL.createObjectURL(file);
      }
      // Update the state
      setCarousels([...carousels]);
    };
    fileInput.click();
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-[#1C2A53] capitalize">
          {pageName}
        </h1>
        <div title="Select Two Image " className="flex flex-col items-center">
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="hidden"
            ref={fileInputRef}
            id="fileInput"
          />
          {!selectedFiles && (
            <button
              onClick={handleUploadButtonClick}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center gap-2 text-sm"
            >
              <IoAddCircleOutline /> Select and Upload Images
            </button>
          )}
          {selectedFiles && (
            <button
              onClick={handleUpload}
              disabled={loading}
              className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 flex items-center gap-2 text-sm"
            >
              {loading && (
                <div className="flex items-center justify-center h-screen">
                  <Loader className="w-8 h-8 animate-spin" />
                </div>
              )}
              <IoAddCircleOutline /> Confirm Selected Images
            </button>
          )}
        </div>
      </div>

      <div className="grid gap-6">
        <div className="grid grid-cols-3">
          <h1 className="col-span-1 text-xl font-semibold text-[#1C2A53] capitalize">Desktop Image</h1>
          <h1 className="col-span-1 text-xl font-semibold text-[#1C2A53] capitalize">Phone Image</h1>
          <h1 className="col-span-1 text-xl font-semibold text-[#1C2A53] capitalize">Product OverView Image</h1>

        </div>
        {carousels?.map((carousel, index) => (
  <div
    key={index}
    className="relative grid grid-cols-3 gap-4"
    draggable
    onDragStart={(event) => handleDragStart(event, index)}
    onDrop={(event) => handleDrop(event, index)}
    onDragOver={handleDragOver}
  >
    <div
      title="Desktop View"
      className="relative h-64 w-full border-2 rounded-xl overflow-hidden border-primaryMain col-span-1"
    >
      <Image
        src={carousel.desktopUrl}
        alt={`Desktop view ${carousel.desktopFileId}`}
        layout="fill"
        className="object-cover"
      />
      <button
        onClick={() => handleImageChange('desktop', index)}
        className="absolute top-2 left-2"
      >
        <RiPencilLine className="text-2xl text-primaryMain" />
      </button>
    </div>
    <div
      title="Phone View"
      className="relative h-64 w-full border-2 col-span-1 rounded-xl overflow-hidden border-primaryMain "
    >
      <Image
        src={carousel.mobileUrl}
        alt={`Mobile view ${carousel.mobileFileId}`}
        layout="fill"
        className="object-cover"
      />
      <button
        onClick={() => handleImageChange('mobile', index)}
        className="absolute top-2 left-2"
      >
        <RiPencilLine className="text-2xl text-primaryMain" />
      </button>
    </div>
    <div className="relative h-64 w-full border-2 col-span-1 rounded-xl overflow-hidden border-primaryMain ">
    </div>
    <button
      onClick={() =>
        handleRemoveThumbnail(
          carousel.desktopFileId,
          carousel.mobileFileId
        )
      }
      className="absolute top-2 right-2 "
    >
      <RxCrossCircled className="text-2xl text-red-600" />
    </button>
  </div>
))}
      </div>
      {/* <div className="mt-10 flex flex-col items-center">
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="hidden"
          ref={fileInputRef}
          id="fileInput"
        />
        <button
          onClick={handleUploadButtonClick}
          className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700"
        >
          Select and Upload Images
        </button>
        {selectedFiles && (
          <button
            onClick={handleUpload}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700"
          >
            Upload Selected Images
          </button>
        )}
      </div> */}
    </div>
  );
};

export default Page;
