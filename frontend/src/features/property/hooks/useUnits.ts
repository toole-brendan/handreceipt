/* frontend/src/hooks/useUnits.ts */

import { useState, useEffect } from 'react';
import { Unit } from '@/types/personnel';
import { mockUnits } from '@/mocks/mockPersonnelData';

export const useUnits = () => {
  const [units, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call with mock data
    const fetchUnits = async () => {
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setUnits(mockUnits);
      } catch (err) {
        setError('Failed to fetch unit data');
      } finally {
        setLoading(false);
      }
    };

    fetchUnits();
  }, []);

  return { units, loading, error };
}; 