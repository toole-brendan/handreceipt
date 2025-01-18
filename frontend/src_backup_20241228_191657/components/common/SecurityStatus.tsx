import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  styled,
  useTheme,
} from '@mui/material';
import {
  ShieldCheck as ShieldIcon,
  Lock as LockIcon,
  RefreshCcw as RefreshIcon,
} from 'lucide-react';
import { StatusChip } from './mui/StatusChip';

type SecurityLevel = 'normal' | 'elevated' | 'critical';

interface SecurityStatusProps {
  level?: SecurityLevel;
}

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 40,
  height: 40,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  marginRight: theme.spacing(2),
}));

const getStatusVariant = (level: SecurityLevel) => {
  switch (level) {
    case 'normal':
      return 'success';
    case 'elevated':
      return 'warning';
    case 'critical':
      return 'error';
    default:
      return 'default';
  }
};

const SecurityStatus: React.FC<SecurityStatusProps> = ({ level = 'normal' }) => {
  const theme = useTheme();

  return (
    <StyledCard>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconWrapper>
            <ShieldIcon size={24} />
          </IconWrapper>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" component="h3">
              Security Status
            </Typography>
          </Box>
          <StatusChip
            label={level}
            status={getStatusVariant(level)}
            size="small"
            pulseAnimation={level !== 'normal'}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            color: theme.palette.success.main,
            gap: 1,
          }}
        >
          <LockIcon size={20} />
          <Typography variant="body2">
            Secure Connection Active
          </Typography>
          <IconButton
            size="small"
            sx={{ ml: 'auto' }}
            onClick={() => console.log('Refresh security status')}
          >
            <RefreshIcon size={16} />
          </IconButton>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default SecurityStatus; 