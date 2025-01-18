export const VALIDATION = {
  PASSWORD: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 128,
    REQUIRED_CHARS: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@%*?&])[A-Za-z\d@%*?&]/
  },
  USERNAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 50,
    PATTERN: /^[a-zA-Z0-9_-]+$/
  }
} as const;
