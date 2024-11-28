import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ReportCategories from './ReportCategories';
import AssetReports from './AssetReports';
import SecurityReports from './SecurityReports';
import MaintenanceReports from './MaintenanceReports';
import AuditReports from './AuditReports';
import ReportViewer from './ReportViewer';
import ReportBuilder from './ReportBuilder';

const Reports: React.FC = () => {
  return (
    <Routes>
      <Route index element={<ReportCategories />} />
      <Route path="assets" element={<AssetReports />} />
      <Route path="security" element={<SecurityReports />} />
      <Route path="maintenance" element={<MaintenanceReports />} />
      <Route path="audit" element={<AuditReports />} />
      <Route path="builder" element={<ReportBuilder />} />
      <Route path="view/:reportId" element={<ReportViewer />} />
      <Route path="*" element={<Navigate to="/reports" replace />} />
    </Routes>
  );
};

// Named export for lazy loading
export { Reports };
// Default export for direct imports
export default Reports;

// Re-export report components for convenience
export { default as ReportCategories } from './ReportCategories';
export { default as AssetReports } from './AssetReports';
export { default as SecurityReports } from './SecurityReports';
export { default as MaintenanceReports } from './MaintenanceReports';
export { default as AuditReports } from './AuditReports';
export { default as ReportViewer } from './ReportViewer';
export { default as ReportBuilder } from './ReportBuilder'; 