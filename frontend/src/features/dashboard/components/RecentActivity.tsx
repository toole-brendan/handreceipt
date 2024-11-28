import React from 'react';
import { Clock, RefreshCw, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { useRecentActivity } from '@/hooks/useRecentActivity';
import '@/ui/styles/components/dashboard/recent-activity.css';

const RecentActivity: React.FC = () => {
  const { activities, loading, error, refresh } = useRecentActivity();

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle size={16} className="recent-activity__icon--warning" />;
      case 'error':
        return <AlertTriangle size={16} className="recent-activity__icon--error" />;
      case 'success':
        return <CheckCircle size={16} className="recent-activity__icon--success" />;
      default:
        return <Info size={16} className="recent-activity__icon--info" />;
    }
  };

  return (
    <div className="recent-activity">
      <div className="recent-activity__header">
        <div className="recent-activity__title-group">
          <Clock 
            className="recent-activity__icon" 
            size={20}
            aria-hidden="true"
          />
          <h3 className="recent-activity__title">Recent Activity</h3>
        </div>
        <button 
          className="recent-activity__refresh"
          onClick={refresh}
          aria-label="Refresh recent activity"
        >
          <RefreshCw 
            size={16} 
            className={loading ? 'spinning' : ''} 
          />
        </button>
      </div>

      <div className="recent-activity__content">
        {loading ? (
          <div className="recent-activity__loading" role="status">
            <RefreshCw className="recent-activity__loading-icon" />
            <span>Loading recent activity...</span>
          </div>
        ) : error ? (
          <div className="recent-activity__error" role="alert">
            {error}
          </div>
        ) : (
          <ul className="recent-activity__list">
            {activities.map((activity) => (
              <li 
                key={activity.id} 
                className={`recent-activity__item recent-activity__item--${activity.type}`}
              >
                <div className="recent-activity__item-header">
                  {getActivityIcon(activity.type)}
                  <time className="recent-activity__timestamp">
                    {new Date(activity.timestamp).toLocaleString()}
                  </time>
                </div>
                <div className="recent-activity__item-content">
                  <p className="recent-activity__description">
                    {activity.description}
                  </p>
                  {activity.user && (
                    <span className="recent-activity__user">
                      By: {activity.user}
                    </span>
                  )}
                  {activity.details && (
                    <p className="recent-activity__details">
                      {activity.details}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
        {!loading && !error && activities.length === 0 && (
          <p className="recent-activity__empty">
            No recent activity to display
          </p>
        )}
      </div>
    </div>
  );
};

export default RecentActivity; 