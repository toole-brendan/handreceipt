import React from 'react';
import { Database, Download, Trash2 } from 'lucide-react';

export const DataManagement: React.FC = () => {
  const handleExportData = () => {
    // TODO: Implement data export functionality
    console.log('Exporting data...');
  };

  const handleDeleteData = () => {
    // TODO: Implement data deletion functionality
    if (window.confirm('Are you sure you want to delete all your data? This action cannot be undone.')) {
      console.log('Deleting data...');
    }
  };

  return (
    <div className="settings-section">
      <h2 className="settings-section-title">
        <Database className="icon" />
        Data Management
      </h2>
      <div className="settings-options">
        <div className="setting-item">
          <button className="data-button export" onClick={handleExportData}>
            <Download className="icon" />
            Export Data
          </button>
          <p className="setting-description">
            Download a copy of all your data in JSON format
          </p>
        </div>
        <div className="setting-item">
          <button className="data-button delete" onClick={handleDeleteData}>
            <Trash2 className="icon" />
            Delete All Data
          </button>
          <p className="setting-description">
            Permanently delete all your data and settings
          </p>
        </div>
      </div>
    </div>
  );
}; 