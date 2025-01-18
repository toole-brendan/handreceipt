import React from 'react';
import { Item } from '../../types/qr.types';

interface BulkGeneratorProps {
  items: Item[];
  selectedItems: string[];
  onItemSelect: (id: string) => void;
  onSelectAll: () => void;
  onClearSelection: () => void;
}

export const BulkGenerator: React.FC<BulkGeneratorProps> = ({
  items,
  selectedItems,
  onItemSelect,
  onSelectAll,
  onClearSelection,
}) => {
  return (
    <div className="generation-interface bulk-mode">
      <div className="bulk-controls">
        <button 
          className="secondary-button"
          onClick={onSelectAll}
        >
          Select All
        </button>
        <button 
          className="secondary-button"
          onClick={onClearSelection}
        >
          Clear Selection
        </button>
      </div>
      <div className="items-grid">
        {items.map((item, index) => (
          <div key={item.id} className="grid-item">
            <input
              type="checkbox"
              checked={selectedItems.includes(item.id)}
              onChange={() => onItemSelect(item.id)}
            />
            <div className="grid-item-info">
              <span className="grid-item-name">{item.name}</span>
              <span className="grid-item-serial">SN: {item.serialNumber}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 