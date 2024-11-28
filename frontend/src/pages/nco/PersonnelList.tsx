// frontend/src/pages/property/personnel-property/PersonnelList.tsx
import React from 'react';
import { Personnel } from '@/types/personnel';
import { usePersonnel } from '@/hooks';
import { PersonnelPropertyList } from './PersonnelPropertyList';

interface PersonnelListProps {
  unitId: string;
  onPersonSelect: (personnelId: string) => void;
  selectedPerson: string | null;
  showSensitiveItems: boolean;
}

export const PersonnelList: React.FC<PersonnelListProps> = ({ 
  unitId, 
  onPersonSelect, 
  selectedPerson,
  showSensitiveItems
}) => {
  const { personnel, loading, error } = usePersonnel(unitId);

  if (loading) return <div>Loading personnel...</div>;
  if (error) return <div>Error loading personnel</div>;

  // Group personnel by platoon
  const groupedPersonnel = personnel.reduce((acc: Record<string, Personnel[]>, person) => {
    const platoon = person.platoon || 'Unassigned';
    if (!acc[platoon]) {
      acc[platoon] = [];
    }
    acc[platoon].push(person);
    return acc;
  }, {});

  return (
    <div className="personnel-list">
      <h3>Unit Personnel</h3>
      {Object.entries(groupedPersonnel).map(([platoon, platoonPersonnel]) => (
        <div key={platoon} className="platoon-section">
          <h4 className="platoon-header">{platoon}</h4>
          <div className="personnel-grid">
            {platoonPersonnel.map((person: Personnel) => (
              <div 
                key={person.id}
                className={`personnel-card ${selectedPerson === person.id ? 'selected' : ''}`}
                onClick={() => onPersonSelect(person.id)}
              >
                <div className="personnel-header">
                  <span className="rank-badge">{person.rank}</span>
                  {person.dutyPosition && (
                    <span className="duty-badge">{person.dutyPosition}</span>
                  )}
                </div>
                <h3>{person.lastName}, {person.firstName}</h3>
                <div className="personnel-details">
                  <p className="position">{person.position}</p>
                  <p className="section">{person.section}</p>
                </div>
                <div className="property-stats">
                  <div className="stat">
                    <span className="stat-value">{person.propertyCount || 0}</span>
                    <span className="stat-label">Items</span>
                  </div>
                  {showSensitiveItems && (
                    <div className="stat sensitive">
                      <span className="stat-value">{person.sensitiveItemCount || 0}</span>
                      <span className="stat-label">Sensitive</span>
                    </div>
                  )}
                  {person.pendingTransfers > 0 && (
                    <div className="stat pending">
                      <span className="stat-value">{person.pendingTransfers}</span>
                      <span className="stat-label">Pending</span>
                    </div>
                  )}
                </div>
                {person.lastInventory && (
                  <div className="inventory-status">
                    Last Inventory: {new Date(person.lastInventory).toLocaleDateString()}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PersonnelList;