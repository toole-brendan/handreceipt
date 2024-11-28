/* frontend/src/ui/components/dashboard/SystemHealth.tsx */

import React, { useState, useEffect } from 'react';
import { useSystemMetrics } from '@/hooks/useSystemMetrics';
import MetricCard from './MetricCard';
import { RefreshCw } from 'lucide-react';
import '@/ui/styles/components/dashboard/system-health.css';

const SystemHealth: React.FC = () => {
  const { 
    metrics, 
    loading, 
    error, 
    overallHealth, 
    refresh 
  } = useSystemMetrics();

  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    setLastUpdated(new Date());
  }, [metrics]);

  if (loading) {
    return (
      <div className="system-health__loading" role="status">
        <RefreshCw className="system-health__loading-icon" />
        Loading system health...
      </div>
    );
  }

  if (error) {
    return (
      <div className="system-health__error" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="system-health">
      <div className="system-health__header">
        <div className="system-health__title-group">
          <h3 className="system-health__title">System Health</h3>
          <div className={`system-health__status system-health__status--${overallHealth}`}>
            <span className="system-health__status-indicator" />
            <span className="system-health__status-text">
              {overallHealth.toUpperCase()}
            </span>
          </div>
        </div>
        <button 
          className="system-health__refresh-btn"
          onClick={refresh}
          aria-label="Refresh system metrics"
        >
          <RefreshCw 
            size={16} 
            className={loading ? 'spinning' : ''} 
            aria-hidden="true"
          />
          Refresh
        </button>
      </div>

      <div className="system-health__metrics">
        {metrics.map((metric) => (
          <MetricCard key={metric.name} metric={metric} />
        ))}
      </div>

      <div className="system-health__footer">
        <div className="system-health__timestamp">
          Last updated: {' '}
          <time dateTime={lastUpdated.toISOString()}>
            {new Intl.DateTimeFormat('en-US', {
              dateStyle: 'medium',
              timeStyle: 'medium'
            }).format(lastUpdated)}
          </time>
        </div>
        <div className="system-health__refresh-info">
          Auto-refreshes every 30 seconds
        </div>
      </div>
    </div>
  );
};

export default SystemHealth;
