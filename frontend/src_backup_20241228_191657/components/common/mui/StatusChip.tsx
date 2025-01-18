import React from 'react';
import { Chip, ChipProps, styled } from '@mui/material';
import { CustomTheme } from '../../../styles/theme';

export type StatusType = 'verified' | 'pending' | 'sensitive' | 'inactive';

export interface StatusChipProps extends Omit<ChipProps, 'color'> {
  status: StatusType;
  pulseAnimation?: boolean;
}

const getStatusColor = (status: StatusType): string => {
  switch (status) {
    case 'verified':
      return '#4CAF50';  // Success green
    case 'pending':
      return '#FFD700';  // Warning amber
    case 'sensitive':
      return '#FF3B3B';  // Error red
    case 'inactive':
    default:
      return 'rgba(255, 255, 255, 0.7)';  // Neutral
  }
};

const StyledChip = styled(Chip, {
  shouldForwardProp: (prop) => !['status', 'pulseAnimation'].includes(prop as string),
})<StatusChipProps>(({ theme, status, pulseAnimation }) => {
  const statusColor = getStatusColor(status);
  
  return {
    backgroundColor: '#000000',
    color: statusColor,
    borderRadius: '4px',
    border: `1px solid ${statusColor}`,
    height: '24px',
    
    '& .MuiChip-label': {
      padding: '0 12px',
      fontSize: '0.75rem',
      fontWeight: 500,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
    },
    
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
    },
    
    // Pulse animation for critical statuses
    ...(pulseAnimation && {
      animation: 'statusPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      '@keyframes statusPulse': {
        '0%, 100%': {
          opacity: 1,
          borderColor: statusColor,
        },
        '50%': {
          opacity: 0.8,
          borderColor: 'transparent',
        },
      },
    }),
  };
});

export const StatusChip = React.forwardRef<HTMLDivElement, StatusChipProps>((props, ref) => {
  return <StyledChip ref={ref} {...props} />;
});

StatusChip.displayName = 'StatusChip';

// Predefined status chips
export const VerifiedChip = React.forwardRef<HTMLDivElement, Omit<StatusChipProps, 'status'>>((props, ref) => (
  <StatusChip ref={ref} status="verified" {...props} />
));

VerifiedChip.displayName = 'VerifiedChip';

export const PendingChip = React.forwardRef<HTMLDivElement, Omit<StatusChipProps, 'status'>>((props, ref) => (
  <StatusChip ref={ref} status="pending" {...props} />
));

PendingChip.displayName = 'PendingChip';

export const SensitiveChip = React.forwardRef<HTMLDivElement, Omit<StatusChipProps, 'status'>>((props, ref) => (
  <StatusChip ref={ref} status="sensitive" pulseAnimation {...props} />
));

SensitiveChip.displayName = 'SensitiveChip';

export const InactiveChip = React.forwardRef<HTMLDivElement, Omit<StatusChipProps, 'status'>>((props, ref) => (
  <StatusChip ref={ref} status="inactive" {...props} />
));

InactiveChip.displayName = 'InactiveChip'; 