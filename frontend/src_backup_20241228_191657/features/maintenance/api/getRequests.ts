import { MaintenanceRequest } from '../types/maintenance.types';

interface GetRequestsParams {
  status?: MaintenanceRequest['status'];
  priority?: MaintenanceRequest['priority'];
  itemId?: string;
  page?: number;
  limit?: number;
}

export const getRequests = async (params: GetRequestsParams = {}): Promise<{
  requests: MaintenanceRequest[];
  total: number;
}> => {
  const queryParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value) queryParams.append(key, value.toString());
  });

  const response = await fetch(`/api/v1/maintenance/requests?${queryParams}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch maintenance requests');
  }

  return response.json();
}; 