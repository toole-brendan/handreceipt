import React from 'react';

export type ExportFormat = 'csv' | 'pdf' | 'excel';

interface ExportFormatSelectProps {
  selectedFormat: ExportFormat;
  onFormatChange: (format: ExportFormat) => void;
  disabled?: boolean;
}

export const ExportFormatSelect: React.FC<ExportFormatSelectProps> = ({
  selectedFormat,
  onFormatChange,
  disabled,
}) => {
  return (
    <select
      className="export-format-select"
      value={selectedFormat}
      onChange={(e) => onFormatChange(e.target.value as ExportFormat)}
      disabled={disabled}
    >
      <option value="csv">CSV</option>
      <option value="pdf">PDF</option>
      <option value="excel">Excel</option>
    </select>
  );
}; 