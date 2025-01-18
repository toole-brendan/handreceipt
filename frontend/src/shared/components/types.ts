import { ReactNode, ButtonHTMLAttributes, InputHTMLAttributes, HTMLAttributes, SelectHTMLAttributes, LabelHTMLAttributes, FormHTMLAttributes } from 'react';

// Common props shared across components
export interface BaseProps {
  className?: string;
  children?: ReactNode;
}

// Common variant and size types
export type Size = 'sm' | 'md' | 'lg';
export type ButtonSize = Size;
export type ButtonVariant = 'default' | 'primary' | 'secondary' | 'ghost' | 'destructive' | 'outline' | 'link';

// Form-related types
export interface FormProps extends FormHTMLAttributes<HTMLFormElement>, BaseProps {
  onSubmit?: (data: Record<string, any>) => void | Promise<void>;
  loading?: boolean;
  error?: string;
  success?: string;
}

export interface FormFieldProps extends BaseProps {
  name: string;
  label?: string;
  error?: string;
  required?: boolean;
  optional?: boolean;
  hint?: string;
  children: ReactNode;
}

export interface FormSectionProps extends BaseProps {
  title?: string;
  description?: string;
  collapsible?: boolean;
  defaultExpanded?: boolean;
}

export interface FormActionsProps extends BaseProps {
  align?: 'left' | 'center' | 'right';
  sticky?: boolean;
}

// Label-related types
export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement>, BaseProps {
  required?: boolean;
  optional?: boolean;
  error?: boolean;
  size?: Size;
  htmlFor?: string;
}

// Button-related types
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  isIcon?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}

// Input-related types
export interface InputProps extends InputHTMLAttributes<HTMLInputElement>, BaseProps {
  label?: string;
  error?: string;
  hint?: string;
}

// Checkbox-related types
export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>, BaseProps {
  label?: string;
  error?: string;
  hint?: string;
  indeterminate?: boolean;
}

// Select-related types
export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'>, BaseProps {
  label?: string;
  error?: string;
  hint?: string;
  size?: Size;
  options?: SelectOption[];
  placeholder?: string;
}

// Layout-related types
export interface CardProps extends HTMLAttributes<HTMLDivElement>, BaseProps {
  padding?: Size;
  bordered?: boolean;
}

// Feedback-related types
export type AlertVariant = 'info' | 'success' | 'warning' | 'error';
export interface AlertProps extends HTMLAttributes<HTMLDivElement>, BaseProps {
  variant: AlertVariant;
  title?: string;
  onClose?: () => void;
}

// Navigation-related types
export interface BreadcrumbItem {
  label: string;
  href: string;
}
export interface BreadcrumbProps extends HTMLAttributes<HTMLElement>, BaseProps {
  items: BreadcrumbItem[];
  separator?: ReactNode;
}

// Data display types
export interface TableColumn<T> {
  key: keyof T;
  title: string;
  render?: (value: T[keyof T], item: T) => ReactNode;
}
export interface TableProps<T> extends HTMLAttributes<HTMLTableElement>, BaseProps {
  data: T[];
  columns: TableColumn<T>[];
  loading?: boolean;
}

// Overlay-related types
export interface ModalProps extends BaseProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  footer?: ReactNode;
}

// Theme-related types
export type ThemeColor = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
export type ThemeShade = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900; 