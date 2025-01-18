import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export const useAuth = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const token = useSelector((state: RootState) => state.auth.token);

  return {
    currentUser: user,
    isAuthenticated,
    token
  };
}; 