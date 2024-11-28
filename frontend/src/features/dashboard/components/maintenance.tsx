/* frontend/src/pages/dashboard/maintenance.tsx */

import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '@/ui/styles/dashboard/maintenance-dashboard.css';

interface MaintenanceTask {
  id: string;
  assetId: string;
  assetName: string;
  scheduledDate: string;
  technician: string;
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
  priority: 'low' | 'medium' | 'high';
  description: string;
  estimatedDuration: number;
  actualDuration?: number;
}

interface MaintenanceStats {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  overdueTasks: number;
  averageCompletionTime: number;
}

const MaintenanceDashboard: React.FC = () => {
  const [tasks, setTasks] = useState<MaintenanceTask[]>([]);
  const [stats, setStats] = useState<MaintenanceStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<MaintenanceTask | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [sortField, setSortField] = useState<keyof MaintenanceTask>('scheduledDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    fetchMaintenanceData();
    const interval = setInterval(fetchMaintenanceData, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  const fetchMaintenanceData = async () => {
    try {
      const [tasksResponse, statsResponse] = await Promise.all([
        fetch('/api/maintenance/tasks'),
        fetch('/api/maintenance/stats')
      ]);

      if (!tasksResponse.ok || !statsResponse.ok) {
        throw new Error('Failed to fetch maintenance data');
      }

      const [tasksData, statsData] = await Promise.all([
        tasksResponse.json(),
        statsResponse.json()
      ]);

      setTasks(tasksData);
      setStats(statsData);
      setError(null);
    } catch (err) {
      setError('Error loading maintenance data');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (field: keyof MaintenanceTask) => {
    setSortField(field);
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  const filteredAndSortedTasks = tasks
    .filter(task => filterStatus === 'all' || task.status === filterStatus)
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      const direction = sortDirection === 'asc' ? 1 : -1;
      return aValue < bValue ? -direction : direction;
    });

  if (loading) {
    return <div className="loading">Loading maintenance dashboard...</div>;
  }

  return (
    <div className="maintenance-dashboard">
      <div className="dashboard-header">
        <h2>Maintenance Dashboard</h2>
        <div className="controls">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="status-filter"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="overdue">Overdue</option>
          </select>
          <button onClick={fetchMaintenanceData} className="refresh-button">
            Refresh Data
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {stats && (
        <div className="stats-overview">
          <div className="stat-card">
            <h3>Total Tasks</h3>
            <p>{stats.totalTasks}</p>
          </div>
          <div className="stat-card">
            <h3>Completed</h3>
            <p>{stats.completedTasks}</p>
          </div>
          <div className="stat-card">
            <h3>Pending</h3>
            <p>{stats.pendingTasks}</p>
          </div>
          <div className="stat-card">
            <h3>Overdue</h3>
            <p>{stats.overdueTasks}</p>
          </div>
        </div>
      )}

      <div className="tasks-container">
        <table className="data-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('assetName')}>
                Asset {sortField === 'assetName' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('scheduledDate')}>
                Scheduled Date {sortField === 'scheduledDate' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('technician')}>
                Technician {sortField === 'technician' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('priority')}>
                Priority {sortField === 'priority' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('status')}>
                Status {sortField === 'status' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedTasks.map((task) => (
              <tr 
                key={task.id}
                className={`status-${task.status} priority-${task.priority}`}
              >
                <td>{task.assetName}</td>
                <td>{new Date(task.scheduledDate).toLocaleDateString()}</td>
                <td>{task.technician}</td>
                <td>
                  <span className={`priority-badge ${task.priority}`}>
                    {task.priority}
                  </span>
                </td>
                <td>
                  <span className={`status-badge ${task.status}`}>
                    {task.status}
                  </span>
                </td>
                <td>
                  <button 
                    onClick={() => setSelectedTask(task)}
                    className="btn btn-secondary btn-sm"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedTask && (
        <div className="modal-overlay" onClick={() => setSelectedTask(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>Task Details</h3>
            <div className="task-details">
              <p><strong>Asset:</strong> {selectedTask.assetName}</p>
              <p><strong>Asset ID:</strong> {selectedTask.assetId}</p>
              <p><strong>Scheduled Date:</strong> {new Date(selectedTask.scheduledDate).toLocaleString()}</p>
              <p><strong>Technician:</strong> {selectedTask.technician}</p>
              <p><strong>Status:</strong> {selectedTask.status}</p>
              <p><strong>Priority:</strong> {selectedTask.priority}</p>
              <p><strong>Description:</strong> {selectedTask.description}</p>
              <p><strong>Estimated Duration:</strong> {selectedTask.estimatedDuration} hours</p>
              {selectedTask.actualDuration && (
                <p><strong>Actual Duration:</strong> {selectedTask.actualDuration} hours</p>
              )}
            </div>
            <div className="modal-actions">
              <button 
                className="btn btn-primary"
                onClick={() => {/* Handle update status */}}
              >
                Update Status
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => setSelectedTask(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MaintenanceDashboard; 