import React from 'react';
import { Activity, Shield, Radio, Wifi } from 'lucide-react';
import '@/ui/styles/components/dashboard/system-status.css';

interface SystemStatusProps {
  networkHealth: string;
  securityStatus: string;
  commsStatus: string;
  meshCoverage: number;
  lastUpdate: string;
}

const SystemStatus: React.FC<SystemStatusProps> = ({
  networkHealth,
  securityStatus,
  commsStatus,
  meshCoverage,
  lastUpdate
}) => {
  return (
    <div className="system-status">
      <div className="system-status__header">
        <div className="system-status__title-group">
          <Activity 
            className="system-status__icon" 
            size={20}
            aria-hidden="true"
          />
          <h3 className="system-status__title">System Status</h3>
        </div>
      </div>

      <div className="system-status__content">
        <ul className="system-status__list">
          <li className={`system-status__item status-${networkHealth}`}>
            <Wifi className="system-status__item-icon" />
            <div className="system-status__item-content">
              <span className="system-status__item-label">Network Health</span>
              <span className="system-status__item-value">{networkHealth}</span>
            </div>
          </li>
          <li className={`system-status__item status-${securityStatus}`}>
            <Shield className="system-status__item-icon" />
            <div className="system-status__item-content">
              <span className="system-status__item-label">Security Status</span>
              <span className="system-status__item-value">{securityStatus}</span>
            </div>
          </li>
          <li className={`system-status__item status-${commsStatus}`}>
            <Radio className="system-status__item-icon" />
            <div className="system-status__item-content">
              <span className="system-status__item-label">Communications</span>
              <span className="system-status__item-value">{commsStatus}</span>
            </div>
          </li>
          <li className={`system-status__item ${meshCoverage < 80 ? 'status-warning' : 'status-optimal'}`}>
            <Activity className="system-status__item-icon" />
            <div className="system-status__item-content">
              <span className="system-status__item-label">Mesh Coverage</span>
              <span className="system-status__item-value">{meshCoverage}%</span>
            </div>
          </li>
        </ul>

        <div className="system-status__footer">
          <small className="system-status__timestamp">
            Last updated: {new Date(lastUpdate).toLocaleString()}
          </small>
        </div>
      </div>
    </div>
  );
};

export default SystemStatus; 