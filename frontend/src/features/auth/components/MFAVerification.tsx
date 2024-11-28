// src/ui/components/auth/MFAVerification.tsx

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import { verifyMFA } from '../../../store/slices/mfaSlice';
import { FiShield, FiLock } from 'react-icons/fi';

interface MFAVerificationProps {
  onVerificationComplete: () => void;
}

export const MFAVerification: React.FC<MFAVerificationProps> = ({
  onVerificationComplete,
}) => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await dispatch(verifyMFA(code)).unwrap();
      onVerificationComplete();
    } catch (err) {
      setError('Invalid verification code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="palantir-panel">
        <div className="auth-header">
          <FiShield className="auth-icon" />
          <h1>Two-Factor Authentication</h1>
          <p className="auth-subtitle">Enter your verification code</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <div className="input-wrapper">
              <FiLock className="input-icon" />
              <input
                type="text"
                placeholder="Enter verification code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                className="form-input"
                pattern="[0-9]*"
                maxLength={6}
                autoComplete="one-time-code"
              />
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? (
              <span className="loading-spinner">Verifying...</span>
            ) : (
              'Verify Access'
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p className="auth-instruction">
            Check your authorized device for the verification code.
          </p>
        </div>
      </div>
    </div>
  );
};
