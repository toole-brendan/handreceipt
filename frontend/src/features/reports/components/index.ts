// frontend/src/pages/reports/index.ts

// Export the main Reports component
export { Reports as default } from './Reports';
export { Reports } from './Reports';

// Export individual report components
export { default as ReportCategories } from './ReportCategories';
export { default as AssetReports } from './AssetReports';
export { default as SecurityReports } from './SecurityReports';
export { default as MaintenanceReports } from './MaintenanceReports';
export { default as AuditReports } from './AuditReports';
export { default as ReportViewer } from './ReportViewer';
export { default as ReportBuilder } from './ReportBuilder';

// Note: Removed the ScheduledReports export since it doesn't exist
