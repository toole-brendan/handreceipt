// Re-export all types from their domains
export * from './auth';
export * from './common';
export * from './system';
export * from './property';
export * from './personnel';

// Export type utilities
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Nullable<T> = T | null;

export type AsyncData<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};
