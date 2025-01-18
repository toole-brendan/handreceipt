export interface SensitiveItem {
  id: string;
  name: string;
  serialNumber: string;
  category: string;
  lastVerification: string;
  nextVerification: string;
  location: string;
  status: 'verified' | 'needs_verification' | 'overdue';
  assignedTo?: string;
  verifiedBy?: string;
} 