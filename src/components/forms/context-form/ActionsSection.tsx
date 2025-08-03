import { useFormAPI, useFormName } from '../../../providers/FormDataProvider';
import { Section } from './Section';

export const ActionsSection = () => {
  const { onSave, onReset, isFormValid } = useFormAPI();
  const name = useFormName();

  return (
    <Section title="Actions" description="Review and save your information">
      {/* Form Validation Message */}
      {!isFormValid && name.length === 0 && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <svg
              className="w-5 h-5 text-yellow-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
            <p className="text-yellow-700 text-sm font-medium">
              Please enter your name before saving
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onSave}
          disabled={!isFormValid}
          className={`flex-1 font-medium py-2.5 px-4 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-offset-2 shadow-sm ${
            isFormValid
              ? 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 cursor-pointer'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isFormValid ? 'Save Information' : 'Enter Name to Save'}
        </button>
        <button
          type="button"
          onClick={onReset}
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Reset Form
        </button>
      </div>

      {/* Form Status Indicator */}
      <div className="mt-4 text-center">
        <div
          className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm font-medium ${
            isFormValid
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-gray-50 text-gray-600 border border-gray-200'
          }`}
        >
          <div className={`w-2 h-2 rounded-full ${isFormValid ? 'bg-green-500' : 'bg-gray-400'}`} />
          <span>{isFormValid ? 'Form is ready to save' : 'Form incomplete'}</span>
        </div>
      </div>
    </Section>
  );
};
