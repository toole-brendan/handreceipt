import { useState, useEffect } from 'react';

interface PropertyItem {
  id: string;
  name: string;
  serialNumber: string;
  category: string;
  status: 'serviceable' | 'unserviceable' | 'maintenance-required';
  assignedDate: string;
  lastInventory?: string;
  nextInventoryDue?: string;
}

export const useCurrentUserProperty = () => {
  const [property, setProperty] = useState<PropertyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        // Mock data - replace with actual API call
        const mockData: PropertyItem[] = [
          {
            id: '1',
            name: 'M4 Carbine',
            serialNumber: 'M4-2024-001',
            category: 'Weapons',
            status: 'serviceable',
            assignedDate: '2024-01-15',
            lastInventory: '2024-03-15',
            nextInventoryDue: '2024-04-15'
          },
          {
            id: '2',
            name: 'PVS-14',
            serialNumber: 'NVG-2024-002',
            category: 'Optics',
            status: 'serviceable',
            assignedDate: '2024-01-15',
            lastInventory: '2024-03-15',
            nextInventoryDue: '2024-04-15'
          }
        ];

        setProperty(mockData);
      } catch (err) {
        setError('Failed to fetch property data');
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, []);

  return { property, loading, error };
}; 