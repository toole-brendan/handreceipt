import React from 'react';
import { useAssignedItems } from '../../hooks/useAssignedItems';

interface SensitiveItemsProps {
  personnelId: string;
}

export const SensitiveItems: React.FC<SensitiveItemsProps> = ({ personnelId }) => {
  const { items, isLoading } = useAssignedItems(personnelId);
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const sensitiveItems = items.filter(item => item.isSensitive);

  return (
    <div className="sensitive-items">
      <h3>Sensitive Items</h3>
      <div className="sensitive-count">{sensitiveItems.length}</div>
      {sensitiveItems.length > 0 && (
        <div className="sensitive-items-list">
          {sensitiveItems.map(item => (
            <div key={item.id} className="sensitive-item">
              <span className="item-name">{item.name}</span>
              <span className="item-serial">{item.serialNumber}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 