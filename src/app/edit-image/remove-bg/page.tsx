"use client"
import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { CldImage } from 'next-cloudinary';
import { BiArrowBack } from 'react-icons/bi';
import Link from 'next/link';
import toast from 'react-hot-toast';

function RemoveBgPage() {
  const params = useSearchParams();
  const [image, setImage] = useState<string | null>(null);
  const [isBackgroundRemoved, setIsBackgroundRemoved] = useState(false);
  const [bgColor, setBgColor] = useState('');
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const query = params.get('image');
    setImage(query);
  }, [params]);

  const handleBackground = () => {
    if (!isBackgroundRemoved) {
      setIsBackgroundRemoved(true);
      toast.success("Background removed");

    }
  };

  const handleDownload = () => {
    if (!imageRef.current) return;
    const time = new Date().getMilliseconds();

    fetch(imageRef.current.src)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement("a");
        link.href = url;
        link.download = `bg-removed-img-${time}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
  }

  return (
    <div className="min-h-screen min-w-full px-4 py-16 sm:px-6 lg:px-8 bg-gray-800 flex flex-col items-center justify-center">
      {/* Left Side: Controls */}
      <h1 className="sm:text-4xl text-2xl font-semibold mb-4 text-gray-200">Remove/Add <span className='text-red-600'>Background</span></h1>
      <div className='flex justify-between items-center space-y-3 flex-col sm:flex-row min-w-full'>
        {/* left Side: Image Display */}
        <div className="sm:w-1/2 px-2 flex justify-center items-center">
          {image ? (
            <CldImage
              width="400"
              height="250"
              src={image}
              sizes="100vw"
              removeBackground={isBackgroundRemoved}
              background={bgColor}
              alt="uploaded image"
              className="border border-gray-300 rounded shadow-md"
              ref={imageRef}
            />
          ) : (
            <div className="flex items-center justify-center h-screen">
              <div className="relative">
                <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200" />
                <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
              </div>
            </div>

          )}
        </div>

        {/* right side */}
        <div className="flex flex-col space-y-4 sm:w-1/2 px-6">
          <button
            onClick={handleBackground}
            disabled={isBackgroundRemoved}
            className={`${isBackgroundRemoved ? 'bg-red-400 cursor-default' : 'bg-red-600 hover:bg-red-700 cursor-pointer'
              } text-white font-bold py-2 px-4 rounded`}
          >
            {isBackgroundRemoved ? 'Background Removed' : 'Remove Background'}
          </button>

          {/* Changing background color */}

          <div className='flex flex-col justify-center items-center space-y-3'>
            <div className="absolute top-20 left-10 space-x-2 flex items-center justify-center text-blue-500 hover:text-blue-400 duration-300">
              <BiArrowBack />
              <Link href='/edit-image' className='underline'>Go back</Link>
            </div>
            <h1 className='text-center px-5 py-2 text-gray-300 text-lg font-semibold'>Add Background</h1>
            <fieldset className="flex flex-wrap sm:gap-3 gap-2">
              <legend className="sr-only">Color</legend>

              <label
                htmlFor="ColorBlack"
                className="block border border-gray-400 w-8 h-8 cursor-pointer rounded-full bg-black shadow-lg shadow-pink-500/50 hover:shadow-pink-500/80 hover:shadow-2xl transition-shadow duration-300 ease-in-out has-[:checked]:ring-2 has-[:checked]:ring-pink-500 has-[:checked]:ring-offset-2"
              >
                <input
                  type="radio"
                  name="ColorOption"
                  value="black"
                  id="ColorBlack"
                  className="sr-only"
                  onChange={() => setBgColor('black')}
                  disabled={!isBackgroundRemoved}
                />
                <span className="sr-only">Black</span>
              </label>

              <label
                htmlFor="ColorWhite"
                className="block border border-gray-400 w-8 h-8 cursor-pointer rounded-full bg-white shadow-lg shadow-pink-500/50 hover:shadow-pink-500/80 hover:shadow-2xl transition-shadow duration-300 ease-in-out has-[:checked]:ring-2 has-[:checked]:ring-pink-500 has-[:checked]:ring-offset-2"
              >
                <input
                  type="radio"
                  name="ColorOption"
                  value="white"
                  id="ColorWhite"
                  className="sr-only"
                  onChange={() => setBgColor('white')}
                  disabled={!isBackgroundRemoved}
                />
                <span className="sr-only">White</span>
              </label>
              <label
                htmlFor="ColorGray"
                className="block border border-gray-400 w-8 h-8 cursor-pointer rounded-full bg-gray-400 shadow-lg shadow-pink-500/50 hover:shadow-pink-500/80 hover:shadow-2xl transition-shadow duration-300 ease-in-out has-[:checked]:ring-2 has-[:checked]:ring-pink-500 has-[:checked]:ring-offset-2"
              >
                <input
                  type="radio"
                  name="ColorOption"
                  value="gray"
                  id="ColorGray"
                  className="sr-only"
                  onChange={() => setBgColor('gray')}
                  disabled={!isBackgroundRemoved}
                />
                <span className="sr-only">Gray</span>
              </label>


              <label
                htmlFor="ColorBlue"
                className="block border border-gray-400 w-8 h-8 cursor-pointer rounded-full bg-blue-700 shadow-lg shadow-pink-500/50 hover:shadow-pink-500/80 hover:shadow-2xl transition-shadow duration-300 ease-in-out has-[:checked]:ring-2 has-[:checked]:ring-pink-500 has-[:checked]:ring-offset-2"
              >
                <input
                  type="radio"
                  name="ColorOption"
                  value="blue"
                  id="ColorBlue"
                  className="sr-only"
                  onChange={() => setBgColor('blue')}
                  disabled={!isBackgroundRemoved}
                />
                <span className="sr-only">Blue</span>
              </label>

              <label
                htmlFor="ColorViolet"
                className="block border border-gray-400 w-8 h-8 cursor-pointer rounded-full bg-pink-400 shadow-lg shadow-pink-500/50 hover:shadow-pink-500/80 hover:shadow-2xl transition-shadow duration-300 ease-in-out has-[:checked]:ring-2 has-[:checked]:ring-pink-500 has-[:checked]:ring-offset-2"
              >
                <input
                  type="radio"
                  name="ColorOption"
                  value="violet"
                  id="ColorViolet"
                  className="sr-only"
                  onChange={() => setBgColor('violet')}
                  disabled={!isBackgroundRemoved}
                />
                <span className="sr-only">Violet</span>
              </label>
              <label
                htmlFor="ColorRed"
                className="block border border-gray-400 w-8 h-8 cursor-pointer rounded-full bg-red-500 shadow-lg shadow-pink-500/50 hover:shadow-pink-500/80 hover:shadow-2xl transition-shadow duration-300 ease-in-out has-[:checked]:ring-2 has-[:checked]:ring-pink-500 has-[:checked]:ring-offset-2"
              >
                <input
                  type="radio"
                  name="ColorOption"
                  value="red"
                  id="ColorRed"
                  className="sr-only"
                  onChange={() => setBgColor('red')}
                  disabled={!isBackgroundRemoved}
                />
                <span className="sr-only">Red</span>
              </label>
              <label
                htmlFor="ColorYellow"
                className="bblock border border-gray-400 w-8 h-8 cursor-pointer rounded-full bg-yellow-300 shadow-lg shadow-pink-500/50 hover:shadow-pink-500/80 hover:shadow-2xl transition-shadow duration-300 ease-in-out has-[:checked]:ring-2 has-[:checked]:ring-pink-500 has-[:checked]:ring-offset-2"
              >
                <input
                  type="radio"
                  name="ColorOption"
                  value="yellow"
                  id="ColorYellow"
                  className="sr-only"
                  onChange={() => setBgColor('yellow')}
                  disabled={!isBackgroundRemoved}
                />
                <span className="sr-only">Yellow</span>
              </label>

              <label
                htmlFor="ColorGold"
                className="block border border-gray-400 w-8 h-8 cursor-pointer rounded-full bg-orange-400 shadow-lg shadow-pink-500/50 hover:shadow-pink-500/80 hover:shadow-2xl transition-shadow duration-300 ease-in-out has-[:checked]:ring-2 has-[:checked]:ring-pink-500 has-[:checked]:ring-offset-2"
              >
                <input
                  type="radio"
                  name="ColorOption"
                  value="orange"
                  id="ColorGold"
                  className="sr-only"
                  onChange={() => setBgColor('orange')}
                  disabled={!isBackgroundRemoved}
                />
                <span className="sr-only">Orange</span>
              </label>

              {/* remove bg color input */}
              <label
                htmlFor="ColorNone"
                className="block border border-gray-400 w-8 h-8 cursor-pointer rounded-full bg-gray-800 shadow-lg shadow-pink-500/50 hover:shadow-pink-500/80 hover:shadow-2xl transition-shadow duration-300 ease-in-out has-[:checked]:ring-2 has-[:checked]:ring-pink-500 has-[:checked]:ring-offset-2"
              >
                <input
                  type="radio"
                  name="ColorOption"
                  value="none"
                  id="ColorNone"
                  className="sr-only"
                  onChange={() => setBgColor('none')}
                  disabled={!isBackgroundRemoved}
                />
              </label>
            </fieldset>
          </div>

          {/* Download button */}
          <button
            onClick={handleDownload}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Download Image
          </button>
        </div>
      </div>
    </div>
  );
}

export default RemoveBgPage;
