export interface UserProfile {
  rank: string;
  fullName: string;
  unit: string;
  dutyPosition: string;
}

export interface User {
  id: string;
  classification: string;
  permissions: string[];
  rank?: string;
  name?: string;
  unit?: string;
  dutyPosition?: string;
}

export interface SettingsState {
  darkMode: boolean;
  highContrast: boolean;
  fontSize: 'default' | 'large' | 'xlarge';
  emailNotifications: {
    transferRequests: boolean;
    sensitiveItems: boolean;
    maintenance: boolean;
  };
  pushNotifications: {
    urgentAlerts: boolean;
    propertyUpdates: boolean;
  };
  mobileSettings: {
    offlineMode: boolean;
    cameraAccess: boolean;
  };
}

export interface SettingsActions {
  toggleDarkMode: () => void;
  toggleHighContrast: () => void;
  setFontSize: (size: 'default' | 'large' | 'xlarge') => void;
  toggleEmailNotification: (key: keyof SettingsState['emailNotifications']) => void;
  togglePushNotification: (key: keyof SettingsState['pushNotifications']) => void;
  toggleMobileSetting: (key: keyof SettingsState['mobileSettings']) => void;
} 