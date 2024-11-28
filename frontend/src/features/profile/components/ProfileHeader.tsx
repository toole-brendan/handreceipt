import React from 'react';
import { UserProfile } from '@/types/user';

interface ProfileHeaderProps {
  profile: UserProfile;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profile }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center space-x-6">
        <div className="relative">
          <img
            src={profile.profileImage || '/default-avatar.png'}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
          <button className="absolute bottom-0 right-0 bg-gray-100 p-1 rounded-full border">
            <i className="material-icons text-sm">edit</i>
          </button>
        </div>
        
        <div>
          <h1 className="text-2xl font-semibold">{profile.username}</h1>
          <div className="text-gray-600">
            <p>{profile.rank} - {profile.unit}</p>
            <p>{profile.role}</p>
          </div>
          <div className="mt-2 flex items-center space-x-2">
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
              {profile.classification}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader; 