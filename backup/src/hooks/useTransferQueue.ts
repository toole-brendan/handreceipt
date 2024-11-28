import { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HandReceiptModule from '../native/HandReceiptMobile';
import { useNetworkStatus } from './useNetworkStatus';

export enum TransferStatus {
  PENDING = 'PENDING',
  SYNCING = 'SYNCING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export interface QueuedTransfer {
  id: string;
  propertyId: string;
  fromUserId: string;
  toUserId: string;
  timestamp: string;
  status: TransferStatus;
  signature: string;
  retryCount: number;
  error?: string;
  lastRetry?: string;
}

const QUEUE_STORAGE_KEY = '@transfer_queue';
const MAX_RETRY_COUNT = 3;
const RETRY_DELAY = 5 * 60 * 1000; // 5 minutes

export const useTransferQueue = () => {
  const [queue, setQueue] = useState<QueuedTransfer[]>([]);
  const [syncing, setSyncing] = useState(false);
  const { isOnline } = useNetworkStatus();

  // Load queue from storage on mount
  useEffect(() => {
    loadQueue();
  }, []);

  // Auto-sync when coming online
  useEffect(() => {
    if (isOnline && queue.length > 0 && !syncing) {
      syncQueue();
    }
  }, [isOnline, queue]);

  const loadQueue = async () => {
    try {
      const storedQueue = await AsyncStorage.getItem(QUEUE_STORAGE_KEY);
      if (storedQueue) {
        setQueue(JSON.parse(storedQueue));
      }
    } catch (error) {
      console.error('Failed to load transfer queue:', error);
    }
  };

  const saveQueue = async (newQueue: QueuedTransfer[]) => {
    try {
      await AsyncStorage.setItem(QUEUE_STORAGE_KEY, JSON.stringify(newQueue));
      setQueue(newQueue);
    } catch (error) {
      console.error('Failed to save transfer queue:', error);
    }
  };

  const addToQueue = async (transfer: Omit<QueuedTransfer, 'status' | 'retryCount'>) => {
    const queuedTransfer: QueuedTransfer = {
      ...transfer,
      status: TransferStatus.PENDING,
      retryCount: 0,
    };
    
    const newQueue = [...queue, queuedTransfer];
    await saveQueue(newQueue);

    // Try to sync immediately if online
    if (isOnline && !syncing) {
      syncQueue();
    }
  };

  const removeFromQueue = async (transferId: string) => {
    const newQueue = queue.filter(t => t.id !== transferId);
    await saveQueue(newQueue);
  };

  const updateTransferStatus = async (
    transferId: string,
    status: TransferStatus,
    error?: string
  ) => {
    const newQueue = queue.map(t =>
      t.id === transferId
        ? {
            ...t,
            status,
            error,
            lastRetry: status === TransferStatus.FAILED ? new Date().toISOString() : t.lastRetry,
            retryCount: status === TransferStatus.FAILED ? t.retryCount + 1 : t.retryCount,
          }
        : t
    );
    await saveQueue(newQueue);
  };

  const shouldRetryTransfer = (transfer: QueuedTransfer): boolean => {
    if (transfer.retryCount >= MAX_RETRY_COUNT) return false;
    if (!transfer.lastRetry) return true;
    
    const lastRetryTime = new Date(transfer.lastRetry).getTime();
    const now = new Date().getTime();
    return now - lastRetryTime >= RETRY_DELAY;
  };

  const syncQueue = async () => {
    if (syncing || !isOnline || queue.length === 0) return;

    setSyncing(true);
    let successCount = 0;
    let failureCount = 0;

    try {
      // Group transfers by property for atomic operations
      const propertyGroups = queue.reduce((groups, transfer) => {
        if (!groups[transfer.propertyId]) {
          groups[transfer.propertyId] = [];
        }
        groups[transfer.propertyId].push(transfer);
        return groups;
      }, {} as { [key: string]: QueuedTransfer[] });

      // Process each property group sequentially
      for (const propertyId of Object.keys(propertyGroups)) {
        const transfers = propertyGroups[propertyId];
        
        // Sort transfers by timestamp
        transfers.sort((a, b) => 
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );

        // Process transfers for this property
        for (const transfer of transfers) {
          if (transfer.status === TransferStatus.COMPLETED) continue;
          if (transfer.status === TransferStatus.FAILED && !shouldRetryTransfer(transfer)) continue;

          try {
            await updateTransferStatus(transfer.id, TransferStatus.SYNCING);
            const result = await HandReceiptModule.submitTransfer({
              ...transfer,
              status: TransferStatus.PENDING,
            });

            if (result.success) {
              await updateTransferStatus(transfer.id, TransferStatus.COMPLETED);
              successCount++;
            } else {
              throw new Error(result.error || 'Transfer failed');
            }
          } catch (error) {
            await updateTransferStatus(
              transfer.id,
              TransferStatus.FAILED,
              error instanceof Error ? error.message : 'Unknown error'
            );
            failureCount++;
          }
        }
      }

      // Clean up completed transfers
      const newQueue = queue.filter(t => t.status !== TransferStatus.COMPLETED);
      await saveQueue(newQueue);

      // Show sync results if any transfers were processed
      if (successCount > 0 || failureCount > 0) {
        Alert.alert(
          'Sync Complete',
          `Successfully synced ${successCount} transfers.\n${
            failureCount > 0 ? `Failed to sync ${failureCount} transfers.` : ''
          }`
        );
      }
    } finally {
      setSyncing(false);
    }
  };

  const clearFailedTransfers = async () => {
    const newQueue = queue.filter(t => t.status !== TransferStatus.FAILED);
    await saveQueue(newQueue);
  };

  const retryFailedTransfers = async () => {
    const newQueue = queue.map(t =>
      t.status === TransferStatus.FAILED
        ? { ...t, status: TransferStatus.PENDING, retryCount: 0 }
        : t
    );
    await saveQueue(newQueue);
    if (isOnline) {
      syncQueue();
    }
  };

  return {
    queue,
    syncing,
    addToQueue,
    removeFromQueue,
    syncQueue,
    clearFailedTransfers,
    retryFailedTransfers,
    pendingCount: queue.filter(t => t.status === TransferStatus.PENDING).length,
    failedCount: queue.filter(t => t.status === TransferStatus.FAILED).length,
  };
}; 