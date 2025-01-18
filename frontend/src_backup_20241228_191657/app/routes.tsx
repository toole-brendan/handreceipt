import { lazy, Suspense } from 'react';
import { Navigate, useParams, Outlet } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import Layout from '@components/layout/Layout';
import ProtectedRoute from '@components/common/ProtectedRoute';

// Lazy load components
const LoadingFallback = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <CircularProgress />
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
const PersonnelIndex = lazy(() => import('@/pages/personnel/index.page'));
const PersonnelDetails = lazy(() => import('@/pages/personnel/details.page'));

// Reports pages (Officer only)
const ReportsIndex = lazy(() => import('@/pages/reports/index.page'));
const ReportsHistory = lazy(() => import('@/pages/reports/history.page'));

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

// Root layout that wraps authenticated routes
const RootLayout = () => (
  <Layout>
    <Suspense fallback={<LoadingFallback />}>
      <Outlet />
    </Suspense>
  </Layout>
);

const routes = [
  // Auth routes (no layout wrapper)
  {
    path: '/login',
    element: <Suspense fallback={<LoadingFallback />}><Login /></Suspense>
  },
  {
    path: '/create-account',
    element: <Suspense fallback={<LoadingFallback />}><CreateAccount /></Suspense>
  },
  {
    path: '/forgot-password',
    element: <Suspense fallback={<LoadingFallback />}><ForgotPassword /></Suspense>
  },
  {
    path: '/profile',
    element: <Suspense fallback={<LoadingFallback />}><Profile /></Suspense>
  },
  
  // Main app routes (with layout wrapper)
  {
    path: '/',
    element: <RootLayout />,
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
            element: <ProtectedRoute><PropertyIndex /></ProtectedRoute>
          },
          {
            path: 'sensitive-items',
            element: <ProtectedRoute><SensitiveItems /></ProtectedRoute>
          }
        ]
      },
      // Maintenance routes
      {
        path: 'maintenance',
        children: [
          {
            path: '',
            element: <ProtectedRoute><MaintenanceIndex /></ProtectedRoute>
          },
          {
            path: 'request',
            element: <ProtectedRoute><MaintenanceRequest /></ProtectedRoute>
          }
        ]
      },
      // Transfer routes
      {
        path: 'transfers',
        children: [
          {
            path: '',
            element: <ProtectedRoute><TransfersIndex /></ProtectedRoute>
          },
          {
            path: 'new',
            element: <ProtectedRoute><NewTransfer /></ProtectedRoute>
          }
        ]
      },
      // Personnel routes (NCO & Officer only)
      {
        path: 'personnel',
        children: [
          {
            path: '',
            element: <ProtectedRoute role="NCO"><PersonnelIndex /></ProtectedRoute>
          },
          {
            path: ':id',
            element: <ProtectedRoute role="NCO"><PersonnelDetails /></ProtectedRoute>
          }
        ]
      },
      // Reports routes (Officer only)
      {
        path: 'reports',
        children: [
          {
            path: '',
            element: <ProtectedRoute role="OFFICER"><ReportsIndex /></ProtectedRoute>
          },
          {
            path: 'history',
            element: <ProtectedRoute role="OFFICER"><ReportsHistory /></ProtectedRoute>
          }
        ]
      },
      // QR routes (Officer only)
      {
        path: 'qr',
        children: [
          {
            path: '',
            element: <ProtectedRoute role="OFFICER"><QRIndex /></ProtectedRoute>
          },
          {
            path: 'bulk',
            element: <ProtectedRoute role="OFFICER"><QRBulk /></ProtectedRoute>
          }
        ]
      },
      // Settings route
      {
        path: 'settings',
        element: <ProtectedRoute><Settings /></ProtectedRoute>
      },
      // Utility routes
      {
        path: 'about',
        element: <About />
      },
      {
        path: 'help',
        element: <Help />
      },
      {
        path: 'network',
        element: <ProtectedRoute><Network /></ProtectedRoute>
      },
      {
        path: 'notifications',
        element: <ProtectedRoute><Notifications /></ProtectedRoute>
      },
      {
        path: 'security',
        element: <ProtectedRoute><Security /></ProtectedRoute>
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
];

export default routes;
