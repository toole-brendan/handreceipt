import React from 'react';
import { Box, Typography, Switch, FormControlLabel } from '@mui/material';
import { Bell, Mail } from 'lucide-react';

interface NotificationSettingsProps {
  emailNotifications: {
    transferRequests: boolean;
    sensitiveItems: boolean;
    maintenance: boolean;
  };
  pushNotifications: {
    enabled: boolean;
  };
  mobileSettings: {
    enabled: boolean;
  };
  toggleEmailNotification: (type: string) => void;
  togglePushNotification: () => void;
  toggleMobileSetting: () => void;
}

export const NotificationSettings: React.FC<NotificationSettingsProps> = ({
  emailNotifications,
  pushNotifications,
  mobileSettings,
  toggleEmailNotification,
  togglePushNotification,
  toggleMobileSetting
}) => {
  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
        <Bell className="h-5 w-5" />
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Notification Preferences
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Mail className="h-4 w-4" />
            <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
              Email Notifications
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, ml: 1 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={emailNotifications.transferRequests}
                  onChange={() => toggleEmailNotification('transferRequests')}
                  sx={{
                    '& .MuiSwitch-track': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)'
                    }
                  }}
                />
              }
              label="Transfer Requests"
              sx={{
                '& .MuiFormControlLabel-label': {
                  color: 'text.primary'
                }
              }}
            />

            <FormControlLabel
              control={
                <Switch
                  checked={emailNotifications.sensitiveItems}
                  onChange={() => toggleEmailNotification('sensitiveItems')}
                  sx={{
                    '& .MuiSwitch-track': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)'
                    }
                  }}
                />
              }
              label="Sensitive Items"
              sx={{
                '& .MuiFormControlLabel-label': {
                  color: 'text.primary'
                }
              }}
            />

            <FormControlLabel
              control={
                <Switch
                  checked={emailNotifications.maintenance}
                  onChange={() => toggleEmailNotification('maintenance')}
                  sx={{
                    '& .MuiSwitch-track': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)'
                    }
                  }}
                />
              }
              label="Maintenance"
              sx={{
                '& .MuiFormControlLabel-label': {
                  color: 'text.primary'
                }
              }}
            />
          </Box>
        </Box>

        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Bell className="h-4 w-4" />
            <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
              Push Notifications
            </Typography>
          </Box>

          <FormControlLabel
            control={
              <Switch
                checked={pushNotifications.enabled}
                onChange={togglePushNotification}
                sx={{
                  '& .MuiSwitch-track': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              />
            }
            label="Enable Push Notifications"
            sx={{
              ml: 1,
              '& .MuiFormControlLabel-label': {
                color: 'text.primary'
              }
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}; 