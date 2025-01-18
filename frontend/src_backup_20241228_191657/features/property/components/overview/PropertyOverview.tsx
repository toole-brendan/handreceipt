import React from 'react';
import { PropertyMetrics } from './PropertyMetrics';
import { PropertyAnalytics } from './PropertyAnalytics';
import { PropertyStatus } from './PropertyStatus';

export const PropertyOverview: React.FC = () => {
  return (
    <div className="property-overview">
      <PropertyMetrics />
      <PropertyAnalytics />
      <PropertyStatus />
    </div>
  );
};
