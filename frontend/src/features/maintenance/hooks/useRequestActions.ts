import { useState } from 'react';
import { RequestFormData, StatusUpdate, MaintenanceRequest } from '../types/maintenance.types';
import { createRequest } from '../api/createRequest';
import { updateStatus } from '../api/updateStatus';

export const useRequestActions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitRequest = async (data: RequestFormData): Promise<MaintenanceRequest | null> => {
    setLoading(true);
    setError(null);

    try {
      const request = await createRequest(data);
      return request;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit maintenance request');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateRequestStatus = async (
    requestId: string,
    data: StatusUpdate
  ): Promise<MaintenanceRequest | null> => {
    setLoading(true);
    setError(null);

    try {
      const request = await updateStatus(requestId, data);
      return request;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update request status');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    submitRequest,
    updateRequestStatus,
  };
}; 