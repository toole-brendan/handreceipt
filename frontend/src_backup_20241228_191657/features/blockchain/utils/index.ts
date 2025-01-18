import { PropertyTransaction, TransferRecord } from '../services/blockchain.service';

export const formatTransactionDate = (timestamp: string): string => {
  return new Date(timestamp).toLocaleString();
};

export const getTransactionStatus = (status: TransferRecord['status']): string => {
  const statusMap = {
    pending: 'Pending Verification',
    confirmed: 'Confirmed on Chain',
    failed: 'Failed to Process'
  };
  return statusMap[status] || status;
};

export const validateTransferRequest = (request: Partial<PropertyTransaction>): boolean => {
  const requiredFields = ['fromSoldier', 'toSoldier', 'propertyItem'];
  return requiredFields.every(field => !!request[field as keyof PropertyTransaction]);
};

export const formatBlockchainError = (error: Error): string => {
  if (error.name === 'BlockchainError') {
    return `Blockchain Error: ${error.message}`;
  }
  return 'An unexpected error occurred while processing the blockchain transaction';
}; 