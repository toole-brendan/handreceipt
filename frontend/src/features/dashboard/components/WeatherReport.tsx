/* frontend/src/ui/components/dashboard/WeatherReport.tsx */

import React from 'react';
import DashboardCard from '../common/DashboardCard';

interface WeatherAlert {
  type: string;
  severity: string;
  message: string;
}

interface WeatherReportProps {
  onWeatherAlert: (alert: WeatherAlert) => void;
}

const WeatherReport: React.FC<WeatherReportProps> = ({ onWeatherAlert }) => {
  return (
    <DashboardCard 
      title="Weather Report"
      icon={<i className="material-icons">cloud</i>}
    >
      <div className="weather-content">
        Weather information will be displayed here
      </div>
    </DashboardCard>
  );
};

export default WeatherReport; 