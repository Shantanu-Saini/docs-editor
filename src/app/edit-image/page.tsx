"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { BiArrowBack } from 'react-icons/bi';
import Link from 'next/link';
import toast from 'react-hot-toast';

function UserImgPage() {
  const [uploadedImg, setUploadedImg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleImgUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const resp = await axios.post('/api/userfile', formData);
      const data = resp.data;
      setUploadedImg(data.publicId);
      toast.success("Image uploaded Succesfully")
    } catch (error: any) {
      console.log("ERROR: client Img upload", error);
    } finally {
      setLoading(false);
    }
  }

  const handleSignRedirect = () => {
    if (uploadedImg) {
      router.push(`edit-image/add-signature?image=${uploadedImg}`);
    }
  }

  const handleRemoveBGRedirect = () => {
    if (uploadedImg) {
      router.push(`/edit-image/remove-bg?image=${uploadedImg}`);
    }
  }

  const handleCompressRedirect = () => {
    if (uploadedImg) {
      router.push(`/edit-image/compress-image?image=${uploadedImg}`);
    }
  }

  const handleResizeRedirect = () => {
    if (uploadedImg) {
      router.push(`/edit-image/resize-image?image=${uploadedImg}`);
    }
  }

  return (
    <div className="min-h-screen min-w-full px-4 py-16 sm:px-6 lg:px-8 bg-gray-800 flex flex-col items-center justify-center sm:space-y-8 space-x-4">
      <div className="absolute top-20 left-10 space-x-2 flex items-center justify-center text-blue-500 hover:text-blue-400 duration-300">
        <BiArrowBack />
        <Link href='/dashboard' className='underline'>Dashboard</Link>
      </div>
      <h1 className="sm:text-4xl text-2xl font-medium text-gray-200 text-center mb-8">
        Upload <span className='text-red-600'>Image</span>
      </h1>
      <div className="mx-auto w-fit">
        <div className="mb-8">
          <label
            htmlFor="img"
            className="block text-lg font-medium text-gray-200 mb-2"
          >
            Choose an Image:
          </label>
          <input
            type="file"
            name='img'
            onChange={handleImgUpload}
            accept="image/jpeg, image/png, image/gif"
            className="block w-full rounded-lg border-gray-300 p-4 text-sm shadow-sm cursor-pointer bg-gray-700 hover:border-red-600 focus:outline-none focus:ring focus:ring-red-500 focus:border-red-500 transition"
          />
        </div>
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-300 mb-4">
            Preview:
          </h2>
          {loading ? (
            <div className="flex items-center justify-center h-screen">
              <div className="relative">
                <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200" />
                <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
              </div>
            </div>

          ) : (
            uploadedImg && (
              <img
                src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${uploadedImg}.jpg`}
                alt='Selected Image'
                className="rounded-md shadow-lg p-1 border-2 border-gray-200 h-52 w-auto"
              />
            )
          )}
        </div>

        <div className='space-y-3'>
          <h2 className="text-lg font-semibold text-gray-300 mb-4">Choose Actoin : </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
            <button
              className={uploadedImg ? "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer transition" : "bg-blue-300 cursor-default text-white font-bold py-2 px-4 rounded"}
              onClick={handleSignRedirect}
              disabled={!uploadedImg}
            >
              Add Signature
            </button>
            <button
              className={uploadedImg ? "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer transition" : "bg-blue-300 cursor-default text-white font-bold py-2 px-4 rounded"}
              onClick={handleRemoveBGRedirect}
              disabled={!uploadedImg}
            >
              Remove/Add Background
            </button>
            <button
              className={uploadedImg ? "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer transition" : "bg-blue-300 cursor-default text-white font-bold py-2 px-4 rounded"}
              onClick={handleCompressRedirect}
              disabled={!uploadedImg}
            >
              Compress Size
            </button>
            <button
              className={uploadedImg ? "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer transition" : "bg-blue-300 cursor-default text-white font-bold py-2 px-4 rounded"}
              onClick={handleResizeRedirect}
              disabled={!uploadedImg}
            >
              Customize Aspect Ratio
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserImgPage;
