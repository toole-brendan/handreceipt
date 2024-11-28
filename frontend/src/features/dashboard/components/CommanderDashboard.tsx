/* frontend/src/ui/components/dashboard/CommanderDashboard.tsx */

import React from 'react';
import { Shield, Box, Network, AlertTriangle, Users, CheckCircle, Activity } from 'lucide-react';

const CommanderDashboard: React.FC = () => {
  return (
    <div className="palantir-panel">
      {/* Top Status Bar */}
      <div className="alert status-info mb-6">
        <Shield className="icon" />
        <div>
          <h4 className="alert-title">Security Status: NORMAL</h4>
          <p className="alert-description">
            Last scan completed at {new Date().toLocaleTimeString()}
          </p>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="data-grid">
        {/* Asset Overview Card */}
        <div className="data-card">
          <div className="card-header">
            <h2>Asset Overview</h2>
            <Box className="icon" />
          </div>
          <div className="card-content">
            <div className="stat-row">
              <span>Total Assets</span>
              <span className="stat-value">{2_547}</span>
            </div>
            <div className="stat-row">
              <span>Active</span>
              <span className="stat-value status-success">{2_128}</span>
            </div>
            <div className="stat-row">
              <span>Maintenance</span>
              <span className="stat-value status-warning">{312}</span>
            </div>
            <div className="stat-row">
              <span>Critical</span>
              <span className="stat-value status-danger">{107}</span>
            </div>
          </div>
        </div>

        {/* Network Status Card */}
        <div className="data-card">
          <div className="card-header">
            <h2>Mesh Network</h2>
            <Network className="icon" />
          </div>
          <div className="card-content">
            <div className="stat-row">
              <span>Active Nodes</span>
              <span className="stat-value">{'48/50'}</span>
            </div>
            <div className="stat-row">
              <span>Connection Strength</span>
              <span className="stat-value status-success">98%</span>
            </div>
            <div className="stat-row">
              <span>Data Sync</span>
              <span className="stat-value status-success">Up to date</span>
            </div>
            <div className="stat-row">
              <span>Last Update</span>
              <span className="stat-value">2 min ago</span>
            </div>
          </div>
        </div>

        {/* Security Alerts Card */}
        <div className="data-card">
          <div className="card-header">
            <h2>Security Alerts</h2>
            <AlertTriangle className="icon status-warning" />
          </div>
          <div className="card-content">
            <div className="alert status-warning">
              <div className="alert-title">Unauthorized Access Attempt</div>
              <div className="alert-description">10 minutes ago</div>
            </div>
            <div className="alert status-danger">
              <div className="alert-title">Failed Verification</div>
              <div className="alert-description">25 minutes ago</div>
            </div>
            <div className="alert status-success">
              <div className="alert-title">Security Scan Complete</div>
              <div className="alert-description">1 hour ago</div>
            </div>
          </div>
        </div>

        {/* Personnel Status */}
        <div className="data-card">
          <div className="card-header">
            <h2>Personnel Status</h2>
            <Users className="icon" />
          </div>
          <div className="card-content">
            <div className="stat-row">
              <span>Active Duty</span>
              <span className="stat-value">{245}</span>
            </div>
            <div className="stat-row">
              <span>On Mission</span>
              <span className="stat-value status-info">{78}</span>
            </div>
            <div className="stat-row">
              <span>Training</span>
              <span className="stat-value status-warning">{45}</span>
            </div>
            <div className="stat-row">
              <span>Leave</span>
              <span className="stat-value">{22}</span>
            </div>
          </div>
        </div>

        {/* Blockchain Verification */}
        <div className="data-card">
          <div className="card-header">
            <h2>Blockchain Status</h2>
            <CheckCircle className="icon status-success" />
          </div>
          <div className="card-content">
            <div className="stat-row">
              <span>Last Block</span>
              <span className="stat-value font-mono">#{1234567}</span>
            </div>
            <div className="stat-row">
              <span>Pending Transactions</span>
              <span className="stat-value">12</span>
            </div>
            <div className="stat-row">
              <span>Verification Rate</span>
              <span className="stat-value status-success">99.9%</span>
            </div>
            <div className="stat-row">
              <span>Chain Status</span>
              <span className="stat-value status-success">Healthy</span>
            </div>
          </div>
        </div>

        {/* System Performance */}
        <div className="data-card">
          <div className="card-header">
            <h2>System Performance</h2>
            <Activity className="icon" />
          </div>
          <div className="card-content">
            <div className="stat-row">
              <span>CPU Usage</span>
              <span className="stat-value status-success">42%</span>
            </div>
            <div className="stat-row">
              <span>Memory</span>
              <span className="stat-value status-warning">78%</span>
            </div>
            <div className="stat-row">
              <span>Network Latency</span>
              <span className="stat-value status-success">45ms</span>
            </div>
            <div className="stat-row">
              <span>Storage</span>
              <span className="stat-value status-success">52%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommanderDashboard;
