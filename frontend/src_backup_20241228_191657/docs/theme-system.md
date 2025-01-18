# Theme System Documentation

## Overview
The theme system integrates Material-UI (MUI) with our existing styles, providing a consistent theming experience across the application. It supports automatic dark mode detection, theme persistence, and easy theme switching.

## Components

### ThemeProvider
Located in `/src/contexts/ThemeContext.tsx`

```tsx
import { ThemeProvider } from '../contexts/ThemeContext';

// Usage
<ThemeProvider>
  <App />
</ThemeProvider>
```

Props:
- `children`: React.ReactNode - Components to be wrapped with theme context

### ThemeSwitcher
Located in `/src/components/common/ThemeSwitcher.tsx`

```tsx
import { ThemeSwitcher } from '../components/common/ThemeSwitcher';

// Usage
<ThemeSwitcher />
```

Features:
- Automatic light/dark mode toggle
- System preference detection
- Persisted theme preference

## Hooks

### useTheme
Located in `/src/hooks/useTheme.ts`

```tsx
import { useTheme } from '../hooks/useTheme';

// Usage
const { getInitialTheme, toggleTheme } = useTheme();
```

Returns:
- `getInitialTheme`: () => PaletteMode - Gets the initial theme from localStorage or system preference
- `toggleTheme`: (theme: PaletteMode) => void - Toggles between light and dark themes

### useThemeContext
Located in `/src/contexts/ThemeContext.tsx`

```tsx
import { useThemeContext } from '../contexts/ThemeContext';

// Usage
const { mode, toggleColorMode } = useThemeContext();
```

Returns:
- `mode`: PaletteMode - Current theme mode ('light' | 'dark')
- `toggleColorMode`: () => void - Function to toggle between light and dark modes

## Theme Configuration

### Main Theme
Located in `/src/styles/theme/index.ts`
- Combines palette, typography, and component overrides
- Provides the base theme configuration for MUI

### Palette
Located in `/src/styles/theme/palette.ts`
- Defines color schemes for light and dark modes
- Includes primary, secondary, and status colors

### Typography
Located in `/src/styles/theme/typography.ts`
- Defines font families, sizes, and weights
- Configures text styles for different elements

### Component Overrides
Located in `/src/styles/theme/components.ts`
- Customizes default MUI component styles
- Maintains consistency with existing design

## Integration with Existing Styles
- Base styles in `/src/styles/base` remain intact
- MUI components can be used alongside existing components
- CSS custom properties are preserved for consistency 