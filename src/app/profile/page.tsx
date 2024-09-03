"use client"
import axios from "axios"
import React from "react";
import { useRouter } from "next/navigation"
import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";
import { CiLogout } from "react-icons/ci";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

function ProfilePage() {
    const { user, isAuthenticated, logout } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            const resp = await axios.post('/api/logout');
            console.log(resp.data);
            toast.success(resp.data.message);
            logout();  // Update the context state
            router.push('/login');
        } catch (error: any) {
            console.log("Error in logout Client !!!");
            toast.error("Error in logout");
        }
    }

    console.log(user, "Profile page user");
    console.log(isAuthenticated, "Profile page Authe");
    

    return (
        <div className='min-h-screen min-w-full flex flex-col items-center justify-center bg-gray-800 space-y-4'>
            <div className="absolute top-20 left-10 space-x-2 flex items-center justify-center text-blue-500 hover:text-blue-400 duration-300">
                <BiArrowBack />
                <Link href='/dashboard' className='underline'>Dashboard</Link>
            </div>
            <div className="overflow-hidden shadow-lg rounded-lg border bg-gray-700">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-2xl leading-6 font-medium text-gray-200 ">
                        Profile
                    </h3>
                    <p className="mt-1 max-w-2xl text-base text-gray-300">
                        Your Account Information
                    </p>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                    {user ? (
                        <dl className="sm:divide-y sm:divide-gray-200">
                            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-lg text-gray-300">Full name</dt>
                                <dd className="mt-1 text-lg text-gray-200 sm:mt-0 sm:col-span-2 font-medium">
                                    {user.name}
                                </dd>
                            </div>
                            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-lg text-gray-300">Email address</dt>
                                <dd className="mt-1 text-lg text-gray-200 sm:mt-0 sm:col-span-2 font-medium">
                                    {user.email}
                                </dd>
                            </div>
                        </dl>
                    ) : (
                        <div className="flex items-center justify-center h-fit p-20">
                            <div className="relative">
                                <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200" />
                                <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-red-600 animate-spin"></div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="rounded-md bg-red-600 hover:bg-red-700 px-5 py-2.5 flex flex-row items-center justify-center space-x-2 duration-300">
                <CiLogout className="text-base font-semibold text-white" />
                <button
                    onClick={handleLogout}
                >
                    <span className="text-sm font-medium text-white">Logout</span>
                </button>
            </div>
        </div>
    )
}

export default ProfilePage;
