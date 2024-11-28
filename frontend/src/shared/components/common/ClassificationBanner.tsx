/* frontend/src/ui/components/common/ClassificationBanner.tsx */

import React from 'react';
import '@/ui/styles/components/classification-banner.css';

const ClassificationBanner: React.FC = () => {
  return (
    <div className="classification-banner">
      <span className="classification-level">SECRET</span>
    </div>
  );
};

export default ClassificationBanner;