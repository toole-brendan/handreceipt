import { useState, useEffect } from 'react';
import { Personnel } from '../types';
import { api } from '@/services/api';

interface UsePersonnelDataResult {
  personnel: Personnel | null;
  isLoading: boolean;
  error: string | null;
}

export const usePersonnelData = (personnelId: string): UsePersonnelDataResult => {
  const [personnel, setPersonnel] = useState<Personnel | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPersonnel = async () => {
      try {
        setIsLoading(true);
        const data = await api.get<Personnel>(`/personnel/${personnelId}`);
        setPersonnel(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch personnel data');
        setPersonnel(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (personnelId) {
      fetchPersonnel();
    }
  }, [personnelId]);

  return { personnel, isLoading, error };
}; 