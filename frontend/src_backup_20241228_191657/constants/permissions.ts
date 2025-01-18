export const ROLES = {
  ADMIN: 'admin',
  OFFICER: 'officer',
  NCO: 'nco',
  SOLDIER: 'soldier'
} as const;

export const PERMISSIONS = {
  PROPERTY: {
    VIEW: 'property:view',
    EDIT: 'property:edit',
    DELETE: 'property:delete',
    TRANSFER: 'property:transfer'
  },
  REPORTS: {
    VIEW: 'reports:view',
    CREATE: 'reports:create',
    EXPORT: 'reports:export'
  }
} as const;
