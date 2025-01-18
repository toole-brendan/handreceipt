/* src/pages/history/index.page.tsx */

import React, { Suspense } from 'react';
import { CircularProgress } from '@mui/material';
import { HistoryPage } from '@/features/history';

const LoadingFallback = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
    <CircularProgress />
  </div>
);

const HistoryDashboardPage: React.FC = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <HistoryPage />
    </Suspense>
  );
};

export default HistoryDashboardPage; 