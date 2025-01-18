/* frontend/src/App.tsx */

import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from '@components/layout/Layout';
import LoadingFallback from '@components/feedback/LoadingFallback';
import ErrorBoundary from '@components/feedback/ErrorBoundary';
import { routes } from './routes';
import { SettingsProvider } from '@contexts/SettingsContext';
import theme from '@/styles/theme';

const router = createBrowserRouter(routes);

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SettingsProvider>
        <ErrorBoundary>
          <RouterProvider router={router} />
        </ErrorBoundary>
      </SettingsProvider>
    </ThemeProvider>
  );
};

export default App;