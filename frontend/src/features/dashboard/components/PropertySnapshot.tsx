import React from 'react';
import '@/ui/styles/components/dashboard/property-snapshot.css';

interface PropertyItem {
  id: string;
  name: string;
  serialNumber: string;
  category: string;
  value: number;
  dateIssued: string;
  condition: 'serviceable' | 'unserviceable';
}

const mockPropertyData: PropertyItem[] = [
  {
    id: '1',
    name: 'M4 Carbine',
    serialNumber: 'M4-789012',
    category: 'Weapon',
    value: 1200,
    dateIssued: '2024-01-15',
    condition: 'serviceable'
  },
  {
    id: '2',
    name: 'PVS-14',
    serialNumber: 'NV-345678',
    category: 'Optics',
    value: 3400,
    dateIssued: '2024-01-15',
    condition: 'serviceable'
  },
  {
    id: '3',
    name: 'IOTV',
    serialNumber: 'IOTV-123456',
    category: 'Protection',
    value: 1600,
    dateIssued: '2024-01-15',
    condition: 'serviceable'
  },
  {
    id: '4',
    name: 'ACH Helmet',
    serialNumber: 'ACH-567890',
    category: 'Protection',
    value: 400,
    dateIssued: '2024-01-15',
    condition: 'serviceable'
  }
];

const PropertySnapshot: React.FC = () => {
  return (
    <div className="property-snapshot">
      <div className="property-snapshot__header">
        <h3>Property Snapshot</h3>
        <span className="property-snapshot__total">
          Total Value: ${mockPropertyData.reduce((sum, item) => sum + item.value, 0).toLocaleString()}
        </span>
      </div>

      <div className="property-snapshot__content">
        <table className="property-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Serial #</th>
              <th>Category</th>
              <th>Condition</th>
            </tr>
          </thead>
          <tbody>
            {mockPropertyData.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.serialNumber}</td>
                <td>{item.category}</td>
                <td>
                  <span className={`condition-badge ${item.condition}`}>
                    {item.condition}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PropertySnapshot; 