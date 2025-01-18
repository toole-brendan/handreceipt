import React, { useState } from 'react';
import { UserProfile } from '@/types/user';

interface SecuritySettingsProps {
  profile: UserProfile;
}

const SecuritySettings: React.FC<SecuritySettingsProps> = ({ profile }) => {
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [showMfaSetup, setShowMfaSetup] = useState(false);

  const handleEnableMfa = async () => {
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

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Security Settings</h2>

      {/* Password Section */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium mb-4">Password</h3>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => {/* Handle password change */}}
        >
          Change Password
        </button>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium mb-4">Two-Factor Authentication</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600">
              Add an extra layer of security to your account
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {mfaEnabled ? 'MFA is enabled' : 'MFA is not enabled'}
            </p>
          </div>
          <button
            className={`px-4 py-2 rounded ${
              mfaEnabled
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
            onClick={handleEnableMfa}
          >
            {mfaEnabled ? 'Disable MFA' : 'Enable MFA'}
          </button>
        </div>
      </div>

      {/* Login History */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium mb-4">Recent Login Activity</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center py-2">
            <div>
              <p className="font-medium">Current Session</p>
              <p className="text-sm text-gray-600">Chrome on Windows</p>
            </div>
            <span className="text-green-600 text-sm">Active Now</span>
          </div>
          {/* Add more login history items here */}
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings; 