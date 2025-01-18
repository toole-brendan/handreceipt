import React, { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { NewRequestForm } from '@/features/maintenance/components/RequestManagement/NewRequestForm';
import type { RequestFormData } from '@/features/maintenance/types/maintenance.types';

const LoadingFallback = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
    <CircularProgress />
  </div>
);

const MaintenanceRequestPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (data: RequestFormData) => {
    // TODO: Implement request submission logic
    console.log('Submitting request:', data);
    // Navigate back to maintenance dashboard after submission
    navigate('/maintenance');
  };

  const handleCancel = () => {
    navigate('/maintenance');
  };

  return (
    <Suspense fallback={<LoadingFallback />}>
      <NewRequestForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </Suspense>
  );
};

export default MaintenanceRequestPage;
