import React from 'react'

export default function Navbar() {
  return (
    <nav className="bg-gray-900 border-b border-gray-700">
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex pt-1 h-14 items-center justify-between">
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex shrink-0 items-center">
                <h1 className='text-[#4973ff] text-[1.7rem] font-medium' style={{fontFamily: 'Playfair Display, serif'}}>Bookify</h1>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                    <a href="/" className="rounded-md bg-[#4973ff] px-3 py-2 text-sm font-medium text-white" aria-current="page">Home</a>
                    <a href="#" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">Events</a>
                    <a href="/about" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">About</a>
                </div>
                </div>
            </div>
            <div className='flex gap-3'>
                <div>
                    <a href="/login" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
                        Login
                    </a>
                </div>
                <div>
                    <a href="/register" className="rounded-md bg-[#4973ff] px-3 py-2 text-sm font-medium text-white hover:bg-[#3d5fd9] transition-colors">
                        Register
                    </a>
                </div>
            </div>
        </div>
    </div>
    </nav>
  )
}
