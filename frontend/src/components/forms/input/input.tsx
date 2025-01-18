/* frontend/src/ui/input.tsx */

import React from 'react';
import { TextField, TextFieldProps, styled } from '@mui/material';
import { BaseFormField } from '../common/BaseFormField';

export interface InputProps extends Omit<TextFieldProps, 'error'> {
  error?: string;
  hint?: string;
}

const StyledTextField = styled(TextField)(() => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#000000',
    borderRadius: 0,
    transition: 'all 0.2s ease',
    '& fieldset': {
      border: '1px solid rgba(255, 255, 255, 0.2)',
      transition: 'all 0.2s ease',
    },
    '&:hover': {
      '& fieldset': {
        borderColor: 'rgba(255, 255, 255, 0.3)',
      },
    },
    '&.Mui-focused': {
      '& fieldset': {
        borderColor: '#FFFFFF',
        borderWidth: '1px',
      },
    },
    '&.Mui-error': {
      '& fieldset': {
        borderColor: '#FF3B3B',
      },
    },
    '& input': {
      padding: '12px 16px',
      color: '#FFFFFF',
      fontSize: '0.875rem',
      letterSpacing: '0.05em',
      '&::placeholder': {
        color: 'rgba(255, 255, 255, 0.5)',
        opacity: 1,
      },
    },
    '& .MuiInputAdornment-root': {
      color: 'rgba(255, 255, 255, 0.7)',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '0.875rem',
    letterSpacing: '0.05em',
    '&.Mui-focused': {
      color: '#FFFFFF',
    },
    '&.Mui-error': {
      color: '#FF3B3B',
    },
  },
  '& .MuiFormHelperText-root': {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '0.75rem',
    letterSpacing: '0.03em',
    marginTop: '4px',
    '&.Mui-error': {
      color: '#FF3B3B',
    },
  },
}));

const StyledBaseFormField = styled(BaseFormField)(() => ({
  '& .MuiFormHelperText-root': {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '0.75rem',
    letterSpacing: '0.03em',
    marginTop: '4px',
    '&.Mui-error': {
      color: '#FF3B3B',
    },
  },
  '& .MuiFormLabel-asterisk': {
    color: '#FF3B3B',
  },
}));

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  className,
  error,
  label,
  hint,
  required,
  fullWidth = true,
  InputProps,
  ...props
}, ref) => {
  return (
    <StyledBaseFormField
      error={error}
      helperText={hint}
      required={required}
    >
      <StyledTextField
        inputRef={ref}
        label={label}
        error={!!error}
        required={required}
        fullWidth={fullWidth}
        variant="outlined"
        className={className}
        InputProps={{
          ...InputProps,
          sx: {
            '&:hover .MuiInputAdornment-root': {
              color: '#FFFFFF',
            },
            '&.Mui-focused .MuiInputAdornment-root': {
              color: '#FFFFFF',
            },
            ...InputProps?.sx,
          },
        }}
        {...props}
      />
    </StyledBaseFormField>
  );
});

Input.displayName = 'Input';
