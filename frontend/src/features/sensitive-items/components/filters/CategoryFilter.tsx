import React from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

interface CategoryFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ value, onChange }) => {
  return (
    <FormControl variant="outlined" size="small" sx={{ minWidth: 200 }}>
      <InputLabel>Category</InputLabel>
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        label="Category"
      >
        <MenuItem value="">All Categories</MenuItem>
        <MenuItem value="weapons">Weapons</MenuItem>
        <MenuItem value="optics">Optics</MenuItem>
        <MenuItem value="electronics">Electronics</MenuItem>
        <MenuItem value="other">Other</MenuItem>
      </Select>
    </FormControl>
  );
};
