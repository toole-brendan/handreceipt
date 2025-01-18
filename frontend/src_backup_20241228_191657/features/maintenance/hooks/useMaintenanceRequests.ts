import { useState, useEffect } from 'react';
import { MaintenanceRequest } from '../types/maintenance.types';
import { getRequests } from '../api/getRequests';

interface UseMaintenanceRequestsParams {
  status?: MaintenanceRequest['status'];
  priority?: MaintenanceRequest['priority'];
  itemId?: string;
  page?: number;
  limit?: number;
}

export const useMaintenanceRequests = (params: UseMaintenanceRequestsParams = {}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [requests, setRequests] = useState<MaintenanceRequest[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      setError(null);

      try {
        const { requests: fetchedRequests, total: totalRequests } = await getRequests(params);
        setRequests(fetchedRequests);
        setTotal(totalRequests);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch maintenance requests');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [params.status, params.priority, params.itemId, params.page, params.limit]);

  return {
    loading,
    error,
    requests,
    total,
  };
}; 