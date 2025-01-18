export interface AssignedItem {
  id: string;
  name: string;
  serialNumber: string;
  category: string;
  dateAssigned: string;
  status: 'assigned' | 'pending_transfer' | 'in_maintenance';
  isSensitive: boolean;
  value: number;
} 