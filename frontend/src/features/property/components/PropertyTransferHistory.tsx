// frontend/src/ui/components/property/PropertyTransferHistory.tsx
import React from 'react';
import { PropertyTransfer } from '@/types/property';
import '@/ui/styles/components/property/transfer-history.css';

interface PropertyTransferHistoryProps {
  transfers: PropertyTransfer[];
}

export const PropertyTransferHistory: React.FC<PropertyTransferHistoryProps> = ({ transfers }) => {
  return (
    <div className="transfer-history">
      <table>
        <thead>
          <tr>
            <th>Property</th>
            <th>From</th>
            <th>To</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transfers.map(transfer => (
            <tr key={transfer.id}>
              <td>{transfer.propertyName}</td>
              <td>{transfer.fromPerson}</td>
              <td>{transfer.toPerson}</td>
              <td>{new Date(transfer.transferDate).toLocaleDateString()}</td>
              <td>
                <span className={`transfer-status status-${transfer.status}`}>
                  {transfer.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};