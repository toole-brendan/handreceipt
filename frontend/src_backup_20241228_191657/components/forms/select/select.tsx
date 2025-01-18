/* frontend/src/ui/select.tsx */

import React from 'react';
import {
  Select as MuiSelect,
  MenuItem,
  SelectProps as MuiSelectProps,
  styled,
  SxProps,
} from '@mui/material';
import { BaseFormField } from '../common/BaseFormField';

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<MuiSelectProps, 'error'> {
  label?: string;
  error?: string;
  hint?: string;
  options?: SelectOption[];
  placeholder?: string;
}

const StyledSelect = styled(MuiSelect)(() => ({
  '& .MuiSelect-select': {
    backgroundColor: '#000000',
    padding: '12px 16px',
    color: '#FFFFFF',
    fontSize: '0.875rem',
    letterSpacing: '0.05em',
    '&.Mui-disabled': {
      backgroundColor: 'rgba(255, 255, 255, 0.02)',
    },
    '&.MuiSelect-outlined': {
      paddingRight: '32px',
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: '1px solid rgba(255, 255, 255, 0.2)',
    transition: 'all 0.2s ease',
    borderRadius: 0,
  },
  '&:hover': {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(255, 255, 255, 0.3)',
    },
  },
  '&.Mui-focused': {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#FFFFFF',
      borderWidth: '1px',
    },
  },
  '&.Mui-error': {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#FF3B3B',
    },
  },
  '& .MuiSelect-icon': {
    color: 'rgba(255, 255, 255, 0.7)',
    transition: 'transform 0.2s ease',
  },
  '&.Mui-focused .MuiSelect-icon': {
    color: '#FFFFFF',
    transform: 'rotate(180deg)',
  },
}));

const StyledMenuItem = styled(MenuItem)(() => ({
  padding: '12px 16px',
  fontSize: '0.875rem',
  letterSpacing: '0.05em',
  color: '#FFFFFF',
  minHeight: '40px',
  transition: 'all 0.2s ease',
  '&.Mui-selected': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    '&.Mui-focusVisible': {
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
    },
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
    },
  },
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  '&.Mui-disabled': {
    color: 'rgba(255, 255, 255, 0.3)',
  },
}));

const StyledBaseFormField = styled(BaseFormField)(() => ({
  '& .MuiFormLabel-root': {
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
  '& .MuiFormLabel-asterisk': {
    color: '#FF3B3B',
  },
}));

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({
  className,
  label,
  error,
  hint,
  options = [],
  placeholder,
  required,
  fullWidth = true,
  children,
  MenuProps,
  ...props
}, ref) => {
  return (
    <StyledBaseFormField
      error={error}
      label={label}
      helperText={hint}
      required={required}
    >
      <StyledSelect
        inputRef={ref}
        error={!!error}
        displayEmpty
        fullWidth={fullWidth}
        className={className}
        variant="outlined"
        MenuProps={{
          ...MenuProps,
          PaperProps: {
            ...MenuProps?.PaperProps,
            sx: {
              backgroundColor: '#000000',
              borderRadius: 0,
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              mt: 1,
              ...MenuProps?.PaperProps?.sx,
            } as SxProps,
          },
        }}
        {...props}
      >
        {placeholder && (
          <StyledMenuItem value="" disabled>
            <span style={{ opacity: 0.5 }}>{placeholder}</span>
          </StyledMenuItem>
        )}
        {options.map((option) => (
          <StyledMenuItem
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </StyledMenuItem>
        ))}
        {children}
      </StyledSelect>
    </StyledBaseFormField>
  );
});

Select.displayName = 'Select'; 