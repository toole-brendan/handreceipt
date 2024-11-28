/* ProtectedRoute.tsx */

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { AuthState } from '@/types/auth';

interface ProtectedRouteProps {
  requiredRole?: string[];
  requiredClearance?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  requiredRole = [],
  requiredClearance = []
}) => {
  const auth = useSelector<RootState, AuthState>((state) => {
    console.log('Auth state in ProtectedRoute:', state.auth);
    return state.auth;
  });

  // Add default authentication for development
  if (import.meta.env.DEV && !auth.isAuthenticated) {
    console.log('DEV mode: Using default authentication');
    return <Outlet />;
  }

  if (!auth.isAuthenticated) {
    console.log('Not authenticated, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  const hasRequiredRole = requiredRole.length === 0 || 
    (auth.role && requiredRole.includes(auth.role));
  
  const hasRequiredClearance = requiredClearance.length === 0 || 
    (auth.classificationLevel && requiredClearance.includes(auth.classificationLevel));

  if (!hasRequiredRole || !hasRequiredClearance) {
    console.log('Missing required role or clearance, redirecting to unauthorized');
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

