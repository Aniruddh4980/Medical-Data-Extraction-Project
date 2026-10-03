import React from 'react';
import { FaWandMagicSparkles, FaDownload } from 'react-icons/fa6';

interface ActionButtonsProps {
  onExtract: () => void;
  onExport: () => void;
  extractDisabled: boolean;
  exportDisabled: boolean;
  isExtracting: boolean;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onExtract,
  onExport,
  extractDisabled,
  exportDisabled,
  isExtracting,
}) => {
  return (
    <div className="flex gap-4 w-full mt-6 border-t border-gray-100 pt-5">
      <button
        onClick={onExtract}
        disabled={extractDisabled || isExtracting}
        className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none text-sm cursor-pointer"
      >
        {isExtracting ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
            <span>Extracting...</span>
          </>
        ) : (
          <>
            <FaWandMagicSparkles className="text-sm" />
            <span>Auto Extract</span>
          </>
        )}
      </button>

      <button
        onClick={onExport}
        disabled={exportDisabled || isExtracting}
        className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-gray-150 hover:bg-gray-200 text-gray-700 font-bold rounded-lg border border-gray-250 transition-all duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed text-sm cursor-pointer"
      >
        <FaDownload className="text-sm" />
        <span>Export TXT</span>
      </button>
    </div>
  );
};
