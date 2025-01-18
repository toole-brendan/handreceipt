import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { StatusIndicator } from '../shared/StatusIndicator';
import { usePropertyStatus } from '../../hooks/usePropertyStatus';

export const PropertyStatus: React.FC = () => {
  const { loading, error, ...status } = usePropertyStatus();

  if (loading) return <div>Loading status...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Box className="property-status">
      <Typography variant="h6" gutterBottom>
        Property Status
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <StatusIndicator 
            status="serviceable"
            label="Operational Status"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatusIndicator 
            status="limited"
            label="Maintenance Status"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatusIndicator 
            status="serviceable"
            label="Inventory Status"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PropertyStatus;
