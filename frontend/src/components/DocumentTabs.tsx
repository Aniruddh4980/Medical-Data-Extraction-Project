import React from 'react';
import type { DocumentType } from '../types/form';
import { FaPrescriptionBottleAlt, FaUserInjured } from 'react-icons/fa';

interface DocumentTabsProps {
  activeTab: DocumentType;
  onTabChange: (tab: DocumentType) => void;
  disabled?: boolean;
}

export const DocumentTabs: React.FC<DocumentTabsProps> = ({
  activeTab,
  onTabChange,
  disabled = false,
}) => {
  return (
    <div className="flex border-b border-gray-200 w-full mb-6 bg-gray-50/50 p-1 rounded-lg">
      <button
        onClick={() => onTabChange('prescription')}
        disabled={disabled}
        className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-semibold rounded-md transition-all duration-200 cursor-pointer ${
          activeTab === 'prescription'
            ? 'bg-blue-600 text-white shadow-sm'
            : 'text-gray-600 hover:text-blue-600 hover:bg-white/80'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <FaPrescriptionBottleAlt className="text-base" />
        <span>Prescription</span>
      </button>
      
      <button
        onClick={() => onTabChange('patient_details')}
        disabled={disabled}
        className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-semibold rounded-md transition-all duration-200 cursor-pointer ${
          activeTab === 'patient_details'
            ? 'bg-blue-600 text-white shadow-sm'
            : 'text-gray-600 hover:text-blue-600 hover:bg-white/80'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <FaUserInjured className="text-base" />
        <span>Patient Details</span>
      </button>
    </div>
  );
};
