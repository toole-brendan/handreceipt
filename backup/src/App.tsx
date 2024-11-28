import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Navigation } from './navigation';
import HandReceiptModule from './native/HandReceiptMobile';

const App = () => {
    useEffect(() => {
        const initializeApp = async () => {
            try {
                await HandReceiptModule.initialize();
            } catch (error) {
                console.error('Initialization error:', error);
            }
        };

        initializeApp();
    }, []);

    return (
        <SafeAreaProvider>
            <Navigation />
        </SafeAreaProvider>
    );
};

export default App; 