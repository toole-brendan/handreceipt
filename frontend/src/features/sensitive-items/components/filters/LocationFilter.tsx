import React from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

interface LocationFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export const LocationFilter: React.FC<LocationFilterProps> = ({ value, onChange }) => {
  return (
    <FormControl variant="outlined" size="small" sx={{ minWidth: 200 }}>
      <InputLabel>Location</InputLabel>
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        label="Location"
      >
        <MenuItem value="">All Locations</MenuItem>
        <MenuItem value="armory-a">Armory A</MenuItem>
        <MenuItem value="armory-b">Armory B</MenuItem>
        <MenuItem value="vault">Secure Vault</MenuItem>
        <MenuItem value="storage">Storage Room</MenuItem>
      </Select>
    </FormControl>
  );
};

export default LocationFilter; 