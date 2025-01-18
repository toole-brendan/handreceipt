import { useState, useEffect } from 'react';

interface SystemStatusData {
  networkHealth: 'optimal' | 'degraded' | 'critical';
  securityStatus: 'secure' | 'warning' | 'breach';
  commsStatus: 'online' | 'partial' | 'offline';
  meshCoverage: number;
  lastUpdate: string;
}

interface UsePropertyStatusReturn {
  networkHealth: SystemStatusData['networkHealth'];
  securityStatus: SystemStatusData['securityStatus'];
  commsStatus: SystemStatusData['commsStatus'];
  meshCoverage: number;
  lastUpdate: string;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export const usePropertyStatus = (): UsePropertyStatusReturn => {
  const [status, setStatus] = useState<SystemStatusData>({
    networkHealth: 'optimal',
    securityStatus: 'secure',
    commsStatus: 'online',
    meshCoverage: 0,
    lastUpdate: new Date().toISOString()
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/system/status');
      
      if (!response.ok) {
        throw new Error('Failed to fetch system status');
      }

      const data = await response.json();
      setStatus(data);
      setError(null);
    } catch (err) {
      setError('Error loading system status');
      console.error('Error fetching system status:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return {
    ...status,
    loading,
    error,
    refresh: fetchStatus
  };
}; 