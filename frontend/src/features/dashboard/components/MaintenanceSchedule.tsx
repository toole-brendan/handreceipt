/* frontend/src/ui/components/dashboard/MaintenanceSchedule.tsx */

import React from 'react';
import DashboardCard from '../common/DashboardCard';

interface MaintenanceScheduleProps {
  onScheduleClick: (scheduleId: string) => void;
}

const MaintenanceSchedule: React.FC<MaintenanceScheduleProps> = ({ onScheduleClick }) => {
  return (
    <DashboardCard 
      title="Maintenance Schedule"
      icon={<i className="material-icons">build</i>}
    >
      <div className="maintenance-content">
        {/* Add your maintenance schedule content */}
      </div>
    </DashboardCard>
  );
};

export default MaintenanceSchedule; 