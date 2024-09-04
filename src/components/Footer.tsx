"use client";
import Link from "next/link";
import { BsGithub } from "react-icons/bs";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa6";

function Footer() {
    return (
        <footer className="bg-white dark:bg-gray-950">
            <div className="mx-auto max-w-screen-xl px-4 pb-8 pt-16 sm:px-6 lg:px-8 lg:pt-24">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-red-600 sm:text-5xl">
                        Pretty Good Docs
                    </h2>

                    <p className="mx-auto mt-4 max-w-sm text-gray-200">
                        A free online tool that allows you to Edit documents quickly and easily.
                    </p>
                    <br />
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                        &copy; {new Date().getFullYear()} Pretty Good Docs. All rights reserved.
                    </p>
                </div>

                <div className="mt-16 border-t border-gray-100 pt-8 sm:flex sm:items-center sm:justify-between lg:mt-24 dark:border-gray-800">
                    <ul className="flex flex-wrap justify-center gap-4 text-xs lg:justify-end">
                        <li>
                            <a href="#" className="text-gray-500 transition hover:opacity-75 dark:text-gray-400">
                                Terms & Conditions
                            </a>
                        </li>

                        <li>
                            <a href="#" className="text-gray-500 transition hover:opacity-75 dark:text-gray-400">
                                Privacy Policy
                            </a>
                        </li>
                    </ul>

                    <ul className="mt-8 flex justify-center gap-6 sm:mt-0 lg:justify-end">
                        <li>
                            <Link
                                href="https://www.instagram.com/whoshantanu_"
                                rel="noreferrer"
                                target="_blank"
                                className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                            >
                                <FaInstagram className="text-2xl" />

                            </Link>
                        </li>

                        <li>
                            <Link
                                href="https://github.com/Shantanu-Saini"
                                rel="noreferrer"
                                target="_blank"
                                className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                            >
                                <BsGithub className="text-2xl" />
                            </Link>
                        </li>

                        <li>
                            <Link
                                href="https://www.linkedin.com/in/shantanu-saini-525a9a27a/"
                                rel="noreferrer"
                                target="_blank"
                                className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                            >
                                <FaLinkedinIn className="text-2xl" />
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
