interface NotificationPreferences {
  email: boolean;
  push: boolean;
  sms: boolean;
}

export const updateNotificationPreferences = async (
  preferences: Partial<NotificationPreferences>
): Promise<void> => {
  const response = await fetch('/api/v1/user/notifications/preferences', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(preferences),
  });

  if (!response.ok) {
    throw new Error('Failed to update notification preferences');
  }
};

export const getNotificationPreferences = async (): Promise<NotificationPreferences> => {
  const response = await fetch('/api/v1/user/notifications/preferences');
  
  if (!response.ok) {
    throw new Error('Failed to fetch notification preferences');
  }
  
  return response.json();
}; 