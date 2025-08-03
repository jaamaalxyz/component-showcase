import { ActionsSection } from './ActionsSection';
import { PersonalInfoSection } from './PersonalInfoSection';
import { FormDataProvider } from '../../../providers/FormDataProvider';
import { ValueCalculationsSection } from './ValueCalculationSection';
import { SuccessModal } from './SuccessModal';

export function ContextForm() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">User Information Form</h1>
          <p className="mt-2 text-gray-600">Please fill out your details below</p>
        </div>

        <FormDataProvider>
          <div className="space-y-6">
            <PersonalInfoSection />
            <ValueCalculationsSection />
            <ActionsSection />
          </div>
          <SuccessModal />
        </FormDataProvider>
      </div>
    </div>
  );
}
