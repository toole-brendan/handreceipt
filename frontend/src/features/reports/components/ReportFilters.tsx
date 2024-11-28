/* frontend/src/ui/components/reports/ReportFilters.tsx */

import React, { useState } from 'react';
import '@/ui/styles/reports/report-filters.css';

export interface ReportFilters {
  dateRange: {
    start: string;
    end: string;
  };
  status: string;
  classification?: string;
}

interface ReportFiltersProps {
  onFilterChange: (filters: ReportFilters) => void;
  initialFilters?: Partial<ReportFilters>;
  showClassification?: boolean;
}

export const ReportFilters: React.FC<ReportFiltersProps> = ({ 
  onFilterChange, 
  initialFilters,
  showClassification = true 
}) => {
  const [filters, setFilters] = useState<ReportFilters>({
    dateRange: {
      start: initialFilters?.dateRange?.start || '',
      end: initialFilters?.dateRange?.end || '',
    },
    status: initialFilters?.status || '',
    classification: initialFilters?.classification || ''
  });

  const handleFilterChange = <K extends keyof ReportFilters>(
    key: K, 
    value: ReportFilters[K]
  ) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleDateChange = (key: 'start' | 'end', value: string) => {
    const newDateRange = { ...filters.dateRange, [key]: value };
    handleFilterChange('dateRange', newDateRange);
  };

  return (
    <div className="report-filters">
      <div className="filters-grid">
        <div className="filter-group">
          <label>Date Range</label>
          <div className="date-inputs">
            <input
              type="date"
              value={filters.dateRange.start}
              onChange={(e) => handleDateChange('start', e.target.value)}
              aria-label="Start date"
            />
            <span>to</span>
            <input
              type="date"
              value={filters.dateRange.end}
              onChange={(e) => handleDateChange('end', e.target.value)}
              aria-label="End date"
            />
          </div>
        </div>

        <div className="filter-group">
          <label>Status</label>
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            aria-label="Filter by status"
          >
            <option value="">All</option>
            <option value="Generated">Generated</option>
            <option value="Processing">Processing</option>
            <option value="Failed">Failed</option>
          </select>
        </div>

        {showClassification && (
          <div className="filter-group">
            <label>Classification</label>
            <select
              value={filters.classification}
              onChange={(e) => handleFilterChange('classification', e.target.value)}
              aria-label="Filter by classification"
            >
              <option value="">All</option>
              <option value="UNCLASSIFIED">UNCLASSIFIED</option>
              <option value="CONFIDENTIAL">CONFIDENTIAL</option>
              <option value="SECRET">SECRET</option>
              <option value="TOP_SECRET">TOP SECRET</option>
            </select>
          </div>
        )}
      </div>

      <div className="filter-actions">
        <button 
          className="btn btn-secondary"
          onClick={() => {
            const defaultFilters = {
              dateRange: { start: '', end: '' },
              status: '',
              classification: ''
            };
            setFilters(defaultFilters);
            onFilterChange(defaultFilters);
          }}
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default ReportFilters; 