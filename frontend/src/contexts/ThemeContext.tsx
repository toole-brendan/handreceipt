import React, { createContext, useContext, useMemo, useState } from 'react';
import { ThemeProvider as MUIThemeProvider, createTheme, PaletteMode } from '@mui/material';
import { useTheme } from '../hooks/useTheme';
import theme from '../styles/theme';

interface ThemeContextType {
  mode: PaletteMode;
  toggleColorMode: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  mode: 'dark',
  toggleColorMode: () => {},
  isDark: true,
});

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { getInitialTheme, toggleTheme } = useTheme();
  const [mode, setMode] = useState<PaletteMode>(getInitialTheme());

  const colorMode = useMemo(
    () => ({
      mode,
      isDark: mode === 'dark',
      toggleColorMode: () => {
        const newMode = mode === 'light' ? 'dark' : 'light';
        setMode(newMode);
        toggleTheme(newMode);
        // Update CSS custom properties
        document.documentElement.setAttribute('data-theme', newMode);
      },
    }),
    [mode, toggleTheme]
  );

  const currentTheme = useMemo(
    () =>
      createTheme({
        ...theme,
        palette: {
          ...theme.palette,
          mode: 'dark', // Always use dark mode for military-grade aesthetic
        },
      }),
    [mode]
  );

  // Set initial theme on mount
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
  }, []);

  return (
    <ThemeContext.Provider value={colorMode}>
      <MUIThemeProvider theme={currentTheme}>
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
}; 