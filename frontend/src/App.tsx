/* frontend/src/App.tsx */

import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from '@shared/components/layout/Header';
import Sidebar from '@shared/components/layout/Sidebar';
import LoadingFallback from '@shared/components/feedback/LoadingFallback';
import ErrorBoundary from '@shared/components/feedback/ErrorBoundary';
import AppRoutes from './routes';
import '@styles/app.css';
import { SettingsProvider } from '@contexts/SettingsContext';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <SettingsProvider>
        <ErrorBoundary>
          <div className="app-layout">
            <Header />
            <div className="app-body">
              <Sidebar />
              <main className="main-content">
                <Suspense fallback={<LoadingFallback />}>
                  <AppRoutes />
                </Suspense>
              </main>
            </div>
          </div>
        </ErrorBoundary>
      </SettingsProvider>
    </BrowserRouter>
  );
};

export default App;