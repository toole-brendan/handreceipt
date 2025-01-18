import React from 'react';
import { Box, Typography } from '@mui/material';
import { Clock, Activity, CheckCircle, TrendingUp, TrendingDown } from 'lucide-react';
import DashboardCard from '@/components/common/DashboardCard';
import type { MetricsData } from '@/features/transfers/types';

interface MetricCardProps {
  icon: React.ElementType;
  title: string;
  value: string | number;
  change?: {
    value: string;
    timeframe: string;
    isPositive: boolean;
  };
}

const MetricCard: React.FC<MetricCardProps> = ({ icon: Icon, title, value, change }) => {
  return (
    <DashboardCard title={title}>
      <Box sx={{ textAlign: 'center' }}>
        <Icon className="h-5 w-5 mb-2" />
        <Typography variant="h3" sx={{ mb: 1, fontWeight: 600 }}>
          {value}
        </Typography>
        {change && (
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            justifyContent: 'center',
            color: change.isPositive ? 'success.main' : 'error.main'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
              {change.isPositive ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              <Typography variant="body2" sx={{ ml: 0.5 }}>
                {change.value}
              </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary">
              {change.timeframe}
            </Typography>
          </Box>
        )}
      </Box>
    </DashboardCard>
  );
};

const TransferMetrics: React.FC<MetricsData> = (props) => {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 3 }}>
      <MetricCard
        icon={Activity}
        title="PENDING APPROVALS"
        value={props.pendingApprovals.value}
        change={props.pendingApprovals.change}
      />
      <MetricCard
        icon={Clock}
        title="AVG. PROCESSING TIME"
        value={props.processingTime.value}
        change={props.processingTime.change}
      />
      <MetricCard
        icon={CheckCircle}
        title="COMPLETED TODAY"
        value={props.completedToday.value}
        change={props.completedToday.change}
      />
      <MetricCard
        icon={Activity}
        title="APPROVAL RATE"
        value={props.approvalRate.value}
      />
    </Box>
  );
};

export default TransferMetrics;