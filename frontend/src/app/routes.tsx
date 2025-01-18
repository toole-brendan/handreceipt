import { lazy, Suspense } from 'react';
import { Navigate, useParams, Outlet } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import Layout from '@components/layout/Layout';
import ProtectedRoute from '@components/common/ProtectedRoute';
import ErrorBoundary from '@components/feedback/ErrorBoundary';

// Lazy load components
const LoadingFallback = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <CircularProgress />
  </div>
);

// Error fallback for routes
const RouteErrorFallback = () => (
  <div style={{ padding: '20px', textAlign: 'center' }}>
    <h2>Something went wrong loading this page</h2>
    <button 
      onClick={() => window.location.reload()}
      style={{ 
        marginTop: '10px',
        padding: '8px 16px',
        background: '#333',
        color: 'white',
        border: '1px solid #666',
        cursor: 'pointer'
      }}
    >
      Retry
    </button>
  </div>
);

// Auth pages
const Login = lazy(() => import('@/pages/auth/login.page'));
const Profile = lazy(() => import('@/pages/auth/profile.page'));
const CreateAccount = lazy(() => import('@/pages/auth/create-account.page'));
const ForgotPassword = lazy(() => import('@/pages/auth/forgot-password.page'));

// Property pages
const PropertyIndex = lazy(() => import('@/pages/property/index.page'));
const SensitiveItems = lazy(() => import('@/pages/property/sensitive-items.page'));

// Maintenance pages
const MaintenanceIndex = lazy(() => import('@/pages/maintenance/index.page'));
const MaintenanceRequest = lazy(() => import('@/pages/maintenance/request.page'));

// Transfer pages
const TransfersIndex = lazy(() => import('@/pages/transfers/index.page'));
const NewTransfer = lazy(() => import('@/pages/transfers/new.page'));

// Personnel pages (NCO & Officer only)
const PersonnelDetails = lazy(() => import('@/pages/personnel/details.page'));

// Reports pages (Officer only)
const ReportsIndex = lazy(() => import('@/pages/reports/index.page'));
const HistoryPage = lazy(() => import('@/pages/history/index.page'));

// QR pages (Officer only)
const QRIndex = lazy(() => import('@/pages/qr/index.page'));
const QRBulk = lazy(() => import('@/pages/qr/bulk.page'));

// Settings pages
const Settings = lazy(() => import('@/pages/settings/index.page'));

// Utility pages
const About = lazy(() => import('@/pages/utility/about.page'));
const Help = lazy(() => import('@/pages/utility/help.page'));
const Network = lazy(() => import('@/pages/utility/network.page'));
const Notifications = lazy(() => import('@/pages/utility/notifications.page'));
const Security = lazy(() => import('@/pages/utility/security.page'));
const NotFound = lazy(() => import('@/pages/utility/not-found.page'));

// Lazy load components
const PersonnelIndex = lazy(() => import('@/features/personnel/components/PersonnelIndex'));

// Sensitive Items routes
const SensitiveItemsDashboard = lazy(() => import('@/pages/sensitive-items/index.page'));

// History route
const HistoryIndex = lazy(() => import('@/pages/history/index.page'));

// Root layout that wraps authenticated routes
const RootLayout = () => (
  <Layout>
    <ErrorBoundary>
      <Suspense fallback={<LoadingFallback />}>
        <Outlet />
      </Suspense>
    </ErrorBoundary>
  </Layout>
);

