import { HistoricalItem } from '../types/history.types';

interface GetHistoricalRecordsParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  year?: string;
}

export const getHistoricalRecords = async (params: GetHistoricalRecordsParams = {}): Promise<{
  items: HistoricalItem[];
  total: number;
}> => {
  const queryParams = new URLSearchParams();
  if (params.page) queryParams.append('page', params.page.toString());
  if (params.limit) queryParams.append('limit', params.limit.toString());
  if (params.search) queryParams.append('search', params.search);
  if (params.category) queryParams.append('category', params.category);
  if (params.year) queryParams.append('year', params.year);

  const response = await fetch(`/api/v1/history?${queryParams.toString()}`);
  if (!response.ok) {
    throw new Error('Failed to fetch historical records');
  }
  return response.json();
}; 