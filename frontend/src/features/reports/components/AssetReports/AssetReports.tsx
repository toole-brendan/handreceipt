import React, { useState } from 'react';
import { ReportGenerator } from '@/features/reports/components/ReportGenerator';
import ClassificationBanner from '@/components/common/ClassificationBanner';
import '@/styles/features/reports/asset-reports.css';

interface AssetReportFilter {
  status: string[];
  location: string[];
  dateRange: {
    start: string;
    end: string;
  };
}

const AssetReports: React.FC = () => {
  const [filters, setFilters] = useState<AssetReportFilter>({
    status: [],
    location: [],
    dateRange: {
      start: '',
      end: ''
    }
  });

  return (
    <div className="asset-reports-page">
      <ClassificationBanner />
      <div className="report-header">
        <h2>Asset Reports</h2>
        <p className="report-description">
          Generate detailed reports on asset status, distribution, and movement
        </p>
      </div>

      <div className="report-filters">
        <div className="filter-group">
          <label>Status</label>
          <select 
            multiple
            value={filters.status}
            onChange={(e) => setFilters(prev => ({
              ...prev,
              status: Array.from(e.target.selectedOptions, option => option.value)
            }))}
          >
            <option value="active">Active</option>
            <option value="maintenance">In Maintenance</option>
            <option value="deployed">Deployed</option>
            <option value="storage">In Storage</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Location</label>
          <select
            multiple
            value={filters.location}
            onChange={(e) => setFilters(prev => ({
              ...prev,
              location: Array.from(e.target.selectedOptions, option => option.value)
            }))}
          >
            <option value="base-alpha">Base Alpha</option>
            <option value="base-beta">Base Beta</option>
            <option value="field-ops">Field Operations</option>
            <option value="storage-facility">Storage Facility</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Date Range</label>
          <div className="date-inputs">
            <input
              type="date"
              value={filters.dateRange.start}
              onChange={(e) => setFilters(prev => ({
                ...prev,
                dateRange: {
                  ...prev.dateRange,
                  start: e.target.value
                }
              }))}
            />
            <span>to</span>
            <input
              type="date"
              value={filters.dateRange.end}
              onChange={(e) => setFilters(prev => ({
                ...prev,
                dateRange: {
                  ...prev.dateRange,
                  end: e.target.value
                }
              }))}
            />
          </div>
        </div>
      </div>

      <ReportGenerator />

      <ClassificationBanner />
    </div>
  );
};

export default AssetReports; 