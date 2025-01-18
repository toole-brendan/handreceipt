import React from 'react';
import { Clock, Activity, CheckCircle, TrendingUp, TrendingDown } from 'lucide-react';
import type { MetricsData } from '@/features/transfer';

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
    <div className="metric-card">
      <div className="metric-header">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-muted" />
          <span className="metric-title">{title}</span>
        </div>
      </div>
      <div className="metric-value">{value}</div>
      {change && (
        <div className={`metric-trend ${change.isPositive ? 'trend-up' : 'trend-down'}`}>
          <div className="flex items-center">
            {change.isPositive ? (
              <TrendingUp className="h-3 w-3 mr-1" />
            ) : (
              <TrendingDown className="h-3 w-3 mr-1" />
            )}
            <span>{change.value}</span>
          </div>
          <span className="text-muted">{change.timeframe}</span>
        </div>
      )}
    </div>
  );
};

const TransferMetrics: React.FC<MetricsData> = (props) => {
  return (
    <div className="metrics-grid" data-testid="metrics-section">
      <MetricCard
        icon={Activity}
        title="Pending Approvals"
        value={props.pendingApprovals.value}
        change={props.pendingApprovals.change}
      />
      <MetricCard
        icon={Clock}
        title="Avg. Processing Time"
        value={props.processingTime.value}
        change={props.processingTime.change}
      />
      <MetricCard
        icon={CheckCircle}
        title="Completed Today"
        value={props.completedToday.value}
        change={props.completedToday.change}
      />
      <MetricCard
        icon={Activity}
        title="Approval Rate"
        value={props.approvalRate.value}
      />
    </div>
  );
};

export default TransferMetrics;