import React, { useState, useEffect } from 'react';

interface ActivityLogEntry {
  id: string;
  action: string;
  timestamp: string;
  details: string;
  ipAddress?: string;
}

interface ActivityLogProps {
  userId: string;
}

const ActivityLog: React.FC<ActivityLogProps> = ({ userId }) => {
  const [activities, setActivities] = useState<ActivityLogEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActivityLog();
  }, [userId]);

  const fetchActivityLog = async () => {
    try {
      const response = await fetch(`/api/v1/user/${userId}/activity`);
      const data = await response.json();
      if (data.success) {
        setActivities(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching activity log:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading activity log...</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Activity Log</h2>
      
      <div className="space-y-2">
        {activities.length === 0 ? (
          <p className="text-gray-500">No recent activity</p>
        ) : (
          activities.map((activity) => (
            <div
              key={activity.id}
              className="p-3 bg-white rounded border border-gray-200"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.details}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    {new Date(activity.timestamp).toLocaleString()}
                  </p>
                  {activity.ipAddress && (
                    <p className="text-xs text-gray-400">
                      IP: {activity.ipAddress}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ActivityLog; 