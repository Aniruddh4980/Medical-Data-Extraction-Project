import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface NavigationBarProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  disabled = false,
}) => {
  return (
    <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-4 w-full">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1 || disabled}
        className="flex items-center gap-1.5 px-3 py-2 bg-gray-50 text-gray-700 font-semibold rounded-md border border-gray-200 transition hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-50 text-sm"
      >
        <FaChevronLeft className="text-xs" />
        <span>Previous</span>
      </button>

      <span className="text-sm font-semibold text-gray-600">
        Page {currentPage} of {totalPages || 1}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages || disabled}
        className="flex items-center gap-1.5 px-3 py-2 bg-gray-50 text-gray-700 font-semibold rounded-md border border-gray-200 transition hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-50 text-sm"
      >
        <span>Next</span>
        <FaChevronRight className="text-xs" />
      </button>
    </div>
  );
};
