/**
 * DateRange represents a time period with start and end dates
 */
export interface DateRange {
  start: string;
  end: string;
}

/**
 * Helper function to create an empty date range
 */
export const createEmptyDateRange = (): DateRange => ({
  start: '',
  end: ''
});

/**
 * Generic API response structure
 */
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  timestamp: string;
}

/**
 * Common status types used across the application
 */
export type Status = 'active' | 'inactive' | 'pending' | 'completed';

/**
 * Common ID types
 */
export type UUID = string;
export type EntityId = string | number;

/**
 * Common error structure
 */
export interface ErrorResponse {
  message: string;
  code?: string;
  details?: Record<string, any>;
} 