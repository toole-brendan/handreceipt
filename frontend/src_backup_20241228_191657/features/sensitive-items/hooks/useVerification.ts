import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { SensitiveItem } from '../types/SensitiveItem';
import { api } from '@/services/api';

interface VerificationResult {
  success: boolean;
  message: string;
  timestamp: string;
}

export const useVerification = () => {
  const dispatch = useDispatch();
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const verifyItem = async (item: SensitiveItem): Promise<VerificationResult> => {
    setIsVerifying(true);
    setError(null);
    
    try {
      const result = await api.post<VerificationResult>('/sensitive-items/verify', {
        itemId: item.id,
        serialNumber: item.serialNumber,
        timestamp: new Date().toISOString()
      });
      
      // Update store with verification result
      dispatch({ 
        type: 'sensitiveItems/itemVerified', 
        payload: {
          itemId: item.id,
          verificationResult: result
        }
      });

      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Verification failed';
      setError(message);
      throw err;
    } finally {
      setIsVerifying(false);
    }
  };

  return {
    verifyItem,
    isVerifying,
    error
  };
}; 