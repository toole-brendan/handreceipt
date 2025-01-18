export type ReportType = 'property' | 'security' | 'maintenance' | 'audit' | 'custom';

export interface ReportConfig {
  startDate?: string;
  endDate?: string;
  filters?: Record<string, unknown>;
  format?: 'pdf' | 'csv' | 'excel';
}

export interface GeneratedReport {
  id: string;
  type: ReportType;
  createdAt: string;
  url: string;
  metadata: Record<string, unknown>;
}

export interface CustomReport {
  name: string;
  description?: string;
  type: ReportType;
  config: ReportConfig;
  schedule?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    time?: string;
    dayOfWeek?: number;
    dayOfMonth?: number;
  };
}

export interface ReportTemplate extends CustomReport {
  id: string;
  createdAt: string;
  lastRun?: string;
} 