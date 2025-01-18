import React, { useState } from 'react';

interface Person {
  id: string;
  name: string;
  rank: string;
  hasSensitiveItems: boolean;
}

export interface PersonnelListProps {
  unitId: string;
  onPersonSelect: (person: Person) => void;
  selectedPerson?: Person;
  showSensitiveItems: boolean;
}

const PersonnelListPage: React.FC<PersonnelListProps> = ({
  unitId,
  onPersonSelect,
  selectedPerson,
  showSensitiveItems
}) => {
  const [personnel] = useState<Person[]>([
    { id: '1', name: 'John Doe', rank: 'SGT', hasSensitiveItems: true },
    { id: '2', name: 'Jane Smith', rank: 'SSG', hasSensitiveItems: false }
  ]);

  const filteredPersonnel = showSensitiveItems
    ? personnel.filter(person => person.hasSensitiveItems)
    : personnel;

  return (
    <div>
      <h1>Personnel List</h1>
      <h2>Unit ID: {unitId}</h2>
      <ul>
        {filteredPersonnel.map(person => (
          <li 
            key={person.id}
            onClick={() => onPersonSelect(person)}
            style={{ 
              cursor: 'pointer',
              fontWeight: selectedPerson?.id === person.id ? 'bold' : 'normal'
            }}
          >
            {person.rank} {person.name}
            {person.hasSensitiveItems && ' (Has Sensitive Items)'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PersonnelListPage; 