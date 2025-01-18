import React, { createContext, useContext, useState, useEffect } from 'react';

interface SettingsContextType {
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
  toggleDarkMode: () => void;
  toggleHighContrast: () => void;
  setFontSize: (size: 'default' | 'large' | 'xlarge') => void;
  toggleEmailNotification: (key: keyof SettingsContextType['emailNotifications']) => void;
  togglePushNotification: (key: keyof SettingsContextType['pushNotifications']) => void;
  toggleMobileSetting: (key: keyof SettingsContextType['mobileSettings']) => void;
}

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
  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem('appSettings');
    if (savedSettings) {
      return JSON.parse(savedSettings);
    }
    return {
      darkMode: true,
      highContrast: false,
      fontSize: 'default' as const,
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
  });

  // Save settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem('appSettings', JSON.stringify(settings));
  }, [settings]);

  const toggleDarkMode = () => {
    setSettings(prev => ({
      ...prev,
      darkMode: !prev.darkMode,
    }));
  };

  const toggleHighContrast = () => {
    setSettings(prev => ({
      ...prev,
      highContrast: !prev.highContrast,
    }));
  };

  const setFontSize = (size: 'default' | 'large' | 'xlarge') => {
    setSettings(prev => ({
      ...prev,
      fontSize: size,
    }));
  };

  const toggleEmailNotification = (key: keyof SettingsContextType['emailNotifications']) => {
    setSettings(prev => ({
      ...prev,
      emailNotifications: {
        ...prev.emailNotifications,
        [key]: !prev.emailNotifications[key],
      },
    }));
  };

  const togglePushNotification = (key: keyof SettingsContextType['pushNotifications']) => {
    setSettings(prev => ({
      ...prev,
      pushNotifications: {
        ...prev.pushNotifications,
        [key]: !prev.pushNotifications[key],
      },
    }));
  };

  const toggleMobileSetting = (key: keyof SettingsContextType['mobileSettings']) => {
    setSettings(prev => ({
      ...prev,
      mobileSettings: {
        ...prev.mobileSettings,
        [key]: !prev.mobileSettings[key],
      },
    }));
  };

  const value = {
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
}; 