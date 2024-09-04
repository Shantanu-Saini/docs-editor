"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import logo from '../../public/logo.png';

function Header() {
    const { user, isAuthenticated } = useAuth();
    const [userInitial, setUserInitial] = useState<string>('');

    useEffect(() => {
        if (isAuthenticated && user?.name) {
            const initials = user.name.split(' ').map(name => name[0]).join('') || 'U';
            setUserInitial(initials);
        }
    }, [isAuthenticated, user?.name]);

    console.log("Navbar username", user?.name);
    console.log("Navbar Authe", isAuthenticated);

    return (
        <header className="bg-gray-950 top-0 left-0 sticky opacity-90">
            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* left section */}
                    <div>
                        <Link className="text-red-600 flex items-center justify-between space-x-3" href="/">
                            <Image
                                src={logo}
                                alt="logo-pgd"
                                className="sm:h-12 h-9 w-auto"
                            />
                            <h1 className="text-red-600 sm:text-2xl text-xl font-medium">Pretty Good Docs</h1>
                        </Link>
                    </div>

                    {/* right section */}
                    <div className="flex items-center gap-4">
                        <div className="sm:flex sm:gap-4">
                            {isAuthenticated ? (
                                <Link
                                    className="rounded-full sm:px-3 py-1 px-2 text-xl font-medium text-red-600 bg-white"
                                    href="/profile"
                                >
                                    {userInitial}
                                </Link>
                            ) : (
                                <Link
                                    className="rounded-md bg-red-600 px-5 py-2.5 text-sm font-medium text-white shadow"
                                    href="/login"
                                >
                                    Login
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
