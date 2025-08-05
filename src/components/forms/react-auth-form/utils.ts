import { FormValues, ValidationRules, ValidatorFunction, AuthResponse, AuthError } from './types';

export const createValidationRules = (isSignup = false): ValidationRules => {
  const emailValidators: ValidatorFunction[] = [
    (value: string) => (!value ? 'Email is required' : ''),
    (value: string) =>
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Please enter a valid email' : '',
  ];

  const passwordValidators: ValidatorFunction[] = [
    (value: string) => (!value ? 'Password is required' : ''),
    (value: string) => (value.length < 8 ? 'Password must be at least 8 characters' : ''),
    (value: string) =>
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)
        ? 'Password must contain uppercase, lowercase, and number'
        : '',
  ];

  const rules: ValidationRules = {
    email: emailValidators,
    password: passwordValidators,
  };

  if (isSignup) {
    rules.name = [
      (value: string) => (!value ? 'Name is required' : ''),
      (value: string) => (value.length < 2 ? 'Name must be at least 2 characters' : ''),
    ];

    rules.confirmPassword = [
      (value: string) => (!value ? 'Please confirm your password' : ''),
      (value: string, values?: FormValues) =>
        value !== values?.password ? 'Passwords do not match' : '',
    ];
  }

  return rules;
};

export const simulateAPI = async (
  endpoint: 'login' | 'signup',
  data: FormValues
): Promise<AuthResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (endpoint === 'login') {
        if (data.email === 'test@example.com' && data.password === 'Test!23456') {
          resolve({
            success: true,
            token: 'fake-jwt-token',
            user: { email: data.email, name: 'Test User' },
          });
        } else {
          reject({ message: 'Invalid email or password' } as AuthError);
        }
      } else if (endpoint === 'signup') {
        if (data.email === 'existing@example.com') {
          reject({ message: 'An account with this email already exists' } as AuthError);
        } else {
          resolve({ success: true, message: 'Account created successfully' });
        }
      }
    }, 1500);
  });
};
