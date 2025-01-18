import * as React from 'react';
import { Property, PropertyTransfer } from '@/types/property';
import '@/styles/features/property/property-tables.css';

export interface HistoricalPropertyListProps {
  history: PropertyTransfer[];
  loading?: boolean;
  error?: string | null;
}

export function HistoricalPropertyList({ history, loading, error }: HistoricalPropertyListProps) {
  if (loading) return <div className="property-list__loading">Loading historical property...</div>;
  if (error) return <div className="property-list__error">Error: {error}</div>;
  if (!history?.length) return null;

  return (
    <div className="historical-property-section">
      <h2 className="historical-property-section__title">Property History</h2>
      <div className="property-table">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Property ID</th>
              <th>Property Name</th>
              <th>From</th>
              <th>To</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {history.map(item => (
              <tr key={item.id}>
                <td>{new Date(item.transferDate).toLocaleDateString()}</td>
                <td>{item.propertyId}</td>
                <td>{item.propertyName}</td>
                <td>{item.fromPerson}</td>
                <td>{item.toPerson}</td>
                <td>
                  <span className={`status-badge status-badge--${item.status}`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 