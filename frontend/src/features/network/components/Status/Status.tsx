// frontend/src/pages/network/status.tsx

import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  styled,
  useTheme,
} from '@mui/material';
import { StatusChip } from '@/components/common/mui/StatusChip';
import { ProgressIndicator } from '@/components/common/mui/ProgressIndicator';

interface NetworkStatus {
  status: 'healthy' | 'warning' | 'error';
  uptime: string;
  latency: number;
  bandwidth: string;
  activeNodes: number;
  totalNodes: number;
}

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  backgroundColor: theme.palette.background.paper,
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
}));

const MetricItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(1.5, 0),
  '&:not(:last-child)': {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

const getStatusVariant = (status: NetworkStatus['status']) => {
  switch (status) {
    case 'healthy':
      return 'success';
    case 'warning':
      return 'warning';
    case 'error':
      return 'error';
    default:
      return 'default';
  }
};

const NetworkStatus: React.FC = () => {
  const theme = useTheme();
  const [status, setStatus] = React.useState<NetworkStatus>({
    status: 'healthy',
    uptime: '99.99%',
    latency: 45,
    bandwidth: '1.2 Gbps',
    activeNodes: 48,
    totalNodes: 50,
  });

  const nodePercentage = (status.activeNodes / status.totalNodes) * 100;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Network Status
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <StyledCard>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    Overall Status
                  </Typography>
                </Box>
                <StatusChip
                  label={status.status.toUpperCase()}
                  status={getStatusVariant(status.status)}
                  size="small"
                  pulseAnimation={status.status !== 'healthy'}
                />
              </Box>

              <Box>
                <MetricItem>
                  <Typography variant="body2" color="text.secondary">
                    Uptime
                  </Typography>
                  <Typography variant="body2" fontWeight="medium">
                    {status.uptime}
                  </Typography>
                </MetricItem>
                <MetricItem>
                  <Typography variant="body2" color="text.secondary">
                    Latency
                  </Typography>
                  <Typography variant="body2" fontWeight="medium">
                    {status.latency}ms
                  </Typography>
                </MetricItem>
                <MetricItem>
                  <Typography variant="body2" color="text.secondary">
                    Bandwidth
                  </Typography>
                  <Typography variant="body2" fontWeight="medium">
                    {status.bandwidth}
                  </Typography>
                </MetricItem>
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledCard>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    Node Status
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {status.activeNodes} of {status.totalNodes} nodes active
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ mt: 2 }}>
                <ProgressIndicator
                  variant="linear"
                  value={nodePercentage}
                  color={nodePercentage >= 90 ? 'success' : 'warning'}
                  label="Active Nodes"
                  showValue
                />
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NetworkStatus;