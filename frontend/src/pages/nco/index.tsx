import React, { useState } from 'react';
import { UnitList } from './UnitList';
import { PersonnelList } from './PersonnelList';
import { PersonnelPropertyList } from './PersonnelPropertyList';
import { ReportClassificationBadge } from '@/ui/components/reports/ReportClassificationBadge';
import '@/ui/styles/property/personnel-property.css';

const PersonnelProperty: React.FC = () => {
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState('current');
  const [showSensitiveItems, setShowSensitiveItems] = useState(false);

  return (
    <div className="personnel-property-page">
      <div className="page-header">
        <div className="header-content">
          <h2>Company Property Book</h2>
          <ReportClassificationBadge level="CONFIDENTIAL" />
        </div>
        <div className="header-actions">
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="timeframe-select"
          >
            <option value="current">Current Hand Receipts</option>
            <option value="pending">Pending Transfers</option>
            <option value="historical">Historical (Last 90 Days)</option>
          </select>
          <button className="btn-primary" onClick={() => window.print()}>
            Print Hand Receipts
          </button>
        </div>
      </div>

      <div className="property-dashboard">
        <div className="dashboard-stats">
          <div className="stat-card">
            <span className="stat-value">157</span>
            <span className="stat-label">Total Personnel</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">1,245</span>
            <span className="stat-label">Equipment Items</span>
          </div>
          <div className="stat-card alert">
            <span className="stat-value">12</span>
            <span className="stat-label">Pending Transfers</span>
          </div>
          <div className="stat-card warning">
            <span className="stat-value">3</span>
            <span className="stat-label">Overdue Inventories</span>
          </div>
        </div>

        <div className="sensitive-items-toggle">
          <label>
            <input
              type="checkbox"
              checked={showSensitiveItems}
              onChange={(e) => setShowSensitiveItems(e.target.checked)}
            />
            Show Sensitive Items Only
          </label>
        </div>

        <div className="property-management-grid">
          <div className="unit-section">
            <UnitList 
              onUnitSelect={setSelectedUnit} 
              selectedUnit={selectedUnit} 
            />
          </div>

          {selectedUnit && (
            <div className="personnel-section">
              <PersonnelList 
                unitId={selectedUnit}
                onPersonSelect={setSelectedPerson}
                selectedPerson={selectedPerson}
                showSensitiveItems={showSensitiveItems}
              />
            </div>
          )}

          {selectedPerson && (
            <div className="property-section">
              <PersonnelPropertyList 
                personnelId={selectedPerson}
                showSensitiveItems={showSensitiveItems}
                timeframe={selectedTimeframe}
              />
            </div>
          )}
        </div>
      </div>

      <div className="page-footer">
        <p>Last Updated: {new Date().toLocaleString()}</p>
        <p>This is an official property record - Handle according to classification</p>
      </div>
    </div>
  );
};

export default PersonnelProperty;
