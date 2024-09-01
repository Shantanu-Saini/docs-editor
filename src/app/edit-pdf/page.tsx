"use client";
import React, { useState } from "react";
import axios from 'axios';
import { BiArrowBack } from "react-icons/bi";
import Link from "next/link";

function UserPDFPage() {
    const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file || file.type !== 'application/pdf') {
            console.log("No file uploaded or file type is incorrect.");
            return;
        }

        setIsUploading(true);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('/api/userfile', formData);
            const data = response.data;
            setUploadedFileUrl(`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${data.publicId}`);
        } catch (error) {
            console.log("Error uploading file:", error);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="min-h-screen min-w-full px-4 py-16 sm:px-6 lg:px-8 bg-gray-800 flex flex-col items-center justify-center sm:space-y-8 space-x-4">
            <div className="absolute top-20 left-10 space-x-2 flex items-center justify-center text-blue-500 hover:text-blue-400 duration-300">
                <BiArrowBack />
                <Link href='/dashboard' className='underline'>Dashboard</Link>
            </div>
            <h1 className="sm:text-4xl text-2xl font-medium text-gray-200 text-center mb-8">Upload <span className='text-red-600'>PDF</span></h1>
            <div className="mx-auto w-fit">
                <div className="mb-8">
                    <label
                        htmlFor="pdf"
                        className="block text-lg font-medium text-gray-200 mb-2"
                    >
                        Choose a PDF:
                    </label>
                    <input
                        type="file"
                        name="pdf"
                        onChange={handleFileUpload}
                        accept="application/pdf"
                        className="block w-full rounded-lg border-gray-300 p-4 text-sm shadow-sm cursor-pointer bg-gray-700 hover:border-red-600 focus:outline-none focus:ring focus:ring-red-500 focus:border-red-500 transition"
                    />
                </div>
                <div className="mb-8">
                    <h2 className="text-lg font-semibold text-gray-300 mb-4">
                        Preview:
                    </h2>
                    {isUploading ? (
                        <div className="flex items-center justify-center">
                            <div className="relative">
                                <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
                                <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
                            </div>
                        </div>
                    ) : (
                        uploadedFileUrl && (
                            <div className="mt-4">
                                <h2 className="text-lg font-semibold">Preview:</h2>
                                <a href={uploadedFileUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                                    View Uploaded PDF
                                </a>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserPDFPage;
