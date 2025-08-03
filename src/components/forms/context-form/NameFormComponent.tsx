import { ChangeEvent } from 'react';
import { useFormAPI, useFormName } from '../../../providers/FormDataProvider';

export const NameFormComponent = () => {
  const name = useFormName();
  const { onNameChange } = useFormAPI();
  const hasValue = name && name.trim().length > 0;

  const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    onNameChange(e.target.value);
  };

  return (
    <div className="space-y-2">
      <label
        htmlFor="name-input"
        className="flex items-center justify-between text-sm font-medium text-gray-700"
      >
        <span>
          Full Name <span className="text-red-500">*</span>
        </span>
        {hasValue && (
          <span className="flex items-center text-green-600 text-xs">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Valid
          </span>
        )}
      </label>
      <div className="relative">
        <input
          id="name-input"
          type="text"
          onChange={onValueChange}
          value={name || ''}
          placeholder="Enter your full name"
          className={`w-full px-3 py-2 border rounded-lg shadow-sm transition-all duration-200 placeholder-gray-400 ${
            hasValue
              ? 'border-green-300 focus:ring-2 focus:ring-green-500 focus:border-green-500'
              : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
          }`}
        />
        {hasValue && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>
      {!hasValue && (
        <p className="text-xs text-gray-500">This field is required to save your information</p>
      )}
    </div>
  );
};
