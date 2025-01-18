import { useMemo } from 'react';
import { useSensitiveItems } from './useSensitiveItems';
import { SensitiveItem } from '../types/SensitiveItem';

interface VerificationSchedule {
  nextVerificationTime: Date;
  isVerificationRequired: boolean;
  isOverdue: boolean;
  itemsDueCount: number;
  itemsOverdueCount: number;
}

export const useVerificationSchedule = (): VerificationSchedule => {
  const items = useSensitiveItems();
  
  return useMemo(() => {
    const now = new Date();
    const itemsDue = items.filter(item => {
      const nextVerification = new Date(item.nextVerification);
      return nextVerification <= now && item.status === 'needs_verification';
    });
    
    const itemsOverdue = itemsDue.filter(item => {
      const nextVerification = new Date(item.nextVerification);
      const overdueDays = Math.floor((now.getTime() - nextVerification.getTime()) / (1000 * 60 * 60 * 24));
      return item.status === 'overdue' || overdueDays > 0;
    });

    // Find the next required verification time
    const nextVerification = items
      .map(item => new Date(item.nextVerification))
      .sort((a, b) => a.getTime() - b.getTime())
      .find(date => date > now) || now;

    return {
      nextVerificationTime: nextVerification,
      isVerificationRequired: itemsDue.length > 0,
      isOverdue: itemsOverdue.length > 0,
      itemsDueCount: itemsDue.length,
      itemsOverdueCount: itemsOverdue.length
    };
  }, [items]);
}; 