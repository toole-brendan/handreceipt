import React, { createContext, useContext, useState, useEffect } from 'react';

interface Settings {
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

interface SettingsContextType extends Settings {
  toggleDarkMode: () => void;
  toggleHighContrast: () => void;
  setFontSize: (size: 'default' | 'large' | 'xlarge') => void;
  toggleEmailNotification: (key: keyof Settings['emailNotifications']) => void;
  togglePushNotification: (key: keyof Settings['pushNotifications']) => void;
  toggleMobileSetting: (key: keyof Settings['mobileSettings']) => void;
}

const defaultSettings: Settings = {
  darkMode: true,
  highContrast: false,
  fontSize: 'default',
  emailNotifications: {
    transferRequests: true,
    sensitiveItems: true,
    maintenance: false,
  },
  pushNotifications: {
    urgentAlerts: true,
    propertyUpdates: true,
  },
  mobileSettings: {
    offlineMode: true,
    cameraAccess: true,
  },
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

interface SettingsProviderProps {
  children: React.ReactNode;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  // Initialize state from localStorage or defaults
  const [settings, setSettings] = useState<Settings>(() => {
    try {
      const savedSettings = localStorage.getItem('appSettings');
      if (savedSettings) {
        const parsed = JSON.parse(savedSettings);
        // Validate parsed settings against default structure
        return {
          ...defaultSettings,
          ...parsed,
          emailNotifications: {
            ...defaultSettings.emailNotifications,
            ...(parsed.emailNotifications || {}),
          },
          pushNotifications: {
            ...defaultSettings.pushNotifications,
            ...(parsed.pushNotifications || {}),
          },
          mobileSettings: {
            ...defaultSettings.mobileSettings,
            ...(parsed.mobileSettings || {}),
          },
        };
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
    return defaultSettings;
  });

  // Save settings to localStorage when they change
  useEffect(() => {
    try {
      // Only save serializable parts of the settings
      const settingsToSave = {
        darkMode: settings.darkMode,
        highContrast: settings.highContrast,
        fontSize: settings.fontSize,
        emailNotifications: settings.emailNotifications,
        pushNotifications: settings.pushNotifications,
        mobileSettings: settings.mobileSettings,
      };
      localStorage.setItem('appSettings', JSON.stringify(settingsToSave));
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  }, [settings]);

  const toggleDarkMode = () => {
    setSettings((prev: Settings) => ({
      ...prev,
      darkMode: !prev.darkMode,
    }));
  };

  const toggleHighContrast = () => {
    setSettings((prev: Settings) => ({
      ...prev,
      highContrast: !prev.highContrast,
    }));
  };

  const setFontSize = (size: 'default' | 'large' | 'xlarge') => {
    setSettings((prev: Settings) => ({
      ...prev,
      fontSize: size,
    }));
  };

  const toggleEmailNotification = (key: keyof Settings['emailNotifications']) => {
    setSettings((prev: Settings) => ({
      ...prev,
      emailNotifications: {
        ...prev.emailNotifications,
        [key]: !prev.emailNotifications[key],
      },
    }));
  };

  const togglePushNotification = (key: keyof Settings['pushNotifications']) => {
    setSettings((prev: Settings) => ({
      ...prev,
      pushNotifications: {
        ...prev.pushNotifications,
        [key]: !prev.pushNotifications[key],
      },
    }));
  };

  const toggleMobileSetting = (key: keyof Settings['mobileSettings']) => {
    setSettings((prev: Settings) => ({
      ...prev,
      mobileSettings: {
        ...prev.mobileSettings,
        [key]: !prev.mobileSettings[key],
      },
    }));
  };

  const value: SettingsContextType = {
    ...settings,
    toggleDarkMode,
    toggleHighContrast,
    setFontSize,
    toggleEmailNotification,
    togglePushNotification,
    toggleMobileSetting,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
} 