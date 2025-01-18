// src/ui/components/verification/VerificationHistory.tsx

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { FiEye, FiX } from 'react-icons/fi';
import { DateRange, createEmptyDateRange } from '../../../types/common';

interface VerificationRecord {
  id: string;
  assetId: string;
  assetName: string;
  verifier: {
    id: string;
    name: string;
    rank: string;
  };
  date: string;
  status: 'passed' | 'failed';
  type: 'routine' | 'special' | 'incident';
  classification: string;
  checklist: {
    id: string;
    item: string;
    status: boolean;
  }[];
  notes: string;
  attachments: {
    id: string;
    name: string;
    type: string;
    url: string;
  }[];
}

interface HistoryFilters {
  dateRange: DateRange;
  status?: 'passed' | 'failed' | '';
  type?: 'routine' | 'special' | 'incident' | '';
  verifier?: string;
  assetId?: string;
}

export const VerificationHistory: React.FC = () => {
  const [records, setRecords] = useState<VerificationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<HistoryFilters>({
    dateRange: createEmptyDateRange()
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecord, setSelectedRecord] = useState<VerificationRecord | null>(null);
  const { classificationLevel } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    fetchVerificationHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, classificationLevel]);

  const fetchVerificationHistory = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (filters.dateRange) {
        queryParams.append('startDate', filters.dateRange.start);
        queryParams.append('endDate', filters.dateRange.end);
      }
      if (filters.status) queryParams.append('status', filters.status);
      if (filters.type) queryParams.append('type', filters.type);
      if (filters.verifier) queryParams.append('verifier', filters.verifier);
      if (filters.assetId) queryParams.append('assetId', filters.assetId);
      if (searchTerm) queryParams.append('search', searchTerm);

      const response = await fetch(`/api/verifications/history?${queryParams}`, {
        headers: {
          'Classification-Level': classificationLevel,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch verification history');
      }

      const data = await response.json();
      setRecords(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchVerificationHistory();
  };

  const exportHistory = async () => {
    try {
      const response = await fetch('/api/verifications/history/export', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Classification-Level': classificationLevel,
        },
        body: JSON.stringify({ filters, searchTerm }),
      });

      if (!response.ok) {
        throw new Error('Failed to export history');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `verification-history-${new Date().toISOString()}.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Export failed');
    }
  };

  const handleDateRangeChange = (field: keyof DateRange, value: string) => {
    setFilters(prev => ({
      ...prev,
      dateRange: {
        ...prev.dateRange,
        [field]: value
      }
    }));
  };

  return (
    <div className="verification-history">
      <header className="history-header">
        <h2>Verification History</h2>
        <div className="header-actions">
          <button className="btn-secondary" onClick={exportHistory}>
            Export History
          </button>
        </div>
      </header>

      <div className="history-filters">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search verifications..."
            className="search-input"
          />
          <button type="submit" className="btn-primary">
            Search
          </button>
        </form>

        <div className="filter-controls">
          <div className="filter-group">
            <label>Date Range</label>
            <div className="date-inputs">
              <input
                type="date"
                value={filters.dateRange.start}
                onChange={(e) => handleDateRangeChange('start', e.target.value)}
              />
              <span>to</span>
              <input
                type="date"
                value={filters.dateRange.end}
                onChange={(e) => handleDateRangeChange('end', e.target.value)}
              />
            </div>
          </div>

          <div className="filter-group">
            <label>Status</label>
            <select
              value={filters.status || ''}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  status: e.target.value as VerificationRecord['status'] | '',
                })
              }
            >
              <option value="">All Status</option>
              <option value="passed">Passed</option>
              <option value="failed">Failed</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Type</label>
            <select
              value={filters.type || ''}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  type: e.target.value as VerificationRecord['type'] | '',
                })
              }
            >
              <option value="">All Types</option>
              <option value="routine">Routine</option>
              <option value="special">Special</option>
              <option value="incident">Incident</option>
            </select>
          </div>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading verification history...</div>
      ) : (
        <div className="history-content">
          <table className="data-table history-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Asset</th>
                <th>Verifier</th>
                <th>Type</th>
                <th>Status</th>
                <th>Classification</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record.id}>
                  <td>{new Date(record.date).toLocaleDateString()}</td>
                  <td>{record.assetName}</td>
                  <td>
                    {record.verifier.rank} {record.verifier.name}
                  </td>
                  <td>
                    <span className={`type-badge type-${record.type}`}>
                      {record.type}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge status-${record.status}`}>
                      {record.status}
                    </span>
                  </td>
                  <td>
                    <span className="classification-badge">
                      {record.classification}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn-icon"
                      onClick={() => setSelectedRecord(record)}
                      title="View Details"
                    >
                      <FiEye />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedRecord && (
        <div className="modal-overlay">
          <div className="modal-content">
            <header className="modal-header">
              <h3>Verification Details</h3>
              <button
                className="btn-close"
                onClick={() => setSelectedRecord(null)}
                aria-label="Close Modal"
              >
                <FiX />
              </button>
            </header>

            <div className="verification-details">
              <section className="detail-section">
                <h4>Checklist</h4>
                <div className="checklist-items">
                  {selectedRecord.checklist.map((item) => (
                    <div key={item.id} className="checklist-item">
                      <span
                        className={`check-indicator ${
                          item.status ? 'checked' : ''
                        }`}
                      >
                        {item.status ? '✓' : '×'}
                      </span>
                      <span className="check-label">{item.item}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="detail-section">
                <h4>Notes</h4>
                <p className="verification-notes">{selectedRecord.notes}</p>
              </section>

              <section className="detail-section">
                <h4>Attachments</h4>
                <div className="attachment-grid">
                  {selectedRecord.attachments.map((attachment) => (
                    <div key={attachment.id} className="attachment-item">
                      <span className="attachment-icon">
                        {attachment.type === 'image' ? '🖼️' : '📎'}
                      </span>
                      <span className="attachment-name">{attachment.name}</span>
                      <a
                        href={attachment.url}
                        download
                        className="btn-download"
                        title="Download"
                      >
                        ⬇️
                      </a>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
