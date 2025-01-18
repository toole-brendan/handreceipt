import React from 'react';
import { UserProfile } from '@/types/user';

interface DeviceListProps {
  profile: UserProfile;
}

const DeviceList: React.FC<DeviceListProps> = ({ profile }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Connected Devices</h2>
      
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium mb-4">Current Devices</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center py-2">
            <div>
              <p className="font-medium">Current Session</p>
              <p className="text-sm text-gray-600">Chrome on Windows</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-600 text-sm">Active Now</span>
              <button className="text-red-600 hover:text-red-700 text-sm">
                Revoke Access
              </button>
            </div>
          </div>
          {/* Device list will be populated from API */}
        </div>
      </div>
    </div>
  );
};

export default DeviceList; 