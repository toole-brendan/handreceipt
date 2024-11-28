import { useState, useEffect } from 'react';
import { User, UserRole, LoginCredentials, LoginResult } from '../types/auth';
import HandReceiptModule from '../native/HandReceiptMobile';

export type { User };
export { UserRole };

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Just set loading to false initially for development
        setLoading(false);
    }, []);

    const login = async (credentials: LoginCredentials): Promise<LoginResult> => {
        try {
            setLoading(true);
            console.log('Login attempt with:', credentials);

            // For development, use mock login
            const mockUser: User = {
                id: '123',
                name: 'Test User',
                rank: 'SGT',
                unit: 'Test Unit',
                role: UserRole.NCO
            };

            console.log('Setting user to:', mockUser);
            setUser(mockUser);
            return { success: true };
        } catch (error) {
            console.error('Login error:', error);
            return { 
                success: false, 
                error: error instanceof Error ? error.message : 'Login failed' 
            };
        } finally {
            setLoading(false);
        }
    };

    const logout = async (): Promise<LoginResult> => {
        try {
            setLoading(true);
            console.log('Logging out...');
            setUser(null);
            return { success: true };
        } catch (error) {
            console.error('Logout error:', error);
            return { 
                success: false, 
                error: error instanceof Error ? error.message : 'Logout failed' 
            };
        } finally {
            setLoading(false);
        }
    };

    return {
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
    };
}; 