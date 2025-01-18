import { useState, useEffect } from 'react';

interface PersonnelStats {
  activePersonnel: number;
  onMission: number;
  onLeave: number;
  inTraining: number;
}

interface UsePersonnelStatusReturn {
  stats: PersonnelStats;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export const usePersonnelStatus = (): UsePersonnelStatusReturn => {
  const [stats, setStats] = useState<PersonnelStats>({
    activePersonnel: 0,
    onMission: 0,
    onLeave: 0,
    inTraining: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/personnel/stats');
      
      if (!response.ok) {
        throw new Error('Failed to fetch personnel stats');
      }

      const data = await response.json();
      setStats(data);
      setError(null);
    } catch (err) {
      setError('Error loading personnel stats');
      console.error('Error fetching personnel stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return {
    stats,
    loading,
    error,
    refresh: fetchStats
  };
}; 