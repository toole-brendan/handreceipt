import { useState, useEffect } from 'react';

interface HistoricalPropertyItem {
  id: string;
  propertyId: string;
  propertyName: string;
  fromPerson: string;
  toPerson: string;
  status: 'transferred' | 'turned-in' | 'lost';
  transferDate: string;
}

export const useHistoricalProperty = () => {
  const [history, setHistory] = useState<HistoricalPropertyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        // Mock data - replace with actual API call
        const mockData: HistoricalPropertyItem[] = [
          {
            id: '1',
            propertyId: 'M4-2023-001',
            propertyName: 'M4 Carbine',
            fromPerson: 'Bravo Company',
            toPerson: 'Alpha Company',
            status: 'transferred',
            transferDate: '2023-12-15T00:00:00Z'
          },
          {
            id: '2',
            propertyId: 'NVG-2023-002',
            propertyName: 'PVS-14',
            fromPerson: 'Charlie Company',
            toPerson: 'Supply',
            status: 'turned-in',
            transferDate: '2023-11-30T00:00:00Z'
          }
        ];

        setHistory(mockData);
      } catch (err) {
        setError('Failed to fetch historical property data');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return { history, loading, error };
}; 