import React, { useState } from 'react';
import { UserProfile, UserSettingsUpdate } from '@/types/user';

interface ProfileDetailsProps {
  profile: UserProfile;
  onUpdate: () => void;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ profile, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: profile.email,
    phoneNumber: profile.phoneNumber || '',
    timezone: profile.preferences.timezone,
    dateFormat: profile.preferences.dateFormat,
    language: profile.preferences.language,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/v1/user/settings', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setEditing(false);
        onUpdate();
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="profile-details-container">
      <div className="profile-details-header">
        <h2 className="profile-details-title">Profile Details</h2>
        <button
          onClick={() => setEditing(!editing)}
          className="edit-button"
        >
          <i className="material-icons">{editing ? 'close' : 'edit'}</i>
          {editing ? 'Cancel' : 'Edit'}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="profile-details-form">
        <div className="details-grid">
          {/* Military Information */}
          <div className="details-section">
            <h3 className="section-title">Military Information</h3>
            <div className="details-row">
              <div className="detail-item">
                <label>Rank</label>
                <p>{profile.rank}</p>
              </div>
              <div className="detail-item">
                <label>Unit</label>
                <p>{profile.unit}</p>
              </div>
            </div>
            <div className="details-row">
              <div className="detail-item">
                <label>Role</label>
                <p>{profile.role}</p>
              </div>
              <div className="detail-item">
                <label>Classification</label>
                <span className="classification-badge">{profile.classification}</span>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="details-section">
            <h3 className="section-title">Contact Information</h3>
            <div className="details-row">
              <div className="detail-item">
                <label>Email</label>
                {editing ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="detail-input"
                  />
                ) : (
                  <p>{profile.email}</p>
                )}
              </div>
              <div className="detail-item">
                <label>Phone Number</label>
                {editing ? (
                  <input
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                    className="detail-input"
                  />
                ) : (
                  <p>{profile.phoneNumber || 'Not set'}</p>
                )}
              </div>
            </div>
          </div>

          {/* System Information */}
          <div className="details-section">
            <h3 className="section-title">System Information</h3>
            <div className="details-row">
              <div className="detail-item">
                <label>Last Login</label>
                <p>{new Date(profile.lastLogin).toLocaleString()}</p>
              </div>
              <div className="detail-item">
                <label>Account Status</label>
                <span className="status-badge active">Active</span>
              </div>
            </div>
          </div>
        </div>

        {editing && (
          <div className="form-actions">
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="cancel-button"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="save-button"
            >
              Save Changes
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ProfileDetails; 