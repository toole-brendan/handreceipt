import { useState } from 'react';
import { NewItemFormData, GeneratedQR } from '../types/qr.types';
import { generateQR } from '../api/generateQR';

export const useQRGeneration = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedCodes, setGeneratedCodes] = useState<GeneratedQR[]>([]);

  const generateCode = async (data: NewItemFormData): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const code = await generateQR(data);
      setGeneratedCodes(prev => [...prev, code]);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate QR code');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const clearCodes = () => {
    setGeneratedCodes([]);
  };

  return {
    loading,
    error,
    generatedCodes,
    generateCode,
    clearCodes,
  };
}; 