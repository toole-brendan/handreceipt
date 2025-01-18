import React from 'react';
import { Bell, Mail, Smartphone } from 'lucide-react';
import { SettingsState } from '../types/settings.types';

interface NotificationSettingsProps {
  emailNotifications: SettingsState['emailNotifications'];
  pushNotifications: SettingsState['pushNotifications'];
  mobileSettings: SettingsState['mobileSettings'];
  toggleEmailNotification: (key: keyof SettingsState['emailNotifications']) => void;
  togglePushNotification: (key: keyof SettingsState['pushNotifications']) => void;
  toggleMobileSetting: (key: keyof SettingsState['mobileSettings']) => void;
}

export const NotificationSettings: React.FC<NotificationSettingsProps> = ({
  emailNotifications,
  pushNotifications,
  mobileSettings,
  toggleEmailNotification,
  togglePushNotification,
  toggleMobileSetting,
}) => {
  return (
    <div className="settings-section">
      <h2 className="settings-section-title">
        <Bell className="icon" />
        Notification Preferences
      </h2>
      <div className="settings-options">
        <div className="setting-group">
          <h3><Mail className="icon" /> Email Notifications</h3>
          {Object.entries(emailNotifications).map(([key, value]) => (
            <div key={key} className="setting-item">
              <label className="setting-label">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => toggleEmailNotification(key as keyof SettingsState['emailNotifications'])}
                />
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </label>
            </div>
          ))}
        </div>
        
        <div className="setting-group">
          <h3><Bell className="icon" /> Push Notifications</h3>
          {Object.entries(pushNotifications).map(([key, value]) => (
            <div key={key} className="setting-item">
              <label className="setting-label">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => togglePushNotification(key as keyof SettingsState['pushNotifications'])}
                />
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </label>
            </div>
          ))}
        </div>

        <div className="setting-group">
          <h3><Smartphone className="icon" /> Mobile Settings</h3>
          {Object.entries(mobileSettings).map(([key, value]) => (
            <div key={key} className="setting-item">
              <label className="setting-label">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => toggleMobileSetting(key as keyof SettingsState['mobileSettings'])}
                />
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 