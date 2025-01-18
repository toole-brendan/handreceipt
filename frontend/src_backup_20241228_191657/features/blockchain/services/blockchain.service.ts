import { api } from '@/services/api';
import { ApiResponse } from '@/services/api/types';

export interface PropertyTransaction {
  id: string;
  timestamp: string;
  fromSoldier: {
    name: string;
    rank: string;
    unit: string;
  };
  toSoldier: {
    name: string;
    rank: string;
    unit: string;
  };
  propertyItem: {
    name: string;
    serialNumber: string;
    type: string;
    tokenId?: string;
  };
  status: 'pending' | 'confirmed' | 'failed';
  handReceiptHash?: string;
  digitalSignature?: string;
}

export interface TransferRequest {
  toCustodian: string;
  handReceipt: string;
  notes?: string;
}

export interface TransferRecord {
  id: string;
  assetId: string;
  fromUserId: string;
  toUserId: string;
  timestamp: string;
  status: 'pending' | 'confirmed' | 'failed';
  handReceiptHash: string;
  digitalSignature: string;
}

export class BlockchainError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'BlockchainError';
  }
}

export class BlockchainService {
  async initiateTransfer(assetId: string, request: TransferRequest): Promise<TransferRecord> {
    try {
      const response = await api.post<TransferRecord>(`/assets/${assetId}/transfer`, request);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new BlockchainError(error.message, 'TRANSFER_INITIATION_FAILED');
      }
      throw new BlockchainError('Failed to initiate property transfer', 'TRANSFER_INITIATION_FAILED');
    }
  }

  async verifyTransfer(assetId: string, transferId: string): Promise<boolean> {
    try {
      const response = await api.post<{ verified: boolean }>(`/assets/${assetId}/transfers/${transferId}/verify`, {});
      return response.verified;
    } catch (error) {
      if (error instanceof Error) {
        throw new BlockchainError(error.message, 'TRANSFER_VERIFICATION_FAILED');
      }
      throw new BlockchainError('Failed to verify transfer', 'TRANSFER_VERIFICATION_FAILED');
    }
  }

  async getTransferHistory(assetId: string): Promise<TransferRecord[]> {
    try {
      const response = await api.get<TransferRecord[]>(`/assets/${assetId}/transfers`);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new BlockchainError(error.message, 'TRANSFER_HISTORY_FAILED');
      }
      throw new BlockchainError('Failed to get transfer history', 'TRANSFER_HISTORY_FAILED');
    }
  }

  async getTransactions(params?: { page?: number; limit?: number }): Promise<ApiResponse<PropertyTransaction[]>> {
    try {
      const queryParams = params ? `?page=${params.page}&limit=${params.limit}` : '';
      return await api.get<ApiResponse<PropertyTransaction[]>>(`/transactions${queryParams}`);
    } catch (error) {
      if (error instanceof Error) {
        throw new BlockchainError(error.message, 'TRANSACTIONS_FETCH_FAILED');
      }
      throw new BlockchainError('Failed to fetch transactions', 'TRANSACTIONS_FETCH_FAILED');
    }
  }
}

// Create singleton instance
export const blockchainService = new BlockchainService(); 