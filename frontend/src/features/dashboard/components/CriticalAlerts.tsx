import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { useCriticalAlerts } from '@/hooks/useCriticalAlerts';
import '@/ui/styles/components/dashboard/critical-alerts.css';

const CriticalAlerts: React.FC = () => {
  const { alerts, loading, error, refresh } = useCriticalAlerts();

  return (
    <div className="critical-alerts">
      <div className="critical-alerts__header">
        <div className="critical-alerts__title-group">
          <AlertTriangle 
            className="critical-alerts__icon" 
            size={20}
            aria-hidden="true"
          />
          <h3 className="critical-alerts__title">Critical Alerts</h3>
        </div>
        <button 
          className="critical-alerts__refresh"
          onClick={refresh}
          aria-label="Refresh alerts"
        >
          <RefreshCw 
            size={16} 
            className={loading ? 'spinning' : ''} 
          />
        </button>
      </div>

      <div className="critical-alerts__content">
        {loading ? (
          <div className="critical-alerts__loading" role="status">
            <RefreshCw className="critical-alerts__loading-icon" />
            <span>Loading alerts...</span>
          </div>
        ) : error ? (
          <div className="critical-alerts__error" role="alert">
            {error}
          </div>
        ) : (
          <>
            <div className="critical-alerts__summary">
              <span className="critical-alerts__count">
                {alerts.length}
              </span>
              <span className="critical-alerts__label">
                Active Critical {alerts.length === 1 ? 'Alert' : 'Alerts'}
              </span>
            </div>

            {alerts.length > 0 && (
              <ul className="critical-alerts__list">
                {alerts.map((alert) => (
                  <li 
                    key={alert.id} 
                    className="critical-alerts__item"
                  >
                    <div className="critical-alerts__item-header">
                      <span className="critical-alerts__severity">
                        {alert.severity}
                      </span>
                      <time className="critical-alerts__timestamp">
                        {new Date(alert.timestamp).toLocaleString()}
                      </time>
                    </div>
                    <p className="critical-alerts__message">
                      {alert.message}
                    </p>
                    <div className="critical-alerts__source">
                      Source: {alert.source}
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {alerts.length === 0 && (
              <p className="critical-alerts__empty">
                No critical alerts at this time
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CriticalAlerts; 