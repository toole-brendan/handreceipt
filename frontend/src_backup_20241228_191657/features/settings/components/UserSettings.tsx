import React from 'react';
import { User, Edit2 } from 'lucide-react';
import { UserProfile } from '../types/settings.types';

interface UserSettingsProps {
  profile: UserProfile;
}

export const UserSettings: React.FC<UserSettingsProps> = ({ profile }) => {
  return (
    <div className="settings-section">
      <h2 className="settings-section-title">
        <User className="icon" />
        User Profile
      </h2>
      <div className="settings-options">
        <div className="profile-info">
          <div className="profile-field">
            <label>Rank:</label>
            <span>{profile.rank}</span>
          </div>
          <div className="profile-field">
            <label>Full Name:</label>
            <span>{profile.fullName}</span>
          </div>
          <div className="profile-field">
            <label>Unit:</label>
            <span>{profile.unit}</span>
          </div>
          <div className="profile-field">
            <label>Duty Position:</label>
            <span>{profile.dutyPosition}</span>
          </div>
        </div>
        <button className="edit-profile-button">
          <Edit2 className="icon" />
          Edit Profile
        </button>
      </div>
    </div>
  );
}; 