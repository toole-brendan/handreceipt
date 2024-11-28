import { Property, PropertyTransfer } from '@/types/property';

// Mock data for development
const mockProperties: Property[] = [
  {
    id: '1',
    name: 'M4 Carbine',
    serialNumber: 'M4-123456',
    description: 'Standard issue rifle',
    category: 'Weapons',
    status: 'active',
    currentHolder: 'John Smith',
    dateAssigned: '2024-03-01'
  },
  {
    id: '2',
    name: 'Night Vision Goggles',
    serialNumber: 'NVG-789012',
    description: 'Gen 3 night vision device',
    category: 'Optics',
    status: 'active',
    currentHolder: 'John Smith',
    dateAssigned: '2024-02-15'
  },
  {
    id: '3',
    name: 'M249 SAW',
    serialNumber: 'M249-654321',
    description: 'Squad automatic weapon',
    category: 'Weapons',
    status: 'maintenance',
    currentHolder: 'Kevin Garcia',
    dateAssigned: '2024-01-20'
  },
  {
    id: '4',
    name: 'ACOG Scope',
    serialNumber: 'ACOG-246810',
    description: 'Advanced combat optical gunsight',
    category: 'Optics',
    status: 'active',
    currentHolder: 'Jane Doe',
    dateAssigned: '2024-02-28'
  },
  {
    id: '5',
    name: 'Tactical Radio',
    serialNumber: 'RAD-135790',
    description: 'Encrypted communication device',
    category: 'Communications',
    status: 'active',
    currentHolder: 'Robert Anderson',
    dateAssigned: '2024-03-05'
  }
];

const mockTransfers: PropertyTransfer[] = [
  {
    id: '1',
    propertyId: '1',
    propertyName: 'M4 Carbine',
    fromPerson: 'Supply Sergeant',
    toPerson: 'John Smith',
    transferDate: '2024-03-01',
    status: 'completed'
  },
  {
    id: '2',
    propertyId: '2',
    propertyName: 'Night Vision Goggles',
    fromPerson: 'Supply Sergeant',
    toPerson: 'John Smith',
    transferDate: '2024-02-15',
    status: 'completed'
  },
  {
    id: '3',
    propertyId: '3',
    propertyName: 'M249 SAW',
    fromPerson: 'Supply Sergeant',
    toPerson: 'Kevin Garcia',
    transferDate: '2024-01-20',
    status: 'completed'
  },
  {
    id: '4',
    propertyId: '4',
    propertyName: 'ACOG Scope',
    fromPerson: 'Supply Sergeant',
    toPerson: 'Jane Doe',
    transferDate: '2024-02-28',
    status: 'completed'
  },
  {
    id: '5',
    propertyId: '5',
    propertyName: 'Tactical Radio',
    fromPerson: 'Supply Sergeant',
    toPerson: 'Robert Anderson',
    transferDate: '2024-03-05',
    status: 'completed'
  },
  {
    id: '6',
    propertyId: '3',
    propertyName: 'M249 SAW',
    fromPerson: 'Kevin Garcia',
    toPerson: 'Maintenance Section',
    transferDate: '2024-03-10',
    status: 'pending'
  }
];

