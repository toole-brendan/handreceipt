import { api } from '@/services/api';
import { AssignedItem } from '../types/AssignedItems';

export const getAssignedItems = async (personnelId: string): Promise<AssignedItem[]> => {
  return api.get<AssignedItem[]>(`/personnel/${personnelId}/items`);
}; 