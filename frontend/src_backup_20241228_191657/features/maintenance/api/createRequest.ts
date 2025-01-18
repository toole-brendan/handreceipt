import { MaintenanceRequest, RequestFormData } from '../types/maintenance.types';

export const createRequest = async (data: RequestFormData): Promise<MaintenanceRequest> => {
  const response = await fetch('/api/v1/maintenance/requests', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to create maintenance request');
  }

  return response.json();
}; 