const routes = [
  // Auth routes (no layout wrapper)
  {
    path: '/login',
    element: <Suspense fallback={<LoadingFallback />}><Login /></Suspense>,
    errorElement: <RouteErrorFallback />
  },
  {
    path: '/create-account',
    element: <Suspense fallback={<LoadingFallback />}><CreateAccount /></Suspense>,
    errorElement: <RouteErrorFallback />
  },
  {
    path: '/forgot-password',
    element: <Suspense fallback={<LoadingFallback />}><ForgotPassword /></Suspense>,
    errorElement: <RouteErrorFallback />
  },
  {
    path: '/profile',
    element: <Suspense fallback={<LoadingFallback />}><Profile /></Suspense>,
    errorElement: <RouteErrorFallback />
  },
  
  // Main app routes (with layout wrapper)
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <RouteErrorFallback />,
    children: [
      {
        path: '',
        element: <Navigate to="/property" replace />
      },
      // Property routes
      {
        path: 'property',
        children: [
          {
            path: '',
            element: <ProtectedRoute><PropertyIndex /></ProtectedRoute>,
            errorElement: <RouteErrorFallback />
          }
        ]
      },
      // Maintenance routes
      {
        path: 'maintenance',
        children: [
          {
            path: '',
            element: <ProtectedRoute><MaintenanceIndex /></ProtectedRoute>,
            errorElement: <RouteErrorFallback />
          },
          {
            path: 'request',
            element: <ProtectedRoute><MaintenanceRequest /></ProtectedRoute>,
            errorElement: <RouteErrorFallback />
          }
        ]
      },
      // Transfer routes
      {
        path: 'transfers',
        children: [
          {
            path: '',
            element: <ProtectedRoute><TransfersIndex /></ProtectedRoute>,
            errorElement: <RouteErrorFallback />
          },
          {
            path: 'new',
            element: <ProtectedRoute><NewTransfer /></ProtectedRoute>,
            errorElement: <RouteErrorFallback />
          }
        ]
      },
      // Personnel routes (NCO & Officer only)
      {
        path: 'personnel',
        children: [
          {
            path: '',
            element: <ProtectedRoute role="NCO"><PersonnelIndex /></ProtectedRoute>,
            errorElement: <RouteErrorFallback />
          },
          {
            path: ':id',
            element: <ProtectedRoute role="NCO"><PersonnelDetails /></ProtectedRoute>,
            errorElement: <RouteErrorFallback />
          }
        ]
      },
      // Reports routes (Officer only)
      {
        path: 'reports',
        children: [
          {
            path: '',
            element: <ProtectedRoute role="OFFICER">
              <Suspense fallback={<LoadingFallback />}>
                <ReportsIndex />
              </Suspense>
            </ProtectedRoute>,
            errorElement: <RouteErrorFallback />
          }
        ]
      },
      // QR routes (Officer only)
      {
        path: 'qr',
        children: [
          {
            path: '',
            element: <ProtectedRoute role="OFFICER"><QRIndex /></ProtectedRoute>,
            errorElement: <RouteErrorFallback />
          },
          {
            path: 'bulk',
            element: <ProtectedRoute role="OFFICER"><QRBulk /></ProtectedRoute>,
            errorElement: <RouteErrorFallback />
          }
        ]
      },
      // Settings route
      {
        path: 'settings',
        element: <ProtectedRoute><Settings /></ProtectedRoute>,
        errorElement: <RouteErrorFallback />
      },
      // Utility routes
      {
        path: 'about',
        element: <About />,
        errorElement: <RouteErrorFallback />
      },
      {
        path: 'help',
        element: <Help />,
        errorElement: <RouteErrorFallback />
      },
      {
        path: 'network',
        element: <ProtectedRoute><Network /></ProtectedRoute>,
        errorElement: <RouteErrorFallback />
      },
      {
        path: 'notifications',
        element: <ProtectedRoute><Notifications /></ProtectedRoute>,
        errorElement: <RouteErrorFallback />
      },
      {
        path: 'security',
        element: <ProtectedRoute><Security /></ProtectedRoute>,
        errorElement: <RouteErrorFallback />
      },
      // Sensitive Items routes
      {
        path: 'sensitive-items',
        element: <ProtectedRoute><SensitiveItemsDashboard /></ProtectedRoute>,
        errorElement: <RouteErrorFallback />
      },
      // History route
      {
        path: 'history',
        element: <ProtectedRoute>
          <Suspense fallback={<LoadingFallback />}>
            <HistoryIndex />
          </Suspense>
        </ProtectedRoute>,
        errorElement: <RouteErrorFallback />
      },
      {
        path: '*',
        element: <NotFound />,
        errorElement: <RouteErrorFallback />
      }
    ]
  }
];

export default routes;
