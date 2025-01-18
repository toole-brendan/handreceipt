import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

interface User {
  id: string;
  role: string;
  name: string;
  rank: string;
  classification: string;
  permissions: string[];
}

export const useAuth = () => {
  const authState = useSelector((state: RootState) => state.auth);

  return {
    isAuthenticated: authState.isAuthenticated,
    isLoading: authState.loading,
    currentUser: authState.user as User | null,
  };
};

export default useAuth;
