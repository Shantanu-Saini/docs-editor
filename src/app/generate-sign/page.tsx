"use client";
import React, { useState, useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

function UserSignPage() {
    const signatureRef = useRef<SignatureCanvas | null>(null);
    const [penColor, setPenColor] = useState("black");

    const handleClearButton = () => {
        signatureRef.current?.clear();
    };

    const handleSaveButton = () => {
        console.log("Save functionality will be implemented here.");
    };

    const handleDownloadButton = () => {
        if (signatureRef.current) {
            const signatureData = signatureRef.current
                .getTrimmedCanvas()
                .toDataURL("image/png");

            // Generate a unique name with the current date and time
            const now = new Date();
            const date = now.toISOString().split('T')[0];
            const time = now.toTimeString().split(' ')[0].replace(/:/g, '');
            const signatureName = `signature_${date}_${time}.png`;

            // Create a temporary anchor element to trigger download
            const downloadLink = document.createElement("a");
            downloadLink.href = signatureData;
            downloadLink.download = signatureName;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        }
    };


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 space-y-4 p-4">
            <h1 className="sm:text-4xl text-2xl font-medium text-gray-200 text-center">
                Generate Your <span className='text-red-600'>Signature</span>
            </h1>

            <select
                name="penColor"
                id="penColor"
                value={penColor}
                onChange={(e) => setPenColor(e.target.value)}
                className="rounded border-gray-300 bg-gray-700 text-white shadow-md p-2 text-lg focus:outline-none"
            >
                <option value="black" className="bg-black text-white">
                    Black
                </option>
                <option value="red" className="bg-red-700 text-white">
                    Red
                </option>
                <option value="blue" className="bg-blue-900 text-white">
                    Blue
                </option>
                <option value="green" className="bg-green-700 text-white">
                    Green
                </option>
            </select>

            <div className="border-2 border-gray-800 shadow-lg rounded w-full max-w-lg bg-white">
                <SignatureCanvas
                    penColor={penColor}
                    // dotSize={6}
                    throttle={6}
                    ref={signatureRef}
                    canvasProps={{
                        className: "sigCanvas w-full h-full",
                        style: { width: "100%", height: "auto", minHeight: "250px" },
                    }}
                />
            </div>

            <div className="space-x-4">
                <button
                    onClick={handleClearButton}
                    className="inline-block shadow-md rounded bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 focus:outline-none"
                >
                    Clear
                </button>
                <button
                    onClick={handleSaveButton}
                    className="inline-block shadow-md rounded bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none "
                >
                    Save
                </button>
                <button
                    onClick={handleDownloadButton}
                    className="inline-block shadow-md rounded bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700 focus:outline-none"
                >
                    Download
                </button>
            </div>
        </div>
    );
}

export default UserSignPage;
