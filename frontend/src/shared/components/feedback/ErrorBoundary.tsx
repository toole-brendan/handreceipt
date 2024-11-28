/* frontend/src/ui/components/common/ErrorBoundary.tsx */

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    console.log('Error caught in ErrorBoundary:', error);
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Detailed error information:', {
      error,
      errorInfo,
      stack: error.stack
    });
    this.setState({ errorInfo });
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div style={{ 
          padding: '20px', 
          color: 'white',
          background: '#1e1e1e',
          borderRadius: '8px',
          margin: '20px'
        }}>
          <h2>Something went wrong</h2>
          <details style={{ whiteSpace: 'pre-wrap', marginTop: '10px' }}>
            <summary>Error Details</summary>
            <p style={{ color: '#ff1744' }}>{this.state.error?.message}</p>
            <p style={{ color: '#ff1744' }}>{this.state.error?.stack}</p>
            {this.state.errorInfo && (
              <pre style={{ color: '#ffd600', marginTop: '10px' }}>
                {this.state.errorInfo.componentStack}
              </pre>
            )}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 