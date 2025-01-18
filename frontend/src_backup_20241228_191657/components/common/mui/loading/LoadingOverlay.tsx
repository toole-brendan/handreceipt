import React from 'react';
import {
  Box,
  CircularProgress,
  Typography,
  Fade,
  styled,
  LinearProgress,
} from '@mui/material';

export type ProgressColor = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
export type ProgressVariant = 'circular' | 'linear';
export type ProgressSize = 'small' | 'medium' | 'large';

interface LoadingOverlayProps {
  isLoading: boolean;
  message?: string;
  blur?: boolean;
  fullScreen?: boolean;
  transparent?: boolean;
  color?: ProgressColor;
  variant?: ProgressVariant;
  size?: ProgressSize;
  value?: number;
  showValue?: boolean;
}

const OverlayContainer = styled(Box, {
  shouldForwardProp: (prop) => 
    !['blur', 'fullScreen', 'transparent'].includes(prop as string),
})<{
  blur?: boolean;
  fullScreen?: boolean;
  transparent?: boolean;
}>(({ blur, fullScreen, transparent }) => ({
  position: fullScreen ? 'fixed' : 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: transparent 
    ? 'rgba(0, 0, 0, 0.85)'
    : '#000000',
  backdropFilter: blur ? 'blur(8px)' : 'none',
  zIndex: 1400,
  border: '1px solid rgba(255, 255, 255, 0.2)',
  animation: 'fadeIn 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  '@keyframes fadeIn': {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
}));

const SpinnerWrapper = styled(Box)(() => ({
  position: 'relative',
  display: 'inline-flex',
  animation: 'pulse 2s cubic-bezier(0.4, 0, 0.2, 1) infinite',
  '@keyframes pulse': {
    '0%, 100%': { 
      transform: 'scale(1)',
      opacity: 1,
    },
    '50%': { 
      transform: 'scale(0.95)',
      opacity: 0.8,
    },
  },
}));

const StyledLinearProgress = styled(LinearProgress)(() => ({
  width: '240px',
  height: 2,
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  '& .MuiLinearProgress-bar': {
    backgroundColor: '#FFFFFF',
  },
  '&.warning .MuiLinearProgress-bar': {
    backgroundColor: '#FFD700',
  },
  '&.error .MuiLinearProgress-bar': {
    backgroundColor: '#FF3B3B',
  },
}));

const StyledCircularProgress = styled(CircularProgress)(() => ({
  color: '#FFFFFF',
  '&.warning': {
    color: '#FFD700',
  },
  '&.error': {
    color: '#FF3B3B',
  },
}));

const LoadingMessage = styled(Typography)(() => ({
  color: 'rgba(255, 255, 255, 0.7)',
  fontFamily: 'serif',
  letterSpacing: '0.05em',
  fontSize: '0.875rem',
  marginTop: '16px',
  textTransform: 'uppercase',
}));

const ProgressValue = styled(Typography)(() => ({
  color: '#FFFFFF',
  fontFamily: 'monospace',
  fontSize: '0.75rem',
  letterSpacing: '0.1em',
}));

const getSize = (size: ProgressSize) => {
  switch (size) {
    case 'small': return 28;
    case 'large': return 56;
    default: return 40;
  }
};

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isLoading,
  message = 'Loading...',
  blur = true,
  fullScreen = false,
  transparent = false,
  color = 'primary',
  variant = 'circular',
  size = 'medium',
  value,
  showValue = false,
}) => {
  const circularSize = getSize(size);

  if (!isLoading) return null;

  return (
    <Fade in={isLoading} timeout={200}>
      <OverlayContainer
        blur={blur}
        fullScreen={fullScreen}
        transparent={transparent}
      >
        {variant === 'circular' ? (
          <SpinnerWrapper>
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
              <StyledCircularProgress
                variant={value !== undefined ? 'determinate' : 'indeterminate'}
                value={value}
                size={circularSize}
                thickness={3}
                className={color}
              />
              {showValue && value !== undefined && (
                <Box
                  sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <ProgressValue>
                    {`${Math.round(value)}%`}
                  </ProgressValue>
                </Box>
              )}
            </Box>
          </SpinnerWrapper>
        ) : (
          <StyledLinearProgress
            variant={value !== undefined ? 'determinate' : 'indeterminate'}
            value={value}
            className={color}
          />
        )}
        {message && (
          <LoadingMessage>
            {message}
          </LoadingMessage>
        )}
      </OverlayContainer>
    </Fade>
  );
}; 