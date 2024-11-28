import React from 'react';
import { ReportGenerator } from '@/ui/components/reports/ReportGenerator';

const AuditReports: React.FC = () => {
  return (
    <div className="report-page">
      <h2>Audit Reports</h2>
      <ReportGenerator />
    </div>
  );
};

export default AuditReports; 