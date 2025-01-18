import React from 'react';
import { LabelProps } from '../../types';
import './label.css';

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(({
  className,
  children,
  required,
  optional,
  error,
  size = 'md',
  ...props
}, ref) => {
  return (
    <label
      ref={ref}
      className={`
        label
        label-${size}
        ${error ? 'label-error' : ''}
        ${className || ''}
      `}
      {...props}
    >
      {children}
      {required && <span className="label-required">*</span>}
      {optional && <span className="label-optional">(optional)</span>}
    </label>
  );
});

Label.displayName = 'Label'; 