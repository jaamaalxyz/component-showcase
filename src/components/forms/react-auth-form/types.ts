import React from 'react';

export interface FormValues {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface FormErrors {
  [key: string]: string;
}

export interface FormTouched {
  [key: string]: boolean;
}

export interface SubmitMessage {
  type: 'success' | 'error' | '';
  text: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: {
    email: string;
    name: string;
  };
  message?: string;
}

export interface AuthError {
  message: string;
}

export type ValidatorFunction = (value: string, allValues?: FormValues) => string;

export interface ValidationRules {
  [key: string]: ValidatorFunction[];
}

export interface PasswordCheck {
  label: string;
  test: boolean;
}

export interface UseFormValidationReturn {
  values: FormValues;
  errors: FormErrors;
  touched: FormTouched;
  handleChange: (name: keyof FormValues, value: string) => void;
  handleBlur: (name: keyof FormValues) => void;
  validateAll: () => boolean;
  setValues: React.Dispatch<React.SetStateAction<FormValues>>;
  setErrors: React.Dispatch<React.SetStateAction<FormErrors>>;
}

export type IconComponent = React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>;

export interface InputProps {
  name: keyof FormValues;
  type?: 'text' | 'email' | 'password';
  placeholder: string;
  value: string;
  onChange: (name: keyof FormValues, value: string) => void;
  onBlur: (name: keyof FormValues) => void;
  error?: string | undefined;
  touched?: boolean | undefined;
  icon?: IconComponent;
  showPasswordToggle?: boolean;
  disabled?: boolean;
}

export interface PasswordStrengthProps {
  password: string;
  show: boolean;
}
