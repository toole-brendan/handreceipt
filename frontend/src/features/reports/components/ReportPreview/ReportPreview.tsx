import React from 'react';
import { ReportConfig } from '@/types/reports';

interface PreviewProps {
  config: ReportConfig;
  data: any; // Replace with proper type
}

const ReportPreview: React.FC<PreviewProps> = ({ config, data }) => {
  return (
    <div className="report-preview">
      <div className="preview-header">
        <h2>{config.title}</h2>
        <div className="classification-banner">
          {config.filters.classification}
        </div>
      </div>
      {/* Preview sections */}
    </div>
  );
}; 