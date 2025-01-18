/* ProtectedRoute.tsx */

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  role?: string;
}

type RoleType = 'OFFICER' | 'NCO' | 'SOLDIER';

// Define role hierarchy - who can access what
const roleHierarchy: Record<RoleType, RoleType[]> = {
  'OFFICER': ['OFFICER'],
  'NCO': ['OFFICER', 'NCO'],
  'SOLDIER': ['OFFICER', 'NCO', 'SOLDIER']
};

const normalizeRole = (role: string): RoleType | null => {
  try {
    const upperRole = role.toUpperCase();
    if (upperRole === 'OFFICER' || upperRole === 'NCO' || upperRole === 'SOLDIER') {
      return upperRole as RoleType;
    }
  } catch (error) {
    console.error('Error normalizing role:', error);
  }
  return null;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, role }) => {
  const { isAuthenticated, currentUser } = useAuth();
  const location = useLocation();

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role requirements if specified
  if (role && currentUser?.role) {
    try {
      const normalizedUserRole = normalizeRole(currentUser.role);
      const normalizedRequiredRole = normalizeRole(role);

      // If either role is invalid, deny access
      if (!normalizedUserRole || !normalizedRequiredRole) {
        console.error('Invalid role detected:', { 
          userRole: currentUser.role, 
          requiredRole: role,
          normalizedUserRole,
          normalizedRequiredRole
        });
        return <Navigate to="/" replace />;
      }

      // Check if user's role has access to the required role's resources
      const allowedRoles = roleHierarchy[normalizedRequiredRole];
      if (!allowedRoles.includes(normalizedUserRole)) {
        return <Navigate to="/" replace />;
      }
    } catch (error) {
      console.error('Error checking roles:', error);
      return <Navigate to="/" replace />;
    }
  }

  return <React.Suspense fallback={null}>{children}</React.Suspense>;
};

export default React.memo(ProtectedRoute);

