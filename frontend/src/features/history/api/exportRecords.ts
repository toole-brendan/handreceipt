import { ExportFormat } from '../components/ExportTools/ExportFormatSelect';

interface ExportRecordsParams {
  format: ExportFormat;
  filters?: {
    search?: string;
    category?: string;
    year?: string;
  };
}

export const exportRecords = async (params: ExportRecordsParams): Promise<Blob> => {
  const queryParams = new URLSearchParams();
  queryParams.append('format', params.format);
  if (params.filters?.search) queryParams.append('search', params.filters.search);
  if (params.filters?.category) queryParams.append('category', params.filters.category);
  if (params.filters?.year) queryParams.append('year', params.filters.year);

  const response = await fetch(`/api/v1/history/export?${queryParams.toString()}`);
  if (!response.ok) {
    throw new Error('Failed to export records');
  }
  return response.blob();
}; 