import React, { useState } from 'react';
import { useSettings } from '@/contexts/SettingsContext';
import SecuritySettings from '@/ui/components/profile/SecuritySettings';
import '@/ui/styles/pages/settings.css';

const Settings: React.FC = () => {
  const { preferences, updatePreferences } = useSettings();
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'General Settings', icon: 'settings' },
    { id: 'notifications', label: 'Notifications', icon: 'notifications' },
    { id: 'security', label: 'Security', icon: 'security' },
    { id: 'appearance', label: 'Appearance', icon: 'palette' }
  ];

  const handleNotificationToggle = async (key: string) => {
    try {
      await updatePreferences({
        notifications: {
          ...preferences.notifications,
          [key]: !preferences.notifications[key as keyof typeof preferences.notifications]
        }
      });
    } catch (error) {
      console.error('Error updating notification settings:', error);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="settings-section">
            <h3 className="settings-section-title">General Preferences</h3>
            <div className="settings-form">
              <div className="form-group">
                <label>Language</label>
                <select 
                  value={preferences.language}
                  onChange={(e) => updatePreferences({ language: e.target.value })}
                  className="settings-select"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                </select>
              </div>
              <div className="form-group">
                <label>Time Zone</label>
                <select 
                  value={preferences.timezone}
                  onChange={(e) => updatePreferences({ timezone: e.target.value })}
                  className="settings-select"
                >
                  <option value="America/New_York">Eastern Time</option>
                  <option value="America/Chicago">Central Time</option>
                  <option value="America/Denver">Mountain Time</option>
                  <option value="America/Los_Angeles">Pacific Time</option>
                  <option value="Pacific/Honolulu">Hawaii Time</option>
                </select>
              </div>
              <div className="form-group">
                <label>Date Format</label>
                <select 
                  value={preferences.dateFormat}
                  onChange={(e) => updatePreferences({ dateFormat: e.target.value })}
                  className="settings-select"
                >
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="settings-section">
            <h3 className="settings-section-title">Notification Preferences</h3>
            <div className="settings-toggles">
              <div className="toggle-group">
                <label className="toggle-label">
                  <span>Email Notifications</span>
                  <input
                    type="checkbox"
                    checked={preferences.notifications.email}
                    onChange={() => handleNotificationToggle('email')}
                    className="toggle-input"
                  />
                  <span className="toggle-slider"></span>
                </label>
                <p className="toggle-description">Receive important updates via email</p>
              </div>

              <div className="toggle-group">
                <label className="toggle-label">
                  <span>Transfer Requests</span>
                  <input
                    type="checkbox"
                    checked={preferences.notifications.transferRequests}
                    onChange={() => handleNotificationToggle('transferRequests')}
                    className="toggle-input"
                  />
                  <span className="toggle-slider"></span>
                </label>
                <p className="toggle-description">Get notified about new transfer requests</p>
              </div>

              <div className="toggle-group">
                <label className="toggle-label">
                  <span>Security Alerts</span>
                  <input
                    type="checkbox"
                    checked={preferences.notifications.securityAlerts}
                    onChange={() => handleNotificationToggle('securityAlerts')}
                    className="toggle-input"
                  />
                  <span className="toggle-slider"></span>
                </label>
                <p className="toggle-description">Receive alerts about security-related events</p>
              </div>

              <div className="toggle-group">
                <label className="toggle-label">
                  <span>System Updates</span>
                  <input
                    type="checkbox"
                    checked={preferences.notifications.systemUpdates}
                    onChange={() => handleNotificationToggle('systemUpdates')}
                    className="toggle-input"
                  />
                  <span className="toggle-slider"></span>
                </label>
                <p className="toggle-description">Get notified about system maintenance and updates</p>
              </div>
            </div>
          </div>
        );

      case 'security':
        return <SecuritySettings profile={null} />;

      case 'appearance':
        return (
          <div className="settings-section">
            <h3 className="settings-section-title">Appearance Settings</h3>
            <div className="settings-form">
              <div className="form-group">
                <label>Theme</label>
                <select 
                  value={preferences.theme}
                  onChange={(e) => updatePreferences({ theme: e.target.value })}
                  className="settings-select"
                >
                  <option value="system">System Default</option>
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1>Settings</h1>
        <p className="settings-description">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="settings-content">
        <div className="settings-sidebar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`settings-tab ${activeTab === tab.id ? 'active' : ''}`}
            >
              <i className="material-icons">{tab.icon}</i>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="settings-main">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Settings; 