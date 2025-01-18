import React from 'react';
import {
  Checkbox as MuiCheckbox,
  CheckboxProps as MuiCheckboxProps,
  FormControlLabel,
  styled,
} from '@mui/material';
import { BaseFormField } from '../common/BaseFormField';

export interface CheckboxProps extends Omit<MuiCheckboxProps, 'error'> {
  label?: string;
  error?: string;
  hint?: string;
  indeterminate?: boolean;
}

const StyledFormControlLabel = styled(FormControlLabel)(() => ({
  marginLeft: -11,
  '& .MuiFormControlLabel-label': {
    color: '#FFFFFF',
    fontSize: '0.875rem',
    letterSpacing: '0.05em',
  },
  '& .MuiCheckbox-root': {
    color: 'rgba(255, 255, 255, 0.7)',
    padding: '9px',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
    },
    '&.Mui-checked': {
      color: '#FFFFFF',
    },
    '&.Mui-disabled': {
      color: 'rgba(255, 255, 255, 0.3)',
    },
  },
  '& .MuiSvgIcon-root': {
    fontSize: '1.25rem',
  },
  '&:hover .MuiCheckbox-root:not(.Mui-disabled)': {
    color: '#FFFFFF',
  },
  '&.Mui-error': {
    '& .MuiCheckbox-root': {
      color: '#FF3B3B',
    },
    '& .MuiFormControlLabel-label': {
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

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(({
  className,
  label,
  error,
  hint,
  indeterminate,
  required,
  ...props
}, ref) => {
  return (
    <StyledBaseFormField
      error={error}
      helperText={hint}
      required={required}
    >
      <StyledFormControlLabel
        control={
          <MuiCheckbox
            inputRef={ref}
            indeterminate={indeterminate}
            className={className}
            required={required}
            {...props}
          />
        }
        label={label || ''}
        className={error ? 'Mui-error' : ''}
      />
    </StyledBaseFormField>
  );
});

Checkbox.displayName = 'Checkbox'; 