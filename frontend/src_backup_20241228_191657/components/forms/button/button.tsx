/* frontend/src/ui/button.tsx */

import React from 'react';
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  CircularProgress,
  styled,
} from '@mui/material';

export interface ButtonProps extends Omit<MuiButtonProps, 'startIcon' | 'endIcon'> {
  isLoading?: boolean;
  isIcon?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const StyledButton = styled(MuiButton)(({ theme }) => ({
  '& .MuiButton-startIcon, & .MuiButton-endIcon': {
    margin: theme.spacing(0, 0.5),
  },
  '& .button-spinner': {
    marginRight: theme.spacing(1),
    color: 'inherit',
  },
}));

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  className,
  variant = 'contained',
  size = 'medium',
  isLoading = false,
  isIcon = false,
  iconLeft,
  iconRight,
  disabled,
  children,
  ...props
}, ref) => {
  return (
    <StyledButton
      ref={ref}
      className={className}
      variant={variant}
      size={size}
      disabled={isLoading || disabled}
      startIcon={!isLoading && iconLeft ? iconLeft : undefined}
      endIcon={!isLoading && iconRight ? iconRight : undefined}
      {...props}
    >
      {isLoading && (
        <CircularProgress
          size={20}
          className="button-spinner"
        />
      )}
      {children}
    </StyledButton>
  );
});

Button.displayName = 'Button';
