import { useState, useEffect } from 'react';
import { UserProfile, NotificationPreferences, Device, AccessHistoryEntry } from '../types';
import * as profileApi from '../api';

export function useProfileData() {
  const [userInfo, setUserInfo] = useState<UserProfile>({
    name: '',
    email: '',
    phone: '',
  });
  const [notificationPreferences, setNotificationPreferences] = useState<NotificationPreferences>({
    email: true,
    sms: false,
    push: true,
  });
  const [devices, setDevices] = useState<Device[]>([]);
  const [accessHistory, setAccessHistory] = useState<AccessHistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      setIsLoading(true);
      const [profile, devicesData, accessData] = await Promise.all([
        profileApi.getProfile(),
        profileApi.getDevices(),
        profileApi.getAccessHistory(),
      ]);

      setUserInfo(profile);
      setDevices(devicesData);
      setAccessHistory(accessData);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch profile data'));
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (profile: UserProfile) => {
    try {
      const updatedProfile = await profileApi.updateProfile(profile);
      setUserInfo(updatedProfile);
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to update profile');
    }
  };

  const updateNotifications = async (preferences: NotificationPreferences) => {
    try {
      const updatedPreferences = await profileApi.updateNotificationPreferences(preferences);
      setNotificationPreferences(updatedPreferences);
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to update notification preferences');
    }
  };

  const logoutDevice = async (deviceId: string) => {
    try {
      await profileApi.logoutDevice(deviceId);
      setDevices(devices.filter(device => device.id !== deviceId));
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to logout device');
    }
  };

  return {
    userInfo,
    notificationPreferences,
    devices,
    accessHistory,
    isLoading,
    error,
    updateProfile,
    updateNotifications,
    logoutDevice,
    refreshData: fetchProfileData,
  };
} 