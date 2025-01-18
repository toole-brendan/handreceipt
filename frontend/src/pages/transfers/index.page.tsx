/* frontend/src/pages/transfers/index.page.tsx */

import React, { Suspense } from 'react';
import { CircularProgress } from '@mui/material';
import { TransfersPage } from '@/features/transfers';

const LoadingFallback = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
    <CircularProgress />
  </div>
);

const TransfersDashboardPage: React.FC = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <TransfersPage />
    </Suspense>
  );
};

export default TransfersDashboardPage;
