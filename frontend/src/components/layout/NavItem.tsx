/* frontend/src/shared/components/layout/NavItem.tsx */

import React, { forwardRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Theme,
} from '@mui/material';

interface NavItemProps {
  to: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  'data-testid'?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
}

const StyledListItemButton = styled(ListItemButton)(({ theme }: { theme: Theme }) => ({
  margin: theme.spacing(0.5, 1),
  padding: theme.spacing(1, 2),
  borderRadius: 0,
  backgroundColor: 'transparent',
  color: 'rgba(255, 255, 255, 0.7)',
  transition: theme.transitions.create(
    ['background-color', 'color', 'border-color', 'box-shadow'],
    {
      duration: theme.transitions.duration.shorter,
      easing: theme.transitions.easing.easeInOut,
    }
  ),
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    color: '#FFFFFF',
    boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.1)',
  },
  '&.Mui-selected': {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    color: '#FFFFFF',
    borderLeft: '2px solid #FFFFFF',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
    },
    '& .MuiListItemIcon-root': {
      color: '#FFFFFF',
    },
  },
  '& .MuiListItemIcon-root': {
    color: 'rgba(255, 255, 255, 0.7)',
    minWidth: 40,
    transition: theme.transitions.create('color'),
  },
  '& .MuiListItemText-primary': {
    fontSize: '0.875rem',
    fontWeight: 500,
    letterSpacing: '0.02em',
    fontFamily: 'Inter, sans-serif',
  },
  '& .MuiListItemText-secondary': {
    fontSize: '0.75rem',
    color: 'rgba(255, 255, 255, 0.5)',
    letterSpacing: '0.01em',
    fontFamily: 'Inter, sans-serif',
  },
}));

const NavItem = forwardRef<HTMLLIElement, NavItemProps>(({
  to,
  children,
  icon,
  onClick,
  'data-testid': dataTestId,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedby,
}, ref) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname === to;

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(to);
    }
  };

  return (
    <ListItem
      ref={ref}
      component="li"
      disablePadding
      data-testid={dataTestId}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedby}
    >
      <StyledListItemButton
        onClick={handleClick}
        selected={isActive}
        aria-current={isActive ? 'page' : undefined}
      >
        {icon && (
          <ListItemIcon
            data-testid={dataTestId ? `${dataTestId}-icon` : undefined}
          >
            {icon}
          </ListItemIcon>
        )}
        <ListItemText
          primary={children}
          data-testid={dataTestId ? `${dataTestId}-text` : undefined}
          primaryTypographyProps={{
            variant: 'body2',
            sx: { fontWeight: isActive ? 600 : 400 },
          }}
        />
      </StyledListItemButton>
    </ListItem>
  );
});

NavItem.displayName = 'NavItem';

export default NavItem;