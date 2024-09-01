"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { BiArrowBack } from 'react-icons/bi';
import Link from 'next/link';
import toast from 'react-hot-toast';

function CompressImgPage() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [beforeSize, setBeforeSize] = useState<number | null>(null);
  const [afterSize, setAfterSize] = useState<number | null>(null);
  const params = useSearchParams();
  const image = params.get("image");
  const beforeCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const afterCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [compressPercent, setCompressPercent] = useState(10);
  const [compressedDataUrl, setCompressedDataUrl] = useState<string | null>(null);

  const canvasWidth = 300;
  const canvasHeight = 300;

  useEffect(() => {
    if (image) {
      const fetchProxiedImage = async () => {
        try {
          const response = await axios.get(
            `/api/get-proxy-img?imageUrl=${encodeURIComponent(
              `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${image}.jpg`
            )}`
          );
          const dataUrl = response.data.data_url;
          setImageSrc(dataUrl);
          calculateImageSize(dataUrl, setBeforeSize);
        } catch (error) {
          console.error('Failed to fetch proxied image', error);
        }
      };

      fetchProxiedImage();
    }
  }, [image]);

  useEffect(() => {
    if (imageSrc) {
      const beforeCanvas = beforeCanvasRef.current;
      const ctx = beforeCanvas?.getContext('2d');

      if (ctx) {
        const imageBefore = new Image();
        imageBefore.src = imageSrc;
        imageBefore.onload = () => {
          const aspectRatio = imageBefore.width / imageBefore.height;
          let drawWidth, drawHeight;

          if (canvasWidth / canvasHeight > aspectRatio) {
            drawWidth = canvasHeight * aspectRatio;
            drawHeight = canvasHeight;
          } else {
            drawWidth = canvasWidth;
            drawHeight = canvasWidth / aspectRatio;
          }

          beforeCanvas!.width = canvasWidth;
          beforeCanvas!.height = canvasHeight;

          const offsetX = (canvasWidth - drawWidth) / 2;
          const offsetY = (canvasHeight - drawHeight) / 2;

          ctx.drawImage(imageBefore, offsetX, offsetY, drawWidth, drawHeight);
        };
      }
    }
  }, [imageSrc]);

  const handleCompress = () => {
    if (imageSrc) {
      const image = new Image();
      image.src = imageSrc;
      image.onload = () => {
        // Create an offscreen canvas with the original image dimensions
        const offscreenCanvas = document.createElement('canvas');
        offscreenCanvas.width = image.width;
        offscreenCanvas.height = image.height;
        const offscreenCtx = offscreenCanvas.getContext('2d');

        // Draw the original image onto the offscreen canvas
        offscreenCtx!.drawImage(image, 0, 0, image.width, image.height);

        // Compress the image
        const compressedDataUrl = offscreenCanvas.toDataURL('image/jpeg', compressPercent / 100);
        setCompressedDataUrl(compressedDataUrl);
        calculateImageSize(compressedDataUrl, setAfterSize);

        // Display the compressed image on the on-screen canvas with scaled dimensions
        const afterCanvas = afterCanvasRef.current;
        if (afterCanvas) {
          const ctx = afterCanvas.getContext('2d');
          if (ctx) {
            const aspectRatio = image.width / image.height;
            let drawWidth, drawHeight;

            if (canvasWidth / canvasHeight > aspectRatio) {
              drawWidth = canvasHeight * aspectRatio;
              drawHeight = canvasHeight;
            } else {
              drawWidth = canvasWidth;
              drawHeight = canvasWidth / aspectRatio;
            }

            afterCanvas.width = canvasWidth;
            afterCanvas.height = canvasHeight;

            const offsetX = (canvasWidth - drawWidth) / 2;
            const offsetY = (canvasHeight - drawHeight) / 2;

            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
            toast.success("Image Compressed")
          }
        }
      };
    }
  };

  const handleDownload = () => {
    if (compressedDataUrl) {
      const link = document.createElement('a');
      link.href = compressedDataUrl;
      link.download = 'compressed-image.jpg';
      link.click();
    }
  };

  const calculateImageSize = (dataUrl: string, setSize: React.Dispatch<React.SetStateAction<number | null>>) => {
    const byteString = atob(dataUrl.split(',')[1]);
    const byteLength = byteString.length;
    setSize(byteLength);
  };

  const formatSize = (size: number | null) => {
    if (size === null) return 'N/A';
    return `${(size / 1024).toFixed(2)} KB`;
  };

  return (
    <div className='flex flex-col justify-center items-center bg-gray-800 space-y-4 py-4 min-h-screen min-w-full p-4'>
      <div className="absolute top-20 left-10 space-x-2 flex items-center justify-center text-blue-500 hover:text-blue-400 duration-300">
        <BiArrowBack />
        <Link href='/edit-image' className='underline'>Go back</Link>
      </div>
      <h1 className="sm:text-4xl text-2xl font-semibold mb-4 text-gray-200">Compress <span className='text-red-600'>Image</span></h1>

      <div className='flex flex-col items-center justify-center w-full space-y-4'>

        {/* Images */}
        <div className='flex flex-col sm:flex-row items-center justify-between w-full sm:space-x-4'>
          <div className='flex flex-col items-center justify-center sm:w-1/2 w-full mt-4 space-y-3'>
            <h2 className='text-2xl text-gray-200'>Before</h2>
            <canvas ref={beforeCanvasRef} width={canvasWidth} height={canvasHeight} className='border-2 border-gray-500 p-2 bg-gray-700' />
            <p className='text-gray-300'>Size: {formatSize(beforeSize)}</p>
          </div>
          <div className='flex flex-col items-center justify-center sm:w-1/2 w-full mt-4 space-y-3'>
            <h2 className='text-2xl text-gray-200'>After</h2>
            <canvas ref={afterCanvasRef} width={canvasWidth} height={canvasHeight} className='border-2 border-gray-500 p-2 bg-gray-700' />
            <p className='text-gray-300'>Size: {formatSize(afterSize)}</p>
          </div>
        </div>

        {/* Buttons and controls */}
        <div className='flex flex-col justify-center items-center space-y-3'>
          <div className='flex sm:flex-row flex-col items-center justify-between space-x-4'>
            <label className="block text-gray-200 text-2xl font-semibold mb-2">
              Quality Level :
            </label>
            <input
              type="range"
              name="compress"
              id="compress"
              min={5}
              max={75}
              value={compressPercent}
              onChange={(e) => setCompressPercent(Number(e.target.value))}
            />
          </div>
          <div className='flex justify-center items-center space-x-3 sm:space-x-4 mt-4'>
            <button
              onClick={handleCompress}
              className='px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700'
            >
              Compress
            </button>
            <button
              onClick={handleDownload}
              className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600'
              disabled={!compressedDataUrl}
            >
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompressImgPage;
