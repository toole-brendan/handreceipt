import { NativeModules } from 'react-native';
import { User } from '../types/auth';
import { Transfer } from '../types/sync';

export interface Property {
  id: string;
  name: string;
  nsn: string;
  serialNumber: string;
  description?: string;
  condition: string;
  currentHolder: string;
  location?: string;
  unit: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface UnitStats {
  totalItems: number;
  activeTransfers: number;
  itemsByType: { [key: string]: number };
  transfersByMonth: { [key: string]: number };
  topHolders: Array<{ name: string; itemCount: number }>;
}

interface HandReceiptMobile {
  // Authentication
  readCAC(): Promise<{
    id: string;
    certificate: string;
    name: string;
    rank: string;
    unit: string;
  }>;
  getCurrentUser(): Promise<User>;
  login(credentials: { cacId: string; certificate: string }): Promise<User>;
  logout(): Promise<void>;

  // Property Management
  createProperty(property: Omit<Property, 'id' | 'currentHolder' | 'createdAt' | 'updatedAt'>): Promise<string>;
  getPropertyList(filters?: { unit?: string; holder?: string }): Promise<Property[]>;
  getPropertyDetails(id: string): Promise<Property>;
  updateProperty(id: string, updates: Partial<Property>): Promise<void>;
  
  // QR Code
  scanQR(data: string): Promise<{
    transferId: string;
    propertyId: string;
    timestamp: string;
    signature: string;
  }>;
  generateQR(propertyId: string): Promise<string>;
  
  // Transfer Management
  storeTransfer(transfer: Transfer): Promise<void>;
  submitTransfer(transfer: Transfer): Promise<{ success: boolean; error?: string }>;
  getTransferHistory(filters: { propertyId?: string; userId?: string }): Promise<Transfer[]>;

  // Analytics
  getUnitAnalytics(params: {
    unit: string;
    timeframe: 'week' | 'month' | 'year';
  }): Promise<UnitStats>;
  
  // Offline Support
  syncPendingTransfers(): Promise<{
    synced: string[];
    failed: string[];
  }>;
}

const HandReceiptModule = NativeModules.HandReceiptModule as HandReceiptMobile;

export default HandReceiptModule; 