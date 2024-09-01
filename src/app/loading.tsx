"use client"
import React from 'react'

function loading() {
    return (
        <div className='min-h-screen min-w-full flex items-center justify-center bg-gray-600'>
            <div className="rounded-md h-12 w-12 border-4 border-t-4 border-blue-500 animate-spin absolute"></div>
        </div>
    )
}

export default loading