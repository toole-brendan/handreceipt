/* frontend/src/ui/components/reports/ReportClassificationBadge.tsx */

import React from 'react';
import '@/ui/styles/reports/report-classification-badge.css';

export type ClassificationLevel = 
  | 'UNCLASSIFIED' 
  | 'CONFIDENTIAL' 
  | 'SECRET' 
  | 'TOP_SECRET';

interface ReportClassificationBadgeProps {
  level: ClassificationLevel;
}

const levelColors: Record<ClassificationLevel, string> = {
  UNCLASSIFIED: 'unclassified',
  CONFIDENTIAL: 'confidential',
  SECRET: 'secret',
  TOP_SECRET: 'top-secret',
};

export const ReportClassificationBadge: React.FC<ReportClassificationBadgeProps> = ({
  level,
}) => {
  const colorClass = levelColors[level];
  
  return (
    <span 
      className={`classification-badge ${colorClass}`}
      role="status"
      aria-label={`Classification level: ${level}`}
    >
      {level}
    </span>
  );
};

export default ReportClassificationBadge; 