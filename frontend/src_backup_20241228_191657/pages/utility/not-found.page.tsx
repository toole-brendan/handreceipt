import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import '@/styles/components/pages/not-found.css';

const NotFound: React.FC = () => {
  return (
    <div className="not-found">
      <div className="not-found__content">
        <AlertTriangle 
          size={48} 
          className="not-found__icon"
          aria-hidden="true"
        />
        <h1 className="not-found__title">404 - Page Not Found</h1>
        <p className="not-found__message">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link to="/" className="not-found__link">
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound; 