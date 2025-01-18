import React from 'react';
import { Box, Typography, styled } from '@mui/material';
import { CheckCircle, Warning, Error } from '@mui/icons-material';

interface StatusIndicatorProps {
  status: 'serviceable' | 'limited' | 'unserviceable';
  label?: string;
}

const StatusWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(1),
  borderRadius: 0,
  border: '1px solid rgba(255, 255, 255, 0.2)',
}));

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status, label }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'serviceable':
        return '#4CAF50';
      case 'limited':
        return '#FFC107';
      case 'unserviceable':
        return '#FF3B3B';
      default:
        return '#757575';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'serviceable':
        return <CheckCircle sx={{ color: getStatusColor() }} />;
      case 'limited':
        return <Warning sx={{ color: getStatusColor() }} />;
      case 'unserviceable':
        return <Error sx={{ color: getStatusColor() }} />;
      default:
        return null;
    }
  };

  return (
    <StatusWrapper>
      {getStatusIcon()}
      <Typography
        variant="body2"
        sx={{
          color: getStatusColor(),
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          fontWeight: 500,
        }}
      >
        {label || status}
      </Typography>
    </StatusWrapper>
  );
};

export default StatusIndicator; 