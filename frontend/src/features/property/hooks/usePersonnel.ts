import { useState, useEffect } from 'react';
import { Personnel } from '@/types/personnel';
import { mockPersonnel } from '@/mocks/mockPersonnelData';

export const usePersonnel = (unitId: string) => {
  const [personnel, setPersonnel] = useState<Personnel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call with mock data
    const fetchPersonnel = async () => {
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Filter personnel by unitId
        const filteredPersonnel = mockPersonnel.filter(p => p.unitId === unitId);
        setPersonnel(filteredPersonnel);
      } catch (err) {
        setError('Failed to fetch personnel data');
      } finally {
        setLoading(false);
      }
    };

    fetchPersonnel();
  }, [unitId]);

  return { personnel, loading, error };
}; 