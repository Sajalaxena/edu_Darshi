import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function AdminPagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const renderPages = () => {
    const pages = [];
    const maxVisible = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = startPage + maxVisible - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    if (startPage > 1) {
      pages.push(<button key="1" onClick={() => onPageChange(1)} className="px-3 py-1 rounded text-sm text-slate-600 hover:bg-slate-100">1</button>);
      if (startPage > 2) pages.push(<span key="dots-1" className="px-2 py-1 text-slate-400">...</span>);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-3 py-1 rounded text-sm font-medium ${currentPage === i ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push(<span key="dots-2" className="px-2 py-1 text-slate-400">...</span>);
      pages.push(<button key={totalPages} onClick={() => onPageChange(totalPages)} className="px-3 py-1 rounded text-sm text-slate-600 hover:bg-slate-100">{totalPages}</button>);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200">
      <p className="text-sm text-slate-500">
        Page <span className="font-medium text-slate-700">{currentPage}</span> of <span className="font-medium text-slate-700">{totalPages}</span>
      </p>
      <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg p-1">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="p-1 rounded text-slate-500 hover:bg-white hover:text-slate-700 hover:shadow-sm disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:shadow-none transition-all"
        >
          <ChevronLeft size={18} />
        </button>
        {renderPages()}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="p-1 rounded text-slate-500 hover:bg-white hover:text-slate-700 hover:shadow-sm disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:shadow-none transition-all"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
