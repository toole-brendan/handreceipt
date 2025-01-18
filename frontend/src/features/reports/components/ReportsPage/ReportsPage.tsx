import React, { useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { ReportList } from '../ReportList';
import { ReportFilters, ReportFilters as ReportFiltersType } from '../ReportFilters';
import { ReportTemplates } from '../ReportTemplates';
import { REPORT_TEMPLATES, REPORT_TYPES } from '@/constants/reports';

// Define the template type using the values
type TemplateType = typeof REPORT_TEMPLATES[keyof typeof REPORT_TEMPLATES];

// Map template types to report types
const TEMPLATE_TO_REPORT_TYPE: Record<TemplateType, string> = {
  'property_accountability': REPORT_TYPES.PROPERTY_BOOK,
  'maintenance': REPORT_TYPES.MAINTENANCE,
  'audit': REPORT_TYPES.AUDIT,
  'security': REPORT_TYPES.AUDIT // Using audit type for security reports
};

// Define the template names mapping using values
const TEMPLATE_NAMES: Record<TemplateType, string> = {
  'property_accountability': 'Property Accountability',
  'maintenance': 'Maintenance',
  'audit': 'Audit',
  'security': 'Security',
};

export const ReportsPage: React.FC = () => {
  const [selectedReportType, setSelectedReportType] = useState<TemplateType>(REPORT_TEMPLATES.PROPERTY_ACCOUNTABILITY);

  const handleFilterChange = (filters: ReportFiltersType) => {
    // This will be handled by the ReportList component internally
    console.log('Filters changed:', filters);
  };

  const handleTemplateSelect = (templateType: TemplateType) => {
    setSelectedReportType(templateType);
  };

  // Convert template type to report type string using the mapping
  const getReportType = (templateType: TemplateType): string => {
    return TEMPLATE_TO_REPORT_TYPE[templateType] || REPORT_TYPES.PROPERTY_BOOK;
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 500 }}>
        Reports
      </Typography>

      <Box sx={{ display: 'flex', gap: 3 }}>
        {/* Left sidebar */}
        <Box sx={{ width: 300 }}>
          <Paper 
            sx={{ 
              p: 3, 
              mb: 3, 
              bgcolor: '#000000',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: 0,
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ mb: 3, fontWeight: 500 }}>
              Templates
            </Typography>
            <ReportTemplates onSelect={handleTemplateSelect} />
          </Paper>
        </Box>

        {/* Main content */}
        <Box sx={{ flex: 1 }}>
          <ReportList reportType={getReportType(selectedReportType)} />
        </Box>
      </Box>
    </Box>
  );
}; 