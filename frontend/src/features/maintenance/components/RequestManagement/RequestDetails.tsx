import React from 'react';
import { MaintenanceRequest } from '../../types/maintenance.types';
import { Timeline } from '../StatusTracking/Timeline';
import { StatusIndicator } from '../StatusTracking/StatusIndicator';

interface RequestDetailsProps {
  request: MaintenanceRequest;
  onClose: () => void;
  onStatusChange: (status: MaintenanceRequest['status']) => void;
}

export const RequestDetails: React.FC<RequestDetailsProps> = ({
  request,
  onClose,
  onStatusChange,
}) => {
  return (
    <div className="request-details">
      <div className="request-details-header">
        <h2>Maintenance Request Details</h2>
        <button onClick={onClose} className="close-button">
          Close
        </button>
      </div>

      <div className="request-info">
        <div className="info-group">
          <label>Item Name</label>
          <span>{request.itemName}</span>
        </div>

        <div className="info-group">
          <label>Request Type</label>
          <span>{request.requestType}</span>
        </div>

        <div className="info-group">
          <label>Priority</label>
          <span className={`priority-badge priority-${request.priority}`}>
            {request.priority}
          </span>
        </div>

        <div className="info-group">
          <label>Status</label>
          <StatusIndicator status={request.status} onChange={onStatusChange} />
        </div>

        <div className="info-group">
          <label>Submitted By</label>
          <span>{request.submittedBy}</span>
        </div>

        <div className="info-group">
          <label>Submitted At</label>
          <span>{new Date(request.submittedAt).toLocaleString()}</span>
        </div>

        {request.assignedTo && (
          <div className="info-group">
            <label>Assigned To</label>
            <span>{request.assignedTo}</span>
          </div>
        )}

        <div className="info-group full-width">
          <label>Description</label>
          <p>{request.description}</p>
        </div>

        {request.notes && (
          <div className="info-group full-width">
            <label>Notes</label>
            <p>{request.notes}</p>
          </div>
        )}
      </div>

      <div className="request-timeline">
        <h3>Request Timeline</h3>
        <Timeline requestId={request.id} />
      </div>
    </div>
  );
}; 