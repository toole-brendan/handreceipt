import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Paper
} from '@mui/material';
import type { RequestFormData, MaintenanceRequest } from '../../types/maintenance.types';

interface NewRequestFormProps {
  onSubmit: (data: RequestFormData) => void;
  onCancel: () => void;
}

export const NewRequestForm: React.FC<NewRequestFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = React.useState<RequestFormData>({
    itemId: '',
    requestType: 'repair',
    priority: 'medium',
    description: ''
  });

  const handleChange = (field: keyof RequestFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Paper 
      elevation={0}
      sx={{ 
        bgcolor: '#121212',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: 1,
        p: 3,
        maxWidth: 600,
        mx: 'auto',
        mt: 4
      }}
    >
      <Typography variant="h5" sx={{ mb: 3 }}>New Maintenance Request</Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Item ID/Serial Number"
            value={formData.itemId}
            onChange={(e) => handleChange('itemId', e.target.value)}
            required
            fullWidth
          />

          <FormControl fullWidth required>
            <InputLabel>Request Type</InputLabel>
            <Select
              value={formData.requestType}
              label="Request Type"
              onChange={(e) => handleChange('requestType', e.target.value)}
            >
              <MenuItem value="repair">Repair</MenuItem>
              <MenuItem value="inspection">Inspection</MenuItem>
              <MenuItem value="replacement">Replacement</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth required>
            <InputLabel>Priority</InputLabel>
            <Select
              value={formData.priority}
              label="Priority"
              onChange={(e) => handleChange('priority', e.target.value)}
            >
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
              <MenuItem value="critical">Critical</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Description"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            required
            multiline
            rows={4}
            fullWidth
          />

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
            <Button 
              variant="outlined" 
              onClick={onCancel}
              sx={{ minWidth: 100 }}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="contained"
              sx={{ minWidth: 100 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </form>
    </Paper>
  );
}; 