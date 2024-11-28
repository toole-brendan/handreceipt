import React, { useState, useEffect } from 'react';
import { ReportClassificationBadge } from './ReportClassificationBadge';
import { ReportActions } from './ReportActions';
import { ReportFilters } from './ReportFilters';
import '@/ui/styles/reports/report-list.css';

export interface Report {
  id: string;
  name: string;
  classification: 'UNCLASSIFIED' | 'CONFIDENTIAL' | 'SECRET' | 'TOP_SECRET';
  generatedDate: string;
  status: 'Generated' | 'Processing' | 'Failed';
  type: string;
}

interface ReportListProps {
  reportType: string;
}

export const ReportList: React.FC<ReportListProps> = ({ reportType }) => {
  const [reports, setReports] = useState<Report[]>([]);
  const [filteredReports, setFilteredReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      try {
        // Replace with actual API call
        const response = await fetch(`/api/reports/${reportType}`);
        if (!response.ok) {
          throw new Error('Failed to fetch reports');
        }
        const data = await response.json();
        setReports(data);
        setFilteredReports(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [reportType]);

  const handleFilterChange = (filters: Record<string, any>) => {
    const filtered = reports.filter(report => {
      const matchesClassification = !filters.classification || 
        report.classification === filters.classification;
      const matchesStatus = !filters.status || 
        report.status === filters.status;
      const matchesDate = !filters.date || 
        new Date(report.generatedDate) >= new Date(filters.date);
      
      return matchesClassification && matchesStatus && matchesDate;
    });
    
    setFilteredReports(filtered);
  };

  if (loading) {
    return <div className="loading">Loading reports...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="report-list">
      <ReportFilters onFilterChange={handleFilterChange} />
      <div className="table-container">
        <table className="reports-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Classification</th>
              <th>Generated Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.length === 0 ? (
              <tr>
                <td colSpan={5} className="no-reports">
                  No reports found
                </td>
              </tr>
            ) : (
              filteredReports.map((report) => (
                <tr key={report.id}>
                  <td>{report.name}</td>
                  <td>
                    <ReportClassificationBadge level={report.classification} />
                  </td>
                  <td>{new Date(report.generatedDate).toLocaleDateString()}</td>
                  <td>
                    <span className={`status ${report.status.toLowerCase()}`}>
                      {report.status}
                    </span>
                  </td>
                  <td>
                    <ReportActions report={report} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportList; 