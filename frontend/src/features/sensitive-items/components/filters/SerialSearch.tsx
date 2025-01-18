import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { Search } from 'lucide-react';

interface SerialSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export const SerialSearch: React.FC<SerialSearchProps> = ({ value, onChange }) => {
  return (
    <TextField
      size="small"
      placeholder="Search by serial number..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search className="h-4 w-4" />
          </InputAdornment>
        ),
        sx: {
          bgcolor: 'rgba(255, 255, 255, 0.05)',
          '&:hover': {
            bgcolor: 'rgba(255, 255, 255, 0.08)',
          },
          '& fieldset': {
            border: '1px solid rgba(255, 255, 255, 0.1)',
          },
          '&:hover fieldset': {
            borderColor: 'rgba(255, 255, 255, 0.2) !important',
          },
        }
      }}
      sx={{ minWidth: 300 }}
    />
  );
};
