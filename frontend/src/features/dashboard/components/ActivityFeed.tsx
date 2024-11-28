/* frontend/src/ui/components/dashboard/ActivityFeed.tsx */

import React from 'react';
import '@/ui/styles/components/dashboard/activity-feed.css';

interface Activity {
  id: string;
  type: string;
  user: string;
  action: string;
  details: string;
  timestamp: string;
}

interface ActivityFeedProps {
  activities: Activity[];
  timeRange: string;
  filter: string;
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({ 
  activities,
  timeRange,
  filter 
}) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'transfer': return '↔️';
      case 'maintenance': return '🔧';
      case 'inventory': return '📋';
      default: return '•';
    }
  };

  return (
    <div className="activity-feed">
      <div className="activity-feed-header">
        <h3>Activity Feed</h3>
        <div className="activity-feed-controls">
          <span className="time-range">Last {timeRange}</span>
        </div>
      </div>

      <div className="activity-list-container">
        <ul className="activity-list">
          {activities.map((activity) => (
            <li 
              key={activity.id} 
              className={`activity-item type-${activity.type}`}
            >
              <span className="activity-icon">
                {getActivityIcon(activity.type)}
              </span>
              <div className="activity-content">
                <div className="activity-header">
                  <span className="activity-user">{activity.user}</span>
                  <span className="activity-timestamp">
                    {new Date(activity.timestamp).toLocaleString()}
                  </span>
                </div>
                <div className="activity-action">{activity.action}</div>
                {activity.details && (
                  <div className="activity-details">{activity.details}</div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ActivityFeed;
