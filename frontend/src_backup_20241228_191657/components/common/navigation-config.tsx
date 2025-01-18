// frontend/src/ui/components/common/navigation-config.ts

import { lazy } from 'react';
import type { ComponentType } from 'react';
import { 
  Package2, 
  ArrowLeftRight, 
  Shield, 
  Users, 
  Wrench, 
  QrCode,
  BarChart3,
  History,
  Settings
} from 'lucide-react';

export interface NavItemConfig {
  to: string;
  text: string;
  icon: React.ReactNode;
  description?: string; // Optional description for accessibility
  end?: boolean; // Optional end property for route matching
  component?: React.LazyExoticComponent<React.ComponentType<any>>;
}

export const OFFICER_NAV_ITEMS: NavItemConfig[] = [
  {
    to: '/property',
    icon: <Package2 className="h-5 w-5" />,
    text: 'My Property',
    end: true
  },
  {
    to: '/personnel',
    icon: <Users className="h-5 w-5" />,
    text: 'Personnel'
  },
  {
    to: '/transfers',
    icon: <ArrowLeftRight className="h-5 w-5" />,
    text: 'Transfer Requests'
  },
  {
    to: '/sensitive-items',
    icon: <Shield className="h-5 w-5" />,
    text: 'Sensitive Items'
  },
  {
    to: '/maintenance',
    icon: <Wrench className="h-5 w-5" />,
    text: 'Maintenance'
  },
  {
    to: '/qr-generator',
    icon: <QrCode className="h-5 w-5" />,
    text: 'QR Generator'
  },
  {
    to: '/reports',
    icon: <BarChart3 className="h-5 w-5" />,
    text: 'Reports'
  },
  {
    to: '/history',
    icon: <History className="h-5 w-5" />,
    text: 'History'
  },
  {
    to: '/settings',
    icon: <Settings className="h-5 w-5" />,
    text: 'Settings'
  }
];

export const NCO_NAV_ITEMS: NavItemConfig[] = [
  {
    to: '/property',
    icon: <Package2 className="h-5 w-5" />,
    text: 'My Property',
    end: true
  },
  {
    to: '/personnel',
    icon: <Users className="h-5 w-5" />,
    text: 'Personnel'
  },
  {
    to: '/transfers',
    icon: <ArrowLeftRight className="h-5 w-5" />,
    text: 'Transfer Requests'
  },
  {
    to: '/sensitive-items',
    icon: <Shield className="h-5 w-5" />,
    text: 'Sensitive Items'
  },
  {
    to: '/maintenance',
    icon: <Wrench className="h-5 w-5" />,
    text: 'Maintenance'
  },
  {
    to: '/history',
    icon: <History className="h-5 w-5" />,
    text: 'History'
  },
  {
    to: '/settings',
    icon: <Settings className="h-5 w-5" />,
    text: 'Settings'
  }
];

export const SOLDIER_NAV_ITEMS: NavItemConfig[] = [
  {
    to: '/property',
    icon: <Package2 className="h-5 w-5" />,
    text: 'My Property',
    end: true
  },
  {
    to: '/transfers',
    icon: <ArrowLeftRight className="h-5 w-5" />,
    text: 'Transfer Requests'
  },
  {
    to: '/sensitive-items',
    icon: <Shield className="h-5 w-5" />,
    text: 'Sensitive Items'
  },
  {
    to: '/maintenance',
    icon: <Wrench className="h-5 w-5" />,
    text: 'Maintenance'
  },
  {
    to: '/history',
    icon: <History className="h-5 w-5" />,
    text: 'History'
  },
  {
    to: '/settings',
    icon: <Settings className="h-5 w-5" />,
    text: 'Settings'
  }
]; 