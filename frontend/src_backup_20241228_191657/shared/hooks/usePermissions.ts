import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

type Permission = string;

export const usePermissions = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const permissions = user?.permissions || [];

  const hasPermission = (permission: Permission): boolean => {
    return permissions.includes(permission);
  };

  const hasAnyPermission = (requiredPermissions: Permission[]): boolean => {
    return requiredPermissions.some(permission => hasPermission(permission));
  };

  const hasAllPermissions = (requiredPermissions: Permission[]): boolean => {
    return requiredPermissions.every(permission => hasPermission(permission));
  };

  return {
    permissions,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
  };
}; 