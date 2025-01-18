import React from 'react';
import {
  Box,
  Typography,
  LinearProgress,
  CircularProgress,
  styled,
} from '@mui/material';
import {
  CheckCircle as CheckIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';

export interface ProgressStep {
  id: string;
  label: string;
  status: 'pending' | 'in_progress' | 'completed' | 'error' | 'warning';
  progress?: number;
  message?: string;
}

interface ProgressTrackerProps {
  steps: ProgressStep[];
  variant?: 'linear' | 'circular';
  showLabels?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const Container = styled(Box)(() => ({
  backgroundColor: '#000000',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  padding: '24px',
  color: '#FFFFFF',
}));

const StepContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  marginBottom: '16px',
  '&:last-child': {
    marginBottom: 0,
  },
}));

const StepLabel = styled(Typography)(() => ({
  flex: 1,
  fontFamily: 'serif',
  letterSpacing: '0.05em',
  fontSize: '0.875rem',
}));

const StepMessage = styled(Typography)(() => ({
  color: 'rgba(255, 255, 255, 0.7)',
  fontSize: '0.75rem',
  letterSpacing: '0.03em',
  marginTop: '4px',
}));

const StyledLinearProgress = styled(LinearProgress)(() => ({
  width: '100%',
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

const StatusIcon = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 24,
  height: 24,
  '& .MuiSvgIcon-root': {
    fontSize: '1.25rem',
  },
  '&.completed': {
    color: '#FFFFFF',
  },
  '&.warning': {
    color: '#FFD700',
  },
  '&.error': {
    color: '#FF3B3B',
  },
}));

const getProgressSize = (size: 'small' | 'medium' | 'large') => {
  switch (size) {
    case 'small':
      return 20;
    case 'large':
      return 28;
    default:
      return 24;
  }
};

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  steps,
  variant = 'linear',
  showLabels = true,
  size = 'medium',
}) => {
  const renderStatus = (step: ProgressStep) => {
    const progressSize = getProgressSize(size);

    switch (step.status) {
      case 'completed':
        return (
          <StatusIcon className="completed">
            <CheckIcon />
          </StatusIcon>
        );
      case 'error':
        return (
          <StatusIcon className="error">
            <ErrorIcon />
          </StatusIcon>
        );
      case 'warning':
        return (
          <StatusIcon className="warning">
            <WarningIcon />
          </StatusIcon>
        );
      case 'in_progress':
        return variant === 'circular' ? (
          <StyledCircularProgress
            size={progressSize}
            className={step.status}
            value={step.progress}
          />
        ) : (
          <StyledLinearProgress
            variant="determinate"
            value={step.progress}
            className={step.status}
          />
        );
      default:
        return variant === 'circular' ? (
          <StyledCircularProgress
            size={progressSize}
            variant="determinate"
            value={0}
          />
        ) : (
          <StyledLinearProgress
            variant="determinate"
            value={0}
          />
        );
    }
  };

  return (
    <Container>
      {steps.map((step) => (
        <StepContainer key={step.id}>
          {showLabels && (
            <Box sx={{ flex: 1 }}>
              <StepLabel variant="subtitle2">
                {step.label}
              </StepLabel>
              {step.message && (
                <StepMessage>
                  {step.message}
                </StepMessage>
              )}
            </Box>
          )}
          <Box sx={{ width: variant === 'linear' ? '120px' : 'auto' }}>
            {renderStatus(step)}
          </Box>
        </StepContainer>
      ))}
    </Container>
  );
};

export default ProgressTracker; 