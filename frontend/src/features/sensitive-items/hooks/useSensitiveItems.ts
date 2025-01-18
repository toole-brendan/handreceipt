import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';
import { SensitiveItem } from '../types/SensitiveItem';

interface SensitiveItemFilters {
  category: string;
  location: string;
  serialNumber: string;
}

// Memoized base selectors
const selectSensitiveItems = (state: RootState) => state.sensitiveItems.items;

// Memoized derived selectors
export const selectSensitiveItemsDueForVerification = createSelector(
  [selectSensitiveItems],
  (items: SensitiveItem[]) => items.filter((item: SensitiveItem) => item.status === 'needs_verification')
);

// Custom hooks
export const useSensitiveItems = () => {
  const items = useSelector(selectSensitiveItems);
  const [filters, setFilters] = useState<SensitiveItemFilters>({
    category: '',
    location: '',
    serialNumber: ''
  });

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesCategory = !filters.category || item.category === filters.category;
      const matchesLocation = !filters.location || item.location === filters.location;
      const matchesSerial = !filters.serialNumber || 
        item.serialNumber.toLowerCase().includes(filters.serialNumber.toLowerCase());
      
      return matchesCategory && matchesLocation && matchesSerial;
    });
  }, [items, filters]);

  return {
    items,
    filteredItems,
    filters,
    setFilters
  };
};

export const useSensitiveItemsDueForVerification = () => 
  useSelector(selectSensitiveItemsDueForVerification); 