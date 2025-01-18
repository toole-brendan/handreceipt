/* ThemeSwitcher.tsx */

import React from 'react';
import { Box, Typography } from '@mui/material';
import { useThemeContext } from '../../contexts/ThemeContext';

export const ThemeSwitcher: React.FC = () => {
  const { isDark } = useThemeContext();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        padding: '8px 16px',
        border: '1px solid',
        borderColor: 'rgba(255, 255, 255, 0.12)',
        bgcolor: '#000000',
      }}
    >
      <Typography
        variant="caption"
        sx={{
          textTransform: 'uppercase',
          letterSpacing: 'var(--letter-spacing-military)',
          color: '#FFFFFF',
          opacity: 0.7,
        }}
      >
        MILITARY GRADE
      </Typography>
    </Box>
  );
};
