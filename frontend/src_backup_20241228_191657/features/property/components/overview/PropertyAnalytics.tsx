import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { MetricsCard } from './PropertyMetrics';
import { usePropertyAnalytics } from '../../hooks/usePropertyAnalytics';

export const PropertyAnalytics: React.FC = () => {
  const analytics = usePropertyAnalytics();

  return (
    <Box className="property-analytics">
      <Typography variant="h6" gutterBottom>
        Property Analytics
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <MetricsCard 
            title="Utilization Rate"
            value="87%"
            change={2.5}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <MetricsCard 
            title="Maintenance Rate"
            value="5%"
            change={-1.2}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <MetricsCard 
            title="Transfer Rate"
            value="12%"
            change={0.8}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PropertyAnalytics; 