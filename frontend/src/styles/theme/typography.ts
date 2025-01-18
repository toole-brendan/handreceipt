import { TypographyOptions } from '@mui/material/styles/createTypography';

export const typography: TypographyOptions = {
  // Base font settings
  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 600,
  
  // Branding elements - Serif font
  h1: {
    fontFamily: 'Helvetica, Arial, sans-serif',
    fontSize: '1.5rem',
    fontWeight: 600,
    letterSpacing: '0.02em',
    textTransform: 'none',
    lineHeight: 1.2,
    position: 'relative',
    paddingBottom: '0.5rem',
    '&:after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '30px',
      height: '1px',
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
    }
  },
  h2: {
    fontFamily: '"Playfair Display", "Times New Roman", serif',
    fontSize: '2rem',
    fontWeight: 600,
    letterSpacing: '0.02em',
    textTransform: 'none',
    lineHeight: 1.3,
  },
  h3: {
    fontSize: '1.75rem',
    fontWeight: 600,
    letterSpacing: '0.02em',
    lineHeight: 1.4,
  },
  h4: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
    fontSize: '1.75rem',
    fontWeight: 500,
    letterSpacing: '0.1em',
    lineHeight: 1.2,
    textTransform: 'uppercase',
    marginLeft: '-1rem'
  },
  h5: {
    fontSize: '1.25rem',
    fontWeight: 500,
    letterSpacing: '0.01em',
    lineHeight: 1.4,
  },
  h6: {
    fontSize: '1.125rem',
    fontWeight: 500,
    letterSpacing: '0.01em',
    lineHeight: 1.4,
  },
  
  // Interface text - Clean sans-serif
  body1: {
    fontSize: '1rem',
    letterSpacing: '0.02em',
    lineHeight: 1.6,
    fontWeight: 400,
  },
  body2: {
    fontSize: '0.875rem',
    letterSpacing: '0.02em',
    lineHeight: 1.6,
    fontWeight: 400,
  },
  
  // Military-style labels and status indicators
  subtitle1: {
    fontSize: '1rem',
    fontWeight: 500,
    letterSpacing: '0.04em',
    lineHeight: 1.5,
    textTransform: 'uppercase',
  },
  subtitle2: {
    fontSize: '0.875rem',
    fontWeight: 500,
    letterSpacing: '0.04em',
    lineHeight: 1.5,
    textTransform: 'uppercase',
  },
  
  // Small text elements
  caption: {
    fontSize: '0.75rem',
    letterSpacing: '0.04em',
    lineHeight: 1.5,
    fontWeight: 400,
  },
  
  // Interactive elements
  button: {
    fontSize: '0.875rem',
    fontWeight: 500,
    letterSpacing: '0.06em',
    lineHeight: 1.75,
    textTransform: 'uppercase',
  },
  
  // Status and classification markers
  overline: {
    fontSize: '0.75rem',
    fontWeight: 500,
    letterSpacing: '0.12em',
    lineHeight: 2.5,
    textTransform: 'uppercase',
  },
}; 