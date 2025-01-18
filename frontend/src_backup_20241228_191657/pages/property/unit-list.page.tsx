import React, { useState } from 'react';

interface Unit {
  id: string;
  name: string;
}

export interface UnitListProps {
  onUnitSelect: (unit: Unit) => void;
  selectedUnit?: Unit;
}

const UnitListPage: React.FC<UnitListProps> = ({ onUnitSelect, selectedUnit }) => {
  const [units] = useState<Unit[]>([
    { id: '1', name: 'Unit A' },
    { id: '2', name: 'Unit B' }
  ]);

  return (
    <div>
      <h1>Unit List</h1>
      <ul>
        {units.map(unit => (
          <li 
            key={unit.id}
            onClick={() => onUnitSelect(unit)}
            style={{ 
              cursor: 'pointer',
              fontWeight: selectedUnit?.id === unit.id ? 'bold' : 'normal'
            }}
          >
            {unit.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UnitListPage; 