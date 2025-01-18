import React from 'react';
import { Box, Paper, styled, Theme, alpha, LinearProgress } from '@mui/material';

// Type definitions
interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  loading?: boolean;
  error?: string;
  success?: string;
  onSubmit?: (data: Record<string, any>) => Promise<void> | void;
}

interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string;
  label?: string;
  error?: string;
  required?: boolean;
  optional?: boolean;
  hint?: string;
}

interface FormSectionProps {
  title?: string;
  description?: string;
  collapsible?: boolean;
  defaultExpanded?: boolean;
  className?: string;
  children?: React.ReactNode;
}

interface FormActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: 'left' | 'right' | 'center';
  sticky?: boolean;
}

const StyledForm = styled('form')(({ theme }: { theme: Theme }) => ({
  position: 'relative',
  width: '100%',
  '&.form-loading': {
    pointerEvents: 'none',
    opacity: 0.7,
  },
}));

const StyledFormSection = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'component',
})<{ component?: React.ElementType }>(({ theme }: { theme: Theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.03)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: 0,
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  transition: theme.transitions.create(['background-color', 'box-shadow'], {
    duration: theme.transitions.duration.shorter,
  }),
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  '& .form-section-header': {
    marginBottom: theme.spacing(3),
  },
  '& .form-section-title': {
    color: '#FFFFFF',
    fontSize: '1.125rem',
    fontWeight: 600,
    letterSpacing: '0.02em',
    fontFamily: 'Inter, sans-serif',
    marginBottom: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  '& .form-section-description': {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '0.875rem',
    letterSpacing: '0.015em',
    fontFamily: 'Inter, sans-serif',
  },
  '& .form-section-toggle': {
    background: 'none',
    border: 'none',
    padding: theme.spacing(0.5),
    cursor: 'pointer',
    color: 'rgba(255, 255, 255, 0.7)',
    transition: theme.transitions.create(['color', 'transform'], {
      duration: theme.transitions.duration.shorter,
    }),
    '&:hover': {
      color: '#FFFFFF',
    },
  },
  '& .form-section-chevron': {
    width: 24,
    height: 24,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shorter,
    }),
    '&.expanded': {
      transform: 'rotate(180deg)',
    },
  },
  '& .form-section-content': {
    transition: theme.transitions.create(['opacity', 'max-height'], {
      duration: theme.transitions.duration.standard,
    }),
    '&.collapsed': {
      opacity: 0,
      maxHeight: 0,
      overflow: 'hidden',
    },
  },
}));

const StyledFormField = styled(Box)(({ theme }: { theme: Theme }) => ({
  marginBottom: theme.spacing(3),
  '& .form-label': {
    display: 'block',
    marginBottom: theme.spacing(1),
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: '0.875rem',
    fontWeight: 600,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    fontFamily: 'Inter, sans-serif',
  },
  '& .form-required': {
    color: '#F44336',
    marginLeft: theme.spacing(0.5),
  },
  '& .form-optional': {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: '0.75rem',
    marginLeft: theme.spacing(1),
    fontWeight: 400,
    textTransform: 'none',
  },
  '& .form-hint': {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: '0.75rem',
    marginTop: theme.spacing(0.5),
    letterSpacing: '0.025em',
    fontFamily: 'Inter, sans-serif',
  },
  '& .form-error': {
    color: '#F44336',
    fontSize: '0.75rem',
    marginTop: theme.spacing(0.5),
    letterSpacing: '0.025em',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(0.5),
    '&::before': {
      content: '"•"',
      fontWeight: 'bold',
    },
  },
}));

const StyledFormActions = styled(Box)(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  marginTop: theme.spacing(4),
  '&.align-right': {
    justifyContent: 'flex-end',
  },
  '&.align-left': {
    justifyContent: 'flex-start',
  },
  '&.align-center': {
    justifyContent: 'center',
  },
  '&.sticky': {
    position: 'sticky',
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    backdropFilter: 'blur(12px)',
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    zIndex: 1,
  },
}));

