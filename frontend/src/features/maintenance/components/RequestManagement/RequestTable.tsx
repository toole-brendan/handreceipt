import React from 'react';
import { MaintenanceRequest } from '../../types/maintenance.types';

interface RequestTableProps {
  requests: MaintenanceRequest[];
  onStatusChange: (requestId: string, status: MaintenanceRequest['status']) => void;
  onViewDetails: (request: MaintenanceRequest) => void;
}

export const RequestTable: React.FC<RequestTableProps> = ({
  requests,
  onStatusChange,
  onViewDetails,
}) => {
  return (
    <div className="request-table">
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Type</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Submitted</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td>{request.itemName}</td>
              <td>{request.requestType}</td>
              <td>
                <span className={`priority-badge priority-${request.priority}`}>
                  {request.priority}
                </span>
              </td>
              <td>
                <select
                  value={request.status}
                  onChange={(e) => onStatusChange(request.id, e.target.value as MaintenanceRequest['status'])}
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="rejected">Rejected</option>
                </select>
              </td>
              <td>{new Date(request.submittedAt).toLocaleDateString()}</td>
              <td>
                <button
                  className="view-details-button"
                  onClick={() => onViewDetails(request)}
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}; 