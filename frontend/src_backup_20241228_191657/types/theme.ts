import { PaletteOptions, Theme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface CustomPalette {
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
  }

  interface Palette extends CustomPalette {}
  interface PaletteOptions extends Partial<CustomPalette> {}
}

// Extend the theme to include custom breakpoints or other properties
declare module '@mui/material/styles' {
  interface Theme {
    custom: CustomPalette;
  }
  interface ThemeOptions {
    custom?: Partial<CustomPalette>;
  }
} 