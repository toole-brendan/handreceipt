import React from 'react';
import { ReportGenerator } from '@/ui/components/reports/ReportGenerator';

const SecurityReports: React.FC = () => {
  return (
    <div className="report-page">
      <h2>Security Reports</h2>
      <ReportGenerator />
    </div>
  );
};

export default SecurityReports; 