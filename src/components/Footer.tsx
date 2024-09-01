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
                            <a
                                href="#"
                                rel="noreferrer"
                                target="_blank"
                                className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                            >
                                <span className="sr-only">Instagram</span>

                                <svg className="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path
                                        fillRule="evenodd"
                                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </a>
                        </li>

                        <li>
                            <a
                                href="#"
                                rel="noreferrer"
                                target="_blank"
                                className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                            >
                                <span className="sr-only">GitHub</span>

                                <svg className="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path
                                        fillRule="evenodd"
                                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.918.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .268.18.579.688.481C19.138 20.192 22 16.439 22 12.017 22 6.484 17.523 2 12 2z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </a>
                        </li>

                        <li>
                            <a
                                href="#"
                                rel="noreferrer"
                                target="_blank"
                                className="text-gray-700 transition hover:opacity-75 dark:text-gray-200"
                            >
                                <span className="sr-only">LinkedIn</span>

                                <svg className="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path
                                        fillRule="evenodd"
                                        d="M6.94 5.12a2.94 2.94 0 110 5.88 2.94 2.94 0 010-5.88zm.024 1.82a1.116 1.116 0 100 2.232 1.116 1.116 0 000-2.232zm8.052 7.6v-3.268c0-.845-.017-1.926-1.172-1.926-1.176 0-1.358.918-1.358 1.862v3.332H10.98V9.668h2.033v.884h.028a2.228 2.228 0 012.007-1.103c2.15 0 2.545 1.415 2.545 3.256v4.857h-2.033zm-7.028-6.9h2.033v8.76h-2.033zm9.952 0c-.025-.004-.063-.01-.096-.016a2.937 2.937 0 00-.984-.065c-1.13.023-2.52.533-2.52 2.126v5.673h2.033v-5.692c0-.964.195-1.604 1.389-1.604 1.165 0 1.254.895 1.254 1.65v5.646h2.033v-6.716h-.008c-.01-1.358-.26-2.72-1.122-3.568-.882-.868-2.083-1.029-2.515-1.075zm-.008-6.9H6.926c-.295 0-.517.236-.517.518V5.8c0 .286.22.51.517.51h8.008c.295 0 .517-.224.517-.51V2.558a.513.513 0 00-.517-.518z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
