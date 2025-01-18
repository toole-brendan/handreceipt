import React from 'react';
import { FileText } from 'lucide-react';

interface RosterUploadProps {
  onFileSelect: (file: File) => void;
}

export const RosterUpload: React.FC<RosterUploadProps> = ({ onFileSelect }) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onFileSelect(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileSelect(files[0]);
    }
  };

  return (
    <div 
      className="generation-interface roster-mode"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="upload-area">
        <FileText size={64} strokeWidth={1.5} />
        <p>Drag and drop your roster file here</p>
        <p>or</p>
        <input
          type="file"
          id="roster-file"
          accept=".xlsx,.csv"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
        <label htmlFor="roster-file" className="secondary-button">
          Choose File
        </label>
        <p className="upload-hint">Supports .xlsx, .csv formats</p>
      </div>
    </div>
  );
}; 