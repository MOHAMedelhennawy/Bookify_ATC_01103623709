import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

export default function FilterationBar() {
  return (
    <div className="flex justify-center w-full  bg-[#111827] shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-7xl px-4 gap-4 md:gap-0">
        <div className="flex gap-4 items-center md:gap-5 w-full md:w-auto">
          <div className="flex items-center gap-3 bg-[#1f2937] text-[#9ca3af] border border-none rounded-lg px-4 py-1 w-full md:w-56 transition-all">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="text-[#9ca3af]" />
            <input
              type="search"
              name="title"
              id="title"
              placeholder="Search events..."
              className="bg-transparent text-[#9ca3af] placeholder:text-gray-500 outline-none flex-1"
            />
          </div>
          <div>
            <select
              name="category"
              id="category"
              className="bg-[#1f2937] text-[#9ca3af] border border-none rounded-lg px-4 py-1 w-full md:w-40 focus:outline-none focus:ring-2 transition"
            >
              <option value="Music">Music</option>
              <option value="Art">Art</option>
              <option value="Sports">Sports</option>
              <option value="Tech">Tech</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        <div className="flex gap-3 md:gap-6 w-full md:w-auto justify-center md:justify-end">
          <button className="px-5 py-1.5 rounded-lg focus:bg-[#3b82f6] bg-[#1f2937] hover:bg-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb] transition font-medium text-[#d1d5db]">Name</button>
          <button className="px-5 py-1.5 rounded-lg focus:bg-[#3b82f6] bg-[#1f2937] hover:bg-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb] transition font-medium text-[#d1d5db]">Price</button>
          <button className="px-5 py-1.5 rounded-lg focus:bg-[#3b82f6] bg-[#1f2937] hover:bg-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb] transition font-medium text-[#d1d5db]">Date</button>
        </div>
      </div>
    </div>
  )
}
