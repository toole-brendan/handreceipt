import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Navigation } from './navigation';
import { View, Text, ActivityIndicator } from 'react-native';
import { AuthProvider } from './contexts/AuthContext';

const App = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const initializeApp = async () => {
            try {
                // For now, just simulate initialization
                await new Promise(resolve => setTimeout(resolve, 1000));
                setIsLoading(false);
            } catch (error) {
                console.error('Initialization error:', error);
                setError(typeof error === 'string' ? error : 'Failed to initialize app');
                setIsLoading(false);
            }
        };

        initializeApp();
    }, []);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text style={{ marginTop: 10, color: '#666' }}>Loading...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>
            </View>
        );
    }

    return (
        <SafeAreaProvider>
            <AuthProvider>
                <Navigation />
            </AuthProvider>
        </SafeAreaProvider>
    );
};

export default App; 