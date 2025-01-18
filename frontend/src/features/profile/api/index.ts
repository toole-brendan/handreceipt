import { UserProfile, NotificationPreferences, Device, AccessHistoryEntry } from '../types';

export async function getProfile(): Promise<UserProfile> {
  const response = await fetch('/api/user/profile');
  return response.json();
}

export async function updateProfile(profile: UserProfile): Promise<UserProfile> {
  const response = await fetch('/api/user/profile', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(profile),
  });
  return response.json();
}

export async function changePassword(newPassword: string): Promise<void> {
  await fetch('/api/user/password', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password: newPassword }),
  });
}

export async function getDevices(): Promise<Device[]> {
  const response = await fetch('/api/user/devices');
  return response.json();
}

export async function logoutDevice(deviceId: string): Promise<void> {
  await fetch(`/api/user/devices/${deviceId}/logout`, {
    method: 'POST',
  });
}

export async function getAccessHistory(): Promise<AccessHistoryEntry[]> {
  const response = await fetch('/api/user/access-history');
  return response.json();
}

export async function updateNotificationPreferences(
  preferences: NotificationPreferences
): Promise<NotificationPreferences> {
  const response = await fetch('/api/user/notifications', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(preferences),
  });
  return response.json();
} 