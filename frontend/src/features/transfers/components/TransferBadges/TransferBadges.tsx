import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Tooltip } from '@mui/material';

interface BadgeProps {
  className?: string;
  children: React.ReactNode;
}

const BaseBadge: React.FC<BadgeProps> = ({ className = '', children }) => (
  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium
    border transition-all duration-200 backdrop-blur-sm ${className}`}>
    {children}
  </div>
);

interface PriorityBadgeProps {
  priority: 'high' | 'medium' | 'low';
  notes?: string;
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority, notes }) => {
  const styles = {
    high: {
      wrapper: 'bg-red-900/30 hover:bg-red-900/40 border-red-500/50 text-red-400',
      icon: '!text-red-400'
    },
    medium: {
      wrapper: 'bg-amber-900/30 hover:bg-amber-900/40 border-amber-500/50 text-amber-400',
      icon: '!text-amber-400'
    },
    low: {
      wrapper: 'bg-emerald-900/30 hover:bg-emerald-900/40 border-emerald-500/50 text-emerald-400',
      icon: '!text-emerald-400'
    }
  }[priority];

  const label = {
    high: 'High Priority',
    medium: 'Medium Priority',
    low: 'Low Priority'
  }[priority];

  return (
    <Tooltip title={notes || 'No additional notes'}>
      <BaseBadge className={styles.wrapper}>
        {(priority === 'high' || priority === 'medium') && (
          <AlertTriangle className={`w-4 h-4 ${styles.icon}`} strokeWidth={2.5} />
        )}
        <span>{label}</span>
      </BaseBadge>
    </Tooltip>
  );
};

interface TypeBadgeProps {
  type: 'incoming' | 'outgoing';
}

export const TypeBadge: React.FC<TypeBadgeProps> = ({ type }) => {
  const styles = type === 'incoming'
    ? 'bg-emerald-900/30 hover:bg-emerald-900/40 border-emerald-500/50 text-emerald-400'
    : 'bg-blue-900/30 hover:bg-blue-900/40 border-blue-500/50 text-blue-400';

  return (
    <BaseBadge className={styles}>
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </BaseBadge>
  );
};

interface StatusBadgeProps {
  status: 'completed' | 'needs_approval' | 'pending_other';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const styles = {
    completed: 'bg-emerald-900/30 hover:bg-emerald-900/40 border-emerald-500/50 text-emerald-400',
    needs_approval: 'bg-amber-900/30 hover:bg-amber-900/40 border-amber-500/50 text-amber-400',
    pending_other: 'bg-blue-900/30 hover:bg-blue-900/40 border-blue-500/50 text-blue-400'
  }[status];

  const label = {
    needs_approval: "Needs Approval",
    completed: "Completed",
    pending_other: "Pending"
  }[status];

  return (
    <BaseBadge className={styles}>
      {label}
    </BaseBadge>
  );
};