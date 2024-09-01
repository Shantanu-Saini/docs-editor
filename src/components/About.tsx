function About() {
    return (
        <div className="min-w-full px-4 py-8 sm:px-6 sm:py-12 lg:px-8 bg-gray-800">
            <dl
                className="mt-6 grid grid-cols-1 gap-4 divide-y divide-gray-500 sm:mt-8 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4"
            >
                <div className="flex flex-col px-4 py-8 text-center">
                    <dt className="order-last text-lg font-medium text-gray-300">E-Signature Capabilities</dt>

                    <dd className="text-4xl font-extrabold text-red-600 md:text-5xl">Effortless</dd>
                </div>

                <div className="flex flex-col px-4 py-8 text-center">
                    <dt className="order-last text-lg font-medium text-gray-300">Document Security</dt>

                    <dd className="text-4xl font-extrabold text-red-600 md:text-5xl">Protected</dd>
                </div>

                <div className="flex flex-col px-4 py-8 text-center">
                    <dt className="order-last text-lg font-medium text-gray-300">Ease of Use</dt>

                    <dd className="text-4xl font-extrabold text-red-600 md:text-5xl">Intuitive</dd>
                </div>

                <div className="flex flex-col px-4 py-8 text-center">
                    <dt className="order-last text-lg font-medium text-gray-300">Compatibility</dt>

                    <dd className="text-4xl font-extrabold text-red-600 md:text-5xl">Versatile</dd>
                </div>
            </dl>
        </div>
    )
}

export default About
