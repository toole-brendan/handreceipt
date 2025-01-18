import { useState, useEffect } from 'react';

export interface Alert {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  message: string;
  timestamp: string;
  source: string;
}

export const useSecurityAlerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAlerts = async () => {
    try {
      const response = await fetch('/api/security/alerts');
      if (!response.ok) {
        throw new Error('Failed to fetch security alerts');
      }
      const data = await response.json();
      setAlerts(data);
      setError(null);
    } catch (err) {
      setError('Error fetching security alerts');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return { alerts, loading, error, fetchAlerts };
}; 