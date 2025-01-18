import React from 'react';
import { MaintenanceRequest } from '../../types/maintenance.types';

interface StatusIndicatorProps {
  status: MaintenanceRequest['status'];
  onChange?: (status: MaintenanceRequest['status']) => void;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  onChange,
}) => {
  if (onChange) {
    return (
      <select
        value={status}
        onChange={(e) => onChange(e.target.value as MaintenanceRequest['status'])}
        className={`status-indicator status-${status}`}
      >
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="in_progress">In Progress</option>
        <option value="completed">Completed</option>
        <option value="rejected">Rejected</option>
      </select>
    );
  }

  return (
    <span className={`status-badge status-${status}`}>
      {status.replace('_', ' ')}
    </span>
  );
}; 