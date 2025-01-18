import React, { Suspense } from 'react';
import { CircularProgress } from '@mui/material';
import { QRGeneratorPage } from '@/features/qr-generator/components/QRGeneratorPage';

const LoadingFallback = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
    <CircularProgress />
  </div>
);

const QRGeneratorDashboardPage: React.FC = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <QRGeneratorPage />
    </Suspense>
  );
};

export default QRGeneratorDashboardPage;
