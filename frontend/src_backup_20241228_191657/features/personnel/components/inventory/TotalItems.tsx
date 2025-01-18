import React from 'react';
import { useAssignedItems } from '../../hooks/useAssignedItems';

interface TotalItemsProps {
  personnelId: string;
}

export const TotalItems: React.FC<TotalItemsProps> = ({ personnelId }) => {
  const { items, isLoading } = useAssignedItems(personnelId);
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="total-items">
      <h3>Total Items</h3>
      <div className="total-count">{items.length}</div>
    </div>
  );
}; 