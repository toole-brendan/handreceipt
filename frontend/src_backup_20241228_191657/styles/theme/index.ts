import { createTheme, Theme, ThemeOptions } from '@mui/material/styles';
import { palette } from './palette';
import { typography } from './typography';
import { components } from './components';

// Define custom palette structure
interface CustomPaletteOptions {
  custom: {
    status: {
      verified: string;
      pending: string;
      sensitive: string;
      inactive: string;
    };
    glass: {
      light: string;
      medium: string;
      dark: string;
    };
  };
}

// Extend the theme to include custom properties
declare module '@mui/material/styles' {
  interface Palette extends CustomPaletteOptions {}
  interface PaletteOptions extends Partial<CustomPaletteOptions> {}
}

// Create base theme with custom properties
const baseTheme = createTheme({
  palette,
  typography,
  shape: {
    borderRadius: 0, // Military-style sharp corners
  },
  mixins: {
    toolbar: {
      minHeight: 56,
      '@media (min-width:0px) and (orientation: landscape)': {
        minHeight: 48,
      },
      '@media (min-width:600px)': {
        minHeight: 64,
      },
    },
  },
  transitions: {
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
  },
  zIndex: {
    mobileStepper: 1000,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
} as ThemeOptions);

// Create full theme with components that depend on base theme
const theme = createTheme(baseTheme, {
  components,
});

// Export the theme type
export type CustomTheme = typeof theme;

export default theme; 