import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import SystemStatus from './SystemStatus';
import ActivityFeed from './ActivityFeed';
import '@styles/pages/dashboard.css';

// New interfaces for Officer Dashboard
interface SensitiveItemStatus {
  itemType: string;
  totalCount: number;
  accountedFor: number;
  lastInventory: string;
  discrepancies: number;
}

interface VehicleStatus {
  type: string;
  operational: number;
  deadlined: number;
  maintenance: number;
  criticalIssues: string[];
}

interface HandReceipt {
  id: string;
  type: string;
  from: string;
  to: string;
  items: string[];
  dateSubmitted: string;
  priority: 'high' | 'medium' | 'low';
}

interface CommandAlert {
  id: string;
  type: 'urgent' | 'critical';
  message: string;
  timestamp: string;
  requiresAction: boolean;
}

// New interfaces for NCO Dashboard
interface SquadEquipment {
  type: string;
  assigned: number;
  serviceable: number;
  unserviceable: number;
  maintenance: MaintenanceItem[];
}

interface MaintenanceItem {
  id: string;
  equipment: string;
  issue: string;
  priority: 'immediate' | 'routine';
  deadline: string;
}

interface TeamAlert {
  id: string;
  equipmentType: string;
  issue: string;
  soldier: string;
  timestamp: string;
  status: 'pending' | 'in-progress';
}

// New interfaces for Soldier Dashboard
interface PersonalEquipment {
  id: string;
  type: string;
  serialNumber: string;
  status: 'serviceable' | 'unserviceable' | 'maintenance-required';
  lastMaintenance: string;
  nextMaintenance: string;
  issues?: string[];
}

interface ScheduledEvent {
  id: string;
  type: 'inventory' | 'inspection' | 'maintenance';
  date: string;
  description: string;
  location: string;
  status: 'upcoming' | 'overdue';
}

interface MaintenanceTask {
  id: string;
  equipment: string;
  task: string;
  deadline: string;
  priority: 'routine' | 'urgent';
  completed: boolean;
}

