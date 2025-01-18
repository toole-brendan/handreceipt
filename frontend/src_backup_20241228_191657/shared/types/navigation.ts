export type UserRole = 'officer' | 'nco' | 'soldier';

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  path: string;
}

export interface SearchScope {
  property: boolean;
  serialNumbers: boolean;
  personnel: boolean;
  documents: boolean;
}

export const OFFICER_SEARCH_SCOPE: SearchScope = {
  property: true,
  serialNumbers: true,
  personnel: true,
  documents: true
};

export const NCO_SEARCH_SCOPE: SearchScope = {
  property: true,
  serialNumbers: true,
  personnel: true,
  documents: true
};

export const SOLDIER_SEARCH_SCOPE: SearchScope = {
  property: true,
  serialNumbers: true,
  personnel: false,
  documents: true
};

export const OFFICER_NAV_ITEMS: NavItem[] = [
  { id: 'command-dashboard', label: 'Command Dashboard', icon: 'dashboard', path: '/' },
  { id: 'property-book', label: 'Unit Property Book', icon: 'inventory_2', path: '/property-book' },
  { id: 'personnel', label: 'Personnel View', icon: 'people', path: '/personnel' },
  { id: 'maintenance', label: 'Maintenance', icon: 'build', path: '/maintenance' },
  { id: 'inventory', label: 'Inventory Management', icon: 'inventory', path: '/inventory' },
  { id: 'reports', label: 'Reports & Analytics', icon: 'analytics', path: '/reports' },
  { id: 'my-property', label: 'My Property', icon: 'assignment', path: '/my-property' },
  { id: 'history', label: 'History', icon: 'history', path: '/history' },
  { id: 'settings', label: 'Settings', icon: 'settings', path: '/settings' }
];

export const NCO_NAV_ITEMS: NavItem[] = [
  { id: 'squad-dashboard', label: 'Squad Dashboard', icon: 'dashboard', path: '/' },
  { id: 'inventory', label: 'Inventory Management', icon: 'inventory', path: '/inventory' },
  { id: 'property-status', label: 'Property Status', icon: 'fact_check', path: '/property-status' },
  { id: 'maintenance', label: 'Maintenance', icon: 'build', path: '/maintenance' },
  { id: 'hand-receipts', label: 'Hand Receipt Management', icon: 'receipt_long', path: '/hand-receipts' },
  { id: 'my-property', label: 'My Property', icon: 'assignment', path: '/my-property' },
  { id: 'history', label: 'History', icon: 'history', path: '/history' },
  { id: 'settings', label: 'Settings', icon: 'settings', path: '/settings' }
];

export const SOLDIER_NAV_ITEMS: NavItem[] = [
  { id: 'my-property', label: 'My Property', icon: 'assignment', path: '/' },
  { id: 'maintenance', label: 'Maintenance', icon: 'build', path: '/maintenance' },
  { id: 'history', label: 'History', icon: 'history', path: '/history' },
  { id: 'settings', label: 'Settings', icon: 'settings', path: '/settings' }
]; 