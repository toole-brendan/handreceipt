import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  LinearProgress,
  styled,
  Theme,
  alpha,
} from '@mui/material';
import { PropertyItem } from './PropertyCard';
import { StatusChip } from '../../../components/common/mui/StatusChip';

interface PropertySummaryProps {
  items: PropertyItem[];
  totalValue: number;
  serviceablePercentage: number;
  lastInventoryDate?: Date;
}

interface StatCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  status?: 'verified' | 'pending' | 'sensitive' | 'inactive';
}

const StyledContainer = styled(Paper)(({ theme }: { theme: Theme }) => ({
  backgroundColor: alpha(theme.palette.background.paper, 0.05),
  backdropFilter: 'blur(10px)',
  border: `1px solid ${alpha(theme.palette.divider, 0.05)}`,
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(3),
}));

const StatCard = styled(Box)(({ theme }: { theme: Theme }) => ({
  backgroundColor: alpha(theme.palette.background.paper, 0.03),
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}));

const ProgressBar = styled(LinearProgress)(({ theme }: { theme: Theme }) => ({
  height: 8,
  borderRadius: 4,
  backgroundColor: alpha(theme.palette.primary.main, 0.08),
  '& .MuiLinearProgress-bar': {
    borderRadius: 4,
  },
}));

const StatCardComponent: React.FC<StatCardProps> = ({ label, value, subValue, status }) => (
  <StatCard>
    <Typography
      variant="body2"
      sx={{
        color: theme => alpha(theme.palette.text.secondary, 0.9),
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        fontSize: '0.75rem',
        fontWeight: 600,
      }}
    >
      {label}
    </Typography>
    <Box display="flex" alignItems="center" gap={1}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 600,
          letterSpacing: '0.02em',
        }}
      >
        {value}
      </Typography>
      {status && (
        <StatusChip
          status={status}
          label={status.toUpperCase()}
          size="small"
        />
      )}
    </Box>
    {subValue && (
      <Typography
        variant="caption"
        sx={{
          color: theme => alpha(theme.palette.text.secondary, 0.7),
          fontSize: '0.75rem',
        }}
      >
        {subValue}
      </Typography>
    )}
  </StatCard>
);

export const PropertySummary: React.FC<PropertySummaryProps> = ({
  items,
  totalValue,
  serviceablePercentage,
  lastInventoryDate,
}) => {
  const totalItems = items.length;
  const serviceableItems = items.filter(item => item.status === 'serviceable').length;
  const missingItems = items.filter(item => item.status === 'missing').length;
  const damagedItems = items.filter(item => item.status === 'damaged').length;

  return (
    <StyledContainer elevation={0}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          letterSpacing: '0.02em',
          mb: 3,
        }}
      >
        Property Overview
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCardComponent
            label="Total Items"
            value={totalItems}
            subValue="In inventory"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCardComponent
            label="Total Value"
            value={`$${totalValue.toLocaleString()}`}
            status={totalValue > 1000000 ? 'sensitive' : 'verified'}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCardComponent
            label="Serviceable Items"
            value={`${serviceableItems} / ${totalItems}`}
            subValue={`${serviceablePercentage}% of total`}
            status={serviceablePercentage >= 90 ? 'verified' : 'pending'}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCardComponent
            label="Issues"
            value={missingItems + damagedItems}
            subValue={`${missingItems} missing, ${damagedItems} damaged`}
            status={missingItems > 0 ? 'sensitive' : damagedItems > 0 ? 'pending' : 'verified'}
          />
        </Grid>
      </Grid>

      <Box sx={{ mb: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography
            variant="body2"
            sx={{
              color: theme => alpha(theme.palette.text.secondary, 0.9),
              fontWeight: 500,
            }}
          >
            Serviceability Rate
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              color: theme => {
                if (serviceablePercentage >= 90) return theme.palette.success.main;
                if (serviceablePercentage >= 70) return theme.palette.warning.main;
                return theme.palette.error.main;
              },
            }}
          >
            {serviceablePercentage}%
          </Typography>
        </Box>
        <ProgressBar
          variant="determinate"
          value={serviceablePercentage}
          sx={{
            '& .MuiLinearProgress-bar': {
              backgroundColor: theme => {
                if (serviceablePercentage >= 90) return theme.palette.success.main;
                if (serviceablePercentage >= 70) return theme.palette.warning.main;
                return theme.palette.error.main;
              },
            },
          }}
        />
      </Box>

      {lastInventoryDate && (
        <Typography
          variant="caption"
          sx={{
            color: theme => alpha(theme.palette.text.secondary, 0.7),
            display: 'block',
            textAlign: 'right',
            mt: 2,
          }}
        >
          Last inventory: {new Date(lastInventoryDate).toLocaleDateString()}
        </Typography>
      )}
    </StyledContainer>
  );
};

export default PropertySummary; 