import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ClassificationBanner from '@/ui/components/common/ClassificationBanner';
import LoadingFallback from '@/ui/components/common/LoadingFallback';
import { ReportClassificationBadge } from '@/ui/components/reports/ReportClassificationBadge';
import type { ClassificationLevel } from '@/ui/components/reports/ReportClassificationBadge';
import '@/ui/styles/reports/report-viewer.css';

interface Report {
  id: string;
  name: string;
  content: string;
  classification: ClassificationLevel;
  generatedDate: string;
  generatedBy: {
    id: string;
    name: string;
    rank: string;
  };
  metadata: {
    version: string;
    hash: string;
    signatures: string[];
  };
}

const ReportViewer: React.FC = () => {
  const { reportId } = useParams<{ reportId: string }>();
  const navigate = useNavigate();
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const userClearance = useSelector((state: any) => state.auth.clearanceLevel);

  useEffect(() => {
    const fetchReport = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/reports/${reportId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'X-Security-Clearance': userClearance
          }
        });

        if (!response.ok) {
          if (response.status === 403) {
            throw new Error('Insufficient clearance level to view this report');
          }
          throw new Error('Failed to fetch report');
        }

        const data = await response.json();
        setReport(data);

        // Log access for audit trail
        await fetch('/api/audit/log', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            action: 'VIEW_REPORT',
            resourceId: reportId,
            resourceType: 'REPORT',
            classification: data.classification
          })
        });

      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (reportId) {
      fetchReport();
    }
  }, [reportId, userClearance]);

  if (loading) {
    return <LoadingFallback />;
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">{error}</div>
        <button 
          className="btn btn-primary"
          onClick={() => navigate('/reports')}
        >
          Back to Reports
        </button>
      </div>
    );
  }

  if (!report) {
    return <div>Report not found</div>;
  }

  return (
    <div className="report-viewer">
      <ClassificationBanner />
      <div className="report-header">
        <div className="report-title">
          <h1>{report.name}</h1>
          <ReportClassificationBadge level={report.classification} />
        </div>
        
        <div className="report-metadata">
          <div className="metadata-item">
            <span className="label">Generated:</span>
            <span>{new Date(report.generatedDate).toLocaleString()}</span>
          </div>
          <div className="metadata-item">
            <span className="label">By:</span>
            <span>{report.generatedBy.rank} {report.generatedBy.name}</span>
          </div>
          <div className="metadata-item">
            <span className="label">Version:</span>
            <span>{report.metadata.version}</span>
          </div>
        </div>

        <div className="report-actions">
          <button 
            className="btn btn-secondary"
            onClick={() => window.print()}
          >
            Print Report
          </button>
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/reports')}
          >
            Back to Reports
          </button>
        </div>
      </div>

      <div className="report-content">
        {report.content}
      </div>

      <div className="report-footer">
        <div className="verification">
          <span className="label">Verification Hash:</span>
          <code>{report.metadata.hash}</code>
        </div>
        <div className="signatures">
          <span className="label">Digital Signatures:</span>
          <ul>
            {report.metadata.signatures.map((sig, index) => (
              <li key={index}><code>{sig}</code></li>
            ))}
          </ul>
        </div>
      </div>

      <ClassificationBanner />
    </div>
  );
};

export default ReportViewer; 