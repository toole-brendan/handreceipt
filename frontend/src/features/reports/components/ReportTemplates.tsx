import React from 'react';
import { REPORT_TEMPLATES } from '@/constants/reports';

const ReportTemplates: React.FC = () => {
  return (
    <div className="report-templates">
      <h2>Standard Reports</h2>
      <div className="template-grid">
        {Object.entries(REPORT_TEMPLATES).map(([key, template]) => (
          <div key={key} className="template-card">
            <h3>{template.name}</h3>
            <p>Sections: {template.sections.length}</p>
            <button onClick={() => generateReport(template)}>
              Generate Report
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}; 