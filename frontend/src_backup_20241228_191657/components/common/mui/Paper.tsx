import React from 'react';
import { Paper as MuiPaper, PaperProps as MuiPaperProps, styled } from '@mui/material';
import { CustomTheme } from '../../../styles/theme';

type CustomVariant = 'outlined' | 'contained';

export interface PaperProps extends Omit<MuiPaperProps, 'variant'> {
  variant?: CustomVariant;
  emphasis?: 'low' | 'medium' | 'high';
  noHover?: boolean;
}

const StyledPaper = styled(MuiPaper, {
  shouldForwardProp: (prop) => !['variant', 'emphasis', 'noHover'].includes(prop as string),
})<PaperProps>(({ theme, variant = 'outlined', emphasis = 'medium', noHover }) => {
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
      ['background-color', 'border-color'],
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

export const Paper = React.forwardRef<HTMLDivElement, PaperProps>((props, ref) => {
  const { children, variant = 'outlined', ...rest } = props;
  const muiProps = {
    ...rest,
    ref,
    variant: variant === 'contained' ? 'elevation' : 'outlined' as const,
  };

  return <StyledPaper {...muiProps}>{children}</StyledPaper>;
});

Paper.displayName = 'Paper';

// Predefined paper variants
export const PrimaryPanel = React.forwardRef<HTMLDivElement, Omit<PaperProps, 'variant' | 'emphasis'>>((props, ref) => (
  <Paper ref={ref} variant="outlined" emphasis="high" {...props} />
));

PrimaryPanel.displayName = 'PrimaryPanel';

export const SecondaryPanel = React.forwardRef<HTMLDivElement, Omit<PaperProps, 'variant' | 'emphasis'>>((props, ref) => (
  <Paper ref={ref} variant="outlined" emphasis="medium" {...props} />
));

SecondaryPanel.displayName = 'SecondaryPanel';

export const SubtlePanel = React.forwardRef<HTMLDivElement, Omit<PaperProps, 'variant' | 'emphasis'>>((props, ref) => (
  <Paper ref={ref} variant="contained" emphasis="low" {...props} />
));

SubtlePanel.displayName = 'SubtlePanel'; 