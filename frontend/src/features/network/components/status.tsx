// frontend/src/pages/network/status.tsx

import React from 'react';
import '@/ui/styles/pages/network/status.css';

interface NetworkStatus {
  status: 'healthy' | 'warning' | 'error';
  uptime: string;
  latency: number;
  bandwidth: string;
  activeNodes: number;
  totalNodes: number;
}

const NetworkStatus: React.FC = () => {
  const [status, setStatus] = React.useState<NetworkStatus>({
    status: 'healthy',
    uptime: '99.99%',
    latency: 45,
    bandwidth: '1.2 Gbps',
    activeNodes: 48,
    totalNodes: 50
  });

  return (
    <div className="network-status">
      <h1>Network Status</h1>
      
      <div className="status-grid">
        <div className="status-card">
          <div className="status-header">
            <h2 className="status-title">Overall Status</h2>
            <span className={`status-indicator status-${status.status}`}>
              {status.status.toUpperCase()}
            </span>
          </div>
          
          <div className="metrics-list">
            <div className="metric-item">
              <span className="metric-label">Uptime</span>
              <span className="metric-value">{status.uptime}</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Latency</span>
              <span className="metric-value">{status.latency}ms</span>
            </div>
            <div className="metric-item">
              <span className="metric-label">Bandwidth</span>
              <span className="metric-value">{status.bandwidth}</span>
            </div>
          </div>
        </div>

        <div className="status-card">
          <div className="status-header">
            <h2 className="status-title">Node Status</h2>
            <span className="metric-value">
              {status.activeNodes}/{status.totalNodes} Active
            </span>
          </div>
          
          {/* Add node status details */}
        </div>
      </div>
    </div>
  );
};

export default NetworkStatus;