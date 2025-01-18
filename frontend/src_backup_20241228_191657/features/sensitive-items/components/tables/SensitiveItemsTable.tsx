import React from 'react';
import type { SensitiveItem } from '@/types/property';

interface SensitiveItemsTableProps {
  items: SensitiveItem[];
  onVerify: (id: string) => void;
  onViewDetails: (id: string) => void;
  onReportIssue: (id: string) => void;
}

export const SensitiveItemsTable: React.FC<SensitiveItemsTableProps> = ({
  items,
  onVerify,
  onViewDetails,
  onReportIssue,
}) => {
  return (
    <div className="sensitive-table-container">
      <table className="sensitive-table">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Serial Number</th>
            <th>Category</th>
            <th>Last Verification</th>
            <th>Next Verification</th>
            <th>Location</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>
                <div className="item-cell">
                  <span className="sensitive-icon">⚠️</span>
                  <span>{item.name}</span>
                </div>
              </td>
              <td>
                <span className="serial-number">{item.serialNumber}</span>
              </td>
              <td>{item.category}</td>
              <td>{new Date(item.lastVerification).toLocaleDateString()}</td>
              <td>{new Date(item.nextVerification).toLocaleDateString()}</td>
              <td>{item.location}</td>
              <td>
                <span className={`sensitive-status sensitive-status--${item.status}`}>
                  {item.status}
                </span>
              </td>
              <td>
                <div className="sensitive-actions">
                  <button
                    className="sensitive-action-button sensitive-action-button--primary"
                    onClick={() => onVerify(item.id)}
                  >
                    Verify Now
                  </button>
                  <button
                    className="sensitive-action-button sensitive-action-button--secondary"
                    onClick={() => onViewDetails(item.id)}
                  >
                    Details
                  </button>
                  <button
                    className="sensitive-action-button sensitive-action-button--danger"
                    onClick={() => onReportIssue(item.id)}
                  >
                    Report Issue
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SensitiveItemsTable; 