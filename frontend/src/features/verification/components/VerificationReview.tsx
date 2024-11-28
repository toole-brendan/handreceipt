// src/ui/components/verification/VerificationReview.tsx

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import '../../../ui/styles/verification-review.css';

interface VerificationReview {
  id: string;
  assetId: string;
  assetName: string;
  submittedBy: string;
  submittedDate: string;
  status: 'pending' | 'approved' | 'rejected';
  verificationData: {
    checklist: {
      id: string;
      label: string;
      required: boolean;
      checked: boolean;
    }[];
    condition: string;
    notes: string;
    images: string[]; // URLs to uploaded images
  };
}

interface ReviewFilters {
  dateRange: {
    start: string;
    end: string;
  };
  status?: 'pending' | 'approved' | 'rejected';
}

export const VerificationReview: React.FC = () => {
  const [verifications, setVerifications] = useState<VerificationReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ReviewFilters>({
    dateRange: {
      start: '',
      end: ''
    }
  });
  const [selectedVerification, setSelectedVerification] = useState<VerificationReview | null>(null);
  const [reviewNotes, setReviewNotes] = useState('');
  const { classificationLevel } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    fetchVerifications();
  }, [filters, classificationLevel]);

  const fetchVerifications = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (filters.status) {
        queryParams.append('status', filters.status);
      }
      if (filters.dateRange) {
        queryParams.append('startDate', filters.dateRange.start);
        queryParams.append('endDate', filters.dateRange.end);
      }

      const response = await fetch(`/api/verifications/review?${queryParams}`, {
        headers: {
          'Classification-Level': classificationLevel,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch verifications');
      }

      const data = await response.json();
      setVerifications(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleReview = async (verificationId: string, approved: boolean) => {
    try {
      const response = await fetch(`/api/verifications/${verificationId}/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Classification-Level': classificationLevel,
        },
        body: JSON.stringify({
          approved,
          notes: reviewNotes,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit review');
      }

      await fetchVerifications();
      setSelectedVerification(null);
      setReviewNotes('');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to submit review');
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
    <div className="verification-review">
      <header className="review-header">
        <h2>Verification Reviews</h2>
        <div className="filter-controls">
          <select
            value={filters.status || ''}
            onChange={(e) => setFilters({ ...filters, status: e.target.value as ReviewFilters['status'] })}
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>

          <div className="date-range">
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
      </header>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading verifications...</div>
      ) : (
        <div className="verifications-list">
          {verifications.map((verification) => (
            <div key={verification.id} className="verification-card">
              <div className="verification-info">
                <h3>{verification.assetName}</h3>
                <div className="meta-info">
                  <span>Submitted by: {verification.submittedBy}</span>
                  <span>Date: {new Date(verification.submittedDate).toLocaleDateString()}</span>
                  <span className={`status status-${verification.status}`}>
                    {verification.status.toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="verification-actions">
                <button
                  className="btn-secondary"
                  onClick={() => setSelectedVerification(verification)}
                >
                  Review Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedVerification && (
        <div className="review-modal">
          <div className="modal-content">
            <header className="modal-header">
              <h3>Review Verification</h3>
              <button
                className="btn-close"
                onClick={() => setSelectedVerification(null)}
              >
                ×
              </button>
            </header>

            <div className="review-details">
              <section className="checklist-review">
                <h4>Verification Checklist</h4>
                {selectedVerification.verificationData.checklist.map((item) => (
                  <div key={item.id} className="checklist-item">
                    <span className={`check-indicator ${item.checked ? 'checked' : ''}`}>
                      {item.checked ? '✓' : '×'}
                    </span>
                    <span className="check-label">{item.label}</span>
                    {item.required && <span className="required">*</span>}
                  </div>
                ))}
              </section>

              <section className="condition-review">
                <h4>Asset Condition</h4>
                <p>{selectedVerification.verificationData.condition}</p>
              </section>

              <section className="images-review">
                <h4>Verification Images</h4>
                <div className="image-grid">
                  {selectedVerification.verificationData.images.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`Verification ${index + 1}`}
                      className="review-image"
                    />
                  ))}
                </div>
              </section>

              <section className="notes-review">
                <h4>Verification Notes</h4>
                <p>{selectedVerification.verificationData.notes}</p>
              </section>

              <section className="review-input">
                <h4>Review Notes</h4>
                <textarea
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  placeholder="Enter your review notes..."
                  rows={4}
                />
              </section>

              <div className="review-actions">
                <button
                  className="btn-danger"
                  onClick={() => handleReview(selectedVerification.id, false)}
                >
                  Reject
                </button>
                <button
                  className="btn-success"
                  onClick={() => handleReview(selectedVerification.id, true)}
                >
                  Approve
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 