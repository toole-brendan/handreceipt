import { NativeModules } from 'react-native';
import { User, UserRole } from '../types/auth';
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
  login(credentials: { username?: string; password?: string; cacId?: string; certificate?: string }): Promise<User>;
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

// Mock implementation for development
const MockHandReceiptModule: HandReceiptMobile = {
  readCAC: async () => ({
    id: 'mock-cac-id',
    certificate: 'mock-cert',
    name: 'John Doe',
    rank: 'SGT',
    unit: 'Test Unit'
  }),
  getCurrentUser: async () => ({
    id: 'mock-user-id',
    name: 'John Doe',
    rank: 'SGT',
    unit: 'Test Unit',
    role: UserRole.NCO
  }),
  login: async () => ({
    id: 'mock-user-id',
    name: 'John Doe',
    rank: 'SGT',
    unit: 'Test Unit',
    role: UserRole.NCO
  }),
  logout: async () => {},
  createProperty: async () => 'mock-property-id',
  getPropertyList: async () => [
    {
      id: '1',
      name: 'M4A1 Carbine',
      nsn: '1005-01-382-0973',
      serialNumber: 'M4-2023-001',
      description: '5.56mm NATO Assault Rifle',
      condition: 'Serviceable',
      currentHolder: 'SGT John Smith',
      location: 'Armory B',
      unit: 'Alpha Company',
      createdBy: 'CW2 Johnson',
      createdAt: '2023-01-15T08:00:00Z',
      updatedAt: '2023-11-20T14:30:00Z'
    },
    {
      id: '2',
      name: 'PVS-14 Night Vision',
      nsn: '5855-01-432-0524',
      serialNumber: 'PVS-2023-047',
      description: 'Gen 3 Night Vision Monocular',
      condition: 'Serviceable',
      currentHolder: 'SSG Maria Rodriguez',
      location: 'Supply Room',
      unit: 'Alpha Company',
      createdBy: 'CW2 Johnson',
      createdAt: '2023-02-20T09:15:00Z',
      updatedAt: '2023-11-19T16:45:00Z'
    },
    {
      id: '3',
      name: 'ACOG Scope',
      nsn: '1240-01-412-6608',
      serialNumber: 'ACOG-2023-123',
      description: '4x32 Combat Optical Sight',
      condition: 'Serviceable',
      currentHolder: 'PFC Michael Chen',
      location: 'Weapons Vault',
      unit: 'Alpha Company',
      createdBy: 'CW2 Johnson',
      createdAt: '2023-03-10T11:30:00Z',
      updatedAt: '2023-11-18T13:20:00Z'
    },
    {
      id: '4',
      name: 'Toughbook Laptop',
      nsn: '7021-01-583-6757',
      serialNumber: 'TB-2023-089',
      description: 'Ruggedized Field Laptop',
      condition: 'Serviceable',
      currentHolder: 'SPC Sarah Williams',
      location: 'S6 Office',
      unit: 'Alpha Company',
      createdBy: 'CW2 Johnson',
      createdAt: '2023-04-05T14:45:00Z',
      updatedAt: '2023-11-17T09:10:00Z'
    },
    {
      id: '5',
      name: 'Harris Radio',
      nsn: '5820-01-580-9551',
      serialNumber: 'HR-2023-256',
      description: 'Tactical Communication System',
      condition: 'Serviceable',
      currentHolder: 'SGT David Brown',
      location: 'Comms Room',
      unit: 'Alpha Company',
      createdBy: 'CW2 Johnson',
      createdAt: '2023-05-12T10:20:00Z',
      updatedAt: '2023-11-16T15:55:00Z'
    }
  ],
  getPropertyDetails: async (id) => ({
    id,
    name: 'Mock Property',
    nsn: '1234-56-789',
    serialNumber: 'SN123',
    condition: 'Serviceable',
    currentHolder: 'John Doe',
    unit: 'Test Unit',
    createdBy: 'Admin',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }),
  updateProperty: async () => {},
  scanQR: async () => ({
    transferId: 'mock-transfer-id',
    propertyId: 'mock-property-id',
    timestamp: new Date().toISOString(),
    signature: 'mock-signature'
  }),
  generateQR: async () => 'mock-qr-data',
  storeTransfer: async () => {},
  submitTransfer: async () => ({ success: true }),
  getTransferHistory: async () => [],
  getUnitAnalytics: async () => ({
    totalItems: 0,
    activeTransfers: 0,
    itemsByType: {},
    transfersByMonth: {},
    topHolders: []
  }),
  syncPendingTransfers: async () => ({
    synced: [],
    failed: []
  })
};

// Use mock implementation if native module is not available
const HandReceiptModule = NativeModules.HandReceiptModule || MockHandReceiptModule;

export default HandReceiptModule; 