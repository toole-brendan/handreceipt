import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Grid,
  Box,
  styled,
} from '@mui/material';
import {
  Description as FileTextIcon,
  QrCode as QrCodeIcon,
  Build as WrenchIcon,
} from '@mui/icons-material';

export interface Property {
  id: string;
  name: string;
  category?: string;
  serialNumber: string;
  dateAssigned: string;
  currentHolder: string;
  description: string;
  status: 'active' | 'maintenance' | 'inactive';
}

export interface PropertyCardProps {
  item: Property;
  onViewReceipt?: (id: string) => void;
  onViewQRCode?: (id: string) => void;
  onViewMaintenance?: (id: string) => void;
}

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.paper,
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
}));

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <Grid container spacing={1} sx={{ mb: 1 }}>
    <Grid item xs={5}>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
    </Grid>
    <Grid item xs={7}>
      <Typography variant="body2">
        {value}
      </Typography>
    </Grid>
  </Grid>
);

const getStatusColor = (status: Property['status']) => {
  switch (status) {
    case 'active':
      return 'success';
    case 'maintenance':
      return 'warning';
    case 'inactive':
      return 'error';
    default:
      return 'default';
  }
};

export function PropertyCard({
  item,
  onViewReceipt,
  onViewQRCode,
  onViewMaintenance,
}: PropertyCardProps) {
  return (
    <StyledCard>
      <CardHeader
        title={
          <Typography variant="h6" component="h3">
            {item.name}
          </Typography>
        }
        subheader={item.category}
        action={
          <Chip
            label={item.status.replace('_', ' ')}
            color={getStatusColor(item.status)}
            size="small"
          />
        }
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <DetailRow label="Serial Number" value={item.serialNumber} />
        <DetailRow label="Date Assigned" value={item.dateAssigned} />
        <DetailRow label="Current Holder" value={item.currentHolder} />
        <DetailRow label="Description" value={item.description} />
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0, gap: 1 }}>
        <Button
          size="small"
          variant="outlined"
          startIcon={<FileTextIcon />}
          onClick={() => onViewReceipt?.(item.id)}
        >
          Receipt
        </Button>
        <Button
          size="small"
          variant="outlined"
          startIcon={<QrCodeIcon />}
          onClick={() => onViewQRCode?.(item.id)}
        >
          QR Code
        </Button>
        <Button
          size="small"
          variant="outlined"
          startIcon={<WrenchIcon />}
          onClick={() => onViewMaintenance?.(item.id)}
        >
          Maintenance
        </Button>
      </CardActions>
    </StyledCard>
  );
} 