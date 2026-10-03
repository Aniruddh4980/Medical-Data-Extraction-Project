import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = 'Extracting document...',
}) => {
  return (
    <div className="absolute inset-0 bg-white/70 backdrop-blur-xs flex flex-col items-center justify-center gap-4 z-50 rounded-xl transition-all duration-300">
      <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow-lg border border-gray-100 max-w-xs w-full text-center">
        {/* Modern styled spinner */}
        <div className="relative flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-100 border-t-blue-600"></div>
          <div className="absolute h-6 w-6 rounded-full bg-blue-50 border border-blue-100"></div>
        </div>
        <p className="mt-4 text-sm font-bold text-gray-800 tracking-tight">
          {message}
        </p>
        <p className="mt-1.5 text-xs text-gray-500 font-medium">
          Please wait while AI processes the file.
        </p>
      </div>
    </div>
  );
};
