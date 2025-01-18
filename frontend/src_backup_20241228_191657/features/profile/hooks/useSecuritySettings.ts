import { useState } from 'react';

export const useSecuritySettings = () => {
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [showMfaSetup, setShowMfaSetup] = useState(false);

  const enableMfa = async () => {
    try {
      const response = await fetch('/api/v1/user/mfa/enable', {
        method: 'POST',
      });
      const data = await response.json();
      if (data.success) {
        setMfaEnabled(true);
        setShowMfaSetup(true);
      }
    } catch (error) {
      console.error('Error enabling MFA:', error);
    }
  };

  const disableMfa = async () => {
    try {
      const response = await fetch('/api/v1/user/mfa/disable', {
        method: 'POST',
      });
      const data = await response.json();
      if (data.success) {
        setMfaEnabled(false);
        setShowMfaSetup(false);
      }
    } catch (error) {
      console.error('Error disabling MFA:', error);
    }
  };

  return {
    mfaEnabled,
    showMfaSetup,
    enableMfa,
    disableMfa,
  };
}; 