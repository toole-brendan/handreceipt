import { BaseEntity } from './shared';
import { User } from './auth';

export interface Property extends BaseEntity {
  name: string;
  description?: string;
  serialNumber: string;
  nsn: string;
  category: string;
  status: PropertyStatus;
  value: number;
  location?: string;
  assignedTo?: User;
  lastInventoryCheck?: string;
  nextInventoryCheck?: string;
  isSensitive: boolean;
  notes?: string;
  attachments?: string[];
  maintenanceHistory?: MaintenanceRecord[];
  transferHistory?: TransferRecord[];
}

export type PropertyStatus = 'SERVICEABLE' | 'UNSERVICEABLE' | 'IN_MAINTENANCE' | 'DISPOSED' | 'TRANSFERRED';

export interface MaintenanceRecord extends BaseEntity {
  propertyId: string;
  type: MaintenanceType;
  description: string;
  performedBy: User;
  date: string;
  cost?: number;
  status: MaintenanceStatus;
  notes?: string;
}

export type MaintenanceType = 'PREVENTIVE' | 'CORRECTIVE' | 'INSPECTION';
export type MaintenanceStatus = 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export interface TransferRecord extends BaseEntity {
  propertyId: string;
  fromUser: User;
  toUser: User;
  date: string;
  reason: string;
  status: TransferStatus;
  approvedBy?: User;
  approvedAt?: string;
  notes?: string;
}

export type TransferStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';

export interface PropertyState {
  items: Property[];
  selectedItem: Property | null;
  isLoading: boolean;
  error: string | null;
  filters: PropertyFilters;
}

export interface PropertyFilters {
  category?: string;
  status?: PropertyStatus;
  location?: string;
  assignedTo?: string;
  search?: string;
  isSensitive?: boolean;
}

export interface SensitiveItem extends Omit<Property, 'status'> {
  propertyStatus: PropertyStatus;
  verificationStatus: 'verified' | 'needs_verification' | 'missing';
  lastVerified: string;
  verifiedBy?: User;
} 