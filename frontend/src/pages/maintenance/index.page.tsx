import React, { Suspense } from 'react';
import { CircularProgress } from '@mui/material';
import { MaintenancePage } from '@/features/maintenance/components/MaintenancePage';

const LoadingFallback = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
    <CircularProgress />
  </div>
);

const MaintenanceDashboardPage: React.FC = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <MaintenancePage />
    </Suspense>
  );
};

export default MaintenanceDashboardPage;
