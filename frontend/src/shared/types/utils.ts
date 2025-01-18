/**
 * Makes all properties in T optional recursively
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Makes a type nullable (can be null)
 */
export type Nullable<T> = T | null;

/**
 * Common async data wrapper with loading and error states
 */
export type AsyncData<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

/**
 * Common API response format
 */
export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

/**
 * Common pagination parameters
 */
export type PaginationParams = {
  page: number;
  limit: number;
  sort?: string;
  order?: 'asc' | 'desc';
};

/**
 * Common paginated response
 */
export type PaginatedResponse<T> = {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}; 