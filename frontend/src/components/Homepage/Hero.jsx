import React, { useRef, useState } from 'react'

export default function Hero() {
  const heroRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0, inside: false });

  // Handle mouse movement
  const handleMouseMove = (e) => {
    const rect = heroRef.current.getBoundingClientRect();
    setMouse({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      inside: true
    });
  };

  const handleMouseLeave = () => {
    setMouse((m) => ({ ...m, inside: false }));
  };

  // Spotlight mask style for the colored grid
  const spotlightGridStyle = mouse.inside
    ? {
        pointerEvents: 'none',
        position: 'absolute',
        inset: 0,
        zIndex: 5,
        backgroundImage:
          'linear-gradient(rgb(0, 153, 255) 1px, transparent 1px), linear-gradient(to right, rgb(0, 153, 255) 1px, transparent 1px)', // yellow grid
        backgroundSize: '30px 30px',
        maskImage: `radial-gradient(circle 100px at ${mouse.x}px ${mouse.y}px, white 3%, transparent 100%)`,
        WebkitMaskImage: `radial-gradient(circle 180px at ${mouse.x}px ${mouse.y}px, white 3%, transparent 100%)`,
        opacity: 1,
        transition: 'mask-image 0.1s, -webkit-mask-image 0.1s',
      }
    : { display: 'none' };

  return (
    <div>
      <div
        ref={heroRef}
        className="min-h-screen relative overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Base Grid Pattern Background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: '#e5e5f7',
            opacity: 1,
            backgroundImage:
              'linear-gradient(#444cf7 1px, transparent 1px), linear-gradient(to right,rgb(0, 60, 255) 1px,rgb(128, 128, 168) 1px)',
            backgroundSize: '30px 30px',
            zIndex: 1,
          }}
        ></div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 opacity-90" style={{zIndex: 5}}></div>

        {/* Spotlight Grid Overlay */}
        <div style={spotlightGridStyle}></div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white mb-6">
              Welcome to <span className="text-[#4973ff]">Bookify</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Discover and book amazing events in your area. From concerts to workshops, find your next unforgettable experience with Bookify.
            </p>
            <div className="flex gap-4 justify-center">
              <button className="bg-[#4973ff] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#3d5fd9] transition-colors">
                Browse Events
              </button>
              <button className="border-2 border-[#4973ff] text-[#4973ff] px-8 py-3 rounded-lg font-medium hover:bg-[#4973ff] hover:text-white transition-colors">
                Learn More
              </button>
            </div>
          </div>

          <div className="mt-20 grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
              <div className="w-12 h-12 bg-[#4973ff] rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Easy Discovery</h3>
              <p className="text-gray-300">Find events that match your interests with our smart search and filtering system.</p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
              <div className="w-12 h-12 bg-[#4973ff] rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Quick Booking</h3>
              <p className="text-gray-300">Book your tickets in seconds with our streamlined booking process.</p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
              <div className="w-12 h-12 bg-[#4973ff] rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Secure & Reliable</h3>
              <p className="text-gray-300">Your bookings are safe with our secure payment system and reliable service.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