const OfficerDashboard: React.FC = () => {
  // Mock data - replace with actual API calls
  const mockData = {
    sensitiveItems: [
      {
        itemType: 'Weapons',
        totalCount: 120,
        accountedFor: 120,
        lastInventory: '2024-03-26T08:00:00Z',
        discrepancies: 0
      },
      {
        itemType: 'NVGs',
        totalCount: 45,
        accountedFor: 44,
        lastInventory: '2024-03-26T08:00:00Z',
        discrepancies: 1
      }
    ],
    vehicles: {
      operational: 12,
      deadlined: 2,
      maintenance: 3,
      criticalIssues: [
        'HMMWV #A123 - Transmission failure',
        'MRAP #B456 - Weapons system maintenance required'
      ]
    },
    pendingReceipts: [
      {
        id: 'HR001',
        type: 'Equipment Transfer',
        from: 'Alpha Company',
        to: 'Bravo Company',
        items: ['M2 .50 Cal', 'Tripod, M3'],
        dateSubmitted: '2024-03-25T15:30:00Z',
        priority: 'high'
      }
    ],
    commandAlerts: [
      {
        id: 'ALT001',
        type: 'urgent',
        message: 'NVG discrepancy in 2nd Platoon requires immediate attention',
        timestamp: '2024-03-26T10:15:00Z',
        requiresAction: true
      }
    ]
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Command Dashboard</h1>
        <div className="dashboard-description">
          Unit Status and Critical Items Overview
        </div>
      </div>
      
      <div className="dashboard-grid">
        {/* Critical Status Overview */}
        <section className="dashboard__section dashboard__section--half">
          <h2>Sensitive Item Accountability</h2>
          <div className="status-cards">
            {mockData.sensitiveItems.map(item => (
              <div key={item.itemType} className="status-card">
                <div className="status-card__header">
                  <h3>{item.itemType}</h3>
                  <div className={`status-badge ${item.discrepancies > 0 ? 'status-badge--critical' : 'status-badge--good'}`}>
                    {item.discrepancies > 0 ? 'Action Required' : 'All Accounted'}
                  </div>
                </div>
                <div className="status-card__content">
                  <div className="status-card__metric">
                    <span className="metric-label">Accountability</span>
                    <span className="metric-value">{item.accountedFor}/{item.totalCount}</span>
                  </div>
                  {item.discrepancies > 0 && (
                    <div className="status-card__alert">
                      {item.discrepancies} item{item.discrepancies > 1 ? 's' : ''} require verification
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Vehicle Status */}
        <section className="dashboard__section dashboard__section--half">
          <h2>Vehicle Status</h2>
          <div className="status-cards">
            <div className="status-card">
              <div className="status-card__header">
                <h3>Operational Readiness</h3>
                <div className={`status-badge ${
                  mockData.vehicles.deadlined > 0 ? 'status-badge--warning' : 'status-badge--good'
                }`}>
                  {mockData.vehicles.operational} Operational
                </div>
              </div>
              <div className="status-metrics">
                <div className="metric">
                  <span className="metric-label">Deadlined</span>
                  <span className="metric-value">{mockData.vehicles.deadlined}</span>
                </div>
                <div className="metric">
                  <span className="metric-label">Maintenance</span>
                  <span className="metric-value">{mockData.vehicles.maintenance}</span>
                </div>
              </div>
            </div>
          </div>
          {mockData.vehicles.criticalIssues.length > 0 && (
            <div className="critical-issues-list">
              <h4>Critical Issues</h4>
              {mockData.vehicles.criticalIssues.map((issue, index) => (
                <div key={index} className="critical-issue-item">
                  {issue}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Hand Receipts and Alerts in a single row */}
        <div className="dashboard-row">
          <section className="dashboard__section dashboard__section--half">
            <h2>Pending Hand Receipts</h2>
            <div className="receipt-list">
              {mockData.pendingReceipts.map(receipt => (
                <div key={receipt.id} className="receipt-item">
                  <div className="receipt-item__header">
                    <span className={`priority-indicator priority-${receipt.priority}`} />
                    <span className="receipt-date">
                      {new Date(receipt.dateSubmitted).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="receipt-item__content">
                    <div className="transfer-details">
                      <span>{receipt.from}</span>
                      <span className="transfer-arrow">→</span>
                      <span>{receipt.to}</span>
                    </div>
                    <div className="item-list">{receipt.items.join(', ')}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="dashboard__section dashboard__section--half">
            <h2>Command Alerts</h2>
            <div className="alert-list">
              {mockData.commandAlerts.map(alert => (
                <div key={alert.id} className="alert-item">
                  <div className={`alert-item__content alert-type-${alert.type}`}>
                    <p>{alert.message}</p>
                    <span className="alert-timestamp">
                      {new Date(alert.timestamp).toLocaleString()}
                    </span>
                  </div>
                  {alert.requiresAction && (
                    <button className="action-button">Take Action</button>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const NCODashboard: React.FC = () => {
  const mockData = {
    squadEquipment: {
      weapons: {
        type: 'Weapons',
        assigned: 12,
        serviceable: 11,
        unserviceable: 1,
        maintenance: [
          {
            id: 'M1',
            equipment: 'M4 Carbine',
            issue: 'Broken firing pin',
            priority: 'immediate',
            deadline: '2024-03-27T12:00:00Z'
          }
        ]
      },
      optics: {
        type: 'Optics',
        assigned: 12,
        serviceable: 12,
        unserviceable: 0,
        maintenance: []
      },
      comms: {
        type: 'Communications',
        assigned: 6,
        serviceable: 5,
        unserviceable: 1,
        maintenance: [
          {
            id: 'C1',
            equipment: 'ASIP Radio',
            issue: 'Battery contact corroded',
            priority: 'routine',
            deadline: '2024-03-29T12:00:00Z'
          }
        ]
      }
    },
    teamAlerts: [
      {
        id: 'TA001',
        equipmentType: 'M4 Carbine',
        issue: 'Maintenance overdue',
        soldier: 'PFC Johnson',
        timestamp: '2024-03-26T09:00:00Z',
        status: 'pending'
      },
      {
        id: 'TA002',
        equipmentType: 'ASIP Radio',
        issue: 'Monthly inspection required',
        soldier: 'SPC Smith',
        timestamp: '2024-03-26T10:00:00Z',
        status: 'in-progress'
      }
    ]
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Squad Equipment Status</h1>
        <div className="dashboard-description">
          Monitor squad equipment and maintenance status
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Equipment Status Overview */}
        <section className="dashboard__section dashboard__section--half">
          <h2>Equipment Accountability</h2>
          <div className="status-cards">
            {Object.values(mockData.squadEquipment).map(equipment => (
              <div key={equipment.type} className="status-card">
                <div className="status-card__header">
                  <h3>{equipment.type}</h3>
                  <div className={`status-badge ${
                    equipment.unserviceable > 0 ? 'status-badge--warning' : 'status-badge--good'
                  }`}>
                    {equipment.unserviceable > 0 ? 'Action Required' : 'All Serviceable'}
                  </div>
                </div>
                <div className="status-card__content">
                  <div className="status-card__metric">
                    <span className="metric-label">Serviceable</span>
                    <span className="metric-value">{equipment.serviceable}/{equipment.assigned}</span>
                  </div>
                  {equipment.maintenance.length > 0 && (
                    <div className="maintenance-list">
                      {equipment.maintenance.map(item => (
                        <div key={item.id} className={`maintenance-item priority-${item.priority}`}>
                          <div className="maintenance-header">
                            <span>{item.equipment}</span>
                            <span className="deadline">
                              Due: {new Date(item.deadline).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="maintenance-issue">{item.issue}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Team Equipment Issues */}
        <section className="dashboard__section dashboard__section--half">
          <h2>Team Equipment Issues</h2>
          <div className="alert-list">
            {mockData.teamAlerts.map(alert => (
              <div key={alert.id} className="alert-item">
                <div className="alert-item__header">
                  <div className="alert-item__title">
                    <span className="equipment-type">{alert.equipmentType}</span>
                    <span className={`status-badge status-badge--${
                      alert.status === 'pending' ? 'warning' : 'info'
                    }`}>
                      {alert.status}
                    </span>
                  </div>
                  <span className="alert-timestamp">
                    {new Date(alert.timestamp).toLocaleString()}
                  </span>
                </div>
                <div className="alert-item__content">
                  <div className="alert-details">
                    <div className="soldier-info">
                      <span className="label">Soldier:</span>
                      <span>{alert.soldier}</span>
                    </div>
                    <div className="issue-info">
                      <span className="label">Issue:</span>
                      <span>{alert.issue}</span>
                    </div>
                  </div>
                  <button className="action-button">
                    {alert.status === 'pending' ? 'Address Issue' : 'View Progress'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

const SoldierDashboard: React.FC = () => {
  const mockData = {
    personalEquipment: [
      {
        id: 'WPN001',
        type: 'M4 Carbine',
        serialNumber: 'M4-123456',
        status: 'serviceable',
        lastMaintenance: '2024-03-20T10:00:00Z',
        nextMaintenance: '2024-04-20T10:00:00Z'
      },
      {
        id: 'NVG001',
        type: 'PVS-14',
        serialNumber: 'PVS-789012',
        status: 'maintenance-required',
        lastMaintenance: '2024-02-15T10:00:00Z',
        nextMaintenance: '2024-03-15T10:00:00Z',
        issues: ['Battery housing loose']
      }
    ],
    scheduledEvents: [
      {
        id: 'INV001',
        type: 'inventory',
        date: '2024-03-28T09:00:00Z',
        description: 'Weekly Sensitive Items Inventory',
        location: 'Company Arms Room',
        status: 'upcoming'
      },
      {
        id: 'INSP001',
        type: 'inspection',
        date: '2024-03-27T13:00:00Z',
        description: 'Weapons Maintenance Inspection',
        location: 'Battalion Motor Pool',
        status: 'upcoming'
      }
    ],
    maintenanceTasks: [
      {
        id: 'MAINT001',
        equipment: 'PVS-14',
        task: 'Tighten battery housing',
        deadline: '2024-03-27T16:00:00Z',
        priority: 'urgent',
        completed: false
      }
    ]
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Personal Equipment Status</h1>
        <div className="dashboard-description">
          Track your equipment status and upcoming responsibilities
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Personal Equipment Status */}
        <section className="dashboard__section dashboard__section--half">
          <h2>Assigned Equipment</h2>
          <div className="status-cards">
            {mockData.personalEquipment.map(item => (
              <div key={item.id} className="status-card">
                <div className="status-card__header">
                  <h3>{item.type}</h3>
                  <div className={`status-badge ${
                    item.status === 'serviceable' 
                      ? 'status-badge--good' 
                      : 'status-badge--warning'
                  }`}>
                    {item.status.replace('-', ' ')}
                  </div>
                </div>
                <div className="status-card__content">
                  <div className="equipment-details">
                    <div className="detail-row">
                      <span className="detail-label">Serial Number:</span>
                      <span className="detail-value">{item.serialNumber}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Last Maintenance:</span>
                      <span className="detail-value">
                        {new Date(item.lastMaintenance).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Next Due:</span>
                      <span className="detail-value">
                        {new Date(item.nextMaintenance).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  {item.issues && item.issues.length > 0 && (
                    <div className="maintenance-list">
                      <h4>Current Issues:</h4>
                      {item.issues.map((issue, index) => (
                        <div key={index} className="maintenance-item priority-urgent">
                          {issue}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Maintenance Tasks */}
        <section className="dashboard__section dashboard__section--half">
          <h2>Maintenance Tasks</h2>
          <div className="task-list">
            {mockData.maintenanceTasks.map(task => (
              <div key={task.id} className="status-card">
                <div className="status-card__header">
                  <h3>{task.equipment}</h3>
                  <div className={`status-badge status-badge--${task.priority}`}>
                    {task.priority}
                  </div>
                </div>
                <div className="status-card__content">
                  <div className="task-details">
                    <p>{task.task}</p>
                    <div className="deadline-info">
                      Due: {new Date(task.deadline).toLocaleString()}
                    </div>
                  </div>
                  <label className="task-completion">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => console.log('Task completion toggled')}
                    />
                    <span>Mark as Complete</span>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="dashboard__section">
          <h2>Upcoming Events</h2>
          <div className="event-list">
            {mockData.scheduledEvents.map(event => (
              <div key={event.id} className="status-card">
                <div className="status-card__header">
                  <div className="event-header">
                    <span className="event-type">{event.type}</span>
                    <span className="event-date">
                      {new Date(event.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className={`status-badge ${
                    event.status === 'upcoming' ? 'status-badge--info' : 'status-badge--warning'
                  }`}>
                    {event.status}
                  </div>
                </div>
                <div className="status-card__content">
                  <div className="event-details">
                    <p className="event-description">{event.description}</p>
                    <div className="event-location">
                      <span className="detail-label">Location:</span>
                      <span>{event.location}</span>
                    </div>
                    <div className="event-time">
                      <span className="detail-label">Time:</span>
                      <span>{new Date(event.date).toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

// Add this before the main Dashboard component
const RankSelector: React.FC<{ rank: string; onChange: (rank: string) => void }> = ({ rank, onChange }) => {
  return (
    <div style={{ padding: '1rem', background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)' }}>
      <select 
        value={rank} 
        onChange={(e) => onChange(e.target.value)}
        style={{ 
          padding: '0.5rem',
          borderRadius: '4px',
          border: '1px solid var(--color-border)',
          background: 'var(--color-surface)',
          color: 'var(--color-text-primary)',
          fontSize: '0.875rem'
        }}
      >
        <optgroup label="Officers">
          <option value="CPT">CPT</option>
          <option value="1LT">1LT</option>
          <option value="2LT">2LT</option>
        </optgroup>
        <optgroup label="NCOs">
          <option value="SFC">SFC</option>
          <option value="SSG">SSG</option>
          <option value="SGT">SGT</option>
        </optgroup>
        <optgroup label="Junior Enlisted">
          <option value="SPC">SPC</option>
          <option value="PFC">PFC</option>
          <option value="PV2">PV2</option>
        </optgroup>
      </select>
    </div>
  );
};

// Update the main Dashboard component
const Dashboard: React.FC = () => {
  const [testRank, setTestRank] = React.useState('SSG');
  
  const isOfficer = (rank: string) => {
    const officerRanks = ['2LT', '1LT', 'CPT', 'MAJ', 'LTC', 'COL'];
    return officerRanks.includes(rank);
  };

  const isNCO = (rank: string) => {
    const ncoRanks = ['CPL', 'SGT', 'SSG', 'SFC', 'MSG', 'SGM', '1SG', 'CSM'];
    return ncoRanks.includes(rank);
  };

  const getCurrentView = () => {
    if (isOfficer(testRank)) {
      return <OfficerDashboard />;
    }
    if (isNCO(testRank)) {
      return <NCODashboard />;
    }
    return <SoldierDashboard />;
  };

  return (
    <div className="dashboard-container">
      <RankSelector rank={testRank} onChange={setTestRank} />
      {getCurrentView()}
    </div>
  );
};

export default Dashboard;