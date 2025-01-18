import React from 'react';

const SkipLink: React.FC = () => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const main = document.querySelector('main');
    if (main) {
      main.tabIndex = -1;
      main.focus();
      // Remove tabIndex after focus to prevent outline on click
      setTimeout(() => {
        main.removeAttribute('tabindex');
      }, 100);
    }
  };

  return (
    <a
      href="#main"
      className="skip-link"
      onClick={handleClick}
      onKeyDown={(e) => e.key === 'Enter' && handleClick(e as any)}
    >
      Skip to main content
    </a>
  );
};

export default SkipLink; 