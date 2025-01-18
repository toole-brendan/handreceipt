// frontend/src/types/personnel.ts
// Military ranks type
export type MilitaryRank = 
  // Enlisted
  | 'PVT' | 'PV2' | 'PFC' | 'SPC' | 'CPL'
  | 'SGT' | 'SSG' | 'SFC' | 'MSG' | 'SMA'
  // Officers
  | '2LT' | '1LT' | 'CPT' | 'MAJ' | 'LTC' | 'COL';

// Unit types
export type UnitType = 'company' | 'platoon' | 'squad' | 'team';

// Unit echelon types
export type UnitEchelon = 'BN' | 'CO' | 'PLT' | 'SQD';

export interface Unit {
  id: string;
  name: string;                    // e.g., "B Company, 1-23 IN"
  shortName: string;               // e.g., "B CO"
  type: UnitType;
  echelon: UnitEchelon;
  parentUnitId?: string;
  commander: {
    id: string;
    rank: MilitaryRank;
    name: string;
  };
  personnel: Personnel[];
  stats: {
    personnelCount: number;
    equipmentCount: number;
    sensitiveItemCount: number;
    pendingTransfers: number;
    overdueInventories: number;
  };
  lastInventory?: string;          // ISO date string
  nextInventoryDue?: string;       // ISO date string
}

export interface Personnel {
  id: string;
  rank: MilitaryRank;
  firstName: string;
  lastName: string;
  dodId: string;                   // DOD ID number
  unitId: string;
  platoon: string;                 // e.g., "1st Platoon"
  squad?: string;                  // e.g., "1st Squad"
  team?: string;                   // e.g., "Alpha Team"
  position: string;                // e.g., "Team Leader"
  dutyPosition?: string;           // e.g., "Armorer", "Supply NCO"
  section?: string;                // e.g., "S1", "Arms Room"
  isCommander: boolean;
  isPrimaryHandReceipt: boolean;
  propertyAccess: {
    canSignFor: boolean;
    canTransfer: boolean;
    canInventory: boolean;
    sensitiveItems: boolean;
  };
  propertyStats: {
    propertyCount: number;
    sensitiveItemCount: number;
    totalValue: number;
    pendingTransfers: number;
  };
  inventoryStatus: {
    lastInventory: string;         // ISO date string
    nextInventoryDue: string;      // ISO date string
    overdueCount: number;
    cycleComplete: boolean;
  };
  contact: {
    email: string;
    phone?: string;
    dsn?: string;
  };
  status: 'present' | 'leave' | 'tdy' | 'deployed' | 'other';
  clearance?: 'SECRET' | 'TOP_SECRET' | 'SCI';
  certifications?: string[];       // e.g., ["Arms Room", "HAZMAT"]
  propertyCount?: number;
  sensitiveItemCount?: number;
  pendingTransfers?: number;
  lastInventory?: string;
}

// Property accountability interfaces
export interface HandReceipt {
  id: string;
  holder: Personnel;
  primaryHolder: Personnel;
  issueDate: string;              // ISO date string
  lastUpdated: string;            // ISO date string
  items: HandReceiptItem[];
  status: 'active' | 'pending' | 'archived';
  type: 'primary' | 'sub' | 'temporary';
  signatures: {
    issuer: string;
    receiver: string;
    witness?: string;
  };
}

export interface HandReceiptItem {
  id: string;
  nsn: string;                    // National Stock Number
  name: string;
  serialNumber: string;
  model: string;
  value: number;
  quantity: number;
  condition: 'NEW' | 'SERVICEABLE' | 'UNSERVICEABLE' | 'DAMAGED';
  isSensitive: boolean;
  location: string;
  lastInventoried: string;        // ISO date string
  notes?: string;
}

// Transfer interfaces
export interface PropertyTransfer {
  id: string;
  fromUnit: Unit;
  toUnit: Unit;
  initiatedBy: Personnel;
  approvedBy?: Personnel;
  items: HandReceiptItem[];
  status: 'pending' | 'approved' | 'completed' | 'rejected';
  initiatedDate: string;          // ISO date string
  completedDate?: string;         // ISO date string
  comments?: string;
}

export type Section = '1st Squad' | '2nd Squad' | '3rd Squad';
export type InventoryStatus = 'complete' | 'incomplete' | 'due';
export type Position = 'Rifleman' | 'Grenadier' | 'M240 Gunner' | 'M249 Gunner' | 'Team Leader' | 'Squad Leader';

export interface AssignedEquipment {
  id: string;
  name: string;
  serialNumber: string;
  category: string;
  dateAssigned: string;
  isSensitive: boolean;
}

export interface PersonnelStats {
  totalItems: number;
  sensitiveItems: number;
  lastInventoryDate: string;
}

export interface Soldier {
  id: string;
  rank: string;
  firstName: string;
  lastName: string;
  position: Position;
  section: Section;
  status: InventoryStatus;
  stats: PersonnelStats;
  equipment: AssignedEquipment[];
}

export interface PersonnelFilters {
  section: Section | 'all';
  status: InventoryStatus | 'all';
  searchQuery: string;
}