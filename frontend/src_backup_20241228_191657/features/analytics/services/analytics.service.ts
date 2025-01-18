import { api } from '@/services/api';
import { ApiResponse } from '@/services/api/types';

export interface AnalyticsConfig {
  enabled: boolean;
  sampleRate?: number;
  environment?: 'development' | 'production';
}

export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
  timestamp?: number;
}

export class AnalyticsError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'AnalyticsError';
  }
}

export class AnalyticsService {
  private config: AnalyticsConfig;
  private initialized: boolean = false;

  constructor(config: AnalyticsConfig) {
    this.config = {
      sampleRate: 1.0,
      environment: (process.env.NODE_ENV as 'development' | 'production') || 'development',
      ...config
    };
  }

  async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }

    try {
      if (this.config.enabled) {
        // Initialize analytics tracking
        await api.post<void>('/analytics/initialize', {
          sampleRate: this.config.sampleRate,
          environment: this.config.environment
        });
        this.initialized = true;
        console.log('Analytics initialized successfully');
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new AnalyticsError(error.message, 'ANALYTICS_INIT_FAILED');
      }
      throw new AnalyticsError('Failed to initialize analytics', 'ANALYTICS_INIT_FAILED');
    }
  }

  async trackEvent(event: AnalyticsEvent): Promise<void> {
    if (!this.config.enabled || !this.initialized) {
      return;
    }

    try {
      await api.post<void>('/analytics/events', {
        ...event,
        timestamp: event.timestamp || Date.now()
      });
    } catch (error) {
      console.warn('Failed to track analytics event:', error);
      // Don't throw error for tracking failures
    }
  }

  async getAnalytics(startDate: Date, endDate: Date): Promise<any> {
    try {
      const response = await api.get<any>(`/analytics/data?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new AnalyticsError(error.message, 'ANALYTICS_FETCH_FAILED');
      }
      throw new AnalyticsError('Failed to fetch analytics data', 'ANALYTICS_FETCH_FAILED');
    }
  }
}

// Create singleton instance with default config
export const analyticsService = new AnalyticsService({
  enabled: process.env.NODE_ENV === 'production'
}); 