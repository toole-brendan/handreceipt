import React from 'react';
import { ReportGenerator } from '@/ui/components/reports/ReportGenerator';

const MaintenanceReports: React.FC = () => {
  return (
    <div className="report-page">
      <h2>Maintenance Reports</h2>
      <ReportGenerator />
    </div>
  );
};

export default MaintenanceReports; 