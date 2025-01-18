import React from 'react';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import type { SystemMetric } from '@/shared/hooks/useSystemMetrics';
import '@/styles/components/components/dashboard/metric-card.css';

export interface MetricCardProps {
  metric: SystemMetric;
}

const MetricCard: React.FC<MetricCardProps> = ({ metric }) => {
  const getStatusColor = (status: 'healthy' | 'degraded' | 'critical') => {
    const colors = {
      healthy: 'var(--color-success)',
      degraded: 'var(--color-warning)',
      critical: 'var(--color-error)'
    };
    return colors[status] || 'var(--color-text-secondary)';
  };

  const values = metric.history.map((h: { value: number }) => h.value);

  return (
    <div className="metric-card">
      <div className="metric-card__header">
        <h4 className="metric-card__title">{metric.name}</h4>
        <span 
          className={`metric-card__status metric-card__status--${metric.status}`}
          role="status"
        >
          {metric.status}
        </span>
      </div>

      <div className="metric-card__value">
        {metric.value}
        <small className="metric-card__unit">{metric.unit}</small>
      </div>

      <div className="metric-card__chart" aria-hidden="true">
        <Sparklines data={values} height={20} width={100}>
          <SparklinesLine color={getStatusColor(metric.status)} />
        </Sparklines>
      </div>

      <div className="metric-card__threshold">
        Threshold: {metric.threshold}{metric.unit}
      </div>
    </div>
  );
};

export default React.memo(MetricCard); 