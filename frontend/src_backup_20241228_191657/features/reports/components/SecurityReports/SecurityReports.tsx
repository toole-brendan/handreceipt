import React from 'react';
import { ReportGenerator } from '@/features/reports/components/ReportGenerator';

const SecurityReports: React.FC = () => {
  return (
    <div className="report-page">
      <h2>Security Reports</h2>
      <ReportGenerator />
    </div>
  );
};

export default SecurityReports; 