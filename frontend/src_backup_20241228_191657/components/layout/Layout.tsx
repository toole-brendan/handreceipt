/* frontend/src/shared/components/Layout/Layout.tsx */

import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box, styled, Theme } from '@mui/material';
import Header from './Header';
import Navigation from './Navigation';
import SkipLink from '../common/SkipLink';
import { Container } from './mui/Container';

interface LayoutProps {
  children: React.ReactNode;
}

const DRAWER_WIDTH = 240;

const AppLayout = styled(Box)(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  background: '#000000',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'none',
    pointerEvents: 'none',
  },
}));

const AppBody = styled(Box)(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  flex: 1,
  paddingTop: theme.mixins.toolbar.minHeight,
}));

const MainContent = styled(Box)(({ theme }: { theme: Theme }) => ({
  flexGrow: 1,
  marginLeft: DRAWER_WIDTH,
  minHeight: '100vh',
  backgroundColor: 'transparent',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(12px)',
    zIndex: -1,
  },
}));

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  // Don't show navigation on login page
  const isLoginPage = location.pathname === '/login';
  
  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <AppLayout>
      <SkipLink />
      <Header />
      <AppBody>
        <Navigation />
        <MainContent
          id="main"
          tabIndex={-1}
          role="main"
          aria-label="Main content"
        >
          {/* Announce page changes to screen readers */}
          <Box
            className="sr-only"
            role="status"
            aria-live="polite"
          >
            {location.pathname.split('/').pop()?.replace('-', ' ')} page loaded
          </Box>
          <Container>
            {children}
          </Container>
        </MainContent>
      </AppBody>
    </AppLayout>
  );
};

export default Layout; 