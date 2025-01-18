import React, { startTransition } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './app/App';
import '@/styles/index.css';
import { ThemeProvider } from './contexts/ThemeContext';
import { CssBaseline } from '@mui/material';

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', color: 'white', background: 'black' }}>
          <h1>Application Error</h1>
          <pre style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error?.message}
          </pre>
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
            Reload Application
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const root = document.getElementById('root');
if (!root) {
  throw new Error('Root element not found');
}

const rootElement = ReactDOM.createRoot(root);

startTransition(() => {
  rootElement.render(
    <React.StrictMode>
      <ErrorBoundary>
        <Provider store={store}>
          <ThemeProvider>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </Provider>
      </ErrorBoundary>
    </React.StrictMode>
  );
}); 