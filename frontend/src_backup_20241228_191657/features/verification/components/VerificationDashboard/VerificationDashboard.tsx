// src/ui/components/verification/VerificationDashboard.tsx

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { FiRefreshCw } from 'react-icons/fi';

interface VerificationStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  overdue: number;
  completedToday: number;
  averageCompletionTime: number;
}

interface VerificationTrend {
  date: string;
  completed: number;
  failed: number;
}

interface DepartmentStats {
  department: string;
  completed: number;
  pending: number;
  compliance: number;
}

export const VerificationDashboard: React.FC = () => {
  const [stats, setStats] = useState<VerificationStats | null>(null);
  const [trends, setTrends] = useState<VerificationTrend[]>([]);
  const [departmentStats, setDepartmentStats] = useState<DepartmentStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { classificationLevel } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    fetchDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classificationLevel]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [statsResponse, trendsResponse, deptResponse] = await Promise.all([
        fetch('/api/verifications/stats', {
          headers: { 'Classification-Level': classificationLevel },
        }),
        fetch('/api/verifications/trends', {
          headers: { 'Classification-Level': classificationLevel },
        }),
        fetch('/api/verifications/department-stats', {
          headers: { 'Classification-Level': classificationLevel },
        }),
      ]);

      if (!statsResponse.ok || !trendsResponse.ok || !deptResponse.ok) {
        throw new Error('Failed to fetch dashboard data');
      }

      const [statsData, trendsData, deptData] = await Promise.all([
        statsResponse.json(),
        trendsResponse.json(),
        deptResponse.json(),
      ]);

      setStats(statsData);
      setTrends(trendsData);
      setDepartmentStats(deptData);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading dashboard...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!stats) return <div className="error-message">No data available</div>;

  return (
    <div className="verification-dashboard">
      <header className="dashboard-header">
        <h2>Verification Status Dashboard</h2>
        <div className="header-actions">
          <button className="btn-secondary" onClick={fetchDashboardData}>
            <FiRefreshCw /> Refresh Data
          </button>
        </div>
      </header>

      <div className="dashboard-grid">
        {/* Overview Cards */}
        <section className="stats-overview">
          <div className="stat-card total">
            <h3>Total Verifications</h3>
            <div className="stat-value">{stats.total}</div>
          </div>
          <div className="stat-card pending">
            <h3>Pending</h3>
            <div className="stat-value">{stats.pending}</div>
          </div>
          <div className="stat-card approved">
            <h3>Approved</h3>
            <div className="stat-value">{stats.approved}</div>
          </div>
          <div className="stat-card rejected">
            <h3>Rejected</h3>
            <div className="stat-value">{stats.rejected}</div>
          </div>
        </section>

        {/* Alerts Section */}
        <section className="verification-alerts">
          <h3>Critical Alerts</h3>
          <div className="alert-items">
            {stats.overdue > 0 && (
              <div className="alert-item overdue">
                <span className="alert-icon">⚠️</span>
                <div className="alert-content">
                  <h4>{stats.overdue} Overdue Verifications</h4>
                  <p>Require immediate attention</p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Trends Chart */}
        <section className="verification-trends">
          <h3>Verification Trends</h3>
          <div className="trends-chart">
            {trends.map((trend) => (
              <div key={trend.date} className="trend-bar">
                <div
                  className="bar-completed"
                  style={{ height: `${(trend.completed / stats.total) * 100}%` }}
                />
                <div
                  className="bar-failed"
                  style={{ height: `${(trend.failed / stats.total) * 100}%` }}
                />
                <span className="trend-date">
                  {new Date(trend.date).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Department Performance */}
        <section className="department-performance">
          <h3>Department Performance</h3>
          <div className="department-grid">
            {departmentStats.map((dept) => (
              <div key={dept.department} className="department-card">
                <h4>{dept.department}</h4>
                <div className="department-stats">
                  <div className="stat">
                    <label>Completed</label>
                    <span>{dept.completed}</span>
                  </div>
                  <div className="stat">
                    <label>Pending</label>
                    <span>{dept.pending}</span>
                  </div>
                  <div className="compliance-meter">
                    <div
                      className="compliance-fill"
                      style={{ width: `${dept.compliance}%` }}
                    />
                    <span className="compliance-text">
                      {dept.compliance}% Compliance
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Performance Metrics */}
        <section className="performance-metrics">
          <h3>Performance Metrics</h3>
          <div className="metrics-grid">
            <div className="metric-card">
              <h4>Completed Today</h4>
              <div className="metric-value">{stats.completedToday}</div>
            </div>
            <div className="metric-card">
              <h4>Average Completion Time</h4>
              <div className="metric-value">
                {stats.averageCompletionTime} hours
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
