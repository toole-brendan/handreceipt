import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Database, Download, Trash2 } from 'lucide-react';

export const DataManagement: React.FC = () => {
  const handleExportData = () => {
    // TODO: Implement data export
    console.log('Exporting data...');
  };

  const handleDeleteData = () => {
    // TODO: Implement data deletion with confirmation
    console.log('Deleting data...');
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
        <Database className="h-5 w-5" />
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Data Management
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Download className="h-4 w-4" />
            <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
              Export Data
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Download a copy of all your data in JSON format
          </Typography>
          <Button
            variant="outlined"
            onClick={handleExportData}
            sx={{
              borderColor: 'rgba(255, 255, 255, 0.1)',
              color: 'text.primary',
              '&:hover': {
                borderColor: 'rgba(255, 255, 255, 0.2)',
                backgroundColor: 'rgba(255, 255, 255, 0.05)'
              }
            }}
          >
            Export All Data
          </Button>
        </Box>

        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Trash2 className="h-4 w-4" />
            <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
              Delete All Data
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Permanently delete all your data and settings
          </Typography>
          <Button
            variant="outlined"
            color="error"
            onClick={handleDeleteData}
            sx={{
              borderColor: 'error.main',
              color: 'error.main',
              '&:hover': {
                borderColor: 'error.dark',
                backgroundColor: 'error.dark',
                color: 'common.white'
              }
            }}
          >
            Delete All Data
          </Button>
        </Box>
      </Box>
    </Box>
  );
}; 