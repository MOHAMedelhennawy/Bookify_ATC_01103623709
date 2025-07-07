import React, { useState } from 'react';

export default function Pagination({ numberOfEvents, limit, currentPage, setCurrentPage }) {
  const safeLimit = Number(limit) > 0 ? Number(limit) : 1;
  const safeNumberOfEvents = Number(numberOfEvents) >= 0 ? Number(numberOfEvents) : 0;
  const totalPages = Math.ceil(safeNumberOfEvents / safeLimit);

  // Don't render if no pages or invalid data
  if (totalPages <= 1 || !safeNumberOfEvents) return null;

  // Ensure currentPage is within bounds
  const safeCurrentPage = Math.min(Math.max(currentPage, 1), totalPages);

  // Function to generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    
    if (totalPages <= 7) {
      // If 7 or fewer pages, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      if (safeCurrentPage <= 4) {
        // Current page is near the beginning
        for (let i = 2; i <= Math.min(5, totalPages - 1); i++) {
          pages.push(i);
        }
        if (totalPages > 5) {
          pages.push('...');
        }
      } else if (safeCurrentPage >= totalPages - 3) {
        // Current page is near the end
        if (totalPages > 5) {
          pages.push('...');
        }
        for (let i = Math.max(2, totalPages - 4); i < totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Current page is in the middle
        pages.push('...');
        for (let i = safeCurrentPage - 1; i <= safeCurrentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
      }
      
      // Always show last page (if not already included)
      if (totalPages > 1 && !pages.includes(totalPages)) {
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex gap-2 justify-center py-4">
      <button
        onClick={() => setCurrentPage(Math.max(safeCurrentPage - 1, 1))}
        disabled={safeCurrentPage === 1}
        className="px-3 py-1 rounded bg-gray-700 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600"
      >
        Previous
      </button>
      
      {pageNumbers.map((pageNumber, index) => (
        <React.Fragment key={index}>
          {pageNumber === '...' ? (
            <span className="px-3 py-1 text-gray-400">...</span>
          ) : (
            <button
              onClick={() => setCurrentPage(pageNumber)}
              className={`px-3 py-1 rounded hover:bg-blue-700 cursor-pointer ${
                safeCurrentPage === pageNumber ? 'bg-blue-600 text-white' : 'bg-gray-700 text-white'
              }`}
            >
              {pageNumber}
            </button>
          )}
        </React.Fragment>
      ))}
      
      <button
        onClick={() => setCurrentPage(Math.min(safeCurrentPage + 1, totalPages))}
        disabled={safeCurrentPage === totalPages}
        className="px-3 py-1 rounded bg-gray-700 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600"
      >
        Next
      </button>
    </div>
  );
}
