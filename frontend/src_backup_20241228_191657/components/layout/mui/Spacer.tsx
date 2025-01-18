import React from 'react';
import { Box, BoxProps, styled } from '@mui/material';

export interface SpacerProps extends BoxProps {
  size?: number | string;
  axis?: 'horizontal' | 'vertical';
  flexed?: boolean;
}

const StyledSpacer = styled(Box, {
  shouldForwardProp: (prop) => !['size', 'axis', 'flexed'].includes(prop as string),
})<SpacerProps>(({ theme, size = 1, axis = 'vertical', flexed }) => {
  const spacing = typeof size === 'number' ? theme.spacing(size) : size;
  
  return {
    ...(axis === 'horizontal' ? {
      width: spacing,
      height: 'auto',
      minHeight: '1px',
      display: flexed ? 'flex' : 'inline-block',
    } : {
      width: 'auto',
      height: spacing,
      minWidth: '1px',
      display: flexed ? 'flex' : 'block',
    }),
    ...(flexed && {
      flex: `0 0 ${spacing}`,
    }),
  };
});

export const Spacer = React.forwardRef<HTMLDivElement, SpacerProps>((props, ref) => {
  return <StyledSpacer ref={ref} {...props} />;
}); 