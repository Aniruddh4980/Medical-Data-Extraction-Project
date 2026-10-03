import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { FaTrash, FaFilePdf, FaSearchPlus, FaSearchMinus } from 'react-icons/fa';
import toast from 'react-hot-toast';

// Configure PDFjs worker using cdn
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfViewerProps {
  file: File | null;
  currentPage: number;
  onLoadSuccess: (numPages: number) => void;
  onRemoveFile: () => void;
}

export const PdfViewer: React.FC<PdfViewerProps> = ({
  file,
  currentPage,
  onLoadSuccess,
  onRemoveFile,
}) => {
  const [scale, setScale] = useState<number>(1.0);

  const handleDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    onLoadSuccess(numPages);
  };

  const handleDocumentLoadError = (error: Error) => {
    console.error('Error loading PDF:', error);
    toast.error('Failed to load PDF file.');
  };

  if (!file) return null;

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* File Info / Toolbar */}
      <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4 shadow-2xs">
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <FaFilePdf className="text-red-500 text-lg flex-shrink-0" />
          <span className="text-sm font-semibold text-gray-700 truncate" title={file.name}>
            {file.name}
          </span>
        </div>
        
        <div className="flex items-center gap-2 mr-4 bg-white border border-gray-200 rounded-md p-1 shadow-xs">
          <button
            onClick={() => setScale(s => Math.max(0.5, s - 0.25))}
            className="text-gray-500 hover:text-blue-600 hover:bg-blue-50 p-1.5 rounded transition-colors"
            title="Zoom Out"
          >
            <FaSearchMinus className="text-sm" />
          </button>
          <span className="text-xs font-medium text-gray-600 w-12 text-center">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={() => setScale(s => Math.min(3.0, s + 0.25))}
            className="text-gray-500 hover:text-blue-600 hover:bg-blue-50 p-1.5 rounded transition-colors"
            title="Zoom In"
          >
            <FaSearchPlus className="text-sm" />
          </button>
        </div>

        <button
          onClick={onRemoveFile}
          className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-md transition-colors"
          title="Remove PDF"
        >
          <FaTrash className="text-sm" />
        </button>
      </div>

      {/* PDF Document Viewer Area */}
      <div className="flex-1 flex justify-center bg-gray-100 rounded-lg border border-gray-200 p-4 overflow-auto min-h-[300px] max-h-[600px] shadow-inner">
        <Document
          file={file}
          onLoadSuccess={handleDocumentLoadSuccess}
          onLoadError={handleDocumentLoadError}
          loading={
            <div className="flex flex-col items-center justify-center py-12 gap-3 text-gray-500">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="text-sm font-medium">Loading document...</span>
            </div>
          }
        >
          <Page
            pageNumber={currentPage}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            scale={scale}
            className="shadow-md bg-white"
            loading={
              <div className="flex items-center justify-center p-8 text-sm text-gray-500 font-medium">
                Rendering page...
              </div>
            }
          />
        </Document>
      </div>
    </div>
  );
};
