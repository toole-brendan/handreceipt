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
    status: TransferStatus;
    qrCode?: string;
    signature?: string;
    approvedAt?: string;
    createdAt: string;
    updatedAt: string;
}

export enum TransferStatus {
    Pending = 'PENDING',
    Approved = 'APPROVED',
    Rejected = 'REJECTED',
    Cancelled = 'CANCELLED'
}

export interface TransferRequest {
    propertyId: string;
    toUserId: string;
    signature?: string;
}

export interface QRScanResult {
    propertyId: string;
    transferId?: string;
    timestamp: string;
    signature: string;
}

export interface SyncResult {
    success: boolean;
    error?: string;
}

export interface BatchSyncResult {
    synced: string[];
    failed: string[];
} 