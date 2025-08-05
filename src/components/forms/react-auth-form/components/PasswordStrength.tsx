import React from 'react';
import { CheckCircle } from 'lucide-react';
import { PasswordStrengthProps, PasswordCheck } from '../types';

export const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password, show }) => {
  if (!show || !password) return null;

  const checks: PasswordCheck[] = [
    { label: 'At least 8 characters', test: password.length >= 8 },
    { label: 'Contains uppercase letter', test: /[A-Z]/.test(password) },
    { label: 'Contains lowercase letter', test: /[a-z]/.test(password) },
    { label: 'Contains number', test: /\d/.test(password) },
    { label: 'Contains special character', test: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
  ];

  const strength = checks.filter((check) => check.test).length;
  const strengthColors = [
    'bg-red-500',
    'bg-orange-500',
    'bg-yellow-500',
    'bg-blue-500',
    'bg-green-500',
  ];
  const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];

  return (
    <div className="mt-2 space-y-2" role="region" aria-label="Password strength indicator">
      <div className="flex space-x-1" role="progressbar" aria-valuenow={strength} aria-valuemax={5}>
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded transition-colors duration-200 ${
              i < strength ? strengthColors[strength - 1] : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
      <div className="text-xs text-gray-600">
        Password strength:{' '}
        <span className="font-medium">{strengthLabels[strength - 1] || 'Very Weak'}</span>
      </div>
      <div className="space-y-1">
        {checks.map((check, i) => (
          <div key={i} className="flex items-center space-x-2 text-xs">
            <CheckCircle
              className={`h-3 w-3 flex-shrink-0 ${check.test ? 'text-green-500' : 'text-gray-300'}`}
              aria-hidden="true"
            />
            <span className={`${check.test ? 'text-green-600' : 'text-gray-500'}`}>
              {check.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
