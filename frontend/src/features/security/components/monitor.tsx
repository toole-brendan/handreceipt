import React, { useState, useEffect } from 'react';
import '@/ui/styles/pages/security/monitor.css';

interface SecurityEvent {
  id: number;
  timestamp: string;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  status: 'active' | 'acknowledged' | 'resolved';
}

const SecurityMonitor: React.FC = () => {
  const [events, setEvents] = useState<SecurityEvent[]>([]);
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch security events from API
    const fetchSecurityEvents = async () => {
      setLoading(true);
      try {
        // Replace with your API call
        const response = await fetch('/api/security/events');
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching security events:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSecurityEvents();
  }, []);

  const handleAcknowledge = (id: number) => {
    // Update the event status
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === id ? { ...event, status: 'acknowledged' } : event
      )
    );
    // You might want to send an API request here to update the backend
  };

  const filteredEvents = events.filter((event) => {
    if (filterSeverity === 'all') return true;
    return event.severity === filterSeverity;
  });

  return (
    <div className="palantir-panel security-monitor">
      <div className="monitor-header">
        <h2>Security Monitor</h2>
        <div className="filter-options">
          <label>Filter by Severity: </label>
          <select
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value)}
            className="form-input"
          >
            <option value="all">All</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* System Health Overview */}
      <div className="system-health-overview">
        <div className="health-metric">
          <h3>Threat Level</h3>
          <span className="threat-level critical">Critical</span>
        </div>
        <div className="health-metric">
          <h3>Active Incidents</h3>
          <span>{events.filter((e) => e.status === 'active').length}</span>
        </div>
        {/* Add more health metrics as needed */}
      </div>

      {/* Security Event Logs */}
      <div className="security-events">
        <h3>Recent Security Events</h3>
        {loading ? (
          <p>Loading events...</p>
        ) : filteredEvents.length === 0 ? (
          <p>No events to display.</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Type</th>
                <th>Severity</th>
                <th>Description</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map((event) => (
                <tr key={event.id}>
                  <td>{event.timestamp}</td>
                  <td>{event.type}</td>
                  <td className={`severity ${event.severity}`}>{event.severity}</td>
                  <td>{event.description}</td>
                  <td>{event.status}</td>
                  <td>
                    {event.status === 'active' && (
                      <button
                        className="btn btn-secondary"
                        onClick={() => handleAcknowledge(event.id)}
                      >
                        Acknowledge
                      </button>
                    )}
                    {/* Add more actions as needed */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default SecurityMonitor;