// src/ui/components/reports/ReportGenerator.tsx

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { FiSave, FiFileText } from 'react-icons/fi';

// Add these report templates
const REPORT_TEMPLATES = {
  PROPERTY_ACCOUNTABILITY: {
    name: 'Property Accountability Report',
    type: 'asset',
    sections: [
      'Unit Property Overview',
      'Individual Hand Receipts',
      'Sub-Hand Receipts',
      'Missing Items'
    ],
    defaultFilters: {
      includeSubordinateUnits: true,
      showSerialNumbers: true,
      groupByCategory: true
    }
  },
  TRANSFER_HISTORY: {
    name: 'Transfer History Report',
    type: 'audit',
    sections: [
      'Transfer Timeline',
      'Chain of Custody',
      'Pending Transfers'
    ],
    defaultFilters: {
      dateRange: 'last30Days',
      includeSubordinateUnits: true
    }
  },
  EQUIPMENT_READINESS: {
    name: 'Equipment Readiness Report',
    type: 'maintenance',
    sections: [
      'Readiness Overview',
      'Maintenance Status',
      'Critical Shortages'
    ],
    defaultFilters: {
      missionEssentialOnly: true,
      includeMaintenanceHistory: true
    }
  }
};

// Add these report sections
interface ReportSection {
  id: string;
  title: string;
  required: boolean;
  dataSource: string;
  filters?: object;
}

// Enhanced ReportConfig interface
interface ReportConfig {
  type: 'asset' | 'maintenance' | 'verification' | 'audit';
  template?: keyof typeof REPORT_TEMPLATES;
  title: string;
  sections: ReportSection[];
  dateRange: {
    start: string;
    end: string;
  };
  filters: {
    status?: string[];
    classification?: string[];
    location?: string[];
    unit?: string[];
    includeSubordinateUnits?: boolean;
    showSerialNumbers?: boolean;
    missionEssentialOnly?: boolean;
  };
  format: 'pdf' | 'csv' | 'excel';
  distribution: {
    email?: string[];
    shareWithUnit?: boolean;
    autoSchedule?: boolean;
  };
}

interface ReportTemplate {
  id: string;
  name: string;
  config: ReportConfig;
}

export const ReportGenerator: React.FC = () => {
  const { classificationLevel } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reportConfig, setReportConfig] = useState<ReportConfig>({
    type: 'asset',
    dateRange: {
      start: new Date().toISOString().split('T')[0],
      end: new Date().toISOString().split('T')[0],
    },
    filters: {},
    format: 'pdf',
  });
  const [savedTemplates, setSavedTemplates] = useState<ReportTemplate[]>([]);

  const handleConfigChange = (field: keyof ReportConfig, value: any) => {
    setReportConfig((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFilterChange = (
    filterType: keyof ReportConfig['filters'],
    values: string[]
  ) => {
    setReportConfig((prev) => ({
      ...prev,
      filters: {
        ...prev.filters,
        [filterType]: values,
      },
    }));
  };

  const generateReport = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/reports/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Classification-Level': classificationLevel,
        },
        body: JSON.stringify(reportConfig),
      });

      if (!response.ok) {
        throw new Error('Failed to generate report');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `report-${new Date().toISOString()}.${reportConfig.format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to generate report');
    } finally {
      setLoading(false);
    }
  };

  const saveTemplate = () => {
    const templateName = prompt('Enter template name:');
    if (!templateName) return;

    const newTemplate: ReportTemplate = {
      id: Date.now().toString(),
      name: templateName,
      config: reportConfig,
    };

    setSavedTemplates((prev) => [...prev, newTemplate]);
  };

  const loadTemplate = (template: ReportTemplate) => {
    setReportConfig(template.config);
  };

  return (
    <div className="report-generator">
      <header className="report-header">
        <h2>Report Generator</h2>
        <div className="header-actions">
          <button className="btn-secondary" onClick={saveTemplate}>
            <FiSave /> Save Template
          </button>
        </div>
      </header>

      <div className="report-config-grid">
        <div className="config-section">
          <h3>Report Type</h3>
          <select
            value={reportConfig.type}
            onChange={(e) => handleConfigChange('type', e.target.value)}
          >
            <option value="asset">Asset Report</option>
            <option value="maintenance">Maintenance Report</option>
            <option value="verification">Verification Report</option>
            <option value="audit">Audit Report</option>
          </select>
        </div>

        <div className="config-section">
          <h3>Date Range</h3>
          <div className="date-range">
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="date"
                value={reportConfig.dateRange.start}
                onChange={(e) =>
                  handleConfigChange('dateRange', {
                    ...reportConfig.dateRange,
                    start: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group">
              <label>End Date</label>
              <input
                type="date"
                value={reportConfig.dateRange.end}
                onChange={(e) =>
                  handleConfigChange('dateRange', {
                    ...reportConfig.dateRange,
                    end: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>

        <div className="config-section">
          <h3>Filters</h3>
          <div className="form-group">
            <label>Status</label>
            <select
              multiple
              value={reportConfig.filters.status || []}
              onChange={(e) =>
                handleFilterChange(
                  'status',
                  Array.from(e.target.selectedOptions, (option) => option.value)
                )
              }
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
          <div className="form-group">
            <label>Classification</label>
            <select
              multiple
              value={reportConfig.filters.classification || []}
              onChange={(e) =>
                handleFilterChange(
                  'classification',
                  Array.from(e.target.selectedOptions, (option) => option.value)
                )
              }
            >
              <option value="UNCLASSIFIED">UNCLASSIFIED</option>
              <option value="CONFIDENTIAL">CONFIDENTIAL</option>
              <option value="SECRET">SECRET</option>
              <option value="TOP_SECRET">TOP SECRET</option>
            </select>
          </div>
        </div>

        <div className="config-section">
          <h3>Format</h3>
          <select
            value={reportConfig.format}
            onChange={(e) => handleConfigChange('format', e.target.value)}
          >
            <option value="pdf">PDF</option>
            <option value="csv">CSV</option>
            <option value="excel">Excel</option>
          </select>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="report-actions">
        <button className="btn-primary" onClick={generateReport} disabled={loading}>
          {loading ? 'Generating...' : 'Generate Report'}
        </button>
      </div>

      {savedTemplates.length > 0 && (
        <div className="saved-templates">
          <h3>Saved Templates</h3>
          <div className="template-grid">
            {savedTemplates.map((template) => (
              <div key={template.id} className="template-card">
                <h4>
                  <FiFileText /> {template.name}
                </h4>
                <button
                  className="btn-secondary"
                  onClick={() => loadTemplate(template)}
                >
                  Load Template
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
