import { useState } from 'react';
import { ReportType, ReportConfig, GeneratedReport } from '../types/reports.types';
import { generateReport } from '../api/generateReport';

export const useReportGeneration = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateNewReport = async (type: ReportType, config: ReportConfig): Promise<GeneratedReport | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const report = await generateReport(type, config);
      return report;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate report');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    generateNewReport,
  };
}; 