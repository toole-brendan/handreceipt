export * from './alerts';

/**
 * System configuration settings
 */
export interface SystemConfig {
  maintenanceMode: boolean;
  version: string;
  features: {
    [key: string]: boolean;
  };
}

/**
 * System health status
 */
export interface SystemHealth {
  status: 'healthy' | 'degraded' | 'down';
  lastChecked: string;
  services: {
    [key: string]: {
      status: 'up' | 'down';
      latency: number;
    };
  };
}

/**
 * System metrics
 */
export interface SystemMetrics {
  activeUsers: number;
  totalAssets: number;
  pendingTransfers: number;
  activeAlerts: number;
}

/**
 * System alert levels
 */
export type AlertLevel = 'info' | 'warning' | 'error' | 'critical'; 