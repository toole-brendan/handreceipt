/* frontend/src/mocks/mockData.ts */

export const mockTasks = [
  {
    id: '1',
    itemName: 'Combat Vehicle Alpha',
    dateSubmitted: '2024-03-25',
    daysInRepair: 5,
    expectedCompletion: '2024-04-01',
    status: 'In Progress' as const
  },
  {
    id: '2',
    itemName: 'Communication System Beta',
    dateSubmitted: '2024-03-20',
    daysInRepair: 10,
    expectedCompletion: '2024-04-05',
    status: 'Delayed' as const
  }
];

export const mockUser = {
  id: 'U001',
  militaryId: 'M12345',
  rank: 'Sergeant',
  name: 'John Smith',
  clearanceLevel: 'SECRET',
};

export const mockVerifications = [
  {
    id: 'v1',
    assetId: 'A001',
    assetName: 'Combat Vehicle Alpha',
    submittedBy: 'John Smith',
    submittedDate: '2024-03-25T10:00:00Z',
    status: 'pending',
    verificationData: {
      checklist: [
        { id: 'c1', label: 'Physical Check', required: true, checked: true },
        { id: 'c2', label: 'Systems Test', required: true, checked: true },
        { id: 'c3', label: 'Documentation Review', required: false, checked: false }
      ],
      condition: 'good',
      notes: 'Regular maintenance check completed',
      images: [
        'https://example.com/image1.jpg',
        'https://example.com/image2.jpg'
      ]
    }
  }
];

export const mockAssets = [
  {
    id: 'A001',
    name: 'Combat Vehicle Alpha',
    type: 'Vehicle',
    status: 'active',
    location: 'Base Alpha',
    lastVerified: '2024-03-20T14:30:00Z',
    classification: 'SECRET'
  },
  {
    id: 'A002',
    name: 'Communication System Beta',
    type: 'Communication',
    status: 'maintenance',
    location: 'Base Beta',
    lastVerified: '2024-03-15T09:15:00Z',
    classification: 'TOP_SECRET'
  }
];

export const mockSystemHealth = {
  network: 'healthy',
  blockchain: 'synced',
  security: 'normal',
  performance: 95
};

export const mockAuthResponse = {
  user: {
    id: 'U001',
    militaryId: 'M12345',
    rank: 'Sergeant',
    name: 'John Smith',
    clearanceLevel: 'SECRET',
  },
  token: 'mock-jwt-token',
  requiresMFA: false,
};

export const mockActivities = [
  {
    id: 'A001',
    type: 'asset',
    message: 'Asset verification completed',
    timestamp: new Date().toISOString(),
    severity: 'info',
    classification: 'SECRET',
  },
  // Add more mock activities...
];

export const mockInventoryChecks = [
  {
    id: 'ic1',
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
    assignedOfficer: 'Capt. Sarah Johnson',
    type: 'Cyclic' as const,
    location: 'Building A',
    time: '09:00',
    lastCheckStatus: 'Pending' as const
  },
  {
    id: 'ic2',
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
    assignedOfficer: 'Lt. Michael Chen',
    type: 'Sensitive Items' as const,
    location: 'Armory',
    time: '14:00',
    lastCheckStatus: 'Pending' as const
  },
  {
    id: 'ic3',
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    assignedOfficer: 'Maj. Robert Wilson',
    type: 'Cyclic' as const,
    location: 'Motor Pool',
    time: '10:30',
    lastCheckStatus: 'Completed' as const,
    reportUrl: '/reports/ic3'
  }
]; 