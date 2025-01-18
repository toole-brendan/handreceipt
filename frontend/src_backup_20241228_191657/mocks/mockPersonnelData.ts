import { Unit, Personnel, HandReceipt, HandReceiptItem, PropertyTransfer } from '@/types/personnel';

export const mockUnits: Unit[] = [
  {
    id: 'HHC',
    name: 'Headquarters and Headquarters Company, 1-23 Infantry',
    shortName: 'HHC',
    type: 'company',
    echelon: 'CO',
    commander: {
      id: 'CPT-001',
      rank: 'CPT',
      name: 'Thompson, James'
    },
    personnel: [], // Will be populated
    stats: {
      personnelCount: 35,
      equipmentCount: 245,
      sensitiveItemCount: 28,
      pendingTransfers: 3,
      overdueInventories: 1
    },
    lastInventory: '2024-03-15',
    nextInventoryDue: '2024-04-15'
  },
  {
    id: '1PLT',
    name: '1st Platoon, B Company, 1-23 Infantry',
    shortName: '1PLT',
    type: 'platoon',
    echelon: 'PLT',
    parentUnitId: 'BCO',
    commander: {
      id: '1LT-001',
      rank: '1LT',
      name: 'Martinez, Sarah'
    },
    personnel: [], // Will be populated
    stats: {
      personnelCount: 42,
      equipmentCount: 320,
      sensitiveItemCount: 42,
      pendingTransfers: 2,
      overdueInventories: 0
    },
    lastInventory: '2024-03-20',
    nextInventoryDue: '2024-04-20'
  }
];

export const mockPersonnel: Personnel[] = [
  {
    id: 'CPT-001',
    rank: 'CPT',
    firstName: 'James',
    lastName: 'Thompson',
    dodId: '1234567890',
    unitId: 'HHC',
    platoon: 'HQ Platoon',
    position: 'Company Commander',
    isCommander: true,
    isPrimaryHandReceipt: true,
    propertyAccess: {
      canSignFor: true,
      canTransfer: true,
      canInventory: true,
      sensitiveItems: true
    },
    propertyStats: {
      propertyCount: 45,
      sensitiveItemCount: 8,
      totalValue: 125000,
      pendingTransfers: 2
    },
    inventoryStatus: {
      lastInventory: '2024-03-15',
      nextInventoryDue: '2024-04-15',
      overdueCount: 0,
      cycleComplete: true
    },
    contact: {
      email: 'james.thompson.mil@army.mil',
      phone: '555-0100',
      dsn: '312-555-0100'
    },
    status: 'present',
    clearance: 'SECRET'
  },
  {
    id: '1SG-001',
    rank: 'MSG',
    firstName: 'Robert',
    lastName: 'Wilson',
    dodId: '1234567891',
    unitId: 'HHC',
    platoon: 'HQ Platoon',
    position: 'First Sergeant',
    isCommander: false,
    isPrimaryHandReceipt: true,
    propertyAccess: {
      canSignFor: true,
      canTransfer: true,
      canInventory: true,
      sensitiveItems: true
    },
    propertyStats: {
      propertyCount: 35,
      sensitiveItemCount: 6,
      totalValue: 95000,
      pendingTransfers: 1
    },
    inventoryStatus: {
      lastInventory: '2024-03-15',
      nextInventoryDue: '2024-04-15',
      overdueCount: 0,
      cycleComplete: true
    },
    contact: {
      email: 'robert.wilson.mil@army.mil',
      phone: '555-0101',
      dsn: '312-555-0101'
    },
    status: 'present',
    clearance: 'SECRET'
  },
  {
    id: 'SSG-001',
    rank: 'SSG',
    firstName: 'Michael',
    lastName: 'Johnson',
    dodId: '1234567892',
    unitId: 'HHC',
    platoon: 'HQ Platoon',
    position: 'Supply Sergeant',
    dutyPosition: 'Supply NCO',
    section: 'Supply Room',
    isCommander: false,
    isPrimaryHandReceipt: true,
    propertyAccess: {
      canSignFor: true,
      canTransfer: true,
      canInventory: true,
      sensitiveItems: true
    },
    propertyStats: {
      propertyCount: 1245,
      sensitiveItemCount: 85,
      totalValue: 2500000,
      pendingTransfers: 12
    },
    inventoryStatus: {
      lastInventory: '2024-03-15',
      nextInventoryDue: '2024-04-15',
      overdueCount: 0,
      cycleComplete: true
    },
    contact: {
      email: 'michael.johnson.mil@army.mil',
      phone: '555-0102',
      dsn: '312-555-0102'
    },
    status: 'present',
    clearance: 'SECRET',
    certifications: ['Supply Management', 'GCSS-Army', 'Hazmat']
  }
];

export const mockHandReceipts: HandReceipt[] = [
  {
    id: 'HR-001',
    holder: mockPersonnel[2], // SSG Johnson
    primaryHolder: mockPersonnel[0], // CPT Thompson
    issueDate: '2024-01-15',
    lastUpdated: '2024-03-15',
    items: [], // Will be populated
    status: 'active',
    type: 'primary',
    signatures: {
      issuer: 'CPT James Thompson',
      receiver: 'SSG Michael Johnson',
      witness: '1SG Robert Wilson'
    }
  }
];

export const mockHandReceiptItems: HandReceiptItem[] = [
  {
    id: 'ITEM-001',
    nsn: '1005-01-545-1477',
    name: 'M4 Carbine',
    serialNumber: 'M4-2024-001',
    model: 'M4A1',
    value: 1200,
    quantity: 1,
    condition: 'SERVICEABLE',
    isSensitive: true,
    location: 'Arms Room',
    lastInventoried: '2024-03-15'
  },
  {
    id: 'ITEM-002',
    nsn: '5855-01-538-0731',
    name: 'PVS-14',
    serialNumber: 'PVS14-2024-001',
    model: 'AN/PVS-14',
    value: 3400,
    quantity: 1,
    condition: 'SERVICEABLE',
    isSensitive: true,
    location: 'Arms Room',
    lastInventoried: '2024-03-15'
  },
  {
    id: 'ITEM-003',
    nsn: '8465-01-583-6719',
    name: 'IOTV',
    serialNumber: 'IOTV-2024-001',
    model: 'Gen IV',
    value: 1600,
    quantity: 1,
    condition: 'SERVICEABLE',
    isSensitive: false,
    location: 'Supply Room',
    lastInventoried: '2024-03-15'
  }
];

export const mockPropertyTransfers: PropertyTransfer[] = [
  {
    id: 'TRANS-001',
    fromUnit: mockUnits[0],
    toUnit: mockUnits[1],
    initiatedBy: mockPersonnel[2],
    approvedBy: mockPersonnel[0],
    items: [mockHandReceiptItems[2]], // IOTV transfer
    status: 'pending',
    initiatedDate: '2024-03-20',
    comments: 'Transfer to support upcoming training'
  }
]; 