import React from 'react';
import { ReportGenerator } from '@/features/reports/components/ReportGenerator';

const AuditReports: React.FC = () => {
  return (
    <div className="report-page">
      <h2>Audit Reports</h2>
      <ReportGenerator />
    </div>
  );
};

export default AuditReports; 