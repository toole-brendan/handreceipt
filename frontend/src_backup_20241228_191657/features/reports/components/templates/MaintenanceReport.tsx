import React, { useState, useEffect } from 'react';
import '@/styles/features/reports/templates/maintenance-report.css';

interface MaintenanceItem {
  id: string;
  equipment: {
    type: string;
    model: string;
    serialNumber: string;
    assignedTo: {
      name: string;
      rank: string;
      unit: string;
    };
  };
  status: 'operational' | 'limited' | 'non-operational' | 'deadlined';
  maintenanceLevel: 'operator' | 'unit' | 'direct' | 'depot';
  priority: 'routine' | 'priority' | 'urgent' | 'emergency';
  issue: string;
  partsRequired: {
    partNumber: string;
    description: string;
    quantity: number;
    available: boolean;
    estimatedArrival?: string;
  }[];
  maintenanceHistory: {
    date: string;
    type: string;
    technician: string;
    description: string;
    hoursSpent: number;
  }[];
  nextScheduledService: string;
  estimatedCompletionDate: string;
  notes: string;
}

interface MaintenanceStats {
  totalEquipment: number;
  operational: number;
  limited: number;
  nonOperational: number;
  deadlined: number;
  scheduledMaintenance: number;
  unscheduledMaintenance: number;
  awaitingParts: number;
  averageRepairTime: number;
}

