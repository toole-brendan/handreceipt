// src/ui/components/auth/LoginForm.tsx

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import { authenticateUser } from '../../../store/slices/authSlice';
import { FiUser, FiLock, FiShield } from 'react-icons/fi';

interface LoginFormProps {
  onMFARequired: () => void;
}

interface LoginCredentials {
  username: string;
  password: string;
  militaryId: string;
  classificationLevel: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onMFARequired }) => {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: '',
    password: '',
    militaryId: '',
    classificationLevel: 'SECRET',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await dispatch(authenticateUser(credentials)).unwrap();
      if (result.requiresMFA) {
        onMFARequired();
      }
    } catch (err) {
      setError('Authentication failed. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container container">
      <div className="palantir-panel">
        <div className="auth-header">
          <FiShield className="auth-icon" />
          <h1>Military Asset Tracking System</h1>
          <p className="auth-subtitle">Secure Access Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <div className="input-wrapper">
              <FiUser className="input-icon" />
              <input
                type="text"
                placeholder="Username"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                required
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <div className="input-wrapper">
              <FiLock className="input-icon" />
              <input
                type="password"
                placeholder="Password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                required
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <div className="input-wrapper">
              <FiUser className="input-icon" />
              <input
                type="text"
                placeholder="Military ID"
                value={credentials.militaryId}
                onChange={(e) => setCredentials({ ...credentials, militaryId: e.target.value })}
                required
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <select
              value={credentials.classificationLevel}
              onChange={(e) => setCredentials({ ...credentials, classificationLevel: e.target.value })}
              className="form-input"
            >
              <option value="CONFIDENTIAL">CONFIDENTIAL</option>
              <option value="SECRET">SECRET</option>
              <option value="TOP_SECRET">TOP SECRET</option>
            </select>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? (
              <span className="loading-spinner">Authenticating...</span>
            ) : (
              'Access System'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
