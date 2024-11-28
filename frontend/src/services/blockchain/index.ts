// frontend/src/services/transactions.ts

import { AxiosError } from 'axios';
import { Asset, TransferRecord } from '../types/asset';

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

export class TransactionService {
  async initiateTransfer(
    assetId: string, 
    request: TransferRequest
  ): Promise<TransferRecord> {
    try {
      const response = await fetch(`/api/assets/${assetId}/transfer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error('Transfer initiation failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Property transfer error:', error);
      throw new Error('Failed to initiate property transfer');
    }
  }

  async verifyTransfer(
    assetId: string,
    transferId: string
  ): Promise<boolean> {
    try {
      const response = await fetch(
        `/api/assets/${assetId}/transfers/${transferId}/verify`,
        {
          method: 'POST',
        }
      );

      if (!response.ok) {
        throw new Error('Transfer verification failed');
      }

      const result = await response.json();
      return result.verified;
    } catch (error) {
      console.error('Transfer verification error:', error);
      throw new Error('Failed to verify transfer');
    }
  }

  async getTransferHistory(assetId: string): Promise<TransferRecord[]> {
    try {
      const response = await fetch(`/api/assets/${assetId}/transfers`);
      if (!response.ok) {
        throw new Error('Failed to fetch transfer history');
      }
      return await response.json();
    } catch (error) {
      console.error('Transfer history error:', error);
      throw new Error('Failed to get transfer history');
    }
  }
}

export const transactionService = new TransactionService();

interface TransactionResponse {
  data: PropertyTransaction[];
  totalCount: number;
}

export class TransactionError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = 'TransactionError';
  }
}

// Add mock data
const mockTransactions: PropertyTransaction[] = [
  {
    id: "1",
    timestamp: "2024-03-25T09:00:00Z",
    fromSoldier: {
      name: "Johnson, Robert",
      rank: "CW2",
      unit: "Supply Officer, HHC 1-23 IN"
    },
    toSoldier: {
      name: "Smith, John",
      rank: "SPC",
      unit: "2nd PLT, B CO 1-23 IN"
    },
    propertyItem: {
      name: "M4 Carbine",
      serialNumber: "12345678",
      type: "Weapon",
      tokenId: "1234567890"
    },
    status: "confirmed",
    handReceiptHash: "0x1234567890abcdef",
    digitalSignature: "0xabcdef1234567890"
  },
  {
    id: "2",
    timestamp: "2024-03-25T09:15:00Z",
    fromSoldier: {
      name: "Williams, Sarah",
      rank: "CIV",
      unit: "CIF Issue Point"
    },
    toSoldier: {
      name: "Martinez, Carlos",
      rank: "PFC",
      unit: "1st PLT, A CO 1-23 IN"
    },
    propertyItem: {
      name: "IOTV",
      serialNumber: "IOTV-789012",
      type: "Equipment",
      tokenId: "7890123456"
    },
    status: "confirmed",
    handReceiptHash: "0x7890123456abcdef",
    digitalSignature: "0xabcdef7890123456"
  },
  {
    id: "3",
    timestamp: "2024-03-25T10:00:00Z",
    fromSoldier: {
      name: "Johnson, Robert",
      rank: "CW2",
      unit: "Supply Officer, HHC 1-23 IN"
    },
    toSoldier: {
      name: "Davis, Michael",
      rank: "SGT",
      unit: "3rd PLT, C CO 1-23 IN"
    },
    propertyItem: {
      name: "PVS-14",
      serialNumber: "NV-567890",
      type: "Optics",
      tokenId: "5678901234"
    },
    status: "pending",
    handReceiptHash: "0x5678901234abcdef",
    digitalSignature: "0xabcdef5678901234"
  },
  {
    id: "4",
    timestamp: "2024-03-24T14:30:00Z",
    fromSoldier: {
      name: "Williams, Sarah",
      rank: "CIV",
      unit: "CIF Issue Point"
    },
    toSoldier: {
      name: "Thompson, James",
      rank: "1LT",
      unit: "1st PLT, B CO 1-23 IN"
    },
    propertyItem: {
      name: "ACH Helmet",
      serialNumber: "ACH-123456",
      type: "Equipment",
      tokenId: "1234567890"
    },
    status: "confirmed",
    handReceiptHash: "0x1234567890abcdef",
    digitalSignature: "0xabcdef1234567890"
  },
  {
    id: "5",
    timestamp: "2024-03-24T15:45:00Z",
    fromSoldier: {
      name: "Johnson, Robert",
      rank: "CW2",
      unit: "Supply Officer, HHC 1-23 IN"
    },
    toSoldier: {
      name: "Wilson, Emma",
      rank: "SPC",
      unit: "HQ PLT, HHC 1-23 IN"
    },
    propertyItem: {
      name: "Radio Set",
      serialNumber: "RAD-987654",
      type: "Communications",
      tokenId: "9876543210"
    },
    status: "confirmed",
    handReceiptHash: "0x9876543210abcdef",
    digitalSignature: "0xabcdef9876543210"
  },
  {
    id: "6",
    timestamp: "2024-03-24T11:20:00Z",
    fromSoldier: {
      name: "Anderson, Mark",
      rank: "SSG",
      unit: "Supply NCO, HHC 1-23 IN"
    },
    toSoldier: {
      name: "Brown, David",
      rank: "PV2",
      unit: "2nd PLT, A CO 1-23 IN"
    },
    propertyItem: {
      name: "M17 Pistol",
      serialNumber: "PST-345678",
      type: "Weapon",
      tokenId: "3456789012"
    },
    status: "failed",
    handReceiptHash: "0x3456789012abcdef",
    digitalSignature: "0xabcdef3456789012"
  },
  {
    id: "7",
    timestamp: "2024-03-23T13:15:00Z",
    fromSoldier: {
      name: "Williams, Sarah",
      rank: "CIV",
      unit: "CIF Issue Point"
    },
    toSoldier: {
      name: "Garcia, Ana",
      rank: "SGT",
      unit: "3rd PLT, B CO 1-23 IN"
    },
    propertyItem: {
      name: "Cold Weather Kit",
      serialNumber: "CW-234567",
      type: "Equipment",
      tokenId: "2345678901"
    },
    status: "confirmed",
    handReceiptHash: "0x2345678901abcdef",
    digitalSignature: "0xabcdef2345678901"
  },
  {
    id: "8",
    timestamp: "2024-03-23T09:30:00Z",
    fromSoldier: {
      name: "Johnson, Robert",
      rank: "CW2",
      unit: "Supply Officer, HHC 1-23 IN"
    },
    toSoldier: {
      name: "Miller, John",
      rank: "CPL",
      unit: "1st PLT, C CO 1-23 IN"
    },
    propertyItem: {
      name: "M249 SAW",
      serialNumber: "LMG-456789",
      type: "Weapon",
      tokenId: "4567890123"
    },
    status: "confirmed",
    handReceiptHash: "0x4567890123abcdef",
    digitalSignature: "0xabcdef4567890123"
  },
  {
    id: "9",
    timestamp: "2024-03-22T16:45:00Z",
    fromSoldier: {
      name: "Anderson, Mark",
      rank: "SSG",
      unit: "Supply NCO, HHC 1-23 IN"
    },
    toSoldier: {
      name: "Taylor, Sarah",
      rank: "SPC",
      unit: "HQ PLT, HHC 1-23 IN"
    },
    propertyItem: {
      name: "Laptop",
      serialNumber: "LT-789012",
      type: "Electronics",
      tokenId: "7890123456"
    },
    status: "pending",
    handReceiptHash: "0x7890123456abcdef",
    digitalSignature: "0xabcdef7890123456"
  },
  {
    id: "10",
    timestamp: "2024-03-22T14:20:00Z",
    fromSoldier: {
      name: "Williams, Sarah",
      rank: "CIV",
      unit: "CIF Issue Point"
    },
    toSoldier: {
      name: "White, Michael",
      rank: "2LT",
      unit: "2nd PLT, B CO 1-23 IN"
    },
    propertyItem: {
      name: "Plate Carrier",
      serialNumber: "PC-890123",
      type: "Equipment",
      tokenId: "8901234567"
    },
    status: "confirmed",
    handReceiptHash: "0x8901234567abcdef",
    digitalSignature: "0xabcdef8901234567"
  },
  // ... add more mock transactions here
];

export const fetchPropertyTransactions = async (): Promise<TransactionResponse> => {
  // Simulate API call with mock data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: mockTransactions,
        totalCount: mockTransactions.length
      });
    }, 500); // Simulate network delay
  });
};

export const exportPropertyTransactions = async (format: 'csv' | 'pdf' = 'csv'): Promise<Blob> => {
  try {
    const response = await fetch(`/api/property/transactions/export?format=${format}`, {
      method: 'GET',
      credentials: 'include'
    });

    if (!response.ok) {
      throw new TransactionError(
        'Failed to export property transactions',
        response.status
      );
    }

    return await response.blob();
  } catch (error) {
    console.error('Property transaction export error:', error);
    throw new TransactionError('Failed to export property transactions');
  }
}; 