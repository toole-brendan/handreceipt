import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '@/styles/features/auth/shared.css';

const ForgotPassword: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: ''
  });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.username || !formData.email) {
      setStatus('error');
      setMessage('All fields are required');
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    
    if (!validateForm()) return;
    
    setLoading(true);
    setMessage(null);
    setStatus('idle');

    try {
      // In development, simulate password reset request
      if (process.env.NODE_ENV === 'development') {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setStatus('success');
        setMessage('Password reset instructions have been sent to your email');
        return;
      }

      // In production, this would send the reset email
      setStatus('error');
      setMessage('Password reset not implemented in production yet');
    } catch (error) {
      setStatus('error');
      setMessage('Could not process request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-content">
        <div className="auth-header">
          <h1>Reset Password</h1>
          <div className="auth-description">
            Enter your username and email to reset your password
          </div>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {message && (
            <div className={`status-message ${status}`}>
              {message}
            </div>
          )}

          <div className="form-group">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Username"
              className={status === 'error' ? 'error' : ''}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email Address"
              className={status === 'error' ? 'error' : ''}
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            className={`auth-button ${loading ? 'disabled' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <div className="loading-spinner" />
            ) : (
              'Reset Password'
            )}
          </button>

          <div className="auth-links">
            <Link to="/login" className="auth-link">
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword; 