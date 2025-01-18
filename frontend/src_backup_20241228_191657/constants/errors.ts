export const ERROR_MESSAGES = {
  NETWORK: 'Network error occurred. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  SESSION_EXPIRED: 'Your session has expired. Please log in again.',
  VALIDATION: {
    REQUIRED: 'This field is required',
    INVALID_FORMAT: 'Invalid format',
    PASSWORDS_DONT_MATCH: 'Passwords do not match'
  }
} as const;
