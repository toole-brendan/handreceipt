export const REPORT_TYPES = {
  PROPERTY_BOOK: 'property_book',
  MAINTENANCE: 'maintenance',
  INVENTORY: 'inventory',
  TRANSFER: 'transfer',
  AUDIT: 'audit'
} as const;

export const CLASSIFICATION_LEVELS = {
  UNCLASSIFIED: 'unclassified',
  CONFIDENTIAL: 'confidential',
  SECRET: 'secret',
  TOP_SECRET: 'top_secret'
} as const;

export const REPORT_TEMPLATES = {
  PROPERTY_ACCOUNTABILITY: 'property_accountability',
  MAINTENANCE: 'maintenance',
  AUDIT: 'audit',
  SECURITY: 'security'
} as const;
