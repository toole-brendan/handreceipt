interface SecuritySettings {
  mfaEnabled: boolean;
  passwordLastChanged?: Date;
}

export const updateSecuritySettings = async (settings: Partial<SecuritySettings>): Promise<void> => {
  const response = await fetch('/api/v1/user/security', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(settings),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update security settings');
  }
}; 