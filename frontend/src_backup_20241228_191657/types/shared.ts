export interface ApiResponse<T = any> {
  data: T;
  status: number;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  total: number;
  page: number;
  limit: number;
}

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface ErrorResponse {
  message: string;
  code?: string;
  details?: Record<string, any>;
}

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type Variant = 'primary' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link';
export type Status = 'idle' | 'loading' | 'success' | 'error'; 