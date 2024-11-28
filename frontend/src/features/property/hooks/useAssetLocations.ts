import { useState, useEffect } from 'react';

interface AssetLocation {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  status: 'active' | 'inactive' | 'maintenance';
  lastUpdate: string;
}

interface UseAssetLocationsReturn {
  locations: AssetLocation[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export const useAssetLocations = (): UseAssetLocationsReturn => {
  const [locations, setLocations] = useState<AssetLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLocations = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/assets/locations');
      
      if (!response.ok) {
        throw new Error('Failed to fetch asset locations');
      }

      const data = await response.json();
      setLocations(data.locations);
      setError(null);
    } catch (err) {
      setError('Error loading asset locations');
      console.error('Error fetching asset locations:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
    const interval = setInterval(fetchLocations, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return {
    locations,
    loading,
    error,
    refresh: fetchLocations
  };
}; 