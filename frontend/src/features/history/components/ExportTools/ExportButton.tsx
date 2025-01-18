import React from 'react';
import { Download } from 'lucide-react';

interface ExportButtonProps {
  onExport: () => void;
  disabled?: boolean;
}

export const ExportButton: React.FC<ExportButtonProps> = ({ onExport, disabled }) => {
  return (
    <button 
      className="export-button" 
      onClick={onExport}
      disabled={disabled}
    >
      <Download size={16} />
      Export Records
    </button>
  );
}; 