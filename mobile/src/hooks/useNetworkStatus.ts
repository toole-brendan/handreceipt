import { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import HandReceiptModule from '../native/HandReceiptMobile';

export const useNetworkStatus = () => {
    const [isOnline, setIsOnline] = useState(false);
    const [isSyncing, setIsSyncing] = useState(false);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            const wasOffline = !isOnline;
            const isNowOnline = Boolean(state.isConnected && state.isInternetReachable);
            setIsOnline(isNowOnline);

            // If we just came back online, sync pending transfers
            if (wasOffline && isNowOnline) {
                syncPendingTransfers();
            }
        });

        // Check initial state
        NetInfo.fetch().then(state => {
            setIsOnline(Boolean(state.isConnected && state.isInternetReachable));
        });

        return () => {
            unsubscribe();
        };
    }, [isOnline]);

    const syncPendingTransfers = async () => {
        if (isSyncing) return;

        try {
            setIsSyncing(true);
            if (HandReceiptModule?.syncPendingTransfers) {
                const result = await HandReceiptModule.syncPendingTransfers();
                console.log('Sync result:', result);
            }
        } catch (error) {
            console.error('Sync error:', error);
        } finally {
            setIsSyncing(false);
        }
    };

    return {
        isOnline,
        isSyncing,
        syncPendingTransfers
    };
}; 