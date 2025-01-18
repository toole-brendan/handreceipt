import { useState, useEffect } from 'react';

export interface SystemMetric {
  name: string;
  status: 'healthy' | 'degraded' | 'critical';
  value: number;
  threshold: number;
  unit: string;
  description: string;
  history: { timestamp: string; value: number }[];
}

export const useSystemMetrics = (timeRange: string = '24h') => {
  const [metrics, setMetrics] = useState<SystemMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [overallHealth, setOverallHealth] = useState<'healthy' | 'degraded' | 'critical'>('healthy');

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/system/health?timeRange=${timeRange}`);
      if (!response.ok) {
        throw new Error('Failed to fetch system health metrics');
      }
      const data = await response.json();
      setMetrics(data.metrics);
      setOverallHealth(data.overallHealth);
      setError(null);
    } catch (err) {
      setError('Error fetching system health data');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 30000);
    return () => clearInterval(interval);
  }, [timeRange]);

  return { metrics, loading, error, overallHealth, refresh: fetchMetrics };
}; 