const MaintenanceReport: React.FC = () => {
  console.log('MaintenanceReport component mounted');

  const [maintenanceItems, setMaintenanceItems] = useState<MaintenanceItem[]>([]);
  const [stats, setStats] = useState<MaintenanceStats | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockData: MaintenanceItem[] = [
      {
        id: "M001",
        equipment: {
          type: "Vehicle",
          model: "HMMWV M1151A1",
          serialNumber: "HMV-2024-001",
          assignedTo: {
            name: "Johnson, Robert",
            rank: "SGT",
            unit: "1st PLT, B CO"
          }
        },
        status: "limited",
        maintenanceLevel: "unit",
        priority: "urgent",
        issue: "Transmission showing signs of failure, grinding noise when shifting",
        partsRequired: [
          {
            partNumber: "TM-789-456",
            description: "Transmission Fluid Pump",
            quantity: 1,
            available: false,
            estimatedArrival: "2024-04-01"
          },
          {
            partNumber: "SF-456-789",
            description: "Transmission Seal Kit",
            quantity: 1,
            available: true
          }
        ],
        maintenanceHistory: [
          {
            date: "2024-03-15",
            type: "Scheduled Service",
            technician: "SPC Williams",
            description: "Regular maintenance check, noted unusual transmission noise",
            hoursSpent: 2
          },
          {
            date: "2024-03-20",
            type: "Diagnostic",
            technician: "SSG Martinez",
            description: "Confirmed transmission issue, ordered replacement parts",
            hoursSpent: 3
          }
        ],
        nextScheduledService: "2024-04-15",
        estimatedCompletionDate: "2024-04-03",
        notes: "Vehicle operational but limited to emergency use only"
      },
      {
        id: "M002",
        equipment: {
          type: "Weapon",
          model: "M2 .50 Cal",
          serialNumber: "M2-2023-045",
          assignedTo: {
            name: "Smith, James",
            rank: "SSG",
            unit: "WPN SQD, B CO"
          }
        },
        status: "non-operational",
        maintenanceLevel: "direct",
        priority: "priority",
        issue: "Headspace and timing issues, barrel extension wear",
        partsRequired: [
          {
            partNumber: "M2-BE-123",
            description: "Barrel Extension",
            quantity: 1,
            available: true
          }
        ],
        maintenanceHistory: [
          {
            date: "2024-03-10",
            type: "Malfunction",
            technician: "SFC Thompson",
            description: "Failed headspace and timing check during pre-fire inspection",
            hoursSpent: 1
          }
        ],
        nextScheduledService: "2024-04-10",
        estimatedCompletionDate: "2024-03-28",
        notes: "Requires qualified armorer for repair verification"
      }
    ];

    const mockStats: MaintenanceStats = {
      totalEquipment: 45,
      operational: 32,
      limited: 8,
      nonOperational: 3,
      deadlined: 2,
      scheduledMaintenance: 12,
      unscheduledMaintenance: 5,
      awaitingParts: 4,
      averageRepairTime: 48
    };

    setMaintenanceItems(mockData);
    setStats(mockStats);
    setLoading(false);
  }, []);

  const renderMaintenanceStatus = () => (
    <div className="maintenance-status-section">
      <h3>Maintenance Status Overview</h3>
      <div className="status-grid">
        <div className="status-card operational">
          <span className="status-value">{stats?.operational}</span>
          <span className="status-label">Operational</span>
        </div>
        <div className="status-card limited">
          <span className="status-value">{stats?.limited}</span>
          <span className="status-label">Limited</span>
        </div>
        <div className="status-card non-operational">
          <span className="status-value">{stats?.nonOperational}</span>
          <span className="status-label">Non-Operational</span>
        </div>
        <div className="status-card deadlined">
          <span className="status-value">{stats?.deadlined}</span>
          <span className="status-label">Deadlined</span>
        </div>
      </div>
    </div>
  );

  const renderMaintenanceItems = () => (
    <div className="maintenance-items-section">
      <h3>Equipment Maintenance Details</h3>
      <div className="maintenance-items-grid">
        {maintenanceItems.map(item => (
          <div key={item.id} className="maintenance-item-card">
            <div className="item-header">
              <div className="item-title">
                <h4>{item.equipment.model}</h4>
                <span className={`status-badge status-${item.status}`}>
                  {item.status}
                </span>
              </div>
              <span className={`priority-badge priority-${item.priority}`}>
                {item.priority}
              </span>
            </div>

            <div className="item-details">
              <div className="detail-row">
                <span className="detail-label">Serial Number:</span>
                <span className="detail-value">{item.equipment.serialNumber}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Assigned To:</span>
                <span className="detail-value">
                  {item.equipment.assignedTo.rank} {item.equipment.assignedTo.name}
                  <br />
                  <small>{item.equipment.assignedTo.unit}</small>
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Issue:</span>
                <span className="detail-value">{item.issue}</span>
              </div>
            </div>

            <div className="parts-required">
              <h5>Parts Required</h5>
              <div className="parts-list">
                {item.partsRequired.map(part => (
                  <div key={part.partNumber} className="part-item">
                    <div className="part-header">
                      <span className="part-number">{part.partNumber}</span>
                      <span className={`availability-badge ${part.available ? 'available' : 'unavailable'}`}>
                        {part.available ? 'In Stock' : 'On Order'}
                      </span>
                    </div>
                    <div className="part-details">
                      <span>{part.description}</span>
                      <span>Qty: {part.quantity}</span>
                      {!part.available && part.estimatedArrival && (
                        <span className="eta">ETA: {new Date(part.estimatedArrival).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="maintenance-history">
              <h5>Maintenance History</h5>
              <div className="history-timeline">
                {item.maintenanceHistory.map((history, index) => (
                  <div key={index} className="history-item">
                    <div className="history-date">
                      {new Date(history.date).toLocaleDateString()}
                    </div>
                    <div className="history-content">
                      <div className="history-type">{history.type}</div>
                      <div className="history-tech">Tech: {history.technician}</div>
                      <div className="history-description">{history.description}</div>
                      <div className="history-hours">Hours: {history.hoursSpent}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="item-footer">
              <div className="scheduled-service">
                Next Service: {new Date(item.nextScheduledService).toLocaleDateString()}
              </div>
              <div className="estimated-completion">
                Est. Completion: {new Date(item.estimatedCompletionDate).toLocaleDateString()}
              </div>
            </div>

            {item.notes && (
              <div className="item-notes">
                <strong>Notes:</strong> {item.notes}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  if (loading) {
    return <div className="loading">Loading maintenance report...</div>;
  }

  return (
    <div className="maintenance-report">
      <div className="report-header">
        <h2>Unit Maintenance Report</h2>
        <div className="report-actions">
          <button className="btn-primary" onClick={() => window.print()}>
            Print Report
          </button>
          <button className="btn-secondary" onClick={() => {}}>
            Export to PDF
          </button>
        </div>
      </div>

      {renderMaintenanceStatus()}
      {renderMaintenanceItems()}

      <div className="report-footer">
        <p>Generated on: {new Date().toLocaleString()}</p>
        <p>This is an official maintenance status report</p>
      </div>
    </div>
  );
};

export default MaintenanceReport; 