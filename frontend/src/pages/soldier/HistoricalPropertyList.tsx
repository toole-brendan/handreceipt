import React from 'react';
import { useHistoricalProperty } from '@/hooks';

export const HistoricalPropertyList: React.FC = () => {
  const { history, loading, error } = useHistoricalProperty();

  if (loading) return <div>Loading historical property...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="historical-property-section">
      <h2>Property History</h2>
      <div className="property-table">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Item</th>
              <th>Serial Number</th>
              <th>Status</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {history.map(item => (
              <tr key={item.id}>
                <td>{new Date(item.date).toLocaleDateString()}</td>
                <td>{item.name}</td>
                <td>{item.serialNumber}</td>
                <td>
                  <span className={`status-badge ${item.status}`}>
                    {item.status}
                  </span>
                </td>
                <td>{item.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
