import React from 'react';
import { Box, RefreshCw } from 'lucide-react';
import '@/ui/styles/components/dashboard/active-assets-count.css';

interface ActiveAssetsCountProps {
  count: number;
  trend: string;
}

const ActiveAssetsCount: React.FC<ActiveAssetsCountProps> = ({ count, trend }) => {
  return (
    <div className="active-assets">
      <div className="active-assets__header">
        <div className="active-assets__title-group">
          <Box 
            className="active-assets__icon" 
            size={20}
            aria-hidden="true"
          />
          <h3 className="active-assets__title">Active Assets</h3>
        </div>
      </div>

      <div className="active-assets__content">
        <div className="active-assets__stats">
          <span className="active-assets__count">
            {count.toLocaleString()}
          </span>
          <span className="active-assets__trend">
            {trend}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ActiveAssetsCount; 