import React from 'react';
import '../../../styles/components/dashboard-card.css';

interface DashboardCardProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  actions?: React.ReactNode;
  loading?: boolean;
  error?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  icon,
  children,
  className = '',
  actions,
  loading = false,
  error,
}) => {
  return (
    <div className={`dashboard-card ${className}`}>
      <div className="card-header">
        <div className="card-header-title">
          {icon && <span className="card-icon">{icon}</span>}
          <h3 className="card-title">{title}</h3>
        </div>
        {actions && <div className="card-actions">{actions}</div>}
      </div>
      <div className="card-content">
        {loading ? (
          <div className="card-loading">
            <div className="loading-spinner"></div>
            <span>Loading...</span>
          </div>
        ) : error ? (
          <div className="card-error">
            <i className="material-icons">error_outline</i>
            <span>{error}</span>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

export default DashboardCard; 