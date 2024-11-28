/* frontend/src/pages/reports/templates/PropertyAccountabilityReport.tsx */

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import '@/ui/styles/reports/templates/property-accountability.css';

interface PropertyItem {
  id: string;
  name: string;
  serialNumber: string;
  category: string;
  value: number;
  status: 'serviceable' | 'unserviceable' | 'missing';
  assignedTo: {
    name: string;
    rank: string;
    unit: string;
  };
  subHandReceipt?: {
    holder: string;
    rank: string;
    unit: string;
    dateIssued: string;
  };
}

interface ReportData {
  unitInfo: {
    name: string;
    commander: string;
    supplyOfficer: string;
    date: string;
  };
  inventory: PropertyItem[];
  statistics: {
    totalItems: number;
    totalValue: number;
    serviceableItems: number;
    unserviceableItems: number;
    missingItems: number;
  };
}

const PropertyAccountabilityReport: React.FC = () => {
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const userUnit = useSelector((state: any) => state.auth.userUnit);

  useEffect(() => {
    fetchReportData();
  }, []);

  const fetchReportData = async () => {
    try {
      // Mock data for demonstration
      const data: ReportData = {
        unitInfo: {
          name: "B Company, 1-23 Infantry",
          commander: "CPT Smith, John A.",
          supplyOfficer: "CW2 Johnson, Robert",
          date: new Date().toISOString()
        },
        inventory: [
          {
            id: "1",
            name: "M4 Carbine",
            serialNumber: "12456789",
            category: "Weapons",
            value: 1200,
            status: "serviceable",
            assignedTo: {
              name: "Martinez, Carlos",
              rank: "SPC",
              unit: "1st PLT, B CO 1-23 IN"
            }
          },
          {
            id: "2",
            name: "PVS-14",
            serialNumber: "NV789012",
            category: "Optics",
            value: 3400,
            status: "serviceable",
            assignedTo: {
              name: "Johnson, Michael",
              rank: "SGT",
              unit: "2nd PLT, B CO 1-23 IN"
            }
          },
          {
            id: "3",
            name: "IOTV",
            serialNumber: "IOTV456789",
            category: "Protection",
            value: 1600,
            status: "serviceable",
            assignedTo: {
              name: "Williams, Sarah",
              rank: "SPC",
              unit: "3rd PLT, B CO 1-23 IN"
            }
          },
          {
            id: "4",
            name: "M249 SAW",
            serialNumber: "LMG123456",
            category: "Weapons",
            value: 4500,
            status: "unserviceable",
            assignedTo: {
              name: "Davis, Robert",
              rank: "SGT",
              unit: "1st PLT, B CO 1-23 IN"
            }
          },
          {
            id: "5",
            name: "Harris Radio",
            serialNumber: "RAD987654",
            category: "Communications",
            value: 7800,
            status: "serviceable",
            assignedTo: {
              name: "Anderson, James",
              rank: "SPC",
              unit: "HQ PLT, B CO 1-23 IN"
            }
          },
          {
            id: "6",
            name: "M17 Pistol",
            serialNumber: "PST234567",
            category: "Weapons",
            value: 600,
            status: "missing",
            assignedTo: {
              name: "Taylor, John",
              rank: "SSG",
              unit: "2nd PLT, B CO 1-23 IN"
            }
          },
          {
            id: "7",
            name: "Laptop Tough Book",
            serialNumber: "LT345678",
            category: "Electronics",
            value: 2200,
            status: "serviceable",
            assignedTo: {
              name: "Brown, Michelle",
              rank: "1LT",
              unit: "HQ PLT, B CO 1-23 IN"
            },
            subHandReceipt: {
              holder: "Garcia, Alex",
              rank: "SPC",
              unit: "S6, HQ PLT",
              dateIssued: "2024-02-15"
            }
          },
          {
            id: "8",
            name: "ACOG Sight",
            serialNumber: "ACOG567890",
            category: "Optics",
            value: 1300,
            status: "serviceable",
            assignedTo: {
              name: "Wilson, David",
              rank: "SGT",
              unit: "1st PLT, B CO 1-23 IN"
            }
          },
          {
            id: "9",
            name: "Generator",
            serialNumber: "GEN123789",
            category: "Equipment",
            value: 3200,
            status: "unserviceable",
            assignedTo: {
              name: "Miller, Ryan",
              rank: "SPC",
              unit: "HQ PLT, B CO 1-23 IN"
            }
          },
          {
            id: "10",
            name: "M2 .50 Cal",
            serialNumber: "HMG456123",
            category: "Weapons",
            value: 14000,
            status: "serviceable",
            assignedTo: {
              name: "Thompson, Eric",
              rank: "SSG",
              unit: "WPN PLT, B CO 1-23 IN"
            }
          }
        ],
        statistics: {
          totalItems: 150,
          totalValue: 750000,
          serviceableItems: 135,
          unserviceableItems: 10,
          missingItems: 5
        }
      };
      setReportData(data);
    } catch (error) {
      console.error('Error fetching report data:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderUnitOverview = () => (
    <div className="report-section status-overview">
      <h3>Unit Property Overview</h3>
      <div className="status-grid">
        <div className="status-card total">
          <span className="status-value">{reportData?.statistics.totalItems}</span>
          <span className="status-label">Total Items</span>
        </div>
        <div className="status-card value">
          <span className="status-value">
            ${reportData?.statistics.totalValue.toLocaleString()}
          </span>
          <span className="status-label">Total Value</span>
        </div>
        <div className="status-card serviceable">
          <span className="status-value">{reportData?.statistics.serviceableItems}</span>
          <span className="status-label">Serviceable</span>
        </div>
        <div className="status-card unserviceable">
          <span className="status-value">{reportData?.statistics.unserviceableItems}</span>
          <span className="status-label">Unserviceable</span>
        </div>
        <div className="status-card missing">
          <span className="status-value">{reportData?.statistics.missingItems}</span>
          <span className="status-label">Missing</span>
        </div>
      </div>
    </div>
  );

  const renderHandReceipts = () => (
    <div className="report-section hand-receipts">
      <h3>Individual Hand Receipts</h3>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Holder</th>
              <th>Items</th>
              <th>Total Value</th>
              <th>Last Updated</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {reportData?.inventory.reduce((acc: { [key: string]: any }, item) => {
              const holderKey = `${item.assignedTo.rank} ${item.assignedTo.name}`;
              if (!acc[holderKey]) {
                acc[holderKey] = {
                  holder: holderKey,
                  unit: item.assignedTo.unit,
                  items: 0,
                  value: 0,
                  lastUpdated: new Date().toISOString()
                };
              }
              acc[holderKey].items++;
              acc[holderKey].value += item.value;
              return acc;
            }, {}) && 
            Object.values(reportData?.inventory.reduce((acc: { [key: string]: any }, item) => {
              const holderKey = `${item.assignedTo.rank} ${item.assignedTo.name}`;
              if (!acc[holderKey]) {
                acc[holderKey] = {
                  holder: holderKey,
                  unit: item.assignedTo.unit,
                  items: 0,
                  value: 0,
                  lastUpdated: new Date().toISOString()
                };
              }
              acc[holderKey].items++;
              acc[holderKey].value += item.value;
              return acc;
            }, {})).map((receipt: any) => (
              <tr key={receipt.holder}>
                <td>
                  <div className="holder-info">
                    <span className="holder-name">{receipt.holder}</span>
                    <span className="holder-unit">{receipt.unit}</span>
                  </div>
                </td>
                <td>{receipt.items}</td>
                <td>${receipt.value.toLocaleString()}</td>
                <td>{new Date(receipt.lastUpdated).toLocaleDateString()}</td>
                <td>
                  <span className="status-badge active">Active</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderSubHandReceipts = () => (
    <div className="report-section sub-hand-receipts">
      <h3>Sub-Hand Receipts</h3>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Primary Holder</th>
              <th>Sub-Hand Receipt Holder</th>
              <th>Items</th>
              <th>Date Issued</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {reportData?.inventory
              .filter(item => item.subHandReceipt)
              .map(item => (
                <tr key={`${item.id}-sub`}>
                  <td>
                    <div className="holder-info">
                      <span className="holder-name">
                        {item.assignedTo.rank} {item.assignedTo.name}
                      </span>
                      <span className="holder-unit">{item.assignedTo.unit}</span>
                    </div>
                  </td>
                  <td>
                    <div className="holder-info">
                      <span className="holder-name">
                        {item.subHandReceipt?.rank} {item.subHandReceipt?.holder}
                      </span>
                      <span className="holder-unit">{item.subHandReceipt?.unit}</span>
                    </div>
                  </td>
                  <td>1</td>
                  <td>{new Date(item.subHandReceipt?.dateIssued || '').toLocaleDateString()}</td>
                  <td>
                    <span className="status-badge active">Active</span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderMissingItems = () => (
    <div className="report-section missing-items">
      <h3>Missing Items</h3>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Serial Number</th>
              <th>Value</th>
              <th>Last Known Holder</th>
              <th>Date Reported</th>
            </tr>
          </thead>
          <tbody>
            {reportData?.inventory
              .filter(item => item.status === 'missing')
              .map(item => (
                <tr key={item.id} className="missing-item">
                  <td>{item.name}</td>
                  <td>{item.serialNumber}</td>
                  <td>${item.value.toLocaleString()}</td>
                  <td>
                    <div className="holder-info">
                      <span className="holder-name">
                        {item.assignedTo.rank} {item.assignedTo.name}
                      </span>
                      <span className="holder-unit">{item.assignedTo.unit}</span>
                    </div>
                  </td>
                  <td>{new Date().toLocaleDateString()}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  if (loading) {
    return <div className="loading">Loading report data...</div>;
  }

  return (
    <div className="property-accountability-report">
      <div className="report-header">
        <div className="unit-info">
          <h2>{reportData?.unitInfo.name}</h2>
          <div className="unit-details">
            <p><strong>Commander:</strong> {reportData?.unitInfo.commander}</p>
            <p><strong>Supply Officer:</strong> {reportData?.unitInfo.supplyOfficer}</p>
            <p><strong>Date:</strong> {new Date(reportData?.unitInfo.date || '').toLocaleDateString()}</p>
          </div>
        </div>
        <div className="report-actions">
          <button className="btn-primary" onClick={() => window.print()}>
            Print Report
          </button>
          <button className="btn-secondary" onClick={() => {}}>
            Export to PDF
          </button>
        </div>
      </div>

      {renderUnitOverview()}
      {renderHandReceipts()}
      {renderSubHandReceipts()}
      {renderMissingItems()}

      <div className="report-footer">
        <p>Generated on: {new Date().toLocaleString()}</p>
        <p>This is an official property accountability document</p>
      </div>
    </div>
  );
};

export default PropertyAccountabilityReport; 