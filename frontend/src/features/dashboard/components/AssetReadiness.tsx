import React from 'react';
import { Box } from 'lucide-react';
import '@/ui/styles/components/dashboard/asset-readiness.css';

interface AssetReadinessProps {
  percentage: number;
  critical: number;
  maintenance: number;
}

const AssetReadiness: React.FC<AssetReadinessProps> = ({ 
  percentage, 
  critical, 
  maintenance 
}) => {
  return (
    <div className="asset-readiness">
      <div className="asset-readiness__header">
        <div className="asset-readiness__title-group">
          <Box 
            className="asset-readiness__icon" 
            size={20}
            aria-hidden="true"
          />
          <h3 className="asset-readiness__title">Asset Readiness</h3>
        </div>
      </div>

      <div className="asset-readiness__content">
        <div className="asset-readiness__stats">
          <div className="asset-readiness__percentage-wrapper">
            <div 
              className="asset-readiness__percentage-circle"
              style={{
                background: `conic-gradient(
                  var(--color-primary) ${percentage * 3.6}deg,
                  var(--color-background-secondary) 0deg
                )`
              }}
            >
              <div className="asset-readiness__percentage-inner">
                <span className="asset-readiness__percentage-value">
                  {percentage}%
                </span>
                <span className="asset-readiness__percentage-label">
                  Ready
                </span>
              </div>
            </div>
          </div>
          <div className="asset-readiness__details">
            <div className="asset-readiness__detail">
              <span className="asset-readiness__detail-label">Critical Issues:</span>
              <span className="asset-readiness__detail-value">{critical}</span>
            </div>
            <div className="asset-readiness__detail">
              <span className="asset-readiness__detail-label">In Maintenance:</span>
              <span className="asset-readiness__detail-value">{maintenance}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetReadiness; 