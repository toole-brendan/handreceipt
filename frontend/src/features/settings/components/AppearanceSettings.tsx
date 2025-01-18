import React from 'react';
import { Box, Typography, Switch, FormControlLabel, Select, MenuItem } from '@mui/material';
import { Eye } from 'lucide-react';

interface AppearanceSettingsProps {
  darkMode: boolean;
  highContrast: boolean;
  fontSize: string;
  toggleDarkMode: () => void;
  toggleHighContrast: () => void;
  setFontSize: (size: string) => void;
}

export const AppearanceSettings: React.FC<AppearanceSettingsProps> = ({
  darkMode,
  highContrast,
  fontSize,
  toggleDarkMode,
  toggleHighContrast,
  setFontSize
}) => {
  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
        <Eye className="h-5 w-5" />
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Display Settings
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <FormControlLabel
          control={
            <Switch
              checked={darkMode}
              onChange={toggleDarkMode}
              sx={{
                '& .MuiSwitch-track': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            />
          }
          label="Dark Mode"
          sx={{
            '& .MuiFormControlLabel-label': {
              color: 'text.primary'
            }
          }}
        />

        <FormControlLabel
          control={
            <Switch
              checked={highContrast}
              onChange={toggleHighContrast}
              sx={{
                '& .MuiSwitch-track': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            />
          }
          label="High Contrast"
          sx={{
            '& .MuiFormControlLabel-label': {
              color: 'text.primary'
            }
          }}
        />

        <Box sx={{ mt: 2 }}>
          <Typography variant="body1" gutterBottom>
            Font Size
          </Typography>
          <Select
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
            fullWidth
            size="small"
            sx={{
              bgcolor: 'rgba(0, 0, 0, 0.2)',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255, 255, 255, 0.1)'
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255, 255, 255, 0.2)'
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.main'
              }
            }}
          >
            <MenuItem value="small">Small</MenuItem>
            <MenuItem value="default">Default</MenuItem>
            <MenuItem value="large">Large</MenuItem>
          </Select>
        </Box>
      </Box>
    </Box>
  );
}; 