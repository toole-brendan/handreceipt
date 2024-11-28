// frontend/src/pages/property/personnel-property/PersonnelPropertyList.tsx
import React, { useState } from 'react';
import { usePersonnelProperty } from '@/hooks';
import { ReportClassificationBadge } from '@/ui/components/reports/ReportClassificationBadge';
import '@/ui/styles/components/property/personnel-property-list.css';

interface PersonnelPropertyListProps {
  personnelId: string;
  showSensitiveItems: boolean;
  timeframe: string;
}

interface PropertyItem {
  id: string;
  nsn: string;
  name: string;
  serialNumber: string;
  model: string;
  category: string;
  value: number;
  condition: 'NEW' | 'SERVICEABLE' | 'UNSERVICEABLE' | 'DAMAGED';
  isSensitive: boolean;
  classification: 'UNCLASSIFIED' | 'CONFIDENTIAL' | 'SECRET' | 'TOP_SECRET';
  lastInventory: string;
  nextInventoryDue: string;
  location: string;
  notes?: string;
  subComponents?: PropertyItem[];
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const PersonnelPropertyList: React.FC<PersonnelPropertyListProps> = ({
  personnelId,
  showSensitiveItems,
  timeframe
}) => {
  const { properties, loading, error } = usePersonnelProperty(personnelId);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  if (loading) return <div>Loading property list...</div>;
  if (error) return <div>Error loading property list</div>;

  const filteredProperties = showSensitiveItems 
    ? properties.filter(item => item.isSensitive)
    : properties;

  const calculateTotalValue = () => {
    return filteredProperties.reduce((sum, item) => sum + item.value, 0);
  };

  const handlePrintHandReceipt = () => {
    window.print();
  };

  return (
    <div className="property-list-container">
      <div className="property-list-header">
        <div className="header-content">
          <h3>DA Form 2062 - Hand Receipt</h3>
          <ReportClassificationBadge level={showSensitiveItems ? 'SECRET' : 'UNCLASSIFIED'} />
        </div>
        <div className="header-actions">
          <button className="btn-primary" onClick={handlePrintHandReceipt}>
            Print DA 2062
          </button>
        </div>
      </div>

      <div className="property-summary">
        <div className="summary-grid">
          <div className="summary-card">
            <span className="summary-value">{filteredProperties.length}</span>
            <span className="summary-label">Total Line Items</span>
          </div>
          <div className="summary-card">
            <span className="summary-value">
              {formatCurrency(calculateTotalValue())}
            </span>
            <span className="summary-label">Total Value</span>
          </div>
          <div className="summary-card sensitive">
            <span className="summary-value">
              {properties.filter(item => item.isSensitive).length}
            </span>
            <span className="summary-label">Sensitive Items</span>
          </div>
        </div>
      </div>

      <div className="property-table-container">
        <table className="property-table">
          <thead>
            <tr>
              <th>NSN/LIN</th>
              <th>Item Description</th>
              <th>Serial/Lot Number</th>
              <th>UI</th>
              <th>QTY</th>
              <th>Value</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredProperties.map(item => (
              <React.Fragment key={item.id}>
                <tr className={`property-row ${item.isSensitive ? 'sensitive-item' : ''}`}>
                  <td className="nsn-cell">{item.nsn}</td>
                  <td className="item-cell">
                    <div className="item-name">
                      <span className="item-title">{item.name}</span>
                      {item.isSensitive && <span className="si-badge">SI</span>}
                    </div>
                    <span className="model-info">{item.model}</span>
                  </td>
                  <td className="serial-cell">{item.serialNumber}</td>
                  <td className="ui-cell">EA</td>
                  <td className="qty-cell">1</td>
                  <td className="value-cell">{formatCurrency(item.value)}</td>
                  <td className="status-cell">
                    <span className={`condition-badge ${item.condition.toLowerCase()}`}>
                      {item.condition}
                    </span>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <div className="hand-receipt-footer">
        <div className="signature-section">
          <div className="signature-row">
            <span className="signature-label">Hand Receipt Holder:</span>
            <div className="signature-line">
              <span className="signature-text">Signature</span>
              <span className="signature-date">{formatDate(new Date().toISOString())}</span>
            </div>
          </div>
          <div className="signature-row">
            <span className="signature-label">Primary Hand Receipt Holder:</span>
            <div className="signature-line">
              <span className="signature-text">Signature</span>
              <span className="signature-date">{formatDate(new Date().toISOString())}</span>
            </div>
          </div>
        </div>
        <div className="document-footer">
          <p className="form-number">DA FORM 2062, JUL 2020</p>
          <p className="classification-warning">
            This is an official hand receipt - Handle according to classification
          </p>
        </div>
      </div>
    </div>
  );
};

export default PersonnelPropertyList;