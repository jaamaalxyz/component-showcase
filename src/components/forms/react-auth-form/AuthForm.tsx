import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { AlertCircle, CheckCircle, Loader2, Mail, Lock, User } from 'lucide-react';
import { FormValues, SubmitMessage, AuthError } from './types';
import { createValidationRules, simulateAPI } from './utils';
import { useFormValidation } from './hooks/useFormValidation';
import { Input } from './components/Input';
import { PasswordStrength } from './components/PasswordStrength';

export const AuthForm: React.FC = () => {
  const [isSignup, setIsSignup] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [submitMessage, setSubmitMessage] = useState<SubmitMessage>({ type: '', text: '' });

  const validationRules = createValidationRules(isSignup);
  const initialState: FormValues = useMemo(
    () =>
      isSignup
        ? { name: '', email: '', password: '', confirmPassword: '' }
        : { email: '', password: '' },
    [isSignup]
  );

  const { values, errors, touched, handleChange, handleBlur, validateAll, setValues, setErrors } =
    useFormValidation(initialState, validationRules);

  const resetForm = useCallback((): void => {
    setValues(initialState);
    setErrors({});
    setSubmitMessage({ type: '', text: '' });
  }, [initialState, setValues, setErrors]);

  const handleModeSwitch = (): void => {
    setIsSignup(!isSignup);
    resetForm();
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();

    if (!validateAll()) return;

    setIsLoading(true);
    setSubmitMessage({ type: '', text: '' });

    try {
      const endpoint = isSignup ? 'signup' : 'login';
      await simulateAPI(endpoint, values);

      setSubmitMessage({
        type: 'success',
        text: isSignup ? 'Account created successfully!' : 'Welcome back!',
      });

      // In real app, you'd handle token storage and redirect here
    } catch (error) {
      const authError = error as AuthError;
      setSubmitMessage({ type: 'error', text: authError.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = (): void => {
    // In production, this would open a forgot password modal or navigate to a dedicated page
    alert('Forgot password functionality would be implemented here');
  };

  const handleFormSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (!isLoading) {
      const syntheticEvent = {
        preventDefault: () => {},
      } as React.MouseEvent<HTMLButtonElement>;
      handleSubmit(syntheticEvent);
    }
  };

  // Reset form when switching modes
  useEffect(() => {
    resetForm();
  }, [isSignup, resetForm]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {isSignup ? 'Create Account' : 'Welcome Back'}
            </h1>
            <p className="text-gray-600">
              {isSignup
                ? 'Sign up to get started with your account'
                : 'Sign in to your account to continue'}
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleFormSubmit}>
            {isSignup && (
              <Input
                name="name"
                placeholder="Full Name"
                value={values.name || ''}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.name}
                touched={touched.name}
                icon={User}
                disabled={isLoading}
              />
            )}

            <Input
              name="email"
              type="email"
              placeholder="Email Address"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email}
              touched={touched.email}
              icon={Mail}
              disabled={isLoading}
            />

            <div className="space-y-2">
              <Input
                name="password"
                type="password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.password}
                touched={touched.password}
                icon={Lock}
                showPasswordToggle
                disabled={isLoading}
              />

              {isSignup && (
                <PasswordStrength password={values.password} show={touched.password || false} />
              )}
            </div>

            {isSignup && (
              <Input
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={values.confirmPassword || ''}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.confirmPassword}
                touched={touched.confirmPassword}
                icon={Lock}
                showPasswordToggle
                disabled={isLoading}
              />
            )}

            {/* Submit Message */}
            {submitMessage.text && (
              <div
                className={`p-3 rounded-lg text-sm ${
                  submitMessage.type === 'success'
                    ? 'bg-green-50 text-green-800 border border-green-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}
                role="alert"
                aria-live="polite"
              >
                <div className="flex items-center space-x-2">
                  {submitMessage.type === 'success' ? (
                    <CheckCircle className="h-4 w-4 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  )}
                  <span>{submitMessage.text}</span>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              <span>{isLoading ? 'Please wait...' : isSignup ? 'Create Account' : 'Sign In'}</span>
            </button>

            {/* Forgot Password (Login only) */}
            {!isSignup && (
              <div className="text-center">
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline focus:outline-none focus:underline"
                  onClick={handleForgotPassword}
                  disabled={isLoading}
                >
                  Forgot your password?
                </button>
              </div>
            )}
          </form>

          {/* Mode Switch */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                type="button"
                onClick={handleModeSwitch}
                disabled={isLoading}
                className="text-blue-600 hover:text-blue-800 font-medium hover:underline focus:outline-none focus:underline disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSignup ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>

          {/* Demo Credentials (for testing) */}
          <div className="mt-6 p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 mb-2">Demo credentials for testing:</p>
            <p className="text-xs text-gray-700">Email: test@example.com</p>
            <p className="text-xs text-gray-700">Password: Test!23456</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
