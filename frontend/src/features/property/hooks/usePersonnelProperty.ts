import { useState, useEffect } from 'react';
import { HandReceiptItem } from '@/types/personnel';
import { mockHandReceiptItems } from '@/mocks/mockPersonnelData';

export const usePersonnelProperty = (personnelId: string) => {
  const [properties, setProperties] = useState<HandReceiptItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call with mock data
    const fetchProperties = async () => {
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // For demo, return all items for any personnel
        setProperties(mockHandReceiptItems);
      } catch (err) {
        setError('Failed to fetch property data');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [personnelId]);

  return { properties, loading, error };
}; 