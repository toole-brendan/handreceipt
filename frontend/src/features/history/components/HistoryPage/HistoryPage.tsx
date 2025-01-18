import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Download } from 'lucide-react';
import { HistoricalPropertyList } from '../HistoricalTable/TableHeader';
import { ExportButton } from '../ExportTools/ExportButton';
import { useHistoricalProperty } from '../../hooks/useHistoricalData';

export const HistoryPage: React.FC = () => {
  const { history, loading, error } = useHistoricalProperty();

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log('Exporting history...');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 500 }}>
        Property History
      </Typography>

      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'flex-end',
        mb: 3
      }}>
        <Button
          variant="outlined"
          startIcon={<Download />}
          onClick={handleExport}
          disabled={loading || !!error}
          sx={{
            borderColor: 'rgba(255, 255, 255, 0.1)',
            color: 'text.primary',
            '&:hover': {
              borderColor: 'rgba(255, 255, 255, 0.2)',
              backgroundColor: 'rgba(255, 255, 255, 0.05)'
            }
          }}
        >
          Export Records
        </Button>
      </Box>
      
      <HistoricalPropertyList 
        history={history}
        loading={loading}
        error={error}
      />
    </Box>
  );
}; 