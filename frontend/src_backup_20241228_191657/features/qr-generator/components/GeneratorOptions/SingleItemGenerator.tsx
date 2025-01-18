import React from 'react';
import { QrCode } from 'lucide-react';

interface SingleItemGeneratorProps {
  onSearch: (query: string) => void;
}

export const SingleItemGenerator: React.FC<SingleItemGeneratorProps> = ({ onSearch }) => {
  return (
    <div className="generation-interface single-mode">
      <QrCode size={36} strokeWidth={1.5} className="search-icon" />
      <input
        type="text"
        placeholder="Search by serial number or item name"
        className="search-input"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}; 