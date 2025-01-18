/* frontend/src/ui/components/common/ErrorBoundary.tsx */

import React, { Component, ErrorInfo, ReactNode } from 'react';
import {
  Box,
  Typography,
  Paper,
  styled,
  Collapse,
  IconButton,
} from '@mui/material';
import {
  Warning as WarningIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
  isExpanded: boolean;
}

const ErrorContainer = styled(Paper)(() => ({
  backgroundColor: '#000000',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: 0,
  padding: '24px',
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

const ErrorHeader = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  marginBottom: '16px',
}));

const ErrorTitle = styled(Typography)(() => ({
  color: '#FFFFFF',
  fontFamily: 'serif',
  letterSpacing: '0.05em',
  fontSize: '1.25rem',
  textTransform: 'uppercase',
  flex: 1,
}));

const ErrorMessage = styled(Typography)(() => ({
  color: '#FF3B3B',
  fontFamily: 'monospace',
  fontSize: '0.875rem',
  letterSpacing: '0.03em',
  marginBottom: '8px',
}));

const ErrorStack = styled(Typography)(() => ({
  color: 'rgba(255, 255, 255, 0.7)',
  fontFamily: 'monospace',
  fontSize: '0.75rem',
  letterSpacing: '0.03em',
  whiteSpace: 'pre-wrap',
}));

const ExpandButton = styled(IconButton)(() => ({
  color: '#FFFFFF',
  padding: '4px',
  transition: 'transform 200ms cubic-bezier(0.4, 0, 0.2, 1)',
  '&.expanded': {
    transform: 'rotate(180deg)',
  },
}));

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    isExpanded: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    console.log('Error caught in ErrorBoundary:', error);
    return { hasError: true, error, isExpanded: false };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Detailed error information:', {
      error,
      errorInfo,
      stack: error.stack
    });
    this.setState({ errorInfo });
  }

  private handleExpandClick = () => {
    this.setState((prevState) => ({
      isExpanded: !prevState.isExpanded,
    }));
  };

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <ErrorContainer elevation={0}>
          <ErrorHeader>
            <WarningIcon sx={{ color: '#FF3B3B', fontSize: '2rem' }} />
            <ErrorTitle variant="h5">
              System Error Detected
            </ErrorTitle>
            <ExpandButton
              onClick={this.handleExpandClick}
              className={this.state.isExpanded ? 'expanded' : ''}
              size="small"
            >
              <ExpandMoreIcon />
            </ExpandButton>
          </ErrorHeader>
          
          <ErrorMessage>
            {this.state.error?.message || 'An unexpected error occurred'}
          </ErrorMessage>
          
          <Collapse in={this.state.isExpanded}>
            {this.state.error?.stack && (
              <ErrorStack>
                {this.state.error.stack}
              </ErrorStack>
            )}
            {this.state.errorInfo && (
              <ErrorStack sx={{ mt: 2 }}>
                {this.state.errorInfo.componentStack}
              </ErrorStack>
            )}
          </Collapse>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 