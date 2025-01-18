import { useState } from 'react';

interface NotificationPreferences {
  email: boolean;
  push: boolean;
  sms: boolean;
}

export const useNotifications = () => {
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    email: true,
    push: true,
    sms: false,
  });

  const updatePreferences = async (newPreferences: Partial<NotificationPreferences>) => {
    try {
      const response = await fetch('/api/v1/user/notifications/preferences', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...preferences, ...newPreferences }),
      });
      
      const data = await response.json();
      if (data.success) {
        setPreferences(prev => ({ ...prev, ...newPreferences }));
      }
    } catch (error) {
      console.error('Error updating notification preferences:', error);
    }
  };

  return {
    preferences,
    updatePreferences,
  };
}; 