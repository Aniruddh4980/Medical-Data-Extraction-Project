import React from 'react';
import { FaFileMedical } from 'react-icons/fa';

export const Header: React.FC = () => {
  return (
    <header className="w-full bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-xs">
      <div className="flex items-center gap-3">
        <div className="bg-blue-600 text-white p-2 rounded-lg shadow-sm">
          <FaFileMedical className="text-xl" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight m-0 leading-none">
            OCR Document Extractor
          </h1>
          <p className="text-xs text-gray-500 mt-1 font-medium">
            Extract structured medical data from PDFs using AI
          </p>
        </div>
      </div>
    </header>
  );
};
