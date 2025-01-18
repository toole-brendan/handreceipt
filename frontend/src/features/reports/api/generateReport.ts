import { ReportType, ReportConfig, GeneratedReport } from '../types/reports.types';

export const generateReport = async (
  type: ReportType,
  config: ReportConfig
): Promise<GeneratedReport> => {
  const response = await fetch('/api/v1/reports/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ type, config }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate report');
  }

  return response.json();
}; 