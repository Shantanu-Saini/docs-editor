"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { BiArrowBack } from 'react-icons/bi';
import Link from 'next/link';

function AddSignaturePage() {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [signature, setSignature] = useState<HTMLImageElement | null>(null);
    const [signaturePosition, setSignaturePosition] = useState({ x: 0, y: 0 });
    const [signatureSize, setSignatureSize] = useState(100);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const router = useRouter();
    const params = useSearchParams();
    const image = params.get('image');

    useEffect(() => {
        if (image) {
            const fetchProxiedImage = async () => {
                try {
                    const response = await axios.get(`/api/get-proxy-img?imageUrl=${encodeURIComponent(`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${image}.jpg`)}`);
                    setImageSrc(response.data.data_url);
                } catch (error) {
                    console.error("Failed to fetch proxied image", error);
                }
            };

            fetchProxiedImage();
        }
    }, [image]);

    const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0];
        if (!file) return;
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => setSignature(img);
    };

    const handleDownload = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.toBlob((blob) => {
                if (blob) {
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    link.download = 'signed_image.png';
                    link.click();
                }
            }, 'image/png');
        }
    };


    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas || !signature) return;

        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;   // Scale factor for x-axis
        const scaleY = canvas.height / rect.height; // Scale factor for y-axis

        const x = (e.clientX - rect.left) * scaleX - (signature.width * (signatureSize / 100)) / 2;
        const y = (e.clientY - rect.top) * scaleY - (signature.height * (signatureSize / 100)) / 2;

        setSignaturePosition({ x, y });
    };


    useEffect(() => {
        if (imageSrc && signature) {
            const canvas = canvasRef.current;
            const ctx = canvas?.getContext('2d');
            if (ctx) {
                const img = new Image();
                img.src = imageSrc;
                img.onload = () => {
                    const maxWidth = 800;
                    const maxHeight = 600;
                    let width = img.width;
                    let height = img.height;

                    if (width > maxWidth || height > maxHeight) {
                        const aspectRatio = width / height;
                        if (width > height) {
                            width = maxWidth;
                            height = maxWidth / aspectRatio;
                        } else {
                            height = maxHeight;
                            width = maxHeight * aspectRatio;
                        }
                    }

                    canvas!.width = width;
                    canvas!.height = height;

                    ctx.clearRect(0, 0, canvas!.width, canvas!.height);
                    ctx.drawImage(img, 0, 0, width, height);

                    ctx.drawImage(
                        signature,
                        signaturePosition.x,
                        signaturePosition.y,
                        signature.width * (signatureSize / 100),
                        signature.height * (signatureSize / 100)
                    );
                };
            }
        }
    }, [imageSrc, signature, signaturePosition, signatureSize]);


    return (
        <div className="min-h-screen min-w-full px-4 py-16 sm:px-6 lg:px-8 bg-gray-800 flex flex-col items-center justify-center">
            <div className="absolute top-20 left-10 space-x-2 flex items-center justify-center text-blue-500 hover:text-blue-400 duration-300">
                <BiArrowBack />
                <Link href='/edit-image' className='underline'>Go back</Link>
            </div>
            <h1 className="sm:text-4xl text-2xl font-medium text-gray-200 text-center mb-8">
                Add Your <span className='text-red-600'>Signature</span>
            </h1>
            <div className="mx-auto w-fit">
                <div className="my-4">
                    <input
                        type="file"
                        onChange={handleSignatureUpload}
                        accept="image/png"
                        ref={inputRef}
                        className="block w-full rounded-lg border-gray-300 p-4 text-sm shadow-sm cursor-pointer bg-gray-700 hover:border-red-600 focus:outline-none focus:ring focus:ring-red-500 focus:border-red-500 transition"
                    />
                    <div className="flex sm:flex-row flex-col items-center justify-between space-x-4">
                        <label htmlFor="size" className="block text-gray-200 text-2xl font-semibold mb-2">Signature Size:</label>
                        <input
                            id="size"
                            type="range"
                            min="10"
                            max="200"
                            value={signatureSize}
                            onChange={(e) => setSignatureSize(parseInt(e.target.value))}
                            className="w-full"
                        />
                    </div>
                    <canvas
                        ref={canvasRef}
                        onMouseDown={handleMouseDown}
                        style={{ border: '1px solid black', maxWidth: '100%', maxHeight: '100%' }}
                    />
                </div>
                <button
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleDownload}
                    disabled={!imageSrc || !signature}
                >
                    Download Signed Image
                </button>
            </div>
        </div>
    );
}

export default AddSignaturePage;