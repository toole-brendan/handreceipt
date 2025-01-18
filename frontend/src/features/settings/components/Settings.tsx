import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Grid, Paper } from '@mui/material';
import { RootState } from '@/store/store';
import { useSettings } from '@/contexts/SettingsContext';
import { UserSettings } from './UserSettings';
import { AppearanceSettings } from './AppearanceSettings';
import { NotificationSettings } from './NotificationSettings';
import { DataManagement } from './DataManagement';
import { UserProfile, User } from '../types/settings.types';

export const Settings: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const settings = useSettings();

  const userProfile: UserProfile = {
    rank: (user as User)?.rank || '',
    fullName: (user as User)?.name || '',
    unit: (user as User)?.unit || '',
    dutyPosition: (user as User)?.dutyPosition || ''
  };

  const {
    darkMode,
    highContrast,
    fontSize,
    toggleDarkMode,
    toggleHighContrast,
    setFontSize,
    emailNotifications,
    pushNotifications,
    mobileSettings,
    toggleEmailNotification,
    togglePushNotification,
    toggleMobileSetting
  } = settings;

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ 
            p: 3, 
            bgcolor: 'rgba(0, 0, 0, 0.2)', 
            backgroundImage: 'none',
            boxShadow: 'none',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <UserSettings profile={userProfile} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ 
            p: 3, 
            bgcolor: 'rgba(0, 0, 0, 0.2)', 
            backgroundImage: 'none',
            boxShadow: 'none',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <AppearanceSettings
              darkMode={darkMode}
              highContrast={highContrast}
              fontSize={fontSize}
              toggleDarkMode={toggleDarkMode}
              toggleHighContrast={toggleHighContrast}
              setFontSize={setFontSize}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ 
            p: 3, 
            bgcolor: 'rgba(0, 0, 0, 0.2)', 
            backgroundImage: 'none',
            boxShadow: 'none',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <NotificationSettings
              emailNotifications={emailNotifications}
              pushNotifications={pushNotifications}
              mobileSettings={mobileSettings}
              toggleEmailNotification={toggleEmailNotification}
              togglePushNotification={togglePushNotification}
              toggleMobileSetting={toggleMobileSetting}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ 
            p: 3, 
            bgcolor: 'rgba(0, 0, 0, 0.2)', 
            backgroundImage: 'none',
            boxShadow: 'none',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <DataManagement />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}; 