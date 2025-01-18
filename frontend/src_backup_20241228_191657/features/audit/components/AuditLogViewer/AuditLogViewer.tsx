// src/ui/components/audit/AuditLogViewer.tsx

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { FiEye, FiDownload, FiX } from 'react-icons/fi';

interface AuditLog {
  id: string;
  timestamp: string;
  actor: {
    id: string;
    name: string;
    rank: string;
  };
  action: string;
  category: 'asset' | 'user' | 'system' | 'security';
  severity: 'info' | 'warning' | 'critical';
  details: string;
  classification: string;
  relatedAsset?: {
    id: string;
    name: string;
  };
}

interface AuditFilters {
  dateRange: {
    start: string;
    end: string;
  };
  category?: AuditLog['category'];
  severity?: AuditLog['severity'];
  actor?: string;
}

export const AuditLogViewer: React.FC = () => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<AuditFilters>({
    dateRange: {
      start: '',
      end: ''
    }
  });
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);
  const { classificationLevel } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    fetchAuditLogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, classificationLevel]);

  const fetchAuditLogs = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (filters.category) queryParams.append('category', filters.category);
      if (filters.severity) queryParams.append('severity', filters.severity);
      if (filters.dateRange) {
        queryParams.append('startDate', filters.dateRange.start);
        queryParams.append('endDate', filters.dateRange.end);
      }
      if (filters.actor) queryParams.append('actor', filters.actor);

      const response = await fetch(`/api/audit/logs?${queryParams}`, {
        headers: {
          'Classification-Level': classificationLevel,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch audit logs');
      }

      const data = await response.json();
      setLogs(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const exportLogs = async () => {
    try {
      const response = await fetch('/api/audit/logs/export', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Classification-Level': classificationLevel,
        },
        body: JSON.stringify({ filters }),
      });

      if (!response.ok) {
        throw new Error('Failed to export logs');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `audit-logs-${new Date().toISOString()}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Export failed');
    }
  };

  const handleDateChange = (field: 'start' | 'end', value: string) => {
    setFilters(prev => ({
      ...prev,
      dateRange: {
        ...prev.dateRange,
        [field]: value
      }
    }));
  };

  return (
    <div className="audit-log-viewer">
      <header className="audit-header">
        <h2>Audit Logs</h2>
        <div className="header-actions">
          <button className="btn-secondary" onClick={exportLogs}>
            <FiDownload /> Export Logs
          </button>
        </div>
      </header>

      <div className="audit-filters">
        <div className="filter-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={filters.category || ''}
            onChange={(e) =>
              setFilters({ ...filters, category: e.target.value as AuditLog['category'] })
            }
          >
            <option value="">All Categories</option>
            <option value="asset">Asset</option>
            <option value="user">User</option>
            <option value="system">System</option>
            <option value="security">Security</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="severity">Severity</label>
          <select
            id="severity"
            value={filters.severity || ''}
            onChange={(e) =>
              setFilters({ ...filters, severity: e.target.value as AuditLog['severity'] })
            }
          >
            <option value="">All Severities</option>
            <option value="info">Info</option>
            <option value="warning">Warning</option>
            <option value="critical">Critical</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Date Range</label>
          <div className="date-inputs">
            <input
              type="date"
              value={filters.dateRange.start}
              onChange={(e) => handleDateChange('start', e.target.value)}
            />
            <span>to</span>
            <input
              type="date"
              value={filters.dateRange.end}
              onChange={(e) => handleDateChange('end', e.target.value)}
            />
          </div>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading audit logs...</div>
      ) : (
        <div className="audit-logs">
          <table className="data-table audit-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Actor</th>
                <th>Category</th>
                <th>Action</th>
                <th>Severity</th>
                <th>Classification</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr
                  key={log.id}
                  className={`severity-${log.severity}`}
                  onClick={() => setSelectedLog(log)}
                >
                  <td>{new Date(log.timestamp).toLocaleString()}</td>
                  <td>{`${log.actor.rank} ${log.actor.name}`}</td>
                  <td>
                    <span className={`category-badge category-${log.category}`}>
                      {log.category}
                    </span>
                  </td>
                  <td>{log.action}</td>
                  <td>
                    <span className={`severity-badge severity-${log.severity}`}>
                      {log.severity}
                    </span>
                  </td>
                  <td>
                    <span className="classification-badge">
                      {log.classification}
                    </span>
                  </td>
                  <td>
                    <button className="btn-icon" title="View Details">
                      <FiEye />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedLog && (
        <div className="modal-overlay">
          <div className="modal-content">
            <header className="modal-header">
              <h3>Audit Log Details</h3>
              <button
                className="btn-close"
                onClick={() => setSelectedLog(null)}
                aria-label="Close Modal"
              >
                <FiX />
              </button>
            </header>

            <div className="audit-details">
              <div className="detail-group">
                <label>Timestamp</label>
                <span>{new Date(selectedLog.timestamp).toLocaleString()}</span>
              </div>

              <div className="detail-group">
                <label>Actor</label>
                <span>{`${selectedLog.actor.rank} ${selectedLog.actor.name}`}</span>
              </div>

              <div className="detail-group">
                <label>Action</label>
                <span>{selectedLog.action}</span>
              </div>

              <div className="detail-group">
                <label>Details</label>
                <p className="log-details">{selectedLog.details}</p>
              </div>

              {selectedLog.relatedAsset && (
                <div className="detail-group">
                  <label>Related Asset</label>
                  <span>{selectedLog.relatedAsset.name}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
