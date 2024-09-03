"use client"
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import axios from 'axios';

function ForgetPasswordPage() {
    const [email, setEmail] = useState('');
    const [sending, setSending] = useState(false);

    const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSending(true);

        try {
            const response = await axios.post('/api/forget-password', { email });
            if (response.status === 200) {
                toast.success(response.data.message);
            } else {
                toast.error('Failed to send reset link');
            }
        } catch (error) {
            toast.error('An error occurred while sending the reset link');
        }
        finally {
            setSending(false);
        }
    };
    return (
        <div className="min-w-full min-h-screen px-4 py-16 sm:px-6 lg:px-8 bg-gray-800">
            <div className="mx-auto max-w-lg">
                <h1 className="text-center text-2xl font-semibold text-red-600 sm:text-4xl">Reset Password</h1>

                <p className="mx-auto mt-4 max-w-md text-center text-gray-300">
                    Follow the process to recover your password securely
                </p>

                <form onSubmit={handleForgotPassword} className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 bg-gray-900">
                    <p className="text-center text-2xl font-normal text-gray-200">Reset your account Password</p>
                    <div>
                        <label htmlFor="email" className="sr-only">Email</label>

                        <div className="relative">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:outline-none"
                                placeholder="Enter your email"
                                required
                                onChange={(e) => setEmail(e.target.value)}
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

                    <button
                        type="submit"
                        className={`block w-full rounded-lg px-5 py-3 text-sm font-medium text-white ${sending ? 'bg-red-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'}`}
                        disabled={sending} // Disable the button while sending
                    >
                        {sending ? 'Sending...' : 'Send Reset Link'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ForgetPasswordPage;