import React from 'react';
import {
  Stack as MuiStack,
  StackProps as MuiStackProps,
  styled,
} from '@mui/material';

export interface StackProps extends MuiStackProps {
  inline?: boolean;
  wrap?: boolean;
}

const StyledStack = styled(MuiStack, {
  shouldForwardProp: (prop) => !['inline', 'wrap'].includes(prop as string),
})<StackProps>(({ inline, wrap }) => ({
  display: inline ? 'inline-flex' : 'flex',
  ...(wrap && {
    flexWrap: 'wrap',
  }),
}));

export const Stack = React.forwardRef<HTMLDivElement, StackProps>((props, ref) => {
  const { spacing = 2, ...rest } = props;

  return (
    <StyledStack
      ref={ref}
      spacing={spacing}
      {...rest}
    />
  );
}); 