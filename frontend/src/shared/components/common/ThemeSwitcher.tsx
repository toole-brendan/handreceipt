/* ThemeSwitcher.tsx */

import React from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';

export const ThemeSwitcher: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = React.useState(
    () =>
      localStorage.getItem('theme') === 'dark' ||
      (window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
  );

  React.useEffect(() => {
    const root = document.documentElement;
    if (isDarkTheme) {
      root.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkTheme]);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <button onClick={toggleTheme} className="btn-icon" aria-label="Toggle Theme">
      {isDarkTheme ? <FiSun className="icon" /> : <FiMoon className="icon" />}
    </button>
  );
};
