import React, { useState, useEffect } from 'react';
import { UserProfile } from '@/types/user';
import ProfileHeader from '@/ui/components/profile/ProfileHeader';
import ProfileDetails from '@/ui/components/profile/ProfileDetails';
import ActivityLog from '@/ui/components/profile/ActivityLog';
import SecuritySettings from '@/ui/components/profile/SecuritySettings';
import '@/ui/styles/pages/profile.css';

// Mock data with better organization
const mockProfile: UserProfile = {
  // Personal Information
  id: 'usr_7f4c9b2d',
  username: 'CPT.ANDERSON.JAMES.A',
  email: 'james.anderson@mail.mil',
  profileImage: '/assets/profile/default-officer.png',
  phoneNumber: '(910) 555-0122',
  
  // Military Information
  rank: 'Captain',
  unit: '2nd Battalion, 325th Airborne Infantry Regiment',
  role: 'Company Commander',
  classification: 'SECRET',
  
  // System Access & Permissions
  permissions: [
    'ASSET_MANAGEMENT',    // Can manage all assets
    'PERSONNEL_VIEW',      // Can view personnel records
    'TRANSFER_APPROVE',    // Can approve asset transfers
    'INVENTORY_FULL',      // Full inventory access
    'REPORTS_GENERATE'     // Can generate reports
  ],
  
  // Account Details
  lastLogin: new Date('2024-03-26T08:15:00Z').toISOString(),
  
  // User Preferences
  preferences: {
    // Display Settings
    theme: 'system',
    language: 'en-US',
    timezone: 'America/New_York',
    dateFormat: 'DD MMM YYYY',
    
    // Notification Preferences
    notifications: {
      email: true,           // Email notifications
      push: true,            // Push notifications
      transferRequests: true, // Transfer request alerts
      securityAlerts: true,  // Security-related alerts
      systemUpdates: true,   // System update notifications
      assetChanges: true,    // Asset modification alerts
    },
  },
};

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('details');

  // Tabs configuration
  const tabs = [
    { id: 'details', label: 'Profile Details' },
    { id: 'security', label: 'Security' },
    { id: 'activity', label: 'Activity Log' }
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Simulate API call with mock data
        setTimeout(() => {
          setProfile(mockProfile);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-gray-600">Loading profile...</div>
      </div>
    );
  }

  // Error state
  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-600">Error loading profile</div>
      </div>
    );
  }

  // Render the appropriate component based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'details':
        return <ProfileDetails profile={profile} onUpdate={() => {}} />;
      case 'security':
        return <SecuritySettings profile={profile} />;
      case 'activity':
        return <ActivityLog userId={profile.id} />;
      default:
        return null;
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-content">
        <div className="profile-header">
          <div className="profile-avatar">
            <img 
              src={profile?.profileImage || '/default-avatar.png'} 
              alt="Profile" 
            />
          </div>
          <div className="profile-info">
            <h1 className="profile-name">{profile?.username}</h1>
            <p className="profile-role">
              {profile?.rank} - {profile?.unit}
            </p>
            <p className="profile-role secondary">{profile?.role}</p>
            <span className="profile-classification">
              {profile?.classification}
            </span>
          </div>
        </div>

        <div className="profile-tabs">
          <div className="profile-tab-list">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`profile-tab ${activeTab === tab.id ? 'active' : ''}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="profile-tab-content">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;