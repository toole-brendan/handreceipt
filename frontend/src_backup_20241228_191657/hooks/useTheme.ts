import { useCallback } from 'react';
import { PaletteMode } from '@mui/material';

export const useTheme = () => {
  // Always return dark theme for military-grade aesthetic
  const getInitialTheme = useCallback((): PaletteMode => {
    return 'dark';
  }, []);

  // Theme toggle function (preserved for future compatibility)
  const toggleTheme = useCallback((theme: PaletteMode) => {
    const root = window.document.documentElement;
    
    // Ensure dark theme is always applied
    root.classList.remove('light');
    root.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    
    // Apply military-grade styles
    root.style.setProperty('--bg-primary', '#000000');
    root.style.setProperty('--text-primary', '#FFFFFF');
    root.style.setProperty('--border-primary', 'rgba(255, 255, 255, 0.12)');
  }, []);

  return {
    getInitialTheme,
    toggleTheme,
  };
}; 