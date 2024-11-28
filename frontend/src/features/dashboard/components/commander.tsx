// frontend/src/pages/dashboard/commander.tsx

import React, { useState, useEffect } from 'react';
import ActivityFeed from '@/ui/components/dashboard/ActivityFeed';
import SystemHealth from '@/ui/components/dashboard/SystemHealth';
import AssetOverview from '@/ui/components/dashboard/AssetOverview';
import SecurityAlerts from '@/ui/components/dashboard/SecurityAlerts';
import MaintenanceSchedule from '@/ui/components/dashboard/MaintenanceSchedule';
import WeatherReport from '@/ui/components/dashboard/WeatherReport';
import PersonnelStatus from '@/ui/components/dashboard/PersonnelStatus';
import '@/ui/styles/components/dashboard/commander-dashboard.css';

interface CommanderProfile {
  name: string;
  rank: string;
  unit: string;
  lastLogin: string;
  clearanceLevel: string;
}

interface DashboardStats {
  activeAssets: number;
  pendingTransfers: number;
  scheduledMaintenance: number;
  activePersonnel: number;
  securityAlerts: number;
}

// Add type definitions for the callback parameters
interface ScheduleClickHandler {
  (scheduleId: string): void;
}

interface WeatherAlertHandler {
  (alert: { type: string; severity: string; message: string }): void;
}

interface PersonnelClickHandler {
  (personnelId: string): void;
}

const CommanderDashboard: React.FC = () => {
  const [profile, setProfile] = useState<CommanderProfile | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 300000); // Refresh every 5 minutes
    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [profileResponse, statsResponse] = await Promise.all([
        fetch('/api/commander/profile'),
        fetch('/api/dashboard/stats')
      ]);

      if (!profileResponse.ok || !statsResponse.ok) {
        throw new Error('Failed to fetch dashboard data');
      }

      const profileData = await profileResponse.json();
      const statsData = await statsResponse.json();

      setProfile(profileData);
      setStats(statsData);
      setError(null);
    } catch (err) {
      setError('Error loading dashboard data. Please try again later.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="commander-dashboard">
      <header className="dashboard-header">
        <div className="commander-info">
          <h1>Welcome, {profile?.rank} {profile?.name}</h1>
          <p className="unit-info">{profile?.unit}</p>
          <p className="clearance-level">Clearance Level: {profile?.clearanceLevel}</p>
        </div>
        <div className="time-range-selector">
          <select 
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="form-select"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
        </div>
      </header>

      <div className="quick-stats">
        <div className="stat-card">
          <h3>Active Assets</h3>
          <p className="stat-value">{stats?.activeAssets}</p>
        </div>
        <div className="stat-card">
          <h3>Pending Transfers</h3>
          <p className="stat-value">{stats?.pendingTransfers}</p>
        </div>
        <div className="stat-card">
          <h3>Scheduled Maintenance</h3>
          <p className="stat-value">{stats?.scheduledMaintenance}</p>
        </div>
        <div className="stat-card">
          <h3>Active Personnel</h3>
          <p className="stat-value">{stats?.activePersonnel}</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="grid-item full-width">
          <SystemHealth timeRange={selectedTimeRange} />
        </div>
        
        <div className="grid-item">
          <AssetOverview />
        </div>
        
        <div className="grid-item">
          <SecurityAlerts 
            alertCount={stats?.securityAlerts || 0}
            onAlertClick={(alertId) => {
              // Handle alert click
              console.log('Alert clicked:', alertId);
            }}
          />
        </div>

        <div className="grid-item">
          <ActivityFeed 
            timeRange={selectedTimeRange}
            filter="high-priority"
          />
        </div>

        <div className="grid-item">
          <MaintenanceSchedule 
            onScheduleClick={(scheduleId: string) => {
              console.log('Schedule clicked:', scheduleId);
            }}
          />
        </div>

        <div className="grid-item">
          <WeatherReport 
            onWeatherAlert={(alert: { type: string; severity: string; message: string }) => {
              console.log('Weather alert:', alert);
            }}
          />
        </div>

        <div className="grid-item">
          <PersonnelStatus 
            activeCount={stats?.activePersonnel || 0}
            onPersonnelClick={(personnelId: string) => {
              console.log('Personnel clicked:', personnelId);
            }}
          />
        </div>
      </div>

      <footer className="dashboard-footer">
        <p>Last login: {profile?.lastLogin}</p>
        <button className="btn btn-secondary" onClick={fetchDashboardData}>
          Refresh Dashboard
        </button>
      </footer>
    </div>
  );
};

export default CommanderDashboard; 