import React from 'react';
import '@/ui/styles/components/emergency-actions.css';

const EmergencyActions: React.FC = () => {
  return (
    <div className="emergency-actions">
      <button className="emergency-button">Emergency Logout</button>
    </div>
  );
};

export default EmergencyActions;