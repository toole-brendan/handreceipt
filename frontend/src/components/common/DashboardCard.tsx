import React from 'react';
import { Paper, Box, Typography } from '@mui/material';

interface DashboardCardProps {
  title: string;
  children: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, children }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        bgcolor: '#121212',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: 1,
        p: 2,
        minWidth: 200,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        '&:hover': {
          borderColor: 'rgba(255, 255, 255, 0.2)',
        }
      }}
    >
      <Typography 
        variant="body2" 
        color="text.secondary"
        sx={{ mb: 1 }}
      >
        {title}
      </Typography>
      <Box>
        {children}
      </Box>
    </Paper>
  );
};

export default DashboardCard; 