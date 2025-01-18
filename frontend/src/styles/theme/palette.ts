import { PaletteOptions, alpha } from '@mui/material/styles';

// Glass morphism helper
const createGlassEffect = (baseColor: string, opacity = 0.1) => `rgba${baseColor.replace('rgb', '')}`.replace(')', `, ${opacity})`);

export const palette: PaletteOptions = {
  mode: 'dark',
  primary: {
    main: '#FFFFFF', // Pure white for primary elements
    light: 'rgba(255, 255, 255, 0.85)',
    dark: 'rgba(255, 255, 255, 0.95)',
    contrastText: '#000000',
  },
  secondary: {
    main: 'rgba(255, 255, 255, 0.7)', // Neutral white with transparency
    light: 'rgba(255, 255, 255, 0.85)',
    dark: 'rgba(255, 255, 255, 0.6)',
    contrastText: '#000000',
  },
  background: {
    default: '#000000', // Pure black background
    paper: '#000000', // Pure black for elevated surfaces
  },
  success: {
    main: '#FFFFFF', // White for success states
    light: 'rgba(255, 255, 255, 0.85)',
    dark: 'rgba(255, 255, 255, 0.95)',
    contrastText: '#000000',
  },
  error: {
    main: '#FF3B3B', // Critical notifications
    light: '#FF6262',
    dark: '#E62E2E',
    contrastText: '#000000',
  },
  warning: {
    main: '#FFD700', // Amber alerts
    light: '#FFE44D',
    dark: '#E6C200',
    contrastText: '#000000',
  },
  text: {
    primary: '#FFFFFF', // Pure white text
    secondary: 'rgba(255, 255, 255, 0.7)', // Secondary text with transparency
    disabled: 'rgba(255, 255, 255, 0.38)',
  },
  divider: 'rgba(255, 255, 255, 0.12)', // Subtle white dividers
  action: {
    active: '#FFFFFF',
    hover: 'rgba(255, 255, 255, 0.08)',
    selected: 'rgba(255, 255, 255, 0.16)',
    disabled: 'rgba(255, 255, 255, 0.3)',
    disabledBackground: 'rgba(255, 255, 255, 0.12)',
    focus: 'rgba(255, 255, 255, 0.12)',
  },
  // Custom colors for specific status indicators
  custom: {
    status: {
      verified: '#FFFFFF', // White for verified status
      pending: '#FFD700', // Amber for pending
      sensitive: '#FF3B3B', // Red for sensitive items
      inactive: 'rgba(255, 255, 255, 0.38)', // Faded white for inactive
    },
    glass: {
      light: createGlassEffect('#FFFFFF', 0.05),
      medium: createGlassEffect('#FFFFFF', 0.08),
      dark: createGlassEffect('#FFFFFF', 0.12),
    },
  },
}; 