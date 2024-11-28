/* frontend/src/ui/styles/themes/index.ts */

export { variables } from './variables';
export { darkTheme } from './dark';
export { lightTheme } from './light';

export type Theme = {
  colorBackground: string;
  colorSurface: string;
  colorTextPrimary: string;
  colorTextSecondary: string;
};