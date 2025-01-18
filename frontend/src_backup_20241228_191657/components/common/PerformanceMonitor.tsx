import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const PerformanceMonitor: React.FC<Props> = ({ children }) => {
  return <>{children}</>;
}; 