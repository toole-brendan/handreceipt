import { Unit, Personnel } from '@/types/personnel';

// Mock data for development
const mockUnits: Unit[] = [
  {
    id: '1',
    name: '1st Squad',
    type: 'squad',
    parentUnitId: 'plt1',
    personnelCount: 10
  },
  {
    id: '2',
    name: '2nd Squad',
    type: 'squad',
    parentUnitId: 'plt1',
    personnelCount: 9
  },
  {
    id: '3',
    name: '3rd Squad',
    type: 'squad',
    parentUnitId: 'plt1',
    personnelCount: 8
  },
  {
    id: '4',
    name: 'Weapons Squad',
    type: 'squad',
    parentUnitId: 'plt1',
    personnelCount: 8
  },
  {
    id: 'plt1',
    name: '1st Platoon',
    type: 'platoon',
    parentUnitId: 'co1',
    personnelCount: 35
  },
  {
    id: 'co1',
    name: 'Alpha Company',
    type: 'company',
    personnelCount: 120
  }
];

const mockPersonnel: Record<string, Personnel[]> = {
  '1': [
    {
      id: 'p1',
      rank: 'SGT',
      firstName: 'John',
      lastName: 'Smith',
      unitId: '1',
      position: 'Squad Leader'
    },
    {
      id: 'p2',
      rank: 'CPL',
      firstName: 'Jane',
      lastName: 'Doe',
      unitId: '1',
      position: 'Team Leader'
    },
    {
      id: 'p3',
      rank: 'SPC',
      firstName: 'Mike',
      lastName: 'Johnson',
      unitId: '1',
      position: 'Grenadier'
    },
    {
      id: 'p4',
      rank: 'PFC',
      firstName: 'Sarah',
      lastName: 'Wilson',
      unitId: '1',
      position: 'Automatic Rifleman'
    },
    {
      id: 'p12',
      rank: 'PFC',
      firstName: 'Thomas',
      lastName: 'Clark',
      unitId: '1',
      position: 'Rifleman'
    },
    {
      id: 'p13',
      rank: 'PVT',
      firstName: 'Joseph',
      lastName: 'Rodriguez',
      unitId: '1',
      position: 'Rifleman'
    }
  ],
  '2': [
    {
      id: 'p5',
      rank: 'SSG',
      firstName: 'Robert',
      lastName: 'Anderson',
      unitId: '2',
      position: 'Squad Leader'
    },
    {
      id: 'p6',
      rank: 'SGT',
      firstName: 'William',
      lastName: 'Brown',
      unitId: '2',
      position: 'Team Leader'
    },
    {
      id: 'p7',
      rank: 'SPC',
      firstName: 'James',
      lastName: 'Davis',
      unitId: '2',
      position: 'Combat Medic'
    },
    {
      id: 'p14',
      rank: 'SPC',
      firstName: 'Daniel',
      lastName: 'White',
      unitId: '2',
      position: 'Grenadier'
    },
    {
      id: 'p15',
      rank: 'PFC',
      firstName: 'Richard',
      lastName: 'Moore',
      unitId: '2',
      position: 'Automatic Rifleman'
    },
    {
      id: 'p16',
      rank: 'PVT',
      firstName: 'Charles',
      lastName: 'Taylor',
      unitId: '2',
      position: 'Rifleman'
    }
  ],
  '3': [
    {
      id: 'p8',
      rank: 'SGT',
      firstName: 'Michael',
      lastName: 'Taylor',
      unitId: '3',
      position: 'Squad Leader'
    },
    {
      id: 'p9',
      rank: 'CPL',
      firstName: 'David',
      lastName: 'Martinez',
      unitId: '3',
      position: 'Team Leader'
    },
    {
      id: 'p17',
      rank: 'SPC',
      firstName: 'Christopher',
      lastName: 'Lee',
      unitId: '3',
      position: 'Grenadier'
    },
    {
      id: 'p18',
      rank: 'PFC',
      firstName: 'Steven',
      lastName: 'Walker',
      unitId: '3',
      position: 'Automatic Rifleman'
    },
    {
      id: 'p19',
      rank: 'PVT',
      firstName: 'Andrew',
      lastName: 'Hall',
      unitId: '3',
      position: 'Rifleman'
    }
  ],
  '4': [
    {
      id: 'p10',
      rank: 'SSG',
      firstName: 'Christopher',
      lastName: 'Thompson',
      unitId: '4',
      position: 'Weapons Squad Leader'
    },
    {
      id: 'p11',
      rank: 'SGT',
      firstName: 'Kevin',
      lastName: 'Garcia',
      unitId: '4',
      position: 'Machine Gun Team Leader'
    },
    {
      id: 'p20',
      rank: 'SPC',
      firstName: 'Brian',
      lastName: 'Young',
      unitId: '4',
      position: 'Machine Gunner'
    },
    {
      id: 'p21',
      rank: 'PFC',
      firstName: 'Edward',
      lastName: 'King',
      unitId: '4',
      position: 'Assistant Gunner'
    },
    {
      id: 'p22',
      rank: 'SPC',
      firstName: 'George',
      lastName: 'Wright',
      unitId: '4',
      position: 'Ammo Bearer'
    }
  ]
};

export const fetchUnits = async (): Promise<Unit[]> => {
  // In development, return mock data
  if (process.env.NODE_ENV === 'development') {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockUnits), 500);
    });
  }

  const response = await fetch('/api/personnel/units');
  if (!response.ok) {
    throw new Error('Failed to fetch units');
  }
  return response.json();
};

export const fetchPersonnel = async (unitId: string): Promise<Personnel[]> => {
  // In development, return mock data
  if (process.env.NODE_ENV === 'development') {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockPersonnel[unitId] || []), 500);
    });
  }

  const response = await fetch(`/api/personnel/units/${unitId}/members`);
  if (!response.ok) {
    throw new Error('Failed to fetch personnel');
  }
  return response.json();
}; 