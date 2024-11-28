import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '@/ui/styles/components/session-timeout.css';

const SESSION_TIMEOUT = 15 * 60 * 1000; // 15 minutes
const WARNING_TIME = 60 * 1000; // 1 minute before timeout

const SessionTimeout: React.FC = () => {
  const [showWarning, setShowWarning] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let warningTimer: NodeJS.Timeout;
    let logoutTimer: NodeJS.Timeout;

    const resetTimers = () => {
      clearTimeout(warningTimer);
      clearTimeout(logoutTimer);

      warningTimer = setTimeout(() => {
        setShowWarning(true);
      }, SESSION_TIMEOUT - WARNING_TIME);

      logoutTimer = setTimeout(() => {
        navigate('/login');
      }, SESSION_TIMEOUT);
    };

    resetTimers();

    window.addEventListener('mousemove', resetTimers);
    window.addEventListener('keypress', resetTimers);

    return () => {
      clearTimeout(warningTimer);
      clearTimeout(logoutTimer);
      window.removeEventListener('mousemove', resetTimers);
      window.removeEventListener('keypress', resetTimers);
    };
  }, [navigate]);

  return showWarning ? (
    <div className="session-timeout-warning">
      <p>Your session will expire in 1 minute. Do you want to continue?</p>
      <button onClick={() => setShowWarning(false)}>Continue Session</button>
    </div>
  ) : null;
};

export default SessionTimeout; 