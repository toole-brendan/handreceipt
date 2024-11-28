import { useState, useEffect } from 'react';
import HandReceiptModule from '../native/HandReceiptMobile';

export type UserRole = 'OFFICER' | 'NCO' | 'SOLDIER';

export interface User {
    id: string;
    name: string;
    rank: string;
    unit: string;
    role: UserRole;
}

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            try {
                const userData = await HandReceiptModule.getCurrentUser();
                setUser(userData);
            } catch (error) {
                console.error('Auth initialization error:', error);
            } finally {
                setLoading(false);
            }
        };

        initAuth();
    }, []);

    const login = async (credentials: { username: string; password: string }) => {
        try {
            const userData = await HandReceiptModule.login(credentials);
            setUser(userData);
            return { success: true };
        } catch (error) {
            return { 
                success: false, 
                error: error instanceof Error ? error.message : 'Login failed' 
            };
        }
    };

    const logout = async () => {
        try {
            await HandReceiptModule.logout();
            setUser(null);
            return { success: true };
        } catch (error) {
            return { 
                success: false, 
                error: error instanceof Error ? error.message : 'Logout failed' 
            };
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