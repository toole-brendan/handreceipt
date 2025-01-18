import { useState } from 'react';
import { CustomReport, ReportTemplate } from '../types/reports.types';
import { saveCustomReport } from '../api/saveCustomReport';

export const useCustomReports = () => {
  const [templates, setTemplates] = useState<ReportTemplate[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveTemplate = async (report: CustomReport): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      await saveCustomReport(report);
      setTemplates(prev => [...prev, { ...report, id: Date.now().toString() }]);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save custom report');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    templates,
    loading,
    error,
    saveTemplate,
  };
}; 