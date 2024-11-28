/* frontend/src/ui/components/dashboard/SecurityAlerts.tsx */

import React from 'react';
import { useSecurityAlerts } from '@/hooks/useSecurityAlerts';
import '@/ui/styles/components/dashboard/security-alerts.css';

interface SecurityAlertsProps {
  alertCount: number;
  onAlertClick: (alertId: string) => void;
}

const SecurityAlerts: React.FC<SecurityAlertsProps> = ({ alertCount, onAlertClick }) => {
  const { alerts, loading, error, fetchAlerts } = useSecurityAlerts();

  if (loading) {
    return <div className="security-alerts__loading">Loading security alerts...</div>;
  }

  if (error) {
    return <div className="security-alerts__error">{error}</div>;
  }

  return (
    <div className="security-alerts">
      <div className="security-alerts__header">
        <h3 className="security-alerts__title">Security Alerts</h3>
        <span className="security-alerts__count">
          {alertCount} Active {alertCount === 1 ? 'Alert' : 'Alerts'}
        </span>
      </div>

      <div className="security-alerts__list">
        {alerts.length === 0 ? (
          <p className="security-alerts__no-alerts">No active security alerts</p>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.id}
              className={`security-alerts__item security-alerts__item--${alert.severity}`}
              onClick={() => onAlertClick(alert.id)}
              role="button"
              tabIndex={0}
              aria-label={`${alert.severity} alert: ${alert.message}`}
            >
              <div className="security-alerts__severity">
                <span 
                  className="security-alerts__severity-indicator"
                  aria-hidden="true"
                />
                {alert.severity}
              </div>
              <div className="security-alerts__content">
                <p className="security-alerts__message">{alert.message}</p>
                <div className="security-alerts__meta">
                  <span className="security-alerts__source">{alert.source}</span>
                  <time 
                    className="security-alerts__time"
                    dateTime={alert.timestamp}
                  >
                    {new Date(alert.timestamp).toLocaleString()}
                  </time>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="security-alerts__footer">
        <button 
          className="security-alerts__refresh"
          onClick={fetchAlerts}
          aria-label="Refresh security alerts"
        >
          Refresh Alerts
        </button>
        <small className="security-alerts__timestamp">
          Last updated: {new Date().toLocaleString()}
        </small>
      </div>
    </div>
  );
};

export default SecurityAlerts; 