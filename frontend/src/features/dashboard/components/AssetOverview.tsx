/* frontend/src/ui/components/dashboard/AssetOverview.tsx */

import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import '@/ui/styles/components/dashboard/asset-overview.css';

interface AssetStatus {
  totalAssets: number;
  operational: number;
  underMaintenance: number;
  decommissioned: number;
  inTransit: number;
}

interface AssetTrend {
  timestamp: string;
  count: number;
}

interface AssetOverviewProps {
  timeRange?: string;
}

const AssetOverview: React.FC<AssetOverviewProps> = ({ timeRange = '24h' }) => {
  const [status, setStatus] = useState<AssetStatus>({
    totalAssets: 0,
    operational: 0,
    underMaintenance: 0,
    decommissioned: 0,
    inTransit: 0
  });
  const [trends, setTrends] = useState<AssetTrend[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAssetData();
    const interval = setInterval(fetchAssetData, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [timeRange]);

  const fetchAssetData = async () => {
    try {
      const [statusResponse, trendsResponse] = await Promise.all([
        fetch('/api/assets/status'),
        fetch(`/api/assets/trends?timeRange=${timeRange}`)
      ]);

      if (!statusResponse.ok || !trendsResponse.ok) {
        throw new Error('Failed to fetch asset data');
      }

      const [statusData, trendsData] = await Promise.all([
        statusResponse.json(),
        trendsResponse.json()
      ]);

      setStatus(statusData);
      setTrends(trendsData);
      setError(null);
    } catch (err) {
      setError('Error loading asset overview');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const pieData = [
    { name: 'Operational', value: status.operational, color: '#4caf50' },
    { name: 'Under Maintenance', value: status.underMaintenance, color: '#ff9800' },
    { name: 'Decommissioned', value: status.decommissioned, color: '#f44336' },
    { name: 'In Transit', value: status.inTransit, color: '#2196f3' }
  ];

  const getPercentage = (value: number) => {
    return ((value / status.totalAssets) * 100).toFixed(1);
  };

  if (loading) {
    return <div className="asset-overview-loading">Loading asset overview...</div>;
  }

  if (error) {
    return <div className="asset-overview-error">{error}</div>;
  }

  return (
    <div className="asset-overview">
      <div className="overview-header">
        <h3>Asset Overview</h3>
        <div className="total-assets">
          <span className="total-label">Total Assets</span>
          <span className="total-value">{status.totalAssets}</span>
        </div>
      </div>

      <div className="overview-content">
        <div className="chart-section">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="status-breakdown">
          {pieData.map((item) => (
            <div key={item.name} className="status-item">
              <div className="status-indicator" style={{ backgroundColor: item.color }} />
              <div className="status-details">
                <span className="status-label">{item.name}</span>
                <div className="status-numbers">
                  <span className="status-value">{item.value}</span>
                  <span className="status-percentage">
                    ({getPercentage(item.value)}%)
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="overview-footer">
        <button 
          className="btn btn-secondary" 
          onClick={fetchAssetData}
        >
          Refresh Data
        </button>
        <small>Last updated: {new Date().toLocaleString()}</small>
      </div>
    </div>
  );
};

export default AssetOverview;
