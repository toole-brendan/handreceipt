/* frontend/src/pages/reports/Reports.tsx */

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ReportCategories from '../ReportCategories/ReportCategories';
import PropertyAccountabilityReport from './templates/PropertyAccountabilityReport';
import SecurityReport from './templates/SecurityReport';
import MaintenanceReport from './templates/MaintenanceReport';
import AuditReport from './templates/AuditReport';
import ReportViewer from './ReportViewer';
import ReportBuilder from './ReportBuilder';
import '@/styles/features/reports/print.css';

export const Reports: React.FC = () => {
  console.log('Reports component rendering');

  return (
    <Routes>
      <Route index element={<ReportCategories />} />
      <Route path="property-accountability" element={<PropertyAccountabilityReport />} />
      <Route path="security" element={<SecurityReport />} />
      <Route path="maintenance" element={<MaintenanceReport />} />
      <Route path="audit" element={<AuditReport />} />
      <Route path="builder" element={<ReportBuilder />} />
      <Route path="view/:reportId" element={<ReportViewer />} />
      <Route path="*" element={<Navigate to="/reports" replace />} />
    </Routes>
  );
};

export default Reports; 