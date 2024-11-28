/* frontend/src/ui/components/common/LoadingFallback.tsx */

import React from 'react';
import '@styles/components/loading-fallback.css';

const LoadingFallback: React.FC = () => {
  return (
    <div className="loading-fallback">
      <div className="loading-spinner"></div>
      <div className="loading-text">Loading Military Asset Tracking System...</div>
      <div className="loading-subtext">Please wait while we set up your dashboard</div>
      <div className="loading-progress">
        <div className="progress-bar"></div>
      </div>
    </div>
  );
};

export default LoadingFallback; 