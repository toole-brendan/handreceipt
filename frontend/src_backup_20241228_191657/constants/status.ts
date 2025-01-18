export const STATUS_CODES = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  TRANSFERRED: 'transferred',
  MAINTENANCE: 'maintenance'
} as const;

export const MAINTENANCE_STATUS = {
  SCHEDULED: 'scheduled',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  DELAYED: 'delayed',
  CANCELLED: 'cancelled'
} as const;
