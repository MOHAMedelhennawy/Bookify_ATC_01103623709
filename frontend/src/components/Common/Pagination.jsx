import React, { useState } from 'react';

export default function Pagination({ totalPages = 5 }) {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="flex gap-2 justify-center py-4 bg-[#111827]">
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded bg-gray-700 text-white disabled:opacity-50"
      >
        Previous
      </button>
      {[...Array(totalPages)].map((_, idx) => (
        <button
          key={idx + 1}
          onClick={() => handlePageClick(idx + 1)}
          className={`px-3 py-1 rounded ${currentPage === idx + 1 ? 'bg-blue-600 text-white' : 'bg-gray-700 text-white'}`}
        >
          {idx + 1}
        </button>
      ))}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded bg-gray-700 text-white disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
