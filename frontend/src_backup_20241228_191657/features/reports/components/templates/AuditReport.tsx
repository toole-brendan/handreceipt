/* frontend/src/pages/reports/templates/AuditReport.tsx */

import React, { useState, useEffect } from 'react';
import '@/styles/features/reports/templates/audit-report.css';
import { ReportClassificationBadge } from '@/features/reports/component../ReportClassificationBadge/ReportClassificationBadge';

interface AuditEvent {
  id: string;
  timestamp: string;
  eventType: 'transfer' | 'modification' | 'verification' | 'access' | 'system';
  actor: {
    id: string;
    name: string;
    rank: string;
    unit: string;
    role: string;
  };
  asset?: {
    id: string;
    name: string;
    serialNumber: string;
    category: string;
  };
  action: string;
  details: string;
  location?: string;
  systemInfo?: {
    ipAddress: string;
    deviceId: string;
    platform: string;
  };
  classification: 'UNCLASSIFIED' | 'CONFIDENTIAL' | 'SECRET' | 'TOP_SECRET';
  verificationStatus?: 'pending' | 'verified' | 'flagged';
  relatedEvents?: string[];
}

interface AuditStats {
  totalEvents: number;
  byEventType: Record<string, number>;
  byUnit: Record<string, number>;
  byClassification: Record<string, number>;
  flaggedEvents: number;
  pendingVerification: number;
  systemAccess: {
    authorized: number;
    unauthorized: number;
    failedAttempts: number;
  };
}

const AuditReport: React.FC = () => {
  const [auditEvents, setAuditEvents] = useState<AuditEvent[]>([]);
  const [stats, setStats] = useState<AuditStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchAuditData();
  }, [selectedTimeframe]);

  const fetchAuditData = async () => {
    try {
      // Mock data - replace with actual API call
      const mockAuditEvents: AuditEvent[] = [
        {
          id: "AE001",
          timestamp: new Date().toISOString(),
          eventType: "transfer",
          actor: {
            id: "USR123",
            name: "Johnson, Robert",
            rank: "SGT",
            unit: "B CO, 1-23 IN",
            role: "Supply NCO"
          },
          asset: {
            id: "AST456",
            name: "M4 Carbine",
            serialNumber: "M4-2024-789",
            category: "Weapons"
          },
          action: "TRANSFER_INITIATED",
          details: "Initiated transfer of weapon to Alpha Company armory",
          location: "Building 2150, Fort Liberty",
          classification: "CONFIDENTIAL",
          verificationStatus: "verified"
        }
      ];

      const mockStats: AuditStats = {
        totalEvents: 1250,
        byEventType: {
          transfer: 450,
          modification: 320,
          verification: 280,
          access: 150,
          system: 50
        },
        byUnit: {
          "B CO, 1-23 IN": 400,
          "A CO, 1-23 IN": 350,
          "C CO, 1-23 IN": 300,
          "HHC, 1-23 IN": 200
        },
        byClassification: {
          UNCLASSIFIED: 800,
          CONFIDENTIAL: 300,
          SECRET: 125,
          TOP_SECRET: 25
        },
        flaggedEvents: 15,
        pendingVerification: 45,
        systemAccess: {
          authorized: 2500,
          unauthorized: 75,
          failedAttempts: 150
        }
      };

      setAuditEvents(mockAuditEvents);
      setStats(mockStats);
    } catch (error) {
      setError('Error fetching audit data');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading audit report...</div>;
  }

  return (
    <div className="audit-report">
      <div className="report-header">
        <h2>Command Audit Report</h2>
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

      <div className="audit-filters">
        <input
          type="text"
          placeholder="Search audit events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-filter"
        >
          <option value="all">All Categories</option>
          <option value="transfer">Transfers</option>
          <option value="modification">Modifications</option>
          <option value="verification">Verifications</option>
          <option value="access">Access Events</option>
          <option value="system">System Events</option>
        </select>
        <select
          value={selectedTimeframe}
          onChange={(e) => setSelectedTimeframe(e.target.value)}
          className="timeframe-filter"
        >
          <option value="24h">Last 24 Hours</option>
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="custom">Custom Range</option>
        </select>
      </div>

      <div className="audit-table-container">
        <table className="audit-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Event Type</th>
              <th>Actor</th>
              <th>Action</th>
              <th>Asset</th>
              <th>Classification</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {auditEvents.map(event => (
              <tr key={event.id}>
                <td>{new Date(event.timestamp).toLocaleString()}</td>
                <td>
                  <span className={`event-type-badge ${event.eventType}`}>
                    {event.eventType}
                  </span>
                </td>
                <td>
                  <div className="actor-info">
                    <span className="actor-name">{event.actor.rank} {event.actor.name}</span>
                    <span className="actor-unit">{event.actor.unit}</span>
                  </div>
                </td>
                <td>{event.action}</td>
                <td>
                  {event.asset && (
                    <div className="asset-info">
                      <span className="asset-name">{event.asset.name}</span>
                      <span className="asset-serial">{event.asset.serialNumber}</span>
                    </div>
                  )}
                </td>
                <td>
                  <ReportClassificationBadge level={event.classification} />
                </td>
                <td>
                  <span className={`status-badge ${event.verificationStatus}`}>
                    {event.verificationStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="report-footer">
        <p>Generated on: {new Date().toLocaleString()}</p>
        <p>This is an official audit report - Handle according to classification</p>
      </div>
    </div>
  );
};

export default AuditReport; 