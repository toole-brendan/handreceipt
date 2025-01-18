import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { User, Pencil } from 'lucide-react';
import { UserProfile } from '../types/settings.types';

interface UserSettingsProps {
  profile: UserProfile;
}

export const UserSettings: React.FC<UserSettingsProps> = ({ profile }) => {
  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
        <User className="h-5 w-5" />
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          User Profile
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Rank
          </Typography>
          <Typography>{profile.rank || 'Not set'}</Typography>
        </Box>

        <Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Full Name
          </Typography>
          <Typography>{profile.fullName || 'Not set'}</Typography>
        </Box>

        <Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Unit
          </Typography>
          <Typography>{profile.unit || 'Not set'}</Typography>
        </Box>

        <Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Duty Position
          </Typography>
          <Typography>{profile.dutyPosition || 'Not set'}</Typography>
        </Box>

        <Button
          startIcon={<Pencil className="h-4 w-4" />}
          variant="text"
          sx={{
            mt: 1,
            color: 'text.primary',
            justifyContent: 'flex-start',
            p: 0,
            '&:hover': {
              backgroundColor: 'transparent',
              color: 'primary.main'
            }
          }}
        >
          Edit Profile
        </Button>
      </Box>
    </Box>
  );
}; 