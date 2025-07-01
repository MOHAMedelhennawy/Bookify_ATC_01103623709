import React from 'react'

export default function EventCard({ event }) {
  const date = new Date(event.date).toLocaleDateString('en-US', {
    year: "numeric",
    month: "short",
    day: "numeric"
  });

  const time = new Date(event.date).toLocaleTimeString('en-Us');

  return (
    <div className="bg-[#1f2937] rounded-xl shadow-md overflow-hidden flex flex-col border border-[#2d3748]">
      <img
        src={`/images/events/${event.imageUrl}`}
        alt={event.title}
        className="h-40 w-full object-cover hover:scale-105 transition-transform duration-300"
      />
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3 className="text-lg font-semibold text-white truncate">{event.title}</h3>
        <div className='flex flex-col text-[#9ca3af] text-sm space-y-1'>
          <div className='flex items-center gap-2'>
            <svg className="w-4 h-4 text-[#3b82f6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{date}</span>
          </div>
          <div className='flex items-center gap-2'>
            <svg className="w-4 h-4 text-[#3b82f6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{time}</span>
          </div>
          <div className='flex items-center gap-2'>
            <svg className="w-4 h-4 text-[#3b82f6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{event.address}, {event.location}</span>
          </div>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-[#3b82f6] ">View Details</span>
          <div>
            <button className='text-white bg-[#3b82f6] py-1 px-2 rounded-lg'>Book Now</button>
          </div>
        </div>
      </div>
    </div>
  )
}
