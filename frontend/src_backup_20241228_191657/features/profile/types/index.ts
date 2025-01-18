export interface UserProfile {
  name: string;
  email: string;
  phone: string;
}

export interface NotificationPreferences {
  email: boolean;
  sms: boolean;
  push: boolean;
}

export interface Device {
  id: string;
  name: string;
  lastActive: string;
}

export interface AccessHistoryEntry {
  date: string;
  device: string;
  location: string;
  ip: string;
}

export interface ProfileState {
  userInfo: UserProfile;
  notificationPreferences: NotificationPreferences;
  devices: Device[];
  accessHistory: AccessHistoryEntry[];
} 