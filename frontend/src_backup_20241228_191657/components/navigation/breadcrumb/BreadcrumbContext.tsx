import React, { createContext, useContext, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

export interface BreadcrumbItem {
  label: string;
  path: string;
  icon?: React.ReactNode;
}

interface BreadcrumbContextType {
  items: BreadcrumbItem[];
  setBreadcrumbs: (items: BreadcrumbItem[]) => void;
  addBreadcrumb: (item: BreadcrumbItem) => void;
  removeBreadcrumb: (path: string) => void;
  clearBreadcrumbs: () => void;
}

const BreadcrumbContext = createContext<BreadcrumbContextType | undefined>(undefined);

interface BreadcrumbProviderProps {
  children: React.ReactNode;
}

export const BreadcrumbProvider: React.FC<BreadcrumbProviderProps> = ({ children }) => {
  const [items, setItems] = useState<BreadcrumbItem[]>([]);
  const location = useLocation();

  // Reset breadcrumbs when location changes
  React.useEffect(() => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const newBreadcrumbs: BreadcrumbItem[] = pathSegments.map((segment, index) => {
      const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
      return {
        label: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
        path,
      };
    });
    setItems(newBreadcrumbs);
  }, [location]);

  const setBreadcrumbs = useCallback((newItems: BreadcrumbItem[]) => {
    setItems(newItems);
  }, []);

  const addBreadcrumb = useCallback((item: BreadcrumbItem) => {
    setItems(prev => [...prev, item]);
  }, []);

  const removeBreadcrumb = useCallback((path: string) => {
    setItems(prev => prev.filter(item => item.path !== path));
  }, []);

  const clearBreadcrumbs = useCallback(() => {
    setItems([]);
  }, []);

  const value = {
    items,
    setBreadcrumbs,
    addBreadcrumb,
    removeBreadcrumb,
    clearBreadcrumbs,
  };

  return (
    <BreadcrumbContext.Provider value={value}>
      {children}
    </BreadcrumbContext.Provider>
  );
};

export const useBreadcrumbs = () => {
  const context = useContext(BreadcrumbContext);
  if (context === undefined) {
    throw new Error('useBreadcrumbs must be used within a BreadcrumbProvider');
  }
  return context;
};

export default BreadcrumbContext; 