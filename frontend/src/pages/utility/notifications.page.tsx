import React, { useState, useEffect } from 'react';
import '@/styles/components/pages/notifications.css';

interface Notification {
  id: number;
  type: string;
  message: string;
  date: string;
  status: 'unread' | 'read';
  priority: 'normal' | 'high';
}

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Fetch notifications from API
    const fetchNotifications = async () => {
      try {
        // Replace with your API call
        const response = await fetch('/api/notifications');
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
    fetchNotifications();
  }, []);

  const handleMarkAsRead = (id: number) => {
    // Update the notification status
    setNotifications((prevNotifications) =>
      prevNotifications.map((notif) =>
        notif.id === id ? { ...notif, status: 'read' } : notif
      )
    );
    // You might want to send an API request here to update the backend
  };

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === 'all') return true;
    return notif.status === filter;
  });

  return (
    <div className="palantir-panel notifications-page">
      <div className="notifications-header">
        <h2>Notification Center</h2>
        {/* Filter Options */}
        <div className="filter-options">
          <label>Show: </label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="form-input"
          >
            <option value="all">All Notifications</option>
            <option value="unread">Unread Notifications</option>
            <option value="read">Read Notifications</option>
          </select>
        </div>
      </div>

      <div className="notifications-list">
        {filteredNotifications.length === 0 ? (
          <p>No notifications to display.</p>
        ) : (
          filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              className={`notification-item ${notif.status} ${
                notif.priority === 'high' ? 'high-priority' : ''
              }`}
            >
              <div className="notification-content">
                <p className="notification-message">{notif.message}</p>
                <span className="notification-date">{notif.date}</span>
              </div>
              <div className="notification-actions">
                {notif.status === 'unread' && (
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleMarkAsRead(notif.id)}
                  >
                    Mark as Read
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;