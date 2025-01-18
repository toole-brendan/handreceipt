import React, { startTransition } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from '@components/layout/Layout';
import LoadingFallback from '@components/feedback/LoadingFallback';
import ErrorBoundary from '@components/feedback/ErrorBoundary';
import routes from './routes';
import { SettingsProvider } from '@contexts/SettingsContext';
import theme from '@/styles/theme';

// Configure router
const router = createBrowserRouter(routes);

const App: React.FC = () => {
  // Wrap the entire app in startTransition
  const [isPending, startRouteTransition] = React.useTransition();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SettingsProvider>
        <ErrorBoundary>
          <React.Suspense fallback={<LoadingFallback />}>
            <RouterProvider 
              router={router} 
              fallbackElement={isPending ? <LoadingFallback /> : null}
            />
          </React.Suspense>
        </ErrorBoundary>
      </SettingsProvider>
    </ThemeProvider>
  );
};

export default App;