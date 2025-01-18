import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useSettings } from '@/contexts/SettingsContext';
import { UserSettings } from './UserSettings';
import { AppearanceSettings } from './AppearanceSettings';
import { NotificationSettings } from './NotificationSettings';
import { DataManagement } from './DataManagement';
import { UserProfile, User } from '../types/settings.types';

export const Settings: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const settings = useSettings();

  const userProfile: UserProfile = {
    rank: (user as User)?.rank || '',
    fullName: (user as User)?.name || '',
    unit: (user as User)?.unit || '',
    dutyPosition: (user as User)?.dutyPosition || ''
  };

  const {
    darkMode,
    highContrast,
    fontSize,
    toggleDarkMode,
    toggleHighContrast,
    setFontSize,
    emailNotifications,
    pushNotifications,
    mobileSettings,
    toggleEmailNotification,
    togglePushNotification,
    toggleMobileSetting
  } = settings;

  return (
    <div className="settings-container">
      <h1 className="settings-title">Settings</h1>
      <div className="settings-grid">
        <UserSettings profile={userProfile} />
        <AppearanceSettings
          darkMode={darkMode}
          highContrast={highContrast}
          fontSize={fontSize}
          toggleDarkMode={toggleDarkMode}
          toggleHighContrast={toggleHighContrast}
          setFontSize={setFontSize}
        />
        <NotificationSettings
          emailNotifications={emailNotifications}
          pushNotifications={pushNotifications}
          mobileSettings={mobileSettings}
          toggleEmailNotification={toggleEmailNotification}
          togglePushNotification={togglePushNotification}
          toggleMobileSetting={toggleMobileSetting}
        />
        <DataManagement />
      </div>
    </div>
  );
}; 