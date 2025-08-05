import { useState, useCallback } from 'react';
import {
  FormValues,
  FormErrors,
  FormTouched,
  ValidationRules,
  UseFormValidationReturn,
} from '../types';

export const useFormValidation = (
  initialState: FormValues,
  validationRules: ValidationRules
): UseFormValidationReturn => {
  const [values, setValues] = useState<FormValues>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<FormTouched>({});

  const validate = useCallback(
    (fieldName: string, value: string): string => {
      const rule = validationRules[fieldName];
      if (!rule) return '';

      for (const validator of rule) {
        const error = validator(value, values);
        if (error) return error;
      }
      return '';
    },
    [validationRules, values]
  );

  const handleChange = useCallback(
    (name: keyof FormValues, value: string): void => {
      setValues((prev) => ({ ...prev, [name]: value }));

      if (touched[name]) {
        const error = validate(name, value);
        setErrors((prev) => ({ ...prev, [name]: error }));
      }
    },
    [validate, touched]
  );

  const handleBlur = useCallback(
    (name: keyof FormValues): void => {
      setTouched((prev) => ({ ...prev, [name]: true }));
      const error = validate(name, values[name] || '');
      setErrors((prev) => ({ ...prev, [name]: error }));
    },
    [validate, values]
  );

  const validateAll = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    Object.keys(validationRules).forEach((field) => {
      const error = validate(field, values[field as keyof FormValues] || '');
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched(
      Object.keys(validationRules).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {} as FormTouched)
    );

    return isValid;
  }, [validate, validationRules, values]);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll,
    setValues,
    setErrors,
  };
};
