import React, { useState } from 'react';
import '@/ui/styles/reports/report-builder.css';

interface FieldOption {
  label: string;
  value: string;
}

const ReportBuilder: React.FC = () => {
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [filters, setFilters] = useState<any>({});
  const [layout, setLayout] = useState('table');
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [schedule, setSchedule] = useState({
    enabled: false,
    frequency: 'daily',
    time: '08:00',
  });

  const fieldOptions: FieldOption[] = [
    { label: 'Asset ID', value: 'assetId' },
    { label: 'Asset Name', value: 'assetName' },
    { label: 'Status', value: 'status' },
    { label: 'Location', value: 'location' },
    { label: 'Classification', value: 'classification' },
    // Add more fields as needed
  ];

  const handleFieldSelection = (fieldValue: string) => {
    setSelectedFields((prevFields) =>
      prevFields.includes(fieldValue)
        ? prevFields.filter((field) => field !== fieldValue)
        : [...prevFields, fieldValue]
    );
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleLayoutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLayout(e.target.value);
  };

  const handlePreview = () => {
    // Generate preview data based on selections
    // Replace with your actual data fetching logic
    console.log('Generating preview with:', selectedFields, filters, layout);
    setPreviewData([
      // Mock data
      {
        assetId: 'A123',
        assetName: 'Tactical Vehicle',
        status: 'Active',
        location: 'Base Alpha',
        classification: 'Secret',
      },
      {
        assetId: 'A456',
        assetName: 'Communication Equipment',
        status: 'Maintenance',
        location: 'Base Bravo',
        classification: 'Confidential',
      },
    ]);
  };

  const handleExport = () => {
    // Implement export functionality
    console.log('Exporting report');
  };

  const handleScheduleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setSchedule({ ...schedule, [e.target.name]: e.target.value });
  };

  return (
    <div className="palantir-panel report-builder">
      <h2>Custom Report Builder</h2>
      <div className="report-builder-grid">
        {/* Field Selection */}
        <div className="report-section">
          <h3>1. Select Fields</h3>
          <div className="field-options">
            {fieldOptions.map((field) => (
              <label key={field.value} className="checkbox-label">
                <input
                  type="checkbox"
                  value={field.value}
                  checked={selectedFields.includes(field.value)}
                  onChange={() => handleFieldSelection(field.value)}
                />
                {field.label}
              </label>
            ))}
          </div>
        </div>

        {/* Filter Configuration */}
        <div className="report-section">
          <h3>2. Configure Filters</h3>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              className="form-input"
              onChange={handleFilterChange}
            >
              <option value="">All</option>
              <option value="Active">Active</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          {/* Add more filters as needed */}
        </div>

        {/* Layout Options */}
        <div className="report-section">
          <h3>3. Choose Layout</h3>
          <label>
            <input
              type="radio"
              name="layout"
              value="table"
              checked={layout === 'table'}
              onChange={handleLayoutChange}
            />
            Table
          </label>
          <label>
            <input
              type="radio"
              name="layout"
              value="chart"
              checked={layout === 'chart'}
              onChange={handleLayoutChange}
            />
            Chart
          </label>
          {/* Add more layout options as needed */}
        </div>

        {/* Preview and Export */}
        <div className="report-section">
          <h3>4. Preview and Export</h3>
          <button className="btn btn-secondary" onClick={handlePreview}>
            Generate Preview
          </button>
          {previewData.length > 0 && (
            <div className="report-preview">
              <h4>Report Preview</h4>
              {/* Display preview based on layout */}
              {layout === 'table' && (
                <table className="data-table">
                  <thead>
                    <tr>
                      {selectedFields.map((field) => (
                        <th key={field}>{fieldOptions.find((opt) => opt.value === field)?.label}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {previewData.map((item, index) => (
                      <tr key={index}>
                        {selectedFields.map((field) => (
                          <td key={field}>{item[field]}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {/* Implement chart preview if layout === 'chart' */}
            </div>
          )}
          <button className="btn btn-primary" onClick={handleExport}>
            Export Report
          </button>
        </div>

        {/* Schedule Options */}
        <div className="report-section">
          <h3>5. Schedule Report</h3>
          <label>
            <input
              type="checkbox"
              name="enabled"
              checked={schedule.enabled}
              onChange={(e) =>
                setSchedule({ ...schedule, enabled: e.target.checked })
              }
            />
            Enable Scheduling
          </label>
          {schedule.enabled && (
            <div className="schedule-options">
              <div className="form-group">
                <label htmlFor="frequency">Frequency</label>
                <select
                  id="frequency"
                  name="frequency"
                  className="form-input"
                  value={schedule.frequency}
                  onChange={handleScheduleChange}
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="time">Time</label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  className="form-input"
                  value={schedule.time}
                  onChange={handleScheduleChange}
                />
              </div>
            </div>
          )}
          <button className="btn btn-secondary">
            Save Scheduled Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportBuilder;