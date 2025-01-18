import React, { useState } from 'react';
import { Frequency } from '@/types/reports';

interface ScheduleConfig {
  frequency: Frequency;
  recipients: string[];
  startDate: string;
  endDate?: string;
}

const ReportScheduler: React.FC = () => {
  const [schedule, setSchedule] = useState<ScheduleConfig>({
    frequency: 'weekly',
    recipients: [],
    startDate: new Date().toISOString()
  });

  // Add scheduling UI and logic
}; 