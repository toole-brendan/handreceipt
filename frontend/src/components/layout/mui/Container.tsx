import React from 'react';
import {
  Container as MuiContainer,
  ContainerProps as MuiContainerProps,
  styled,
  Theme,
} from '@mui/material';
import { CustomTheme } from '../../../styles/theme';

export interface ContainerProps extends MuiContainerProps {
  fluid?: boolean;
  narrow?: boolean;
  glassEffect?: boolean;
  noBorder?: boolean;
}

interface StyledContainerProps extends ContainerProps {
  theme?: Theme;
}

const StyledContainer = styled(MuiContainer, {
  shouldForwardProp: (prop: string) => !['fluid', 'narrow', 'glassEffect', 'noBorder'].includes(prop),
})<StyledContainerProps>(({ theme, fluid, narrow, glassEffect, noBorder }) => {
  const customTheme = theme as CustomTheme;
  
  return {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: fluid ? theme.spacing(1) : theme.spacing(2),
    paddingRight: fluid ? theme.spacing(1) : theme.spacing(2),
    maxWidth: fluid ? '100%' : narrow ? '960px' : '1280px',
    position: 'relative',
    transition: theme.transitions.create(
      ['background-color', 'backdrop-filter', 'border-color'],
      {
        duration: theme.transitions.duration.shorter,
        easing: theme.transitions.easing.easeInOut,
      }
    ),
    ...(glassEffect && {
      backgroundColor: 'rgba(255, 255, 255, 0.03)',
      backdropFilter: 'blur(12px)',
      border: noBorder ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: 0,
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '1px',
        background: 'rgba(255, 255, 255, 0.1)',
      },
    }),
    [theme.breakpoints.up('sm')]: {
      paddingLeft: fluid ? theme.spacing(2) : theme.spacing(3),
      paddingRight: fluid ? theme.spacing(2) : theme.spacing(3),
    },
    [theme.breakpoints.up('md')]: {
      paddingLeft: fluid ? theme.spacing(2) : theme.spacing(4),
      paddingRight: fluid ? theme.spacing(2) : theme.spacing(4),
    },
  };
});

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ glassEffect = false, noBorder = false, ...props }, ref) => {
    return <StyledContainer ref={ref} glassEffect={glassEffect} noBorder={noBorder} {...props} />;
  }
); 