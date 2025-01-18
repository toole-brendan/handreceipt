import './theme.css';
import './components.css';

// Export utility functions for dynamic styles
export const getThemeColor = (color: string, shade: number = 500) => 
  `var(--color-${color}-${shade})`;

export const getSpacing = (size: number) => 
  `var(--spacing-${size})`;

export const getFontSize = (size: string) => 
  `var(--font-size-${size})`;

export const getShadow = (size: string) => 
  `var(--shadow-${size})`;

export const getRadius = (size: string) => 
  `var(--radius-${size})`;

// Export common class name generators
export const getButtonClass = (
  variant: 'default' | 'primary' | 'secondary' | 'ghost' | 'destructive' | 'outline' | 'link' = 'default',
  size: 'sm' | 'md' | 'lg' = 'md',
  options?: {
    isIcon?: boolean;
    isLoading?: boolean;
    hasIconLeft?: boolean;
    hasIconRight?: boolean;
  }
) => {
  const classes = ['btn', `btn-${variant}`, `btn-${size}`];
  
  if (options?.isIcon) classes.push('btn-icon');
  if (options?.isLoading) classes.push('btn-loading');
  if (options?.hasIconLeft) classes.push('btn-icon-left');
  if (options?.hasIconRight) classes.push('btn-icon-right');
  
  return classes.join(' ');
};

export const getInputClass = (hasError: boolean = false) => 
  `input ${hasError ? 'input-error' : ''}`;

export const getCardClass = (bordered: boolean = false) => 
  `card ${bordered ? 'card-bordered' : ''}`;

export const getAlertClass = (variant: string) => 
  `alert alert-${variant}`;

// Export common style objects for inline styling
export const flexCenter = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
} as const;

export const flexBetween = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
} as const;

export const gridCenter = {
  display: 'grid',
  placeItems: 'center',
} as const; 