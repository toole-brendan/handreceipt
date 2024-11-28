/* frontend/src/ui/components/dashboard/PersonnelStatus.tsx */

import React from 'react';

interface PersonnelStatusProps {
  activeCount: number;
  onPersonnelClick: (personnelId: string) => void;
}

const PersonnelStatus: React.FC<PersonnelStatusProps> = ({
  activeCount,
  onPersonnelClick
}) => {
  return (
    <div className="personnel-status">
      <h3>Personnel Status</h3>
      <div className="personnel-count">
        <span>Active Personnel: {activeCount}</span>
      </div>
      <button 
        onClick={() => onPersonnelClick('all')}
        className="view-all-btn"
      >
        View All Personnel
      </button>
    </div>
  );
};

export default PersonnelStatus; 