import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFont, faDollarSign, faCalendarAlt, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default function FilterationBar({ filters, onFilterChange }) {
  const [ currentSortIdx, setCurrentSortIdx ] = useState(0);

  const sortingOrders = ['asc', 'desc'];

  const toggleSortingOrder = () => {
    const newIdx = 0 + !currentSortIdx // 0 + to convert boolean to index;
    setCurrentSortIdx(newIdx);
    console.log('Toggling sorting order:', sortingOrders[newIdx]);
    return sortingOrders[newIdx];
  }
  
  return (
    <div className="flex justify-center w-full shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-7xl px-4 gap-4 md:gap-0">
        <div className="flex gap-4 items-center md:gap-5 w-full md:w-auto">
          <div className="flex items-center gap-3 bg-[#1f2937] text-[#9ca3af] border border-none rounded-lg px-4 py-1 w-full md:w-56 transition-all">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="text-[#9ca3af]" />
            <input
              type="search"
              name="title"
              id="title"
              placeholder="Search events..."
              value={filters.search || ''}
              className="bg-transparent text-[#9ca3af] placeholder:text-gray-500 outline-none flex-1"
              onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
            />
          </div>
          <div>
            <select
              name="category"
              id="category"
              value={filters.category || ''}
              className="bg-[#1f2937] text-[#9ca3af] border border-none rounded-lg px-4 py-1 w-full md:w-40 focus:outline-none focus:ring-2 transition"
              onChange={(e) => onFilterChange({ ...filters, category: e.target.value})}
            >
              <option value="">All</option>
              <option value="Music">Music</option>
              <option value="Art">Art</option>
              <option value="Sports">Sports</option>
              <option value="Tech">Tech</option>
            </select>
          </div>
        </div>
        <div className="flex gap-3 md:gap-3 w-full md:w-auto justify-center md:justify-end">
          <button
            className={`px-5 py-1.5 rounded-lg focus:bg-[#3b82f6] hover:bg-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb] transition font-medium text-[#d1d5db] flex items-center gap-2 ${filters.sort === 'title' ? 'bg-[#3b82f6]' : 'bg-[#1f2937]'}`}
            onClick={() => onFilterChange({ ...filters, sort: ['title', toggleSortingOrder()] })}
          >
            <FontAwesomeIcon icon={faFont} className="text-[#9ca3af]" />
            Name
          </button>
          <button
            className={`px-5 py-1.5 rounded-lg focus:bg-[#3b82f6] hover:bg-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb] transition font-medium text-[#d1d5db] flex items-center gap-2 ${filters.sort === 'price' ? 'bg-[#3b82f6]' : 'bg-[#1f2937]'}`}
            onClick={() => onFilterChange({ ...filters, sort: ['price', toggleSortingOrder()] })}
          >
            <FontAwesomeIcon icon={faDollarSign} className="text-[#9ca3af]" />
            Price
          </button>
          <button
            className={`px-5 py-1.5 rounded-lg focus:bg-[#3b82f6] hover:bg-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb] transition font-medium text-[#d1d5db] flex items-center gap-2 ${filters.sort === 'date' ? 'bg-[#3b82f6]' : 'bg-[#1f2937]'}`}
            onClick={() => onFilterChange({ ...filters, sort: ['date', toggleSortingOrder()] })}
          >
            <FontAwesomeIcon icon={faCalendarAlt} className="text-[#9ca3af]" />
            Date
          </button>
        </div>
      </div>
    </div>
  )
}
