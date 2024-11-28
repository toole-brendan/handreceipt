// frontend/src/ui/components/common/navigation-config.ts

import { lazy } from 'react';
import type { ComponentType } from 'react';

export interface NavItem {
  to: string;
  icon: string;
  text: string;
  component?: React.LazyExoticComponent<ComponentType<any>>;
}

export interface NavSection {
  title?: string;
  items: NavItem[];
}

export const navigationConfig: NavSection[] = [
  {
    items: [
      { 
        to: '/dashboard', 
        icon: 'dashboard', 
        text: 'Dashboard',
        component: lazy(() => import('@/pages/dashboard/Dashboard'))
      },
      { 
        to: '/my-property', 
        icon: 'inventory_2', 
        text: 'My Property',
        component: lazy(() => import('@/pages/property/my-property'))
      },
      { 
        to: '/personnel-property', 
        icon: 'group', 
        text: 'Personnel Property',
        component: lazy(() => import('@/pages/property/personnel-property'))
      },
    ]
  },
  {
    title: 'Blockchain',
    items: [
      { 
        to: '/blockchain', 
        icon: 'timeline', 
        text: 'Overview',
        component: lazy(() => import('@/pages/blockchain').then(module => ({ 
          default: module.BlockchainOverview
        })))
      },
      { 
        to: '/blockchain/transactions', 
        icon: 'swap_horiz', 
        text: 'Transactions',
        component: lazy(() => import('@/pages/blockchain/transactions'))
      },
    ]
  },
  {
    title: 'Reports',
    items: [
      { 
        to: '/reports', 
        icon: 'assessment', 
        text: 'Reports',
        component: lazy(() => import('@/pages/reports'))
      },
      { 
        to: '/reports/builder', 
        icon: 'build', 
        text: 'Report Builder',
        component: lazy(() => import('@/pages/reports/ReportBuilder'))
      },
    ]
  },
  {
    title: 'Assets',
    items: [
      { 
        to: '/assets/create-qr', 
        icon: 'qr_code', 
        text: 'Create QR Code',
        component: lazy(() => import('@/pages/assets/CreateQRCode'))
      },
    ]
  }
]; 