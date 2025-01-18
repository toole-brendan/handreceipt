import { CustomReport } from '../types/reports.types';

export const saveCustomReport = async (report: CustomReport): Promise<void> => {
  const response = await fetch('/api/v1/reports/custom', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(report),
  });

  if (!response.ok) {
    throw new Error('Failed to save custom report');
  }
}; 