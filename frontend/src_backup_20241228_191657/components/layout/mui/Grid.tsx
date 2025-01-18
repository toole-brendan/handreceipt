import React from 'react';
import {
  Grid as MuiGrid,
  GridProps as MuiGridProps,
  styled,
  Theme,
} from '@mui/material';
import { CustomTheme } from '../../../styles/theme';

export interface GridProps extends MuiGridProps {
  noGutter?: boolean;
  equalHeight?: boolean;
  glassEffect?: boolean;
  noBorder?: boolean;
}

interface StyledGridProps extends GridProps {
  theme?: Theme;
}

const StyledGrid = styled(MuiGrid, {
  shouldForwardProp: (prop: string) => !['noGutter', 'equalHeight', 'glassEffect', 'noBorder'].includes(prop),
})<StyledGridProps>(({ theme, noGutter, equalHeight, glassEffect, noBorder }) => {
  const customTheme = theme as CustomTheme;
  
  const styles = {
    // Remove negative margins if noGutter is true
    ...(noGutter && {
      margin: 0,
      '& > .MuiGrid-item': {
        padding: 0,
      },
    }),
    // Make all children equal height
    ...(equalHeight && {
      '& > .MuiGrid-item': {
        display: 'flex',
        '& > *': {
          width: '100%',
        },
      },
    }),
    // Glass effect styling
    ...(glassEffect && {
      '& > .MuiGrid-item': {
        '& > *': {
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(12px)',
          border: noBorder ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 0,
          transition: theme.transitions.create(
            ['background-color', 'transform', 'box-shadow'],
            {
              duration: theme.transitions.duration.shorter,
              easing: theme.transitions.easing.easeInOut,
            }
          ),
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: 'rgba(255, 255, 255, 0.1)',
          },
        },
      },
    }),
  };

  return styles;
});

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ container, item, spacing = 3, glassEffect = false, noBorder = false, ...rest }, ref) => {
    return (
      <StyledGrid
        ref={ref}
        container={container}
        item={item}
        spacing={spacing}
        glassEffect={glassEffect}
        noBorder={noBorder}
        {...rest}
      />
    );
  }
); 