import { BaseEntity } from './shared';
import { Property } from './property';

export interface Equipment extends BaseEntity {
  nsn: string;
  description: string;
  serialNumber: string;
  status: 'SERVICEABLE' | 'UNSERVICEABLE' | 'MAINTENANCE';
}

export interface Personnel extends BaseEntity {
  firstName: string;
  lastName: string;
  rank: string;
  dodId: string;
  unit: Unit;
  position?: string;
  email: string;
  phone?: string;
  status: PersonnelStatus;
  assignedProperty: Property[];
  clearance?: string;
  dutyStatus: DutyStatus;
  notes?: string;
}

export interface Unit extends BaseEntity {
  name: string;
  type: string;
  parentUnit?: Unit;
  commander?: Personnel;
  location?: string;
  personnel: Personnel[];
  property: Property[];
}

export type PersonnelStatus = 'ACTIVE' | 'INACTIVE' | 'DEPLOYED' | 'LEAVE' | 'TRANSFERRED';
export type DutyStatus = 'ON_DUTY' | 'OFF_DUTY' | 'LEAVE' | 'TDY' | 'TRAINING';

export interface PersonnelState {
  items: Personnel[];
  selectedPerson: Personnel | null;
  isLoading: boolean;
  error: string | null;
  filters: PersonnelFilters;
}

export interface PersonnelFilters {
  unit?: string;
  rank?: string;
  status?: PersonnelStatus;
  dutyStatus?: DutyStatus;
  search?: string;
}

export interface Assignment extends BaseEntity {
  personnel: Personnel;
  property: Property;
  assignedDate: string;
  assignedBy: Personnel;
  status: AssignmentStatus;
  notes?: string;
}

export type AssignmentStatus = 'ACTIVE' | 'PENDING' | 'RETURNED' | 'LOST'; 