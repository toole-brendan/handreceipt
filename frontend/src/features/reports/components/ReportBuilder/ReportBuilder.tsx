/* frontend/src/pages/reports/ReportBuilder.tsx */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '@styles/features/reports/report-builder.css';

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  type: 'property' | 'sensitive' | 'cyclic' | 'change-of-command' | 'shortage';
  sections: ReportSection[];
  classification: 'UNCLASSIFIED' | 'CONFIDENTIAL' | 'SECRET' | 'TOP_SECRET';
}

interface ReportSection {
  id: string;
  title: string;
  required: boolean;
  description: string;
}

const MILITARY_REPORT_TEMPLATES: ReportTemplate[] = [
  {
    id: 'cyclic-inventory',
    name: 'Cyclic Inventory Report',
    description: 'Monthly/Quarterly inventory verification of unit property',
    type: 'cyclic',
    classification: 'UNCLASSIFIED',
    sections: [
      {
        id: 'property-book-items',
        title: 'Property Book Items',
        required: true,
        description: 'All items listed on unit property book'
      },
      {
        id: 'sensitive-items',
        title: 'Sensitive Items Inventory',
        required: true,
        description: 'Weapons, NVGs, Crypto, and other sensitive items'
      },
      {
        id: 'shortages-overages',
        title: 'Shortages and Overages',
        required: true,
        description: 'Discrepancies between book and physical count'
      }
    ]
  },
  {
    id: 'change-of-command',
    name: 'Change of Command Inventory',
    description: 'Complete inventory for change of command process',
    type: 'change-of-command',
    classification: 'UNCLASSIFIED',
    sections: [
      {
        id: 'property-book',
        title: 'Property Book Inventory',
        required: true,
        description: 'Complete inventory of all property book items'
      },
      {
        id: 'hand-receipts',
        title: 'Hand Receipt Reconciliation',
        required: true,
        description: 'All sub-hand receipts and lateral transfers'
      },
      {
        id: 'sensitive-items',
        title: 'Sensitive Items',
        required: true,
        description: 'Detailed inventory of all sensitive items'
      },
      {
        id: 'shortage-annex',
        title: 'Shortage Annex',
        required: true,
        description: 'Documentation of all shortages and loss statements'
      }
    ]
  },
  {
    id: 'sensitive-items',
    name: 'Sensitive Items Report',
    description: 'Daily/Weekly sensitive items inventory report',
    type: 'sensitive',
    classification: 'SECRET',
    sections: [
      {
        id: 'weapons',
        title: 'Weapons Inventory',
        required: true,
        description: 'Serial number inventory of all weapons'
      },
      {
        id: 'night-vision',
        title: 'Night Vision Devices',
        required: true,
        description: 'Inventory of all NVGs and thermal devices'
      },
      {
        id: 'communications',
        title: 'Communications Equipment',
        required: true,
        description: 'Crypto and classified communication devices'
      }
    ]
  }
];

const ReportBuilder: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [reportConfig, setReportConfig] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    unit: '',
    commander: '',
    preparedBy: '',
    sections: [] as string[],
    includeSubordinateUnits: false,
    verifiedBy: '',
    remarks: ''
  });

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = MILITARY_REPORT_TEMPLATES.find(t => t.id === templateId);
    if (template) {
      setReportConfig(prev => ({
        ...prev,
        sections: template.sections.filter(s => s.required).map(s => s.id)
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/reports/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          templateId: selectedTemplate,
          config: reportConfig
        })
      });

      if (response.ok) {
        const { reportId } = await response.json();
        navigate(`/reports/view/${reportId}`);
      }
    } catch (error) {
      console.error('Error generating report:', error);
    }
  };

  return (
    <div className="report-builder">
      <div className="report-builder-header">
        <h2>Generate Property Report</h2>
        <p>Select a report template and configure required information</p>
      </div>

      <form onSubmit={handleSubmit} className="report-builder-form">
        <div className="form-section">
          <h3>1. Select Report Type</h3>
          <div className="template-grid">
            {MILITARY_REPORT_TEMPLATES.map(template => (
              <div
                key={template.id}
                className={`template-card ${selectedTemplate === template.id ? 'selected' : ''}`}
                onClick={() => handleTemplateSelect(template.id)}
              >
                <div className="template-header">
                  <h4>{template.name}</h4>
                  <span className={`classification-badge ${template.classification.toLowerCase()}`}>
                    {template.classification}
                  </span>
                </div>
                <p>{template.description}</p>
                <div className="template-sections">
                  {template.sections.map(section => (
                    <div key={section.id} className="section-item">
                      <span className="section-title">{section.title}</span>
                      {section.required && <span className="required-badge">Required</span>}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedTemplate && (
          <>
            <div className="form-section">
              <h3>2. Report Details</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="title">Report Title</label>
                  <input
                    type="text"
                    id="title"
                    value={reportConfig.title}
                    onChange={(e) => setReportConfig(prev => ({ ...prev, title: e.target.value }))}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="date">Inventory Date</label>
                  <input
                    type="date"
                    id="date"
                    value={reportConfig.date}
                    onChange={(e) => setReportConfig(prev => ({ ...prev, date: e.target.value }))}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="unit">Unit</label>
                  <input
                    type="text"
                    id="unit"
                    value={reportConfig.unit}
                    onChange={(e) => setReportConfig(prev => ({ ...prev, unit: e.target.value }))}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="commander">Commander</label>
                  <input
                    type="text"
                    id="commander"
                    value={reportConfig.commander}
                    onChange={(e) => setReportConfig(prev => ({ ...prev, commander: e.target.value }))}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="preparedBy">Prepared By</label>
                  <input
                    type="text"
                    id="preparedBy"
                    value={reportConfig.preparedBy}
                    onChange={(e) => setReportConfig(prev => ({ ...prev, preparedBy: e.target.value }))}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="verifiedBy">Verified By</label>
                  <input
                    type="text"
                    id="verifiedBy"
                    value={reportConfig.verifiedBy}
                    onChange={(e) => setReportConfig(prev => ({ ...prev, verifiedBy: e.target.value }))}
                    required
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="remarks">Remarks</label>
                  <textarea
                    id="remarks"
                    value={reportConfig.remarks}
                    onChange={(e) => setReportConfig(prev => ({ ...prev, remarks: e.target.value }))}
                    rows={4}
                  />
                </div>

                <div className="form-group checkbox">
                  <label>
                    <input
                      type="checkbox"
                      checked={reportConfig.includeSubordinateUnits}
                      onChange={(e) => setReportConfig(prev => ({ 
                        ...prev, 
                        includeSubordinateUnits: e.target.checked 
                      }))}
                    />
                    Include Subordinate Units
                  </label>
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="btn-secondary" onClick={() => navigate('/reports')}>
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Generate Report
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default ReportBuilder; 