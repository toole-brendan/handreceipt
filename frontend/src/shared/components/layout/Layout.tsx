import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navigation from './Navigation';
import EmergencyActions from './EmergencyActions';
import SessionTimeout from './SessionTimeout';
import LoadingFallback from './LoadingFallback';
import ErrorBoundary from './ErrorBoundary';
import '@/ui/styles/layouts/layout.css';

// Lazy load pages with proper type assertions
const Dashboard = React.lazy(() => 
  import('@/pages/dashboard/Dashboard').then(module => ({ default: module.default }))
);

const Assets = React.lazy(() => 
  import('@/pages/assets/AssetList').then(module => ({ default: module.default }))
);

const Reports = React.lazy(() => 
  import('@/pages/reports/ReportsList').then(module => ({ default: module.default }))
);

const BlockchainExplorer = React.lazy(() => 
  import('@/pages/blockchain/explorer').then(module => ({ default: module.default }))
);

const BlockchainTransactions = React.lazy(() => 
  import('@/pages/blockchain/transactions').then(module => ({ default: module.default }))
);

const NetworkStatus = React.lazy(() => 
  import('@/pages/network/status').then(module => ({ default: module.default }))
);

const NetworkNodes = React.lazy(() => 
  import('@/pages/network/nodes').then(module => ({ default: module.default }))
);

const SecurityMonitor = React.lazy(() => 
  import('@/pages/security/monitor').then(module => ({ default: module.default }))
);

const AccessControl = React.lazy(() => 
  import('@/pages/security/access-control').then(module => ({ default: module.default }))
);

const Profile = React.lazy(() => 
  import('@/pages/profile').then(module => ({ default: module.default }))
);

const Help = React.lazy(() => 
  import('@/pages/help').then(module => ({ default: module.default }))
);

const Layout: React.FC = () => {
  return (
    <div className="app-wrapper">
      <Navigation />
      <div className="app-layout">
        <Sidebar />
        <main className="main-content">
          <ErrorBoundary>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                {/* Default redirect */}
                <Route path="/" element={<Navigate to="/dashboard" replace />} />

                {/* Main routes */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/assets/*" element={<Assets />} />
                <Route path="/reports/*" element={<Reports />} />

                {/* Blockchain routes */}
                <Route path="/blockchain/explorer" element={<BlockchainExplorer />} />
                <Route path="/blockchain/transactions" element={<BlockchainTransactions />} />

                {/* Network routes */}
                <Route path="/network">
                  <Route path="status" element={<NetworkStatus />} />
                  <Route path="nodes" element={<NetworkNodes />} />
                </Route>

                {/* Security routes */}
                <Route path="/security">
                  <Route path="monitor" element={<SecurityMonitor />} />
                  <Route path="access-control" element={<AccessControl />} />
                </Route>

                {/* User routes */}
                <Route path="/profile" element={<Profile />} />
                <Route path="/help" element={<Help />} />

                {/* 404 route */}
                <Route path="*" element={
                  <div className="error-container">
                    <h1>404 - Page Not Found</h1>
                    <p>The page you're looking for doesn't exist.</p>
                  </div>
                } />
              </Routes>
            </Suspense>
          </ErrorBoundary>
          <EmergencyActions />
        </main>
      </div>
      <SessionTimeout />
    </div>
  );
};

export default Layout; 