import React, { useState } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { InputProps } from '../types';

export const Input: React.FC<InputProps> = ({
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  touched,
  icon: Icon,
  showPasswordToggle = false,
  disabled = false,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const inputType = showPasswordToggle ? (showPassword ? 'text' : 'password') : type;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onChange(name, e.target.value);
  };

  const handleInputBlur = (): void => {
    onBlur(name);
  };

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="space-y-1">
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        )}
        <input
          name={name}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          disabled={disabled}
          autoComplete={
            name === 'email'
              ? 'email'
              : name === 'password'
                ? 'current-password'
                : name === 'confirmPassword'
                  ? 'new-password'
                  : name === 'name'
                    ? 'name'
                    : 'off'
          }
          aria-invalid={error && touched ? 'true' : 'false'}
          aria-describedby={error && touched ? `${name}-error` : undefined}
          className={`
            w-full px-4 py-3 border rounded-lg transition-colors duration-200
            ${Icon ? 'pl-10' : ''}
            ${showPasswordToggle ? 'pr-10' : ''}
            ${error && touched ? 'border-red-500 bg-red-50' : 'border-gray-300'}
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60
          `}
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            disabled={disabled}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        )}
      </div>
      {error && touched && (
        <div
          id={`${name}-error`}
          className="flex items-center space-x-1 text-red-600 text-sm"
          role="alert"
          aria-live="polite"
        >
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
