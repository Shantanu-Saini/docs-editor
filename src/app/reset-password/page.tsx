"use client"
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';

function ResetPasswordPage() {
    const params = useSearchParams();
    const token = params.get('token');
    const router = useRouter();
    const [password, setPassword] = useState('');

    const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(password.length < 6){
            toast.error('Password must be at least 6 characters');
        }

        try {
            const response = await axios.post('/api/reset-password', { token, password });
            if (response.status === 200) {
                toast.success('Password reset successfully');
                router.push('/login');
            } else {
                toast.error('Failed to reset password');
            }
        } catch (error) {
            toast.error('An error occurred while resetting the password');
        }
    };

    return (
        <div className="min-w-full min-h-screen px-4 py-16 sm:px-6 lg:px-8 bg-gray-800">
            <div className="mx-auto max-w-lg">
                <h1 className="text-center text-2xl font-semibold text-red-600 sm:text-4xl">Reset Password</h1>

                <form onSubmit={handleResetPassword} className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 bg-gray-900">
                    <div>
                        <label htmlFor="password" className="sr-only">New Password</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:outline-none"
                            placeholder="Enter your new password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="block w-full rounded-lg bg-red-600 px-5 py-3 text-sm font-medium text-white hover:bg-red-700"
                    >
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ResetPasswordPage;
