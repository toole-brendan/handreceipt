import React from 'react';
import '@/styles/components/reports/classification-badge.css';

type ClassificationLevel = 'UNCLASSIFIED' | 'CONFIDENTIAL' | 'SECRET' | 'TOP_SECRET';

interface ReportClassificationBadgeProps {
  level: ClassificationLevel;
}

export const ReportClassificationBadge: React.FC<ReportClassificationBadgeProps> = ({ level }) => {
  return (
    <div className={`classification-badge ${level.toLowerCase()}`}>
      {level}
    </div>
  );
}; 