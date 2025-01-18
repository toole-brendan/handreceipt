export type ValidationRule = {
  test: (value: any) => boolean;
  message: string;
};

export const required = (message = 'This field is required'): ValidationRule => ({
  test: (value: any) => {
    if (typeof value === 'string') return value.trim().length > 0;
    if (Array.isArray(value)) return value.length > 0;
    return value !== null && value !== undefined;
  },
  message,
});

export const email = (message = 'Invalid email address'): ValidationRule => ({
  test: (value: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(value);
  },
  message,
});

export const minLength = (length: number, message = `Must be at least ${length} characters`): ValidationRule => ({
  test: (value: string) => value.length >= length,
  message,
});

export const maxLength = (length: number, message = `Must be no more than ${length} characters`): ValidationRule => ({
  test: (value: string) => value.length <= length,
  message,
});

export const pattern = (regex: RegExp, message = 'Invalid format'): ValidationRule => ({
  test: (value: string) => regex.test(value),
  message,
});

export const numeric = (message = 'Must be a number'): ValidationRule => ({
  test: (value: string) => !isNaN(Number(value)),
  message,
});

export const validate = (value: any, rules: ValidationRule[]): string[] => {
  return rules
    .filter(rule => !rule.test(value))
    .map(rule => rule.message);
}; 