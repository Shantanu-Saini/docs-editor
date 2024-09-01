"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { CldImage } from 'next-cloudinary';
import Link from 'next/link';
import { BiArrowBack } from 'react-icons/bi';
import toast from 'react-hot-toast';

function ResizeImgPage() {
  const params = useSearchParams();
  const [image, setImage] = useState<string | null>(null);
  const [resizedImage, setResizedImage] = useState<string | null>(null);
  const resizedRef = useRef<HTMLImageElement>(null);
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(300);
  const [unit, setUnit] = useState('px');

  const DPI = 96;

  const mmToPx = (mm: number) => (mm / 25.4) * DPI;

  useEffect(() => {
    const query = params.get('image');
    if (query) {
      setImage(query);
    }
  }, [params]);

  const handleResize = () => {
    if (image) {
      setResizedImage(image);
      toast.success("Image Resized");
    }
  };

  const handleDownload = () => {
    if (!resizedRef.current) return;
    const time = new Date().getMilliseconds();
    // console.log(resizedRef);

    fetch(resizedRef.current.src)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `resized_${time}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
  }

  const convertToPx = (value: any) => (unit === 'mm' ? mmToPx(value) : value);

  return (
    <div className='flex flex-col justify-center items-center bg-gray-800 space-y-4 py-4 min-h-screen min-w-full p-4'>
      <div className="absolute top-20 left-10 space-x-2 flex items-center justify-center text-blue-500 hover:text-blue-400 duration-300">
        <BiArrowBack />
        <Link href='/edit-image' className='underline'>Go back</Link>
      </div>
      <h1 className='sm:text-4xl text-2xl font-semibold mb-4 text-gray-200'>Resize <span className='text-red-600'>Image</span></h1>

      <div className='flex flex-col items-center justify-center w-full space-y-4'>

        <div className='flex flex-col sm:flex-row items-center justify-between w-full sm:space-x-4'>

          <div className='flex flex-col items-center justify-center sm:w-1/2 w-full mt-4 space-y-3'>
            <h2 className='text-2xl text-gray-200'>Before</h2>
            {image ? (
              <div className='border-2 border-gray-500 p-2 bg-gray-700'>
                <CldImage
                  src={image}
                  width={300}
                  height={300}
                  alt="original image"
                  crop="fill"
                />
              </div>
            ) : (
              <div className="flex items-center justify-center h-fit p-20">
                <div className="relative">
                  <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200" />
                  <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-red-600 animate-spin"></div>
                </div>
              </div>
            )}
          </div>

          <div className='flex flex-col items-center justify-center sm:w-1/2 w-full mt-4 space-y-3'>
            <h2 className='text-2xl text-gray-200'>After</h2>
            {resizedImage ? (
              <div className='border-2 border-gray-500 p-2 bg-gray-700'>
                <CldImage
                  src={resizedImage}
                  width={convertToPx(width)}
                  height={convertToPx(height)}
                  alt="resized image"
                  crop="fill"
                  ref={resizedRef}
                />
              </div>
            ) : (
              <div className='border-2 border-gray-500 p-2 bg-gray-700'>
                <p className='text-gray-300'>Resized image will appear here</p>
              </div>
            )}
          </div>
        </div>

        <div className='flex flex-col justify-center items-center space-y-3 w-full md:max-w-md'>

          <div className='flex flex-row items-center space-x-4'>
            <label htmlFor="unit" className='text-gray-200 text-xl'>Select unit</label>
            <select
              name="unit"
              id="unit"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className='p-2 border rounded mb-3 bg-gray-600 text-gray-200'
            >
              <option value="px">Pixels (px)</option>
              <option value="mm">Millimeters (mm)</option>
            </select>
          </div>

          <div className='flex sm:flex-row flex-col items-center space-x-4'>
            <label htmlFor="height" className='text-gray-200 text-xl'>Enter required height ({unit})</label>
            <input
              type="number"
              name='height'
              id='height'
              placeholder={`Height (${unit})`}
              onChange={(e) => setHeight(Number(e.target.value))}
              className='p-2 border rounded focus:outline-none'
            />
          </div>

          <div className='flex sm:flex-row flex-col items-center space-x-4'>
            <label htmlFor="width" className='text-gray-200 text-xl'>Enter required width ({unit})</label>
            <input
              type="number"
              name='width'
              id='width'
              placeholder={`Width (${unit})`}
              onChange={(e) => setWidth(Number(e.target.value))}
              className='p-2 border rounded focus:outline-none'
            />
          </div>

          <div className='flex flex-col md:flex-row justify-center items-center space-y-2 md:space-x-4 md:space-y-0 mt-4'>
            <button
              onClick={handleResize}
              className='px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700'
            >
              Resize
            </button>
            <button
              onClick={handleDownload}
              className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600'>
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResizeImgPage;
