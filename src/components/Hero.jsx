import Link from "next/link";

function Hero() {
    return (
        <section className="flex items-center justify-center min-h-screen bg-gray-800">
            <div className="text-center max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
                <h1 className="text-red-600 font-semibold text-5xl mb-4">Pretty Good Docs</h1>
                <h2 className="text-gray-300">
                   <span className="text-xl sm:text-2xl lg:text-3xl">Edit Your Documents</span>
                    <br />
                    <span className="text-red-600 text-2xl sm:text-3xl">Anytime, Anywhere</span>
                </h2>

                <p className="mt-4 text-gray-300 text-lg">
                    Streamline your document editing process with our easy-to-use <i className="text-2xl font-bold">Pretty Good Docs</i>.
                    Whether you're on the go or working from home, securely edit your any
                    document with just a few clicks.
                    digitally and save time.
                </p>

                <Link
                    href="/login"
                    className="mt-8 inline-block rounded bg-red-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-red-700 focus:outline-none focus:ring focus:ring-yellow-400"
                >
                    Get Started
                </Link>
            </div>
       </section>
    );
}

export default Hero;
