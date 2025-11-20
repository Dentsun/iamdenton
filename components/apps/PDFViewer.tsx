import React from 'react';
import { Download } from 'lucide-react';

interface PDFViewerProps {
  pdfUrl: string;
  fileName?: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl, fileName = 'Denton_Sun_Resume.pdf' }) => {
  const handleDownload = () => {
    // Create a temporary link element to trigger download
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = fileName;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-3 bg-gray-100 border-b-2 border-gray-300">
        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-800">📄 {fileName}</span>
        </div>
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded retro-border active:retro-border-inset transition-colors"
          title="Download PDF"
        >
          <Download size={16} />
          <span className="text-sm font-bold">Download</span>
        </button>
      </div>

      {/* PDF Display */}
      <div className="flex-1 overflow-hidden bg-gray-200 flex items-center justify-center">
        <iframe
          src={pdfUrl}
          className="w-full h-full border-0"
          title="PDF Viewer"
          style={{ minHeight: '500px' }}
        />
      </div>

      {/* Footer info */}
      <div className="p-2 bg-gray-100 border-t-2 border-gray-300 text-xs text-gray-600 text-center">
        <p>💡 Tip: Click the Download button above to save the resume</p>
      </div>
    </div>
  );
};

export default PDFViewer;
