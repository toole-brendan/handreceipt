import type { BaseEntity } from '@/types/shared';

export type TransferType = 'incoming' | 'outgoing';
export type TransferPriority = 'high' | 'medium' | 'low';
export type Category = 'weapons' | 'ammunition' | 'equipment' | 'vehicles' | 'communications' | 'medical';
export type TransferStatus = 'needs_approval' | 'pending_other' | 'completed';

export interface Transfer extends BaseEntity {
  id: string;
  itemName: string;
  serialNumber: string;
  type: TransferType;
  priority: TransferPriority;
  category: Category;
  status: TransferStatus;
  dateRequested: string;
  dateNeeded: string;
  notes?: string;
  otherParty: {
    name: string;
    rank: string;
    unit: string;
  };
}

export interface FiltersState {
  search?: string;
  type?: TransferType;
  priority?: TransferPriority[];
  category?: Category[];
  status?: TransferStatus[];
}

export interface MetricChange {
  value: string;
  timeframe: string;
  isPositive: boolean;
}

export interface MetricItem {
  value: string | number;
  change?: MetricChange;
}

export interface MetricsData {
  pendingApprovals: MetricItem;
  processingTime: MetricItem;
  completedToday: MetricItem;
  approvalRate: MetricItem;
} 