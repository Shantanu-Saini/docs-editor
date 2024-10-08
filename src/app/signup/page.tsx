"use client"
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"
import toast from "react-hot-toast";

function SignupPage() {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    })
    const router = useRouter();

    const handleSignupSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(user.password.length < 6) {
            toast.error("Password must be at least 6 characters");
        }
        console.log(user);
        try {
            const resp = await axios.post('/api/signup', user);
            console.log(resp);
            toast.success(resp.data.message);
            router.push('/login');
        } catch (error: any) {
            console.log(error.message, "Error in client signup");
            toast.error("Error in client signup");
        }
    }

    return (
        <div className="min-w-full min-h-screen px-4 py-16 sm:px-6 lg:px-8 bg-gray-800">
            <div className="mx-auto max-w-lg">
                <h1 className="text-center text-2xl font-semibold text-red-600 sm:text-4xl">Get started today</h1>

                <p className="mx-auto mt-4 max-w-md text-center text-gray-300">
                    Join us and start enjoying our services. Creating an account is quick and easy.
                </p>

                <form onSubmit={handleSignupSubmit} className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 bg-gray-900">
                    <p className="text-center text-2xl font-normal text-gray-200">Create your account</p>

                    <div>
                        <label htmlFor="name" className="sr-only">Name</label>

                        <div className="relative">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:outline-none"
                                placeholder="Enter your name"
                                value={user.name}
                                onChange={(e) => setUser({ ...user, name: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="sr-only">Email</label>

                        <div className="relative">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:outline-none"
                                placeholder="Enter your email"
                                value={user.email}
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                            />

                            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="size-4 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                    />
                                </svg>
                            </span>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>

                        <div className="relative">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:outline-none"
                                placeholder="Enter your password"
                                value={user.password}
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="block w-full rounded-lg bg-red-600 px-5 py-3 text-sm font-medium text-white hover:bg-red-700"
                    >
                        Sign up
                    </button>

                    <p className="text-center text-sm text-gray-300">
                        Already have an account?
                        <Link className="underline" href="/login">Log in</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default SignupPage
