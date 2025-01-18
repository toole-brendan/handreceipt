import React from 'react';
import { Box, Typography } from '@mui/material';
import { Settings } from '@/features/settings/components/Settings';

const SettingsPage: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 500 }}>
        Settings
      </Typography>
      <Settings />
    </Box>
  );
};

export default SettingsPage;
