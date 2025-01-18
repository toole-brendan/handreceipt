import { useState, useEffect } from 'react';

interface HistoricalPropertyItem {
  id: string;
  name: string;
  serialNumber: string;
  category: string;
  status: 'transferred' | 'turned-in' | 'lost';
  date: string;
  transferTo?: string;
  transferFrom?: string;
  remarks?: string;
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
            name: 'M4 Carbine',
            serialNumber: 'M4-2023-001',
            category: 'Weapons',
            status: 'transferred',
            date: '2023-12-15',
            transferTo: 'Alpha Company',
            transferFrom: 'Bravo Company',
            remarks: 'Unit transfer'
          },
          {
            id: '2',
            name: 'PVS-14',
            serialNumber: 'NVG-2023-002',
            category: 'Optics',
            status: 'turned-in',
            date: '2023-11-30',
            remarks: 'ETS'
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