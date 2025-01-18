import { api } from '@/services/api';
import { SensitiveItem } from '../types/SensitiveItem';

interface GetSensitiveItemsParams {
  category?: string;
  location?: string;
  status?: 'verified' | 'needs_verification' | 'overdue';
}

export const getSensitiveItems = async (params?: GetSensitiveItemsParams): Promise<SensitiveItem[]> => {
  const queryParams = new URLSearchParams();
  
  if (params?.category) queryParams.append('category', params.category);
  if (params?.location) queryParams.append('location', params.location);
  if (params?.status) queryParams.append('status', params.status);
  
  const endpoint = `/sensitive-items${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
  return api.get<SensitiveItem[]>(endpoint);
}; 