import React from 'react';
import { Card as MuiCard, CardProps as MuiCardProps, styled } from '@mui/material';
import { CustomTheme } from '../../../styles/theme';

type CustomVariant = 'outlined' | 'contained';

export interface CardProps extends Omit<MuiCardProps, 'variant'> {
  variant?: CustomVariant;
  emphasis?: 'low' | 'medium' | 'high';
  noHover?: boolean;
}

const StyledCard = styled(MuiCard, {
  shouldForwardProp: (prop) => !['variant', 'emphasis', 'noHover'].includes(prop as string),
})<CardProps>(({ theme, variant = 'outlined', emphasis = 'medium', noHover }) => {
  const customTheme = theme as CustomTheme;
  
  const getBackgroundColor = () => {
    switch (emphasis) {
      case 'high':
        return 'rgba(255, 255, 255, 0.1)';
      case 'medium':
        return 'rgba(255, 255, 255, 0.05)';
      case 'low':
      default:
        return '#000000';
    }
  };

  return {
    backgroundColor: getBackgroundColor(),
    border: variant === 'outlined' ? '1px solid rgba(255, 255, 255, 0.7)' : 'none',
    borderRadius: '4px',
    color: theme.palette.common.white,
    transition: theme.transitions.create(
      ['transform', 'background-color', 'border-color'],
      {
        duration: theme.transitions.duration.shorter,
        easing: theme.transitions.easing.easeInOut,
      }
    ),
    
    ...(!noHover && {
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderColor: theme.palette.common.white,
      },
    }),

    // Military-grade aesthetic enhancements
    padding: theme.spacing(2),
    position: 'relative',
    
    '&::before': variant === 'outlined' ? {
      content: '""',
      position: 'absolute',
      top: -1,
      left: -1,
      right: -1,
      bottom: -1,
      borderRadius: '4px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      pointerEvents: 'none',
    } : undefined,
  };
});

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, variant = 'outlined', ...props }, ref) => {
    const muiProps = {
      ...props,
      ref,
      variant: variant === 'contained' ? 'elevation' : 'outlined' as const,
    };

    return <StyledCard {...muiProps}>{children}</StyledCard>;
  }
);

Card.displayName = 'Card';

// Predefined card variants
export const PrimaryCard: React.FC<Omit<CardProps, 'variant' | 'emphasis'>> = (props) => (
  <Card variant="outlined" emphasis="high" {...props} />
);

export const SecondaryCard: React.FC<Omit<CardProps, 'variant' | 'emphasis'>> = (props) => (
  <Card variant="outlined" emphasis="medium" {...props} />
);

export const SubtleCard: React.FC<Omit<CardProps, 'variant' | 'emphasis'>> = (props) => (
  <Card variant="contained" emphasis="low" {...props} />
); 