import React from 'react';
import { QrCode } from 'lucide-react';
import { Box, TextField, InputAdornment } from '@mui/material';

interface SingleItemGeneratorProps {
  onSearch: (query: string) => void;
}

export const SingleItemGenerator: React.FC<SingleItemGeneratorProps> = ({ onSearch }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <TextField
        fullWidth
        placeholder="Search by serial number or item name"
        onChange={(e) => onSearch(e.target.value)}
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <QrCode size={24} strokeWidth={1.5} />
            </InputAdornment>
          ),
        }}
        sx={{
          bgcolor: 'rgba(0, 0, 0, 0.2)',
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.2)',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'primary.main',
            },
          },
        }}
      />
    </Box>
  );
}; 