// Mock property data for each personnel in 1st Squad
const mockPersonnelPropertyMap: Record<string, Property[]> = {
  // SGT John Smith (Squad Leader)
  'p1': [
    {
      id: 'p1-1',
      name: 'M4 Carbine',
      serialNumber: 'M4-123456',
      description: 'Squad Leader weapon',
      category: 'Weapons',
      status: 'active',
      currentHolder: 'John Smith',
      dateAssigned: '2024-03-01'
    },
    {
      id: 'p1-2',
      name: 'PVS-14 Night Vision',
      serialNumber: 'NVG-789012',
      description: 'Night vision monocular',
      category: 'Optics',
      status: 'active',
      currentHolder: 'John Smith',
      dateAssigned: '2024-02-15'
    },
    {
      id: 'p1-3',
      name: 'Squad Radio',
      serialNumber: 'RAD-345678',
      description: 'Squad communications',
      category: 'Communications',
      status: 'active',
      currentHolder: 'John Smith',
      dateAssigned: '2024-03-01'
    }
  ],
  // CPL Jane Doe (Team Leader)
  'p2': [
    {
      id: 'p2-1',
      name: 'M4 Carbine w/M203',
      serialNumber: 'M4-234567',
      description: 'Team Leader weapon with grenade launcher',
      category: 'Weapons',
      status: 'active',
      currentHolder: 'Jane Doe',
      dateAssigned: '2024-02-28'
    },
    {
      id: 'p2-2',
      name: 'ACOG Scope',
      serialNumber: 'ACOG-123456',
      description: 'Advanced combat optical gunsight',
      category: 'Optics',
      status: 'active',
      currentHolder: 'Jane Doe',
      dateAssigned: '2024-02-28'
    }
  ],
  // SPC Mike Johnson (Grenadier)
  'p3': [
    {
      id: 'p3-1',
      name: 'M4 Carbine w/M203',
      serialNumber: 'M4-345678',
      description: 'Grenadier weapon system',
      category: 'Weapons',
      status: 'active',
      currentHolder: 'Mike Johnson',
      dateAssigned: '2024-02-20'
    },
    {
      id: 'p3-2',
      name: 'M68 CCO',
      serialNumber: 'CCO-234567',
      description: 'Close combat optic',
      category: 'Optics',
      status: 'active',
      currentHolder: 'Mike Johnson',
      dateAssigned: '2024-02-20'
    }
  ],
  // PFC Sarah Wilson (Automatic Rifleman)
  'p4': [
    {
      id: 'p4-1',
      name: 'M249 SAW',
      serialNumber: 'M249-123789',
      description: 'Squad automatic weapon',
      category: 'Weapons',
      status: 'active',
      currentHolder: 'Sarah Wilson',
      dateAssigned: '2024-02-15'
    },
    {
      id: 'p4-2',
      name: 'ELCAN Specter',
      serialNumber: 'ELCAN-345678',
      description: 'Machine gun optic',
      category: 'Optics',
      status: 'active',
      currentHolder: 'Sarah Wilson',
      dateAssigned: '2024-02-15'
    }
  ],
  // PFC Thomas Clark (Rifleman)
  'p12': [
    {
      id: 'p12-1',
      name: 'M4 Carbine',
      serialNumber: 'M4-456789',
      description: 'Standard infantry rifle',
      category: 'Weapons',
      status: 'active',
      currentHolder: 'Thomas Clark',
      dateAssigned: '2024-03-05'
    }
  ],
  // PVT Joseph Rodriguez (Rifleman)
  'p13': [
    {
      id: 'p13-1',
      name: 'M4 Carbine',
      serialNumber: 'M4-567890',
      description: 'Standard infantry rifle',
      category: 'Weapons',
      status: 'active',
      currentHolder: 'Joseph Rodriguez',
      dateAssigned: '2024-03-10'
    }
  ]
};

export const fetchCurrentProperty = async (): Promise<Property[]> => {
  // In development, return mock data
  if (process.env.NODE_ENV === 'development') {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockProperties), 500); // Simulate network delay
    });
  }

  // In production, make actual API call
  const response = await fetch('/api/property/current');
  if (!response.ok) {
    throw new Error('Failed to fetch current property');
  }
  return response.json();
};

export const fetchPropertyHistory = async (): Promise<PropertyTransfer[]> => {
  // In development, return mock data
  if (process.env.NODE_ENV === 'development') {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockTransfers), 500); // Simulate network delay
    });
  }

  // In production, make actual API call
  const response = await fetch('/api/property/history');
  if (!response.ok) {
    throw new Error('Failed to fetch property history');
  }
  return response.json();
};

export const fetchPersonnelProperty = async (personnelId: string): Promise<Property[]> => {
  // In development, return mock data
  if (process.env.NODE_ENV === 'development') {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockPersonnelPropertyMap[personnelId] || []), 500);
    });
  }

  // In production, make actual API call
  const response = await fetch(`/api/property/personnel/${personnelId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch personnel property');
  }
  return response.json();
}; 