/* frontend/src/ui/components/common/LoadingFallback.tsx */

import React from 'react';
import { Box, Typography, CircularProgress, styled, keyframes } from '@mui/material';

interface LoadingFallbackProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'minimal' | 'standard' | 'detailed';
}

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const Container = styled(Box)(() => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#000000',
  color: '#FFFFFF',
  zIndex: 1400,
}));

const LoadingBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '24px',
  padding: '32px',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  position: 'relative',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: -1,
    left: -1,
    right: -1,
    bottom: -1,
    border: '1px solid rgba(255, 255, 255, 0.1)',
    opacity: 0,
    transition: 'opacity 200ms ease',
    pointerEvents: 'none',
  },
  
  '&:hover::before': {
    opacity: 1,
  },
}));

const StyledProgress = styled(CircularProgress)(() => ({
  color: '#FFFFFF',
}));

const LoadingMessage = styled(Typography)(() => ({
  color: 'rgba(255, 255, 255, 0.7)',
  fontFamily: 'serif',
  letterSpacing: '0.05em',
  fontSize: '0.875rem',
  textTransform: 'uppercase',
  animation: `${pulse} 2s cubic-bezier(0.4, 0, 0.2, 1) infinite`,
}));

const StatusMessage = styled(Typography)(() => ({
  color: 'rgba(255, 255, 255, 0.5)',
  fontFamily: 'monospace',
  fontSize: '0.75rem',
  letterSpacing: '0.03em',
}));

const getProgressSize = (size: 'small' | 'medium' | 'large') => {
  switch (size) {
    case 'small':
      return 32;
    case 'large':
      return 64;
    default:
      return 48;
  }
};

const LoadingFallback: React.FC<LoadingFallbackProps> = ({
  message = 'Loading...',
  size = 'medium',
  variant = 'standard',
}) => {
  const progressSize = getProgressSize(size);

  return (
    <Container>
      <LoadingBox>
        <StyledProgress
          size={progressSize}
          thickness={3}
        />
        <LoadingMessage>
          {message}
        </LoadingMessage>
        {variant === 'detailed' && (
          <StatusMessage>
            Initializing system components...
          </StatusMessage>
        )}
      </LoadingBox>
    </Container>
  );
};

export default LoadingFallback; 