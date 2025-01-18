import { Components } from '@mui/material/styles';
import { CustomTheme } from './index';

export const components: Components<CustomTheme> = {
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        scrollbarColor: 'rgba(255, 255, 255, 0.12) transparent',
        '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
          width: '6px',
          height: '6px',
        },
        '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
          borderRadius: '3px',
          backgroundColor: 'rgba(255, 255, 255, 0.12)',
        },
      },
    },
  },
  
  // Paper components with pure black background and white borders
  MuiPaper: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundImage: 'none',
        backgroundColor: '#000000',
        transition: theme.transitions.create([
          'border-color',
          'box-shadow',
        ], {
          duration: theme.transitions.duration.short,
        }),
      }),
      elevation1: {
        border: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: 'none',
      },
      elevation2: {
        border: '1px solid rgba(255, 255, 255, 0.16)',
        boxShadow: 'none',
      },
    },
  },

  // Cards with minimal design
  MuiCard: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: '#000000',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        transition: theme.transitions.create([
          'border-color',
          'opacity',
        ], {
          duration: theme.transitions.duration.short,
        }),
        '&:hover': {
          borderColor: 'rgba(255, 255, 255, 0.24)',
          opacity: 0.95,
        },
      }),
    },
  },

  // Buttons with clean, military-style design
  MuiButton: {
    defaultProps: {
      disableElevation: true,
    },
    styleOverrides: {
      root: {
        textTransform: 'uppercase',
        borderRadius: 0,
        letterSpacing: '0.06em',
        transition: 'opacity 0.2s ease-in-out',
        '&:hover': {
          opacity: 0.85,
        },
      },
      contained: {
        backgroundColor: '#000000',
        border: '1px solid rgba(255, 255, 255, 0.87)',
        color: '#FFFFFF',
        '&:hover': {
          backgroundColor: '#000000',
          borderColor: '#FFFFFF',
        },
      },
      outlined: {
        borderWidth: '1px',
        '&:hover': {
          borderWidth: '1px',
          backgroundColor: 'rgba(255, 255, 255, 0.04)',
        },
      },
    },
  },

  // Status chips with military precision
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: 0,
        height: '24px',
        transition: 'opacity 0.2s ease-in-out',
        '&:hover': {
          opacity: 0.85,
        },
      },
      filled: {
        backgroundColor: '#000000',
        border: '1px solid rgba(255, 255, 255, 0.24)',
      },
    },
  },

  // List items with military precision
  MuiListItem: {
    styleOverrides: {
      root: {
        borderRadius: 0,
        transition: 'background-color 0.2s ease-in-out',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.04)',
        },
      },
    },
  },

  // AppBar with pure black
  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundColor: '#000000',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: 'none',
      },
    },
  },

  // Drawer with military-grade design
  MuiDrawer: {
    styleOverrides: {
      paper: {
        backgroundColor: '#000000',
        borderRight: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: 'none',
      },
    },
  },

  // Dialog with military precision
  MuiDialog: {
    styleOverrides: {
      paper: {
        backgroundColor: '#000000',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: 0,
        boxShadow: 'none',
      },
    },
  },

  // Form components
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: 0,
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: 'rgba(255, 255, 255, 0.12)',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: 'rgba(255, 255, 255, 0.24)',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: '#FFFFFF',
          borderWidth: '1px',
        },
      },
    },
  },

  // Select components
  MuiSelect: {
    styleOverrides: {
      select: {
        borderRadius: 0,
      },
    },
  },

  // Table with military precision
  MuiTableRow: {
    styleOverrides: {
      root: {
        transition: 'background-color 0.2s ease-in-out',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.04)',
        },
      },
    },
  },

  // Menu items
  MuiMenuItem: {
    styleOverrides: {
      root: {
        transition: 'background-color 0.2s ease-in-out',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.04)',
        },
      },
    },
  },
}; 