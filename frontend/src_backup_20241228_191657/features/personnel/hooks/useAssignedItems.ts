import { useState, useEffect } from 'react';
import { AssignedItem } from '../types/AssignedItems';
import { getAssignedItems } from '../api/getAssignedItems';

interface UseAssignedItemsResult {
  items: AssignedItem[];
  isLoading: boolean;
  error: string | null;
}

export const useAssignedItems = (personnelId: string): UseAssignedItemsResult => {
  const [items, setItems] = useState<AssignedItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setIsLoading(true);
        const data = await getAssignedItems(personnelId);
        setItems(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch assigned items');
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, [personnelId]);

  return { items, isLoading, error };
}; 