const StyledMessage = styled(Box)(({ theme }: { theme: Theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(3),
  borderRadius: 0,
  fontSize: '0.875rem',
  letterSpacing: '0.015em',
  fontFamily: 'Inter, sans-serif',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  '&.form-message-error': {
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
    color: '#F44336',
    border: '1px solid rgba(244, 67, 54, 0.3)',
  },
  '&.form-message-success': {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    color: '#4CAF50',
    border: '1px solid rgba(76, 175, 80, 0.3)',
  },
}));

// Form Field Component
export const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(({
  className,
  children,
  name,
  label,
  error,
  required,
  optional,
  hint,
  ...props
}, ref) => {
  const id = React.useId();

  return (
    <StyledFormField ref={ref} className={`form-field ${className || ''}`} {...props}>
      {label && (
        <label htmlFor={id} className="form-label">
          {label}
          {required && <span className="form-required">*</span>}
          {optional && <span className="form-optional">(optional)</span>}
        </label>
      )}
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            id,
            name,
            'aria-describedby': error ? `${id}-error` : hint ? `${id}-hint` : undefined,
            ...child.props
          });
        }
        return child;
      })}
      {hint && !error && (
        <p id={`${id}-hint`} className="form-hint">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="form-error">
          {error}
        </p>
      )}
    </StyledFormField>
  );
});

FormField.displayName = 'FormField';

// Form Section Component
export const FormSection = React.forwardRef<HTMLDivElement, FormSectionProps>(({
  className,
  children,
  title,
  description,
  collapsible,
  defaultExpanded = true,
  ...props
}, ref) => {
  const [isExpanded, setIsExpanded] = React.useState(defaultExpanded);
  const titleId = React.useId();

  return (
    <StyledFormSection
      ref={ref}
      role="region"
      aria-labelledby={title ? titleId : undefined}
      className={`form-section ${collapsible ? 'form-section-collapsible' : ''} ${className || ''}`}
      elevation={0}
      {...props}
    >
      {title && (
        <div className="form-section-header">
          <div id={titleId} className="form-section-title">
            {title}
            {collapsible && (
              <button
                type="button"
                className="form-section-toggle"
                onClick={() => setIsExpanded(!isExpanded)}
                aria-expanded={isExpanded}
              >
                <svg
                  className={`form-section-chevron ${isExpanded ? 'expanded' : ''}`}
                  viewBox="0 0 24 24"
                >
                  <path d="M7 10l5 5 5-5" />
                </svg>
              </button>
            )}
          </div>
          {description && <p className="form-section-description">{description}</p>}
        </div>
      )}
      <div 
        className={`form-section-content ${!isExpanded ? 'collapsed' : ''}`}
        aria-hidden={!isExpanded}
      >
        {children}
      </div>
    </StyledFormSection>
  );
});

FormSection.displayName = 'FormSection';

// Form Actions Component
export const FormActions = React.forwardRef<HTMLDivElement, FormActionsProps>(({
  className,
  children,
  align = 'right',
  sticky,
  ...props
}, ref) => {
  return (
    <StyledFormActions
      ref={ref}
      className={`form-actions align-${align} ${sticky ? 'sticky' : ''} ${className || ''}`}
      {...props}
    >
      {children}
    </StyledFormActions>
  );
});

FormActions.displayName = 'FormActions';

// Main Form Component
export const Form = React.forwardRef<HTMLFormElement, FormProps>(({
  className,
  children,
  onSubmit,
  loading,
  error,
  success,
  ...props
}, ref) => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading || !onSubmit) return;

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    try {
      await onSubmit(data);
    } catch (err) {
      console.error('Form submission error:', err);
    }
  };

  return (
    <StyledForm
      ref={ref}
      className={`form ${loading ? 'form-loading' : ''} ${className || ''}`}
      onSubmit={handleSubmit}
      {...props}
    >
      {error && (
        <StyledMessage className="form-message form-message-error" role="alert">
          {error}
        </StyledMessage>
      )}
      {success && (
        <StyledMessage className="form-message form-message-success" role="status">
          {success}
        </StyledMessage>
      )}
      {loading && (
        <LinearProgress
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            backgroundColor: theme => alpha(theme.palette.primary.main, 0.08),
            '& .MuiLinearProgress-bar': {
              backgroundColor: theme => theme.palette.primary.main,
            },
          }}
        />
      )}
      {children}
    </StyledForm>
  );
});

Form.displayName = 'Form'; 