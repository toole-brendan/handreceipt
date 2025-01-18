/**
 * System alert interface
 */
export interface Alert {
  id: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  message: string;
  timestamp: string;
  source: string;
  metadata?: Record<string, unknown>;
} 