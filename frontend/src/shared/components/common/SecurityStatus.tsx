import React from 'react';
import { Shield, Lock, RefreshCw } from 'lucide-react';
import '@/ui/styles/components/security-status.css';

interface SecurityStatusProps {
  level?: 'normal' | 'elevated' | 'critical';
}

const SecurityStatus: React.FC<SecurityStatusProps> = ({ level = 'normal' }) => {
  return (
    <div className="security-status">
      <div className="security-status__header">
        <div className="security-status__title-group">
          <Shield className="security-status__icon" />
          <h3 className="security-status__title">Security Status</h3>
        </div>
        <div className={`security-status__level security-status__level--${level}`}>
          {level}
        </div>
      </div>

      <div className="security-status__content">
        <div className="security-status__auth">
          <Lock className="security-status__auth-icon" />
          <span className="security-status__auth-text">
            Secure Connection Active
          </span>
        </div>
      </div>
    </div>
  );
};

export default SecurityStatus; 