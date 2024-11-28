import React from 'react';
import { PropertyItem } from '@/hooks/useCurrentUserProperty';

interface CurrentPropertyListProps {
  property: PropertyItem[];
}

export const CurrentPropertyList: React.FC<CurrentPropertyListProps> = ({ property }) => {
  if (!property) return null;

  return (
    <div className="current-property-section">
      <h2>Current Property</h2>
      <div className="property-table">
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Serial Number</th>
              <th>Category</th>
              <th>Status</th>
              <th>Assigned Date</th>
              <th>Next Inventory</th>
            </tr>
          </thead>
          <tbody>
            {property.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.serialNumber}</td>
                <td>{item.category}</td>
                <td>
                  <span className={`status-badge ${item.status}`}>
                    {item.status}
                  </span>
                </td>
                <td>{new Date(item.assignedDate).toLocaleDateString()}</td>
                <td>
                  {item.nextInventoryDue && 
                    new Date(item.nextInventoryDue).toLocaleDateString()
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
