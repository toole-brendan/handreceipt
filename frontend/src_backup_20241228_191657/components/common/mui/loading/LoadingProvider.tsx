import React, { createContext, useContext, useState, useCallback } from 'react';
import { LoadingOverlay } from './LoadingOverlay';
import { ProgressTracker, ProgressStep } from './ProgressTracker';
import { Box, styled } from '@mui/material';

export interface LoadingContextType {
  showLoading: (message?: string) => void;
  hideLoading: () => void;
  setLoadingMessage: (message: string) => void;
  startProgress: (steps: ProgressStep[]) => void;
  updateProgress: (stepId: string, status: ProgressStep['status'], progress?: number) => void;
  completeProgress: () => void;
}

interface LoadingState {
  isLoading: boolean;
  message: string;
  progressSteps: ProgressStep[];
  showProgress: boolean;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

const ProgressContainer = styled(Box)(() => ({
  position: 'fixed',
  bottom: '32px',
  right: '32px',
  zIndex: 1500,
  minWidth: '320px',
  maxWidth: '480px',
  backgroundColor: '#000000',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.24)',
}));

interface LoadingProviderProps {
  children: React.ReactNode;
  defaultMessage?: string;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({
  children,
  defaultMessage = 'Loading...',
}) => {
  const [state, setState] = useState<LoadingState>({
    isLoading: false,
    message: defaultMessage,
    progressSteps: [],
    showProgress: false,
  });

  const showLoading = useCallback((message?: string) => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
      message: message || prev.message,
    }));
  }, []);

  const hideLoading = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isLoading: false,
    }));
  }, []);

  const setLoadingMessage = useCallback((message: string) => {
    setState((prev) => ({
      ...prev,
      message,
    }));
  }, []);

  const startProgress = useCallback((steps: ProgressStep[]) => {
    setState((prev) => ({
      ...prev,
      progressSteps: steps,
      showProgress: true,
    }));
  }, []);

  const updateProgress = useCallback((
    stepId: string,
    status: ProgressStep['status'],
    progress?: number
  ) => {
    setState((prev) => ({
      ...prev,
      progressSteps: prev.progressSteps.map((step) =>
        step.id === stepId
          ? { ...step, status, progress: progress ?? step.progress }
          : step
      ),
    }));
  }, []);

  const completeProgress = useCallback(() => {
    setState((prev) => ({
      ...prev,
      showProgress: false,
      progressSteps: [],
    }));
  }, []);

  return (
    <LoadingContext.Provider
      value={{
        showLoading,
        hideLoading,
        setLoadingMessage,
        startProgress,
        updateProgress,
        completeProgress,
      }}
    >
      {children}
      <LoadingOverlay
        isLoading={state.isLoading}
        message={state.message}
        fullScreen
        blur
      />
      {state.showProgress && state.progressSteps.length > 0 && (
        <ProgressContainer>
          <ProgressTracker steps={state.progressSteps} />
        </ProgressContainer>
      )}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}; 