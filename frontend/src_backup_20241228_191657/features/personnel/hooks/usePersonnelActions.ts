import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '@/services/api';
import { Personnel } from '../types';

interface UsePersonnelActionsResult {
  generateHandReceipt: (personnelId: string) => Promise<void>;
  initiateTransfer: (personnelId: string, items: string[]) => Promise<void>;
  viewProfile: (personnelId: string) => void;
  isLoading: boolean;
  error: string | null;
}

export const usePersonnelActions = (): UsePersonnelActionsResult => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateHandReceipt = async (personnelId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await api.post(`/personnel/${personnelId}/hand-receipt`, {});
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate hand receipt');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const initiateTransfer = async (personnelId: string, items: string[]) => {
    setIsLoading(true);
    setError(null);
    try {
      await api.post(`/personnel/${personnelId}/transfer`, { items });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to initiate transfer');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const viewProfile = (personnelId: string) => {
    navigate(`/personnel/${personnelId}/profile`);
  };

  return {
    generateHandReceipt,
    initiateTransfer,
    viewProfile,
    isLoading,
    error
  };
}; 