import React, { useState, useRef } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';

interface UploadAreaProps {
  onFileSelect: (file: File) => void;
}

export const UploadArea: React.FC<UploadAreaProps> = ({ onFileSelect }) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File | undefined) => {
    if (!file) return;

    // Validate type (must be PDF)
    if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
      toast.error('Only PDF files are allowed.');
      return;
    }

    // Validate size (max 20MB)
    const maxSize = 20 * 1024 * 1024; // 20 MB
    if (file.size > maxSize) {
      toast.error('File size exceeds the 20MB limit.');
      return;
    }

    onFileSelect(file);
    toast.success('PDF uploaded successfully.');
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
      onClick={onButtonClick}
      className={`flex-1 flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 cursor-pointer transition-all duration-200 min-h-[350px] ${
        isDragActive
          ? 'border-blue-500 bg-blue-50/50 scale-[0.99]'
          : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50/50'
      }`}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,application/pdf"
        className="hidden"
        onChange={handleFileInput}
      />
      
      <div className="bg-blue-50 text-blue-600 p-4 rounded-full mb-4 shadow-2xs">
        <FaCloudUploadAlt className="text-4xl" />
      </div>
      
      <p className="text-gray-700 font-semibold text-lg text-center">
        Upload PDF Document
      </p>
      
      <p className="text-gray-500 text-sm text-center mt-2 max-w-xs">
        Drag & drop your PDF file here, or click to browse from your computer.
      </p>
      
      <div className="mt-6 flex flex-col items-center gap-1.5">
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
          Accepted Format
        </span>
        <span className="text-xs text-gray-500 font-medium">
          PDF up to 20 MB
        </span>
      </div>
    </div>
  );
};
