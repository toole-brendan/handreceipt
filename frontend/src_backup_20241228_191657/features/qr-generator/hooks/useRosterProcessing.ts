import { useState } from 'react';
import { GeneratedQR } from '../types/qr.types';
import { processRoster } from '../api/processRoster';

export const useRosterProcessing = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [processedCodes, setProcessedCodes] = useState<GeneratedQR[]>([]);

  const processFile = async (file: File): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const codes = await processRoster(file);
      setProcessedCodes(codes);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process roster file');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const clearProcessedCodes = () => {
    setProcessedCodes([]);
  };

  return {
    loading,
    error,
    processedCodes,
    processFile,
    clearProcessedCodes,
  };
}; 