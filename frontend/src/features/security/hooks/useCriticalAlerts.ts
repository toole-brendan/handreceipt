import { useState, useEffect } from 'react';
import type { Alert } from '@/types/alerts';

interface UseCriticalAlertsReturn {
  alerts: Alert[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export const useCriticalAlerts = (): UseCriticalAlertsReturn => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/alerts/critical');
      
      if (!response.ok) {
        throw new Error('Failed to fetch critical alerts');
      }

      const data = await response.json();
      setAlerts(data.alerts);
      setError(null);
    } catch (err) {
      setError('Error loading critical alerts');
      console.error('Error fetching critical alerts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 30000);
    return () => clearInterval(interval);
  }, []);

  return {
    alerts,
    loading,
    error,
    refresh: fetchAlerts
  };
}; 