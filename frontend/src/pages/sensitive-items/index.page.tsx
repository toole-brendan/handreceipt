import React, { Suspense } from 'react';
import { CircularProgress } from '@mui/material';
import { SensitiveItemsPage } from '@/features/sensitive-items/components/SensitiveItemsPage';

const LoadingFallback = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
    <CircularProgress />
  </div>
);

const SensitiveItemsDashboardPage: React.FC = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <SensitiveItemsPage />
    </Suspense>
  );
};

export default SensitiveItemsDashboardPage; 