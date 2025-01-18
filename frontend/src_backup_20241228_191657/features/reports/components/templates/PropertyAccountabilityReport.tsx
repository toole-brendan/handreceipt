/* frontend/src/pages/reports/templates/PropertyAccountabilityReport.tsx */

import React from 'react';
import { ReportClassificationBadge } from '@/shared/components/reports/ReportClassificationBadge';

interface PropertyAccountabilityReportProps {
  data: {
    unitInfo: {
      name: string;
      commander: string;
      date: string;
    };
    inventory: Array<{
      id: string;
      name: string;
      serialNumber: string;
      quantity: number;
      condition: string;
      value: number;
    }>;
    totalValue: number;
    classification: 'UNCLASSIFIED' | 'CONFIDENTIAL' | 'SECRET' | 'TOP_SECRET';
  };
}

export const PropertyAccountabilityReport: React.FC<PropertyAccountabilityReportProps> = ({
  data
}) => {
  return (
    <div className="property-accountability-report">
      <header className="report-header">
        <h1>Property Accountability Report</h1>
        <ReportClassificationBadge level={data.classification} />
        <div className="unit-info">
          <h2>{data.unitInfo.name}</h2>
          <p>Commander: {data.unitInfo.commander}</p>
          <p>Date: {data.unitInfo.date}</p>
        </div>
      </header>

      <main className="report-content">
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Serial Number</th>
              <th>Quantity</th>
              <th>Condition</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {data.inventory.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.serialNumber}</td>
                <td>{item.quantity}</td>
                <td>{item.condition}</td>
                <td>${item.value.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4}>Total Value</td>
              <td>${data.totalValue.toLocaleString()}</td>
            </tr>
          </tfoot>
        </table>
      </main>

      <footer className="report-footer">
        <p>This is an official property record - Handle according to classification</p>
        <p>Generated on: {new Date().toLocaleString()}</p>
      </footer>
    </div>
  );
};

export default PropertyAccountabilityReport; 