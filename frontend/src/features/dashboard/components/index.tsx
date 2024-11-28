import React from 'react';
import DashboardCard from '@/ui/components/common/DashboardCard';
import AssetOverview from '@/ui/components/dashboard/AssetOverview';
import ActivityFeed from '@/ui/components/dashboard/ActivityFeed';
import SystemHealth from '@/ui/components/dashboard/SystemHealth';
import '@/ui/styles/dashboard.css';

interface DashboardMetrics {
  totalAssets: number;
  activeAssets: number;
  pendingTransfers: number;
  maintenanceItems: number;
}

const Dashboard: React.FC = () => {
  const [metrics, setMetrics] = React.useState<DashboardMetrics>({
    totalAssets: 0,
    activeAssets: 0,
    pendingTransfers: 0,
    maintenanceItems: 0,
  });

  React.useEffect(() => {
    // Fetch dashboard metrics
    const fetchMetrics = async () => {
      try {
        const response = await fetch('/api/dashboard/metrics');
        const data = await response.json();
        setMetrics(data);
      } catch (error) {
        console.error('Error fetching dashboard metrics:', error);
      }
    };

    fetchMetrics();
  }, []);

  return (
    <div className="dashboard">
      {/* Quick Stats */}
      <div className="quick-stats">
        <div className="stat-card">
          <i className="material-icons">inventory_2</i>
          <div className="stat-content">
            <span className="stat-value">{metrics.totalAssets}</span>
            <span className="stat-label">Total Assets</span>
          </div>
        </div>
        <div className="stat-card">
          <i className="material-icons">check_circle</i>
          <div className="stat-content">
            <span className="stat-value">{metrics.activeAssets}</span>
            <span className="stat-label">Active Assets</span>
          </div>
        </div>
        <div className="stat-card">
          <i className="material-icons">swap_horiz</i>
          <div className="stat-content">
            <span className="stat-value">{metrics.pendingTransfers}</span>
            <span className="stat-label">Pending Transfers</span>
          </div>
        </div>
        <div className="stat-card">
          <i className="material-icons">build</i>
          <div className="stat-content">
            <span className="stat-value">{metrics.maintenanceItems}</span>
            <span className="stat-label">Maintenance Items</span>
          </div>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="dashboard-grid">
        {/* Asset Overview */}
        <DashboardCard 
          title="Asset Overview" 
          icon={<i className="material-icons">inventory_2</i>}
          className="grid-col-2"
        >
          <AssetOverview />
        </DashboardCard>

        {/* System Health */}
        <DashboardCard 
          title="System Health" 
          icon={<i className="material-icons">health_and_safety</i>}
        >
          <SystemHealth />
        </DashboardCard>

        {/* Recent Activities */}
        <DashboardCard 
          title="Recent Activities" 
          icon={<i className="material-icons">history</i>}
        >
          <ActivityFeed />
        </DashboardCard>

        {/* Alerts and Notifications */}
        <DashboardCard 
          title="Alerts" 
          icon={<i className="material-icons">notifications_important</i>}
        >
          <div className="alerts-list">
            {/* Add your alerts component */}
            <div className="alert-item high-priority">
              <i className="material-icons">warning</i>
              <span>Critical system update required</span>
            </div>
            <div className="alert-item">
              <i className="material-icons">info</i>
              <span>3 assets pending verification</span>
            </div>
          </div>
        </DashboardCard>

        {/* Quick Actions */}
        <DashboardCard 
          title="Quick Actions" 
          icon={<i className="material-icons">flash_on</i>}
        >
          <div className="quick-actions">
            <button className="action-button">
              <i className="material-icons">add</i>
              New Asset
            </button>
            <button className="action-button">
              <i className="material-icons">assignment</i>
              Generate Report
            </button>
            <button className="action-button">
              <i className="material-icons">search</i>
              Asset Lookup
            </button>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
};

export default Dashboard; 