import React, { useEffect, useState } from 'react';
import { TimelineEvent } from '../../types/maintenance.types';

interface TimelineProps {
  requestId: string;
}

export const Timeline: React.FC<TimelineProps> = ({ requestId }) => {
  const [events, setEvents] = useState<TimelineEvent[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`/api/v1/maintenance/requests/${requestId}/timeline`);
        if (response.ok) {
          const data = await response.json();
          setEvents(data);
        }
      } catch (error) {
        console.error('Failed to fetch timeline events:', error);
      }
    };

    fetchEvents();
  }, [requestId]);

  return (
    <div className="timeline">
      {events.map((event) => (
        <div key={event.id} className="timeline-event">
          <div className="timeline-event-dot" />
          <div className="timeline-event-content">
            <div className="timeline-event-header">
              <span className="timeline-event-type">
                {event.type.replace('_', ' ')}
              </span>
              <span className="timeline-event-time">
                {new Date(event.timestamp).toLocaleString()}
              </span>
            </div>
            <p className="timeline-event-details">{event.details}</p>
            <span className="timeline-event-actor">{event.actor}</span>
          </div>
        </div>
      ))}
    </div>
  );
}; 