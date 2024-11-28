export enum SyncStatus {
    PENDING = 'PENDING',
    SYNCING = 'SYNCING',
    COMPLETED = 'COMPLETED',
    FAILED = 'FAILED'
}

export interface Transfer {
    id: string;
    propertyId: string;
    fromUserId: string;
    toUserId: string;
    timestamp: string;
    status: SyncStatus;
    signature: string;
    retryCount: number;
    error?: string;
    lastRetry?: string;
}

export interface SyncResult {
    success: boolean;
    error?: string;
}

export interface BatchSyncResult {
    synced: string[];
    failed: string[];
} 