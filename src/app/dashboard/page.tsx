"use client"
import React from 'react'
import { FaRegFilePdf } from "react-icons/fa6";
import { FaRegFileImage } from "react-icons/fa";
import { PiSignatureFill } from "react-icons/pi";
import Link from 'next/link';

function DashboardPage() {
    return (
        <section className="flex items-center justify-center min-h-screen min-w-full bg-gray-800">
            <div className="text-center max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
                <h2 className="font-semibold text-2xl sm:text-4xl lg:text-5xl text-gray-200">
                    <span className='text-red-600'>Tools</span> you need for your work
                </h2>

                <div className="mt-8 grid grid-cols-1 gap-8 md:mt-16 md:gap-12 sm:grid-cols-2">
                    {/* Edit PDF */}
                    {/* <Link href='/edit-pdf' className="block rounded-xl border bg-gray-700 border-gray-100 p-8 shadow-2xl transition hover:shadow-pink-500/10">
                        <div className='bg-gray-900 p-4 rounded-md w-fit'>
                            <FaRegFilePdf className='text-3xl text-white' />
                        </div>
                        <div>
                            <h2 className="mt-4 text-xl font-bold text-white">Edit <span className='text-red-600'>PDF</span></h2>
                            <p className="mt-1 text-sm text-gray-300">
                                Quickly edit your PDF documents. Easiest and most secure way to edit contracts, agreements, and other official documents.
                            </p>
                        </div>
                    </Link> */}

                    {/* Edit Image */}
                    <Link href='/edit-image' className="block rounded-xl border bg-gray-700 border-gray-100 p-8 shadow-2xl transition hover:shadow-pink-500/10">
                        <div className='bg-gray-900 p-4 rounded-md w-fit'>
                            <FaRegFileImage className='text-3xl text-white' />
                        </div>
                        <div>
                            <h2 className="mt-4 text-xl font-bold text-white">Edit <span className='text-red-600'>Image</span></h2>
                            <p className="mt-1 text-sm text-gray-300">
                                Easily edit your image files with multiple features, whether they are scanned documents, photographs, or other images.
                            </p>
                        </div>
                    </Link>

                    {/* Generate Signature */}
                    <Link href='/generate-sign' className="block rounded-xl border bg-gray-700 border-gray-100 p-8 shadow-2xl transition hover:shadow-pink-500/10">
                        <div className='bg-gray-900 p-4 rounded-md w-fit'>
                            <PiSignatureFill className='text-3xl text-white' />
                        </div>
                        <div>
                            <h2 className="mt-4 text-xl font-bold text-white">Generate <span className='text-red-600'>Signature</span></h2>
                            <p className="mt-1 text-sm text-gray-300">
                                Create a digital signature from scratch. Use it for signing any document or form, and ensure your digital presence is secure.
                            </p>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default DashboardPage
