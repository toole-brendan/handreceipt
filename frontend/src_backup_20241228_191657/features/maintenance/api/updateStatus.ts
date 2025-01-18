import { MaintenanceRequest, StatusUpdate } from '../types/maintenance.types';

export const updateStatus = async (
  requestId: string,
  data: StatusUpdate
): Promise<MaintenanceRequest> => {
  const response = await fetch(`/api/v1/maintenance/requests/${requestId}/status`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to update maintenance request status');
  }

  return response.json();
}; 