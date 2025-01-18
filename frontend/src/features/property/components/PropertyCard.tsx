import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  IconButton,
  Tooltip,
  alpha,
  styled,
  Theme,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  History as HistoryIcon,
  QrCode as QrCodeIcon,
} from '@mui/icons-material';
import { CustomTheme } from '../../../styles/theme';
import { StatusChip } from '../../../components/common/mui/StatusChip';

export interface PropertyItem {
  id: string;
  name: string;
  serialNumber: string;
  nsn: string; // National Stock Number
  status: 'serviceable' | 'unserviceable' | 'damaged' | 'missing';
  category: string;
  subCategory?: string;
  value: number;
  assignedTo?: string;
  lastInventory?: Date;
  notes?: string;
}

interface PropertyCardProps {
  item: PropertyItem;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onViewHistory?: (id: string) => void;
  onGenerateQR?: (id: string) => void;
}

const StyledCard = styled(Card)(({ theme }: { theme: Theme & CustomTheme }) => {
  const customTheme = theme as CustomTheme;
  
  return {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: 0,
    margin: theme.spacing(1.5),
    width: `calc(100% - ${theme.spacing(3)})`,
    transition: theme.transitions.create(
      ['transform', 'box-shadow', 'background-color'],
      {
        duration: theme.transitions.duration.shorter,
        easing: theme.transitions.easing.easeInOut,
      }
    ),
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.5)',
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '1px',
      background: 'rgba(255, 255, 255, 0.1)',
    },
    [theme.breakpoints.up('sm')]: {
      width: `calc(50% - ${theme.spacing(3)})`,
    },
    [theme.breakpoints.up('md')]: {
      width: `calc(33.333% - ${theme.spacing(3)})`,
    },
  };
});

const PropertyDetails = styled(Box)(({ theme }: { theme: Theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'auto 1fr',
  gap: theme.spacing(1.5),
  marginTop: theme.spacing(2),
  '& .label': {
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: 600,
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    fontFamily: 'Inter, sans-serif',
  },
  '& .value': {
    color: '#FFFFFF',
    fontSize: '0.875rem',
    fontFamily: 'Inter, sans-serif',
    letterSpacing: '0.025em',
  },
}));

const ActionButton = styled(IconButton)(({ theme }: { theme: Theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.03)',
  borderRadius: 0,
  transition: theme.transitions.create(['background-color', 'transform', 'color'], {
    duration: theme.transitions.duration.shorter,
  }),
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    transform: 'translateY(-1px)',
  },
}));

const getStatusColor = (status: PropertyItem['status']): 'verified' | 'pending' | 'sensitive' | 'inactive' => {
  switch (status) {
    case 'serviceable':
      return 'verified';
    case 'unserviceable':
      return 'inactive';
    case 'damaged':
      return 'pending';
    case 'missing':
      return 'sensitive';
    default:
      return 'inactive';
  }
};

export const PropertyCard: React.FC<PropertyCardProps> = ({
  item,
  onEdit,
  onDelete,
  onViewHistory,
  onGenerateQR,
}) => {
  return (
    <StyledCard elevation={0}>
      <CardContent sx={{ p: 3, pb: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={3}>
          <Box>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600,
                letterSpacing: '0.02em',
                color: '#FFFFFF',
                mb: 1
              }}
            >
              {item.name}
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ 
                letterSpacing: '0.05em',
                color: 'rgba(255, 255, 255, 0.7)',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              NSN: {item.nsn}
            </Typography>
          </Box>
          <StatusChip
            status={getStatusColor(item.status)}
            label={item.status.toUpperCase()}
            variant={item.status === 'missing' ? 'filled' : 'outlined'}
          />
        </Box>

        <PropertyDetails>
          <Typography className="label">Serial Number</Typography>
          <Typography className="value">{item.serialNumber}</Typography>

          <Typography className="label">Category</Typography>
          <Typography className="value">
            {item.category}
            {item.subCategory && ` / ${item.subCategory}`}
          </Typography>

          <Typography className="label">Value</Typography>
          <Typography className="value">
            ${item.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </Typography>

          {item.assignedTo && (
            <>
              <Typography className="label">Assigned To</Typography>
              <Typography className="value">{item.assignedTo}</Typography>
            </>
          )}

          {item.lastInventory && (
            <>
              <Typography className="label">Last Inventory</Typography>
              <Typography className="value">
                {new Date(item.lastInventory).toLocaleDateString()}
              </Typography>
            </>
          )}
        </PropertyDetails>

        {item.notes && (
          <Typography
            variant="body2"
            sx={{ 
              mt: 3, 
              fontStyle: 'italic',
              color: theme => alpha(theme.palette.text.secondary, 0.8),
              fontSize: '0.8125rem',
              letterSpacing: '0.015em',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            {item.notes}
          </Typography>
        )}
      </CardContent>

      <CardActions sx={{ mt: 'auto', justifyContent: 'flex-end', gap: 1.5, p: 3, pt: 2 }}>
        <Tooltip title="View History" arrow>
          <ActionButton size="small" onClick={() => onViewHistory?.(item.id)}>
            <HistoryIcon fontSize="small" />
          </ActionButton>
        </Tooltip>
        <Tooltip title="Generate QR Code" arrow>
          <ActionButton size="small" onClick={() => onGenerateQR?.(item.id)}>
            <QrCodeIcon fontSize="small" />
          </ActionButton>
        </Tooltip>
        <Tooltip title="Edit" arrow>
          <ActionButton size="small" onClick={() => onEdit?.(item.id)}>
            <EditIcon fontSize="small" />
          </ActionButton>
        </Tooltip>
        <Tooltip title="Delete" arrow>
          <ActionButton 
            size="small" 
            onClick={() => onDelete?.(item.id)}
            sx={{
              '&:hover': {
                backgroundColor: theme => alpha(theme.palette.error.main, 0.15),
                color: theme => theme.palette.error.main,
              },
            }}
          >
            <DeleteIcon fontSize="small" />
          </ActionButton>
        </Tooltip>
      </CardActions>
    </StyledCard>
  );
}; 