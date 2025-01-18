import { UserProfile } from '@/types/user';

export const getProfile = async (): Promise<UserProfile> => {
  const response = await fetch('/api/v1/user/profile');
  if (!response.ok) {
    throw new Error('Failed to fetch profile');
  }
  return response.json();
}; 