import React from 'react';
import {
  FormControl,
  FormHelperText,
  FormLabel,
  FormControlProps,
  styled,
  Theme,
  alpha,
} from '@mui/material';

interface BaseFormFieldProps extends Omit<FormControlProps, 'error'> {
  label?: string;
  error?: string;
  required?: boolean;
  helperText?: string;
  children: React.ReactNode;
}

const StyledFormControl = styled(FormControl)(({ theme }: { theme: Theme }) => ({
  marginBottom: theme.spacing(2),
  position: 'relative',
  '& .MuiFormLabel-root': {
    marginBottom: theme.spacing(1),
    color: 'rgba(255, 255, 255, 0.9)',
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.875rem',
    fontWeight: 600,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    transition: theme.transitions.create(['color'], {
      duration: theme.transitions.duration.shorter,
    }),
    '&.Mui-focused': {
      color: '#FFFFFF',
    },
    '&.Mui-error': {
      color: '#F44336',
    },
    '& .MuiFormLabel-asterisk': {
      color: '#F44336',
    },
  },
  '& .MuiFormHelperText-root': {
    marginTop: theme.spacing(0.5),
    fontSize: '0.75rem',
    letterSpacing: '0.025em',
    fontFamily: 'Inter, sans-serif',
    color: 'rgba(255, 255, 255, 0.7)',
    '&.Mui-error': {
      color: '#F44336',
      fontWeight: 500,
    },
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '1px',
    background: 'rgba(255, 255, 255, 0.1)',
    opacity: 0,
    transition: theme.transitions.create(['opacity'], {
      duration: theme.transitions.duration.shorter,
    }),
  },
  '&:focus-within::before': {
    opacity: 1,
  },
}));

export const BaseFormField: React.FC<BaseFormFieldProps> = ({
  label,
  error,
  required,
  helperText,
  children,
  ...props
}) => {
  return (
    <StyledFormControl
      fullWidth
      error={!!error}
      required={required}
      {...props}
    >
      {label && (
        <FormLabel
          sx={{
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -4,
              left: 0,
              width: '2rem',
              height: '1px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              opacity: 0,
              transition: theme => theme.transitions.create(['opacity', 'width'], {
                duration: theme.transitions.duration.shorter,
              }),
            },
            '&.Mui-focused::after': {
              opacity: 1,
              width: '3rem',
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
            },
          }}
        >
          {label}
        </FormLabel>
      )}
      {children}
      {(error || helperText) && (
        <FormHelperText 
          error={!!error}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            '&.Mui-error': {
              '&::before': {
                content: '"•"',
                color: '#F44336',
                fontWeight: 'bold',
              },
            },
          }}
        >
          {error || helperText}
        </FormHelperText>
      )}
    </StyledFormControl>
  );
}; 