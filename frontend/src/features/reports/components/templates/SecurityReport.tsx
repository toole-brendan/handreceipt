import React, { useState, useEffect } from 'react';
import '@/ui/styles/reports/templates/security-report.css';
import { ReportClassificationBadge } from '@/ui/components/reports/ReportClassificationBadge';

interface SecurityIncident {
  id: string;
  timestamp: string;
  type: 'breach' | 'violation' | 'attempt' | 'policy' | 'physical';
  severity: 'critical' | 'high' | 'medium' | 'low';
  location: string;
  description: string;
  status: 'open' | 'investigating' | 'resolved' | 'closed';
  classification: 'UNCLASSIFIED' | 'CONFIDENTIAL' | 'SECRET' | 'TOP_SECRET';
  involvedPersonnel?: {
    name: string;
    rank: string;
    unit: string;
    role: string;
  }[];
  responseActions: string[];
  resolutionDetails?: string;
}

interface SecurityMetrics {
  totalIncidents: number;
  activeThreats: number;
  resolvedIncidents: number;
  byClassification: Record<string, number>;
  bySeverity: Record<string, number>;
  byType: Record<string, number>;
  responseMetrics: {
    averageResponseTime: number;
    averageResolutionTime: number;
    escalationRate: number;
  };
}

const SecurityReport: React.FC = () => {
  const [incidents, setIncidents] = useState<SecurityIncident[]>([]);
  const [metrics, setMetrics] = useState<SecurityMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');

  useEffect(() => {
    fetchSecurityData();
  }, [selectedTimeframe]);

  const fetchSecurityData = async () => {
    try {
      // Mock data - replace with actual API call
      const mockIncidents: SecurityIncident[] = [
        {
          id: "SI001",
          timestamp: new Date().toISOString(),
          type: "breach",
          severity: "high",
          location: "Server Room B, Building 2150",
          description: "Unauthorized access attempt to classified network",
          status: "resolved",
          classification: "SECRET",
          involvedPersonnel: [
            {
              name: "Thompson, James",
              rank: "SFC",
              unit: "HHC, 1-23 IN",
              role: "Cyber Security NCO"
            }
          ],
          responseActions: [
            "Immediate system lockdown initiated",
            "Security team deployed",
            "Access logs analyzed",
            "Additional authentication measures implemented"
          ],
          resolutionDetails: "Breach attempt blocked, security protocols updated"
        }
      ];

      const mockMetrics: SecurityMetrics = {
        totalIncidents: 75,
        activeThreats: 12,
        resolvedIncidents: 63,
        byClassification: {
          UNCLASSIFIED: 30,
          CONFIDENTIAL: 25,
          SECRET: 15,
          TOP_SECRET: 5
        },
        bySeverity: {
          critical: 8,
          high: 17,
          medium: 30,
          low: 20
        },
        byType: {
          breach: 15,
          violation: 20,
          attempt: 25,
          policy: 10,
          physical: 5
        },
        responseMetrics: {
          averageResponseTime: 15, // minutes
          averageResolutionTime: 120, // minutes
          escalationRate: 0.25 // 25%
        }
      };

      setIncidents(mockIncidents);
      setMetrics(mockMetrics);
    } catch (error) {
      setError('Error fetching security data');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderMetricsOverview = () => (
    <div className="security-metrics-section">
      <h3>Security Metrics Overview</h3>
      <div className="metrics-grid">
        <div className="metric-card total">
          <span className="metric-value">{metrics?.totalIncidents}</span>
          <span className="metric-label">Total Incidents</span>
        </div>
        <div className="metric-card active">
          <span className="metric-value">{metrics?.activeThreats}</span>
          <span className="metric-label">Active Threats</span>
        </div>
        <div className="metric-card resolved">
          <span className="metric-value">{metrics?.resolvedIncidents}</span>
          <span className="metric-label">Resolved</span>
        </div>
        <div className="metric-card response">
          <span className="metric-value">{metrics?.responseMetrics.averageResponseTime}m</span>
          <span className="metric-label">Avg Response Time</span>
        </div>
      </div>
    </div>
  );

  const renderIncidentsList = () => (
    <div className="security-incidents-section">
      <h3>Security Incidents</h3>
      <div className="incidents-table-container">
        <table className="incidents-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Type</th>
              <th>Severity</th>
              <th>Location</th>
              <th>Classification</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {incidents.map(incident => (
              <tr key={incident.id} className={`severity-${incident.severity}`}>
                <td>{new Date(incident.timestamp).toLocaleString()}</td>
                <td>
                  <span className={`incident-type-badge ${incident.type}`}>
                    {incident.type}
                  </span>
                </td>
                <td>
                  <span className={`severity-badge ${incident.severity}`}>
                    {incident.severity}
                  </span>
                </td>
                <td>{incident.location}</td>
                <td>
                  <ReportClassificationBadge level={incident.classification} />
                </td>
                <td>
                  <span className={`status-badge ${incident.status}`}>
                    {incident.status}
                  </span>
                </td>
                <td>
                  <button className="btn-secondary">View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  if (loading) {
    return <div className="loading">Loading security report...</div>;
  }

  return (
    <div className="security-report">
      <div className="report-header">
        <h2>Security Status Report</h2>
        <div className="report-actions">
          <button className="btn-primary" onClick={() => window.print()}>
            Print Report
          </button>
          <button className="btn-secondary" onClick={() => {}}>
            Export to PDF
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {renderMetricsOverview()}
      {renderIncidentsList()}

      <div className="report-footer">
        <p>Generated on: {new Date().toLocaleString()}</p>
        <p>This is an official security report - Handle according to classification</p>
      </div>
    </div>
  );
};

export default SecurityReport; 