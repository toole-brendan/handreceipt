import { useState, useEffect } from 'react';

interface UseAssetReadinessReturn {
  readinessPercentage: number;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export const useAssetReadiness = (): UseAssetReadinessReturn => {
  const [readinessPercentage, setReadinessPercentage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReadiness = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/assets/readiness');
      
      if (!response.ok) {
        throw new Error('Failed to fetch asset readiness');
      }

      const data = await response.json();
      setReadinessPercentage(data.readinessPercentage);
      setError(null);
    } catch (err) {
      setError('Error loading asset readiness');
      console.error('Error fetching asset readiness:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReadiness();
    const interval = setInterval(fetchReadiness, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return {
    readinessPercentage,
    loading,
    error,
    refresh: fetchReadiness
  };